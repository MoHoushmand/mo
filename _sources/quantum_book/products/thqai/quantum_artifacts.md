# Quantum Artifacts

> AI-generated quantum circuits, algorithms, and applications. Natural language to quantum circuit compilation.

## What Are Quantum Artifacts?

A quantum artifact is a complete, executable quantum computing object generated from a high-level specification:

- **Quantum circuits**: Gate sequences implementing specific algorithms
- **Parameterized ansatze**: Variational circuits for optimization/ML
- **Error correction codes**: Stabilizer codes for specific noise models
- **Pulse schedules**: Hardware-level control sequences for specific backends

## Architecture

THQAI's artifact generation pipeline:

```
Natural Language Prompt
        │
        ▼
┌────────────────┐
│  LLM Planner   │  Decompose intent into quantum primitives
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ Circuit Synth.  │  Map primitives to gates for target framework
└───────┬────────┘
        │
        ▼
┌────────────────┐
│  Verifier      │  Simulate and check correctness
└───────┬────────┘
        │
        ▼
  Executable circuit (Qiskit / Cirq / PennyLane / PyQuil)
```

## Example Generation

**Prompt**: "Create a 3-qubit GHZ state and measure in the X basis"

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(3, 3)

# Create GHZ state: |000> + |111>
qc.h(0)
qc.cx(0, 1)
qc.cx(1, 2)

# Rotate to X basis before measurement
qc.h(0)
qc.h(1)
qc.h(2)

qc.measure([0, 1, 2], [0, 1, 2])
```
:::
:::{tab-item} Cirq
```python
import cirq

q0, q1, q2 = cirq.LineQubit.range(3)

circuit = cirq.Circuit([
    cirq.H(q0),
    cirq.CNOT(q0, q1),
    cirq.CNOT(q1, q2),
    # X-basis measurement = H then Z-measurement
    cirq.H(q0), cirq.H(q1), cirq.H(q2),
    cirq.measure(q0, q1, q2, key='result')
])
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml

dev = qml.device("default.qubit", wires=3, shots=1000)

@qml.qnode(dev)
def ghz_x_basis():
    # GHZ state
    qml.Hadamard(wires=0)
    qml.CNOT(wires=[0, 1])
    qml.CNOT(wires=[1, 2])
    # X-basis measurement
    return [qml.expval(qml.PauliX(i)) for i in range(3)]
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CNOT, MEASURE
from pyquil.quilbase import Declare

p = Program()
ro = p.declare('ro', 'BIT', 3)

# GHZ state
p += H(0)
p += CNOT(0, 1)
p += CNOT(1, 2)

# X-basis measurement
p += H(0)
p += H(1)
p += H(2)

p += MEASURE(0, ro[0])
p += MEASURE(1, ro[1])
p += MEASURE(2, ro[2])
```
:::
::::

## Verification Pipeline

Generated artifacts are verified through:

1. **Simulation**: Run on a statevector simulator, check output state/distribution
2. **Equivalence checking**: Compare against a reference implementation using fidelity
3. **Resource analysis**: Count gates, depth, ancilla qubits
4. **Hardware compatibility**: Check against target backend's native gate set and connectivity

## Further Reading

- {doc}`/quantum_book/foundations/qc/frameworks` -- The frameworks THQAI generates code for
- {doc}`/quantum_book/foundations/qc/fw_circuits` -- Cross-framework circuit implementations
