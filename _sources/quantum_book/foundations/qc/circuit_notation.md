# Circuit Notation and Diagrams

> Reading and writing quantum circuit diagrams. Wire conventions, gate symbols, measurement symbols, and controlled operations.

Quantum circuit diagrams are the standard notation for expressing quantum algorithms. They are read left to right (time flows horizontally), with each horizontal wire representing a qubit. Understanding this notation is essential for reading papers, documentation, and framework outputs.

## Wire Conventions

Each qubit is drawn as a horizontal line. The initial state is written on the left (typically $|0\rangle$). Classical bits, when needed, are drawn as double lines.

```
|0> ─────────── qubit wire (single line)

  0 ═══════════ classical bit wire (double line)
```

Multi-qubit registers are stacked vertically. The top wire is conventionally qubit 0. Some references (especially physics literature) place the most significant qubit at the top; others (computer science convention) place the least significant at the top. Always check the convention of each source.

## Single-Qubit Gate Symbols

Single-qubit gates are drawn as labeled boxes on a single wire:

```
|0> ──[H]──[T]──[Rz(theta)]──
```

The most common gate symbols:

| Symbol | Gate | Matrix | Effect |
|---|---|---|---|
| $H$ | Hadamard | $\frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ | Creates equal superposition |
| $X$ | Pauli-X | $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ | Bit flip (NOT) |
| $Z$ | Pauli-Z | $\begin{pmatrix}1&0\\0&-1\end{pmatrix}$ | Phase flip |
| $S$ | Phase | $\begin{pmatrix}1&0\\0&i\end{pmatrix}$ | Quarter-turn phase |
| $T$ | $\pi/8$ | $\begin{pmatrix}1&0\\0&e^{i\pi/4}\end{pmatrix}$ | Eighth-turn phase |
| $R_z(\theta)$ | Z-rotation | $e^{-i\theta Z/2}$ | Rotation around Z axis |

The Pauli-X gate is often drawn as $\oplus$ (a circled plus) when used as the target of a controlled operation.

## Controlled Gates

A controlled gate applies an operation to a target qubit only when the control qubit is $|1\rangle$. The control is drawn as a filled circle connected by a vertical line to the target gate.

**CNOT (Controlled-X)**:
```
q0 ──●──
     │
q1 ──⊕──
```

**CZ (Controlled-Z)**: Symmetric between control and target.
```
q0 ──●──
     │
q1 ──●──
```

**Toffoli (CCX)**: Two controls, one target.
```
q0 ──●──
     │
q1 ──●──
     │
q2 ──⊕──
```

An open circle ($\circ$) indicates a control conditioned on $|0\rangle$ rather than $|1\rangle$.

## Measurement

Measurement is drawn as a meter symbol or a box labeled "M". After measurement, the wire typically becomes classical (double line):

```
q0 ──[H]──[M]══
```

In Dirac notation, measurement in the computational basis projects onto $|0\rangle$ or $|1\rangle$ with probabilities $|\alpha|^2$ and $|\beta|^2$.

```{admonition} Deferred Measurement Principle
:class: note
Any measurement followed by a classically controlled operation can be replaced by a quantum controlled operation followed by measurement at the end. This means you can always push measurements to the end of the circuit without changing the outcome distribution. Most quantum frameworks use this principle internally.
```

## Multi-Qubit Symbols

**SWAP** is drawn as two $\times$ symbols connected by a vertical line:
```
q0 ──×──
     │
q1 ──×──
```

**Barriers** (used in some frameworks) are dashed vertical lines that prevent the transpiler from optimizing across them.

## Reading a Complete Circuit

Consider this Bell state preparation and measurement:

```
q0: ──[H]──●──[M]
            │
q1: ────────⊕──[M]
```

Reading left to right:
1. Apply Hadamard to q0: $|00\rangle \to \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)|0\rangle$
2. Apply CNOT (q0 controls q1): $\to \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$
3. Measure both qubits: get $|00\rangle$ or $|11\rangle$ with equal probability

The total unitary for the two-gate sequence is $\text{CNOT} \cdot (H \otimes I)$. Note that in circuit diagrams, gates are applied left to right, but in matrix multiplication, the rightmost operator acts first: $U_{\text{total}} = U_n \cdots U_2 U_1$.

```{warning}
**Qubit ordering**: Qiskit uses little-endian ordering (qubit 0 is the least significant bit), while most textbooks and other frameworks use big-endian. When comparing results across frameworks, verify the qubit ordering convention.
```

## Drawing Circuits with Frameworks

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

# Text drawing
print(qc.draw())

# Matplotlib drawing (in Jupyter)
qc.draw('mpl')
```
Output:
```
     ┌───┐     ┌─┐
q_0: ┤ H ├──■──┤M├───
     └───┘┌─┴─┐└╥┘┌─┐
q_1: ─────┤ X ├─╫─┤M├
          └───┘ ║ └╥┘
c: 2/═══════════╩══╩═
                0  1
```
:::

:::{tab-item} Cirq
```python
import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit([
    cirq.H(q0),
    cirq.CNOT(q0, q1),
    cirq.measure(q0, q1, key='result')
])
print(circuit)
```
Output:
```
0: ───H───@───M('result')───
          │   │
1: ───────X───M──────────────
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml

dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def bell_circuit():
    qml.Hadamard(wires=0)
    qml.CNOT(wires=[0, 1])
    return qml.probs(wires=[0, 1])

# Draw the circuit
print(qml.draw(bell_circuit)())
```
Output:
```
0: ──H─╭●─┤  Probs
1: ────╰X─┤  Probs
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CNOT, MEASURE
from pyquil.quilbase import Declare

p = Program()
ro = p.declare('ro', 'BIT', 2)
p += H(0)
p += CNOT(0, 1)
p += MEASURE(0, ro[0])
p += MEASURE(1, ro[1])
print(p)
```
Output (Quil text, not graphical):
```
DECLARE ro BIT[2]
H 0
CNOT 0 1
MEASURE 0 ro[0]
MEASURE 1 ro[1]
```
:::

::::

```{tip}
When reading a circuit diagram from a paper, identify four things: (1) the initial state of each qubit, (2) the gate sequence on each wire from left to right, (3) which qubits are entangled by two-qubit gates, and (4) which qubits are measured and in what basis.
```

## Further Reading

- Nielsen, M. A. & Chuang, I. L. *Quantum Computation and Quantum Information*, Section 4.2. Cambridge University Press, 2010.
- Cross, A. W. et al. "Open Quantum Assembly Language." [arXiv:1707.03429](https://arxiv.org/abs/1707.03429)
- Qiskit Textbook: [Basics of Quantum Information](https://learning.quantum.ibm.com/course/basics-of-quantum-information)
