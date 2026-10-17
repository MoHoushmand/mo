# Running on Real Hardware

> Submitting jobs to IBM Quantum, Google Quantum AI, Xanadu Cloud, and Rigetti QCS. Backend selection, transpilation, and result analysis.

Running circuits on real quantum hardware introduces challenges absent from simulation: limited qubit connectivity, gate errors, measurement errors, queue times, and calibration drift. This chapter covers the practical workflow: selecting a backend, transpiling your circuit, submitting jobs, and interpreting noisy results.

## The Simulation-to-Hardware Gap

A circuit that works perfectly on a simulator may fail on hardware for several reasons:

| Challenge | Description | Mitigation |
|---|---|---|
| **Connectivity** | Hardware qubits are not all-to-all connected | Transpiler inserts SWAP gates |
| **Gate errors** | Two-qubit gates have ~$10^{-3}$ error rate | Minimize gate count, error mitigation |
| **Measurement errors** | Readout fidelity ~99% | Measurement error mitigation |
| **Decoherence** | Qubits lose information over time ($T_1$, $T_2$) | Minimize circuit depth |
| **Crosstalk** | Operations on one qubit affect neighbors | Careful qubit selection |
| **Calibration drift** | Hardware parameters change over hours | Check calibration data |

```{admonition} Start with Simulators
:class: tip
Always verify your circuit on a simulator first. Debug logic errors before spending queue time on real hardware. Use noisy simulators (Qiskit Aer with noise models, Cirq with `cirq.NoiseModel`) to estimate hardware behavior before submitting.
```

## Submitting Jobs

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.transpiler.preset_passmanagers import generate_preset_pass_manager
from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2

# Connect to IBM Quantum
service = QiskitRuntimeService()

# Select backend (least busy, or specific)
backend = service.least_busy(
    simulator=False,
    min_num_qubits=2,
    operational=True
)
print(f"Using: {backend.name}, qubits: {backend.num_qubits}")

# Build circuit
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

# Transpile for target hardware
pm = generate_preset_pass_manager(
    optimization_level=3,
    backend=backend
)
transpiled = pm.run(qc)
print(f"Depth after transpilation: {transpiled.depth()}")

# Submit job
sampler = SamplerV2(backend)
job = sampler.run([transpiled], shots=4096)
result = job.result()
counts = result[0].data.c.get_counts()
print(counts)
```

**Backend selection tips**:
- `service.backends()` lists all available backends
- Check `backend.status()` for queue length
- Check `backend.properties()` for error rates
- Higher optimization level (0-3) = more aggressive transpilation
:::

:::{tab-item} Cirq
```python
import cirq
import cirq_google as cg

# Google Quantum AI access (requires partnership)
# processor_id = 'weber'  # or 'rainbow', etc.
# engine = cg.Engine(project_id='your-gcp-project')

# Build circuit with Google-native gates
q0, q1 = cirq.GridQubit(5, 3), cirq.GridQubit(5, 4)

circuit = cirq.Circuit([
    cirq.H(q0),
    cirq.CNOT(q0, q1),
    cirq.measure(q0, q1, key='result')
])

# Optimize for Sycamore gate set
optimized = cirq.optimize_for_target_gateset(
    circuit,
    gateset=cg.SycamoreGateset()
)

# Submit (requires engine access)
# results = engine.run(
#     program=optimized,
#     processor_id=processor_id,
#     repetitions=4096
# )
# print(results.histogram(key='result'))

# Alternative: use noisy simulator
noise_model = cirq.ConstantQubitNoiseModel(
    qubit_noise_gate=cirq.DepolarizingChannel(p=0.005)
)
noisy_sim = cirq.DensityMatrixSimulator(noise=noise_model)
result = noisy_sim.run(circuit, repetitions=4096)
print(result.histogram(key='result'))
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml

# PennyLane accesses hardware through plugins

# IBM Quantum via pennylane-qiskit
dev_ibm = qml.device(
    "qiskit.ibmq",
    wires=2,
    backend="ibm_brisbane",
    shots=4096
)

# Amazon Braket (IonQ, Rigetti, etc.)
# dev_braket = qml.device(
#     "braket.aws.qubit",
#     device_arn="arn:aws:braket:us-east-1::device/qpu/ionq/Aria-1",
#     wires=2,
#     shots=4096
# )

@qml.qnode(dev_ibm)
def bell_hardware():
    qml.Hadamard(wires=0)
    qml.CNOT(wires=[0, 1])
    return qml.counts()

# PennyLane handles transpilation via the plugin
result = bell_hardware()
print(result)
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program, get_qc
from pyquil.gates import H, CNOT, MEASURE
from pyquil.quilbase import Declare

# Connect to Rigetti QCS
# qc = get_qc('Ankaa-3')  # Real hardware
qc = get_qc('2q-qvm')     # Local simulator

p = Program()
ro = p.declare('ro', 'BIT', 2)
p += H(0)
p += CNOT(0, 1)
p += MEASURE(0, ro[0])
p += MEASURE(1, ro[1])
p.wrap_in_numshots_loop(4096)

# Quilc compiles to native gate set
executable = qc.compile(p)
results = qc.run(executable)
bitstrings = results.get_register_map()['ro']

# Count results
from collections import Counter
counts = Counter(map(tuple, bitstrings))
print(counts)
```
:::

::::

## Transpilation

Transpilation converts your abstract circuit into one that runs on specific hardware. The transpiler performs:

1. **Gate decomposition**: Replace abstract gates with the hardware's native gate set
2. **Routing**: Map logical qubits to physical qubits, inserting SWAP gates for non-adjacent interactions
3. **Optimization**: Cancel redundant gates, merge rotations, reduce depth

```{warning}
Transpilation can dramatically increase circuit depth. A 2-qubit circuit that is 5 gates deep may become 20+ gates deep after routing on hardware with limited connectivity. Always check the transpiled circuit depth and compare it to the device's coherence time.
```

## Error Mitigation

Error correction requires too many qubits for current hardware. **Error mitigation** techniques reduce the impact of noise without full correction:

| Technique | What It Does | Overhead |
|---|---|---|
| Measurement error mitigation | Corrects readout errors using calibration matrix | $2^n$ calibration circuits |
| Zero-noise extrapolation (ZNE) | Runs at multiple noise levels, extrapolates to zero | 3-5x more circuits |
| Probabilistic error cancellation (PEC) | Inverts noise channel probabilistically | Exponential sampling overhead |
| Twirling | Converts coherent errors to stochastic | Moderate circuit overhead |
| Dynamical decoupling | Inserts identity-equivalent pulse sequences | Extends circuit time |

```{important}
Error mitigation is not error correction. Mitigation techniques reduce bias in expectation values but increase variance (require more shots). They work well for estimating expectation values (VQE, QAOA) but not for algorithms that require exact measurement outcomes (Shor).
```

## Interpreting Hardware Results

Real hardware results will show noise as additional measurement outcomes. For a Bell state:

| Outcome | Simulator | Hardware (typical) |
|---|---|---|
| 00 | 50.0% | 47.5% |
| 01 | 0.0% | 1.2% |
| 10 | 0.0% | 1.3% |
| 11 | 50.0% | 50.0% |

The spurious 01 and 10 outcomes come from gate errors, measurement errors, and decoherence. The fidelity of the result can be quantified by comparing the measured distribution to the ideal distribution using metrics like the Hellinger fidelity or total variation distance.

## Cost and Queue Times

| Provider | Free Tier | Queue Time | Cost (paid) |
|---|---|---|---|
| IBM Quantum | 10 min/month on real hardware | Minutes to hours | Pay-per-shot |
| Google Quantum AI | Research access only | N/A | N/A |
| Amazon Braket | Free tier credits | Minutes | Per-task + per-shot |
| Rigetti QCS | Limited free access | Minutes | Per-shot |

## Further Reading

- IBM Quantum documentation: [docs.quantum.ibm.com](https://docs.quantum.ibm.com/)
- Google Cirq hardware guide: [quantumai.google/cirq/google/concepts](https://quantumai.google/cirq/google/concepts)
- Amazon Braket documentation: [docs.aws.amazon.com/braket](https://docs.aws.amazon.com/braket/)
- Rigetti QCS documentation: [docs.rigetti.com](https://docs.rigetti.com/)
- Kandala, A. et al. "Error mitigation extends the computational reach of a noisy quantum processor." *Nature* 567, 491-495 (2019).
