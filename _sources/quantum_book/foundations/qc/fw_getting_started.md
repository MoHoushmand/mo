# Getting Started with Frameworks

> Installation, environment setup, and your first quantum circuit in each of the four frameworks.

This chapter walks through installing each framework, running a first circuit (a Bell state), and verifying the output. All four frameworks are Python packages that install with pip. We recommend using a virtual environment to avoid dependency conflicts.

## Prerequisites

- Python 3.9 or later
- pip (latest version)
- A virtual environment (venv, conda, or micromamba)

```{tip}
Create a dedicated environment for quantum development. Some frameworks have conflicting dependencies (particularly NumPy version constraints). A virtual environment keeps things clean.
```

## Installation and First Circuit

::::{tab-set}

:::{tab-item} Qiskit
**Installation**:
```bash
pip install 'qiskit[visualization]'
pip install qiskit-aer            # High-performance simulator
pip install qiskit-ibm-runtime    # IBM Quantum hardware access
```

**Version check**:
```python
import qiskit
print(qiskit.__version__)  # 1.x
```

**First circuit (Bell state)**:
```python
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# Build circuit
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

print(qc.draw())

# Run on simulator
sampler = StatevectorSampler()
job = sampler.run([qc], shots=1024)
result = job.result()
print(result[0].data.c.get_counts())
# Expected: {'00': ~512, '11': ~512}
```

**Hardware access**: Create an account at [quantum.ibm.com](https://quantum.ibm.com), copy your API token, and:
```python
from qiskit_ibm_runtime import QiskitRuntimeService
QiskitRuntimeService.save_account(channel="ibm_quantum", token="YOUR_TOKEN")
```
:::

:::{tab-item} Cirq
**Installation**:
```bash
pip install cirq
```

**Version check**:
```python
import cirq
print(cirq.__version__)
```

**First circuit (Bell state)**:
```python
import cirq

# Define qubits
q0, q1 = cirq.LineQubit.range(2)

# Build circuit
circuit = cirq.Circuit([
    cirq.H(q0),
    cirq.CNOT(q0, q1),
    cirq.measure(q0, q1, key='result')
])

print(circuit)

# Run on simulator
simulator = cirq.Simulator()
result = simulator.run(circuit, repetitions=1024)
print(result.histogram(key='result'))
# Expected: Counter({0: ~512, 3: ~512})
# 0 = |00>, 3 = |11> in binary
```

**Hardware access**: Google Quantum AI access requires application through [quantumai.google](https://quantumai.google/). Access is currently limited to research partnerships.
:::

:::{tab-item} PennyLane
**Installation**:
```bash
pip install pennylane
pip install pennylane-qiskit    # Optional: Qiskit backend
pip install pennylane-cirq      # Optional: Cirq backend
```

**Version check**:
```python
import pennylane as qml
print(qml.__version__)
```

**First circuit (Bell state)**:
```python
import pennylane as qml
import numpy as np

dev = qml.device("default.qubit", wires=2, shots=1024)

@qml.qnode(dev)
def bell_state():
    qml.Hadamard(wires=0)
    qml.CNOT(wires=[0, 1])
    return qml.counts()

result = bell_state()
print(result)
# Expected: {'00': ~512, '11': ~512}

# Draw the circuit
print(qml.draw(bell_state)())
```

**Hardware access**: PennyLane accesses hardware through plugins. For IBM: `pennylane-qiskit`. For Amazon Braket: `amazon-braket-pennylane-plugin`. For Xanadu's photonic hardware: `pennylane-strawberryfields`.
:::

:::{tab-item} PyQuil
**Installation**:
```bash
pip install pyquil
# The QVM (simulator) and Quilc (compiler) run as separate services:
# Option 1: Docker
docker run -d -p 5555:5555 rigetti/quilc
docker run -d -p 5000:5000 rigetti/qvm
# Option 2: Install locally from github.com/quil-lang
```

**Version check**:
```python
import pyquil
print(pyquil.__version__)
```

**First circuit (Bell state)**:
```python
from pyquil import Program, get_qc
from pyquil.gates import H, CNOT, MEASURE
from pyquil.quilbase import Declare

p = Program()
ro = p.declare('ro', 'BIT', 2)
p += H(0)
p += CNOT(0, 1)
p += MEASURE(0, ro[0])
p += MEASURE(1, ro[1])
p.wrap_in_numshots_loop(1024)

print(p)

# Run on QVM (requires QVM server running)
# qc = get_qc('2q-qvm')
# executable = qc.compile(p)
# results = qc.run(executable).get_register_map()['ro']
# print(results)
```

**Hardware access**: Rigetti Quantum Cloud Services (QCS) at [qcs.rigetti.com](https://qcs.rigetti.com/). Requires account and reservation.
:::

::::

## Verifying Your Installation

Run this verification script to confirm everything works:

```python
# Test all installed frameworks
frameworks = {}

try:
    import qiskit
    frameworks['Qiskit'] = qiskit.__version__
except ImportError:
    pass

try:
    import cirq
    frameworks['Cirq'] = cirq.__version__
except ImportError:
    pass

try:
    import pennylane as qml
    frameworks['PennyLane'] = qml.__version__
except ImportError:
    pass

try:
    import pyquil
    frameworks['PyQuil'] = pyquil.__version__
except ImportError:
    pass

for name, version in frameworks.items():
    print(f"{name}: v{version}")
```

## Key Differences to Note

| Concept | Qiskit | Cirq | PennyLane | PyQuil |
|---|---|---|---|---|
| Qubit naming | Integer index | `LineQubit`, `GridQubit` | Wire index | Integer index |
| Circuit object | `QuantumCircuit` | `Circuit` | `@qml.qnode` function | `Program` |
| Measurement | `.measure()` | `cirq.measure()` | `qml.counts()`, `qml.probs()` | `MEASURE` |
| Classical bits | Explicit classical register | Measurement key string | Return value type | Declared memory |
| Execution | `Sampler.run()` | `Simulator.run()` | Call the QNode | `QC.run()` |

```{warning}
**Qubit ordering**: Qiskit uses little-endian convention (qubit 0 is least significant). Cirq, PennyLane, and PyQuil use big-endian. When comparing output state vectors or measurement results across frameworks, account for this difference.
```

## Further Reading

- Qiskit Getting Started: [docs.quantum.ibm.com/start](https://docs.quantum.ibm.com/start)
- Cirq tutorials: [quantumai.google/cirq/tutorials](https://quantumai.google/cirq/tutorials)
- PennyLane demos: [pennylane.ai/qml/demos](https://pennylane.ai/qml/demos)
- PyQuil Getting Started: [pyquil-docs.rigetti.com/en/stable/start](https://pyquil-docs.rigetti.com/en/stable/start)
