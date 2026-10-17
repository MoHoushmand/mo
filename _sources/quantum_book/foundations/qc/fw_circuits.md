# Building Circuits Across Frameworks

> Implementing the same circuit (Bell state, GHZ state, Bernstein-Vazirani) in all four frameworks for direct comparison.

The best way to learn multiple quantum frameworks is to implement the same circuit in each one. This chapter builds three progressively complex circuits across all four frameworks, highlighting the syntactic differences while reinforcing the shared quantum concepts.

## Circuit 1: Bell State

The Bell state $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$ is the simplest entangled state. Two gates: Hadamard and CNOT.

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)

state = Statevector.from_instruction(qc)
print(state)  # [0.707+0j, 0, 0, 0.707+0j]
```
:::

:::{tab-item} Cirq
```python
import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit([cirq.H(q0), cirq.CNOT(q0, q1)])

result = cirq.Simulator().simulate(circuit)
print(result.final_state_vector)
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml

dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def bell():
    qml.Hadamard(wires=0)
    qml.CNOT(wires=[0, 1])
    return qml.state()

print(bell())
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CNOT
from pyquil.api import WavefunctionSimulator

p = Program(H(0), CNOT(0, 1))
# With WavefunctionSimulator:
# wf = WavefunctionSimulator().wavefunction(p)
# print(wf.amplitudes)
```
:::

::::

## Circuit 2: GHZ State

The GHZ state $|GHZ_n\rangle = \frac{1}{\sqrt{2}}(|0\rangle^{\otimes n} + |1\rangle^{\otimes n})$ generalizes the Bell state to $n$ qubits. It is maximally entangled: measuring any single qubit in the computational basis collapses all others.

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

def ghz_circuit(n):
    qc = QuantumCircuit(n, n)
    qc.h(0)
    for i in range(1, n):
        qc.cx(0, i)
    qc.measure(range(n), range(n))
    return qc

qc = ghz_circuit(5)
print(qc.draw())

sampler = StatevectorSampler()
result = sampler.run([qc], shots=1024).result()
counts = result[0].data.c.get_counts()
print(counts)  # {'00000': ~512, '11111': ~512}
```
:::

:::{tab-item} Cirq
```python
import cirq

def ghz_cirq(n):
    qubits = cirq.LineQubit.range(n)
    circuit = cirq.Circuit()
    circuit.append(cirq.H(qubits[0]))
    for i in range(1, n):
        circuit.append(cirq.CNOT(qubits[0], qubits[i]))
    circuit.append(cirq.measure(*qubits, key='result'))
    return circuit

circuit = ghz_cirq(5)
result = cirq.Simulator().run(circuit, repetitions=1024)
print(result.histogram(key='result'))
# {0: ~512, 31: ~512}  (31 = 11111 in binary)
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml

n = 5
dev = qml.device("default.qubit", wires=n, shots=1024)

@qml.qnode(dev)
def ghz():
    qml.Hadamard(wires=0)
    for i in range(1, n):
        qml.CNOT(wires=[0, i])
    return qml.counts()

print(ghz())
# {'00000': ~512, '11111': ~512}
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CNOT, MEASURE
from pyquil.quilbase import Declare

def ghz_pyquil(n):
    p = Program()
    ro = p.declare('ro', 'BIT', n)
    p += H(0)
    for i in range(1, n):
        p += CNOT(0, i)
    for i in range(n):
        p += MEASURE(i, ro[i])
    p.wrap_in_numshots_loop(1024)
    return p

print(ghz_pyquil(5))
```
:::

::::

```{admonition} GHZ vs. W State
:class: note
The GHZ state and the W state ($|W_3\rangle = \frac{1}{\sqrt{3}}(|001\rangle + |010\rangle + |100\rangle)$) are both maximally entangled, but they belong to different entanglement classes. Tracing out one qubit from a GHZ state yields a separable mixed state; tracing out one qubit from a W state yields a partially entangled state. The GHZ state is fragile (losing one qubit destroys all entanglement), while the W state is robust.
```

## Circuit 3: Bernstein-Vazirani

The Bernstein-Vazirani algorithm finds a hidden bitstring $s$ encoded in an oracle $f(x) = s \cdot x \pmod{2}$ using a single query. Classically, finding an $n$-bit string requires $n$ queries.

For $s = 101$ (decimal 5, 3 qubits):

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

def bernstein_vazirani(secret):
    n = len(secret)
    qc = QuantumCircuit(n + 1, n)

    # Ancilla in |->
    qc.x(n)
    qc.h(range(n + 1))

    # Oracle: CNOT from each qubit where s_i = 1
    for i, bit in enumerate(reversed(secret)):
        if bit == '1':
            qc.cx(i, n)

    # Hadamard on input qubits
    qc.h(range(n))
    qc.measure(range(n), range(n))
    return qc

qc = bernstein_vazirani('101')
print(qc.draw())

sampler = StatevectorSampler()
result = sampler.run([qc], shots=1024).result()
print(result[0].data.c.get_counts())
# {'101': 1024} -- deterministic!
```
:::

:::{tab-item} Cirq
```python
import cirq

def bernstein_vazirani_cirq(secret):
    n = len(secret)
    qubits = cirq.LineQubit.range(n + 1)
    ancilla = qubits[-1]
    circuit = cirq.Circuit()

    circuit.append(cirq.X(ancilla))
    circuit.append(cirq.H.on_each(*qubits))

    for i, bit in enumerate(reversed(secret)):
        if bit == '1':
            circuit.append(cirq.CNOT(qubits[i], ancilla))

    circuit.append(cirq.H.on_each(*qubits[:-1]))
    circuit.append(cirq.measure(*qubits[:-1], key='result'))
    return circuit

result = cirq.Simulator().run(
    bernstein_vazirani_cirq('101'), repetitions=10
)
print(result.histogram(key='result'))
# {5: 10}  (5 = 101 in binary)
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml

secret = '101'
n = len(secret)
dev = qml.device("default.qubit", wires=n + 1, shots=10)

@qml.qnode(dev)
def bv():
    qml.PauliX(wires=n)
    for i in range(n + 1):
        qml.Hadamard(wires=i)

    for i, bit in enumerate(reversed(secret)):
        if bit == '1':
            qml.CNOT(wires=[i, n])

    for i in range(n):
        qml.Hadamard(wires=i)

    return qml.counts(wires=range(n))

print(bv())  # {'101': 10}
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, X, CNOT, MEASURE
from pyquil.quilbase import Declare

def bv_pyquil(secret):
    n = len(secret)
    p = Program()
    ro = p.declare('ro', 'BIT', n)

    p += X(n)
    for i in range(n + 1):
        p += H(i)

    for i, bit in enumerate(reversed(secret)):
        if bit == '1':
            p += CNOT(i, n)

    for i in range(n):
        p += H(i)
        p += MEASURE(i, ro[i])

    p.wrap_in_numshots_loop(10)
    return p

print(bv_pyquil('101'))
```
:::

::::

## Pattern Summary

| Concept | Qiskit | Cirq | PennyLane | PyQuil |
|---|---|---|---|---|
| Create H gate | `qc.h(0)` | `cirq.H(q)` | `qml.Hadamard(wires=0)` | `H(0)` |
| Create CNOT | `qc.cx(0, 1)` | `cirq.CNOT(q0, q1)` | `qml.CNOT(wires=[0,1])` | `CNOT(0, 1)` |
| Measure all | `qc.measure_all()` | `cirq.measure(*q, key='m')` | `qml.counts()` | `MEASURE(i, ro[i])` |
| Get statevector | `Statevector.from_instruction` | `sim.simulate()` | `qml.state()` | `WavefunctionSimulator` |
| Get counts | `Sampler.run()` | `sim.run()` | `qml.counts()` | `qc.run()` |

## Further Reading

- Qiskit Circuit Library: [docs.quantum.ibm.com/api/qiskit/circuit_library](https://docs.quantum.ibm.com/api/qiskit/circuit_library)
- Cirq Tutorials: [quantumai.google/cirq/tutorials](https://quantumai.google/cirq/tutorials)
- PennyLane Demos: [pennylane.ai/qml/demos](https://pennylane.ai/qml/demos)
- Bernstein, E. & Vazirani, U. "Quantum complexity theory." *SIAM Journal on Computing* 26(5), 1411-1473 (1997).
