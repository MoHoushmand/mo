# The Gate Model of Quantum Computing

> Universal quantum gates, circuit depth and width, the Solovay-Kitaev theorem, and how gate-based quantum computers process information.

The gate model is the dominant paradigm for quantum computation, analogous to the Boolean circuit model in classical computing. A quantum computation consists of preparing qubits in an initial state, applying a sequence of quantum gates (unitary transformations), and measuring the output. Any quantum algorithm can be decomposed into a circuit of gates drawn from a finite universal gate set.

## Single-Qubit Gates

A single-qubit gate is a $2 \times 2$ unitary matrix acting on the state space $\mathbb{C}^2$. The most important single-qubit gates:

**Pauli gates** form a basis for all single-qubit operations:

$$X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \quad Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

$X$ is the quantum NOT gate (bit flip). $Z$ flips the phase of $|1\rangle$. $Y = iXZ$.

**Hadamard gate** creates superposition:

$$H = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$$

$H|0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$, and $H|1\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)$.

**Phase gates**:

$$S = \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}, \quad T = \begin{pmatrix} 1 & 0 \\ 0 & e^{i\pi/4} \end{pmatrix}$$

The $T$ gate (also called $\pi/8$ gate) is critical for universality.

**Rotation gates** parameterize continuous rotations around the Bloch sphere axes:

$$R_x(\theta) = e^{-i\theta X/2}, \quad R_y(\theta) = e^{-i\theta Y/2}, \quad R_z(\theta) = e^{-i\theta Z/2}$$

## Two-Qubit Gates

**CNOT (Controlled-NOT)**: The most important two-qubit gate. Flips the target qubit if the control qubit is $|1\rangle$:

$$\text{CNOT} = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 1 & 0 \end{pmatrix}$$

CNOT creates entanglement: $\text{CNOT}(H \otimes I)|00\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$.

**CZ (Controlled-Z)**: Applies a phase flip to $|11\rangle$. Symmetric between control and target.

**SWAP**: Exchanges two qubits. Decomposable into three CNOTs.

```{admonition} Native Gates
:class: tip
Real quantum hardware implements only a small set of native gates. Superconducting qubits (IBM, Google) typically support $\sqrt{X}$, $R_z$, and a two-qubit entangling gate (CNOT or $\sqrt{\text{iSWAP}}$). Trapped-ion systems (Quantinuum, IonQ) use the $XX$ (Molmer-Sorensen) gate. The compiler (transpiler) converts your abstract circuit into native gates for the target hardware.
```

## Universal Gate Sets

A gate set is **universal** if any unitary operation on $n$ qubits can be approximated to arbitrary precision using gates from the set.

| Universal Gate Set | Components | Notes |
|---|---|---|
| Clifford + T | $\{H, S, \text{CNOT}, T\}$ | Standard for fault-tolerant QC |
| Rotation-based | $\{R_y, R_z, \text{CNOT}\}$ | Common in variational algorithms |
| IBM native | $\{\sqrt{X}, R_z, \text{CNOT}\}$ | IBM hardware native set |
| Google native | $\{\sqrt{X}, R_z, \sqrt{\text{iSWAP}}\}$ | Google Sycamore native set |

The Clifford gates alone ($H$, $S$, CNOT) are not universal; they can be efficiently simulated classically by the Gottesman-Knill theorem. Adding the $T$ gate breaks this classical simulability and achieves universality.

## The Solovay-Kitaev Theorem

Given a universal gate set $\mathcal{G}$ that generates a dense subgroup of $SU(2)$, any single-qubit unitary $U$ can be approximated to precision $\epsilon$ using a sequence of $O(\log^c(1/\epsilon))$ gates from $\mathcal{G}$, where $c \approx 3.97$ (improved to $c \approx 1.44$ with more recent algorithms).

This theorem is why a finite discrete gate set suffices for universal quantum computation. In practice, approximating arbitrary rotations using the Clifford+T set is called **T-gate synthesis**, and the number of T gates required dominates the cost of fault-tolerant circuits.

```{admonition} Practical Impact
:class: note
The Solovay-Kitaev theorem guarantees that the overhead of working with a discrete gate set is only polylogarithmic. For the Clifford+T set, approximating a rotation to precision $\epsilon$ requires roughly $3\log_2(1/\epsilon)$ T gates. Since T gates are the most expensive gates in fault-tolerant quantum computing (requiring magic state distillation), minimizing T-count is a major area of circuit optimization.
```

## Circuit Depth and Width

- **Width**: The number of qubits in the circuit
- **Depth**: The number of time steps (layers of gates that can execute in parallel)
- **Size**: The total number of gates

Circuit depth is the primary bottleneck on NISQ hardware because each gate layer introduces decoherence. The relationship between depth, error rate, and circuit fidelity:

$$F_{\text{circuit}} \approx (1 - \epsilon_1)^{n_1} \cdot (1 - \epsilon_2)^{n_2}$$

where $\epsilon_1, \epsilon_2$ are single- and two-qubit error rates and $n_1, n_2$ are the respective gate counts.

```{tip}
A circuit with 100 CNOT gates at $\epsilon_2 = 10^{-3}$ has fidelity approximately $(1 - 0.001)^{100} \approx 0.90$. At 1000 CNOTs, fidelity drops to $\approx 0.37$. This is why NISQ algorithms are designed to minimize two-qubit gate count.
```

## Gate Implementations Across Frameworks

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(2)
qc.h(0)           # Hadamard
qc.t(0)           # T gate
qc.cx(0, 1)       # CNOT
qc.rz(0.5, 1)     # Rz rotation
qc.measure_all()
```
:::

:::{tab-item} Cirq
```python
import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit([
    cirq.H(q0),              # Hadamard
    cirq.T(q0),              # T gate
    cirq.CNOT(q0, q1),       # CNOT
    cirq.rz(0.5)(q1),        # Rz rotation
    cirq.measure(q0, q1, key='result')
])
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml

dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def circuit():
    qml.Hadamard(wires=0)
    qml.T(wires=0)
    qml.CNOT(wires=[0, 1])
    qml.RZ(0.5, wires=1)
    return qml.probs(wires=[0, 1])
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, T, CNOT, RZ

p = Program()
p += H(0)             # Hadamard
p += T(0)             # T gate
p += CNOT(0, 1)       # CNOT
p += RZ(0.5, 1)       # Rz rotation
```
:::

::::

## Further Reading

- Nielsen, M. A. & Chuang, I. L. *Quantum Computation and Quantum Information*, Chapter 4. Cambridge University Press, 2010.
- Dawson, C. M. & Nielsen, M. A. "The Solovay-Kitaev algorithm." *Quantum Information & Computation* 6(1), 81-95 (2006). [arXiv:quant-ph/0505030](https://arxiv.org/abs/quant-ph/0505030)
- Barenco, A. et al. "Elementary gates for quantum computation." *Physical Review A* 52(5), 3457 (1995). [arXiv:quant-ph/9503016](https://arxiv.org/abs/quant-ph/9503016)
