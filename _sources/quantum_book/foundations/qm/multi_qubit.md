# Multi-Qubit Systems

> Tensor products, CNOT, entangling gates, and the exponential growth of Hilbert space. Bell state preparation circuits.

Single-qubit gates alone cannot produce entanglement or provide a quantum computational advantage. Multi-qubit gates, combined with single-qubit rotations, complete the universal gate set and unlock the full power of quantum computing.

## Tensor Products

The state space of $n$ qubits is the tensor product of individual qubit spaces:

$$\mathcal{H} = \underbrace{\mathbb{C}^2 \otimes \mathbb{C}^2 \otimes \cdots \otimes \mathbb{C}^2}_{n} = \mathbb{C}^{2^n}$$

For two qubits in states $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ and $|\phi\rangle = \gamma|0\rangle + \delta|1\rangle$:

$$|\psi\rangle \otimes |\phi\rangle = \alpha\gamma|00\rangle + \alpha\delta|01\rangle + \beta\gamma|10\rangle + \beta\delta|11\rangle$$

### Exponential Growth

| Qubits ($n$) | Dimension ($2^n$) | Complex amplitudes |
|:---:|:---:|:---:|
| 1 | 2 | 2 |
| 2 | 4 | 4 |
| 10 | 1,024 | 1,024 |
| 20 | $\sim 10^6$ | $\sim 10^6$ |
| 50 | $\sim 10^{15}$ | $\sim 10^{15}$ |
| 300 | $\sim 10^{90}$ | More than atoms in the universe |

This exponential scaling is why classical simulation of quantum computers is intractable for large $n$, and why quantum computers are potentially powerful.

## The CNOT Gate

The **controlled-NOT** (CNOT) gate is the standard two-qubit entangling gate. It flips the target qubit if and only if the control qubit is $|1\rangle$:

$$\text{CNOT} = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 1 & 0 \end{pmatrix}$$

Action on computational basis states:

$$|00\rangle \mapsto |00\rangle, \quad |01\rangle \mapsto |01\rangle, \quad |10\rangle \mapsto |11\rangle, \quad |11\rangle \mapsto |10\rangle$$

In compact notation: $\text{CNOT}|a, b\rangle = |a, a \oplus b\rangle$ where $\oplus$ is addition modulo 2.

```{admonition} CNOT Creates Entanglement
:class: important
The CNOT gate is not entangling by itself on computational basis states (it maps product states to product states). It creates entanglement when the control qubit is in a superposition. For example: $\text{CNOT}(|+\rangle|0\rangle) = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle) = |\Phi^+\rangle$. This is a Bell state and maximally entangled.
```

## Bell State Preparation

The four Bell states are prepared by applying Hadamard + CNOT to different input states:

| Input | Circuit | Output Bell State |
|---|---|---|
| $\|00\rangle$ | $H \otimes I$ then CNOT | $\|\Phi^+\rangle = \frac{1}{\sqrt{2}}(\|00\rangle + \|11\rangle)$ |
| $\|10\rangle$ | $H \otimes I$ then CNOT | $\|\Phi^-\rangle = \frac{1}{\sqrt{2}}(\|00\rangle - \|11\rangle)$ |
| $\|01\rangle$ | $H \otimes I$ then CNOT | $\|\Psi^+\rangle = \frac{1}{\sqrt{2}}(\|01\rangle + \|10\rangle)$ |
| $\|11\rangle$ | $H \otimes I$ then CNOT | $\|\Psi^-\rangle = \frac{1}{\sqrt{2}}(\|01\rangle - \|10\rangle)$ |

Step by step for $|00\rangle \to |\Phi^+\rangle$:

$$|00\rangle \xrightarrow{H \otimes I} \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)|0\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |10\rangle)$$

$$\xrightarrow{\text{CNOT}} \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle) = |\Phi^+\rangle$$

## Other Two-Qubit Gates

### CZ (Controlled-Z)

Applies a $Z$ gate to the target when the control is $|1\rangle$:

$$\text{CZ} = \begin{pmatrix} 1&0&0&0 \\ 0&1&0&0 \\ 0&0&1&0 \\ 0&0&0&-1 \end{pmatrix}$$

CZ is symmetric: it does not matter which qubit is control and which is target. It is the native entangling gate on many superconducting platforms.

### SWAP

Exchanges the states of two qubits:

$$\text{SWAP}|a,b\rangle = |b,a\rangle$$

SWAP can be decomposed into three CNOTs: $\text{SWAP} = \text{CNOT}_{12} \cdot \text{CNOT}_{21} \cdot \text{CNOT}_{12}$.

### iSWAP

$$\text{iSWAP} = \begin{pmatrix} 1&0&0&0 \\ 0&0&i&0 \\ 0&i&0&0 \\ 0&0&0&1 \end{pmatrix}$$

Native to some superconducting architectures (Google Sycamore). Swaps and adds a phase.

## Universality

```{admonition} Universal Gate Set
:class: note
Any single-qubit gate set that is universal for SU(2), combined with any entangling two-qubit gate (CNOT, CZ, iSWAP, etc.), forms a **universal gate set** for quantum computation. This means any $n$-qubit unitary can be decomposed into a sequence of single-qubit and two-qubit gates from this set.
```

The standard universal gate set is $\{H, T, \text{CNOT}\}$:

- $H$ and $T$ generate all single-qubit unitaries (approximately)
- CNOT provides entanglement
- Together, they can approximate any unitary on $n$ qubits

## Multi-Qubit Operators

Operators on composite systems are built from tensor products:

$$X \otimes Z = \begin{pmatrix} 0&0&1&0 \\ 0&0&0&-1 \\ 1&0&0&0 \\ 0&-1&0&0 \end{pmatrix}$$

This applies $X$ to the first qubit and $Z$ to the second qubit simultaneously. Independent single-qubit operations are always tensor products; entangling operations are not.

### Controlled Operations

Any single-qubit gate $U$ can be made into a controlled gate:

$$C\text{-}U = |0\rangle\langle 0| \otimes I + |1\rangle\langle 1| \otimes U$$

This applies $U$ to the target qubit only when the control qubit is $|1\rangle$. Controlled gates are the primary mechanism for creating conditional quantum logic.

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

# Create Bell state |Phi+>
qc = QuantumCircuit(2)
qc.h(0)       # Hadamard on qubit 0
qc.cx(0, 1)   # CNOT with control=0, target=1

sv = Statevector.from_instruction(qc)
print("Bell state:", sv)
# Output: [0.707+0j, 0, 0, 0.707+0j]

# Create GHZ state |000> + |111> for 3 qubits
ghz = QuantumCircuit(3)
ghz.h(0)
ghz.cx(0, 1)
ghz.cx(0, 2)

sv_ghz = Statevector.from_instruction(ghz)
print("GHZ state:", sv_ghz)
```
:::
:::{tab-item} Cirq
```python
import cirq

q0, q1 = cirq.LineQubit.range(2)

# Bell state circuit
bell_circuit = cirq.Circuit([
    cirq.H(q0),
    cirq.CNOT(q0, q1),
])
print(bell_circuit)

# Simulate
sim = cirq.Simulator()
result = sim.simulate(bell_circuit)
print("Bell state:", result.final_state_vector)

# GHZ state
q0, q1, q2 = cirq.LineQubit.range(3)
ghz_circuit = cirq.Circuit([
    cirq.H(q0),
    cirq.CNOT(q0, q1),
    cirq.CNOT(q0, q2),
])
result_ghz = sim.simulate(ghz_circuit)
print("GHZ state:", result_ghz.final_state_vector)
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
import numpy as np

dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def bell_state():
    qml.Hadamard(wires=0)
    qml.CNOT(wires=[0, 1])
    return qml.state()

state = bell_state()
print("Bell state:", state)
# Output: [0.707, 0, 0, 0.707]

# GHZ state
dev3 = qml.device("default.qubit", wires=3)

@qml.qnode(dev3)
def ghz_state():
    qml.Hadamard(wires=0)
    qml.CNOT(wires=[0, 1])
    qml.CNOT(wires=[0, 2])
    return qml.state()

print("GHZ state:", ghz_state())
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CNOT, MEASURE
from pyquil.quilbase import DefGate

# Bell state
bell = Program()
bell += H(0)
bell += CNOT(0, 1)
print("Bell circuit:")
print(bell)

# GHZ state
ghz = Program()
ghz += H(0)
ghz += CNOT(0, 1)
ghz += CNOT(0, 2)
print("GHZ circuit:")
print(ghz)
```
:::
::::

## The GHZ State

The Greenberger-Horne-Zeilinger (GHZ) state generalizes the Bell state to $n$ qubits:

$$|\text{GHZ}\rangle = \frac{1}{\sqrt{2}}(|00\cdots0\rangle + |11\cdots1\rangle)$$

It is prepared by applying $H$ to the first qubit, then CNOT from the first qubit to every other qubit. The GHZ state exhibits maximal $n$-partite entanglement and violates multi-party Bell inequalities.

## Further Reading

- Nielsen, M. A. & Chuang, I. L. (2010). *Quantum Computation and Quantum Information*, Sections 4.3-4.5.
- Barenco, A. et al. (1995). "Elementary gates for quantum computation." *Physical Review A*, 52(5), 3457-3467.
- Greenberger, D. M., Horne, M. A., & Zeilinger, A. (1989). "Going beyond Bell's Theorem." In *Bell's Theorem, Quantum Theory, and Conceptions of the Universe*, pp. 69-72. Springer.
