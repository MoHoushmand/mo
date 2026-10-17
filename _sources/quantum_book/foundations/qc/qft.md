# Quantum Fourier Transform

> The quantum analog of the discrete Fourier transform. Circuit construction, complexity analysis, and its role in Shor's algorithm and QPE.

The Quantum Fourier Transform (QFT) is the quantum version of the Discrete Fourier Transform (DFT). It maps computational basis states to their Fourier coefficients using only $O(n^2)$ quantum gates on $n$ qubits, compared to $O(n \cdot 2^n)$ operations for the classical DFT (or $O(2^n \log 2^n)$ for the FFT). The QFT is the central subroutine in Shor's algorithm, quantum phase estimation, and the hidden subgroup problem.

## Definition

The QFT on $N = 2^n$ states is defined by its action on computational basis states:

$$\text{QFT}|j\rangle = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} e^{2\pi i jk/N} |k\rangle$$

In matrix form, the QFT is the $N \times N$ unitary matrix with entries:

$$(\text{QFT})_{jk} = \frac{1}{\sqrt{N}} \omega^{jk}, \quad \omega = e^{2\pi i/N}$$

## Product Representation

The QFT has a useful product representation that leads directly to an efficient circuit. For an $n$-qubit input $|j\rangle = |j_1 j_2 \cdots j_n\rangle$:

$$\text{QFT}|j\rangle = \frac{1}{\sqrt{2^n}} \bigotimes_{l=1}^{n} \left( |0\rangle + e^{2\pi i \cdot 0.j_{n-l+1}\cdots j_n} |1\rangle \right)$$

where $0.j_k j_{k+1} \cdots j_n$ is the binary fraction $j_k/2 + j_{k+1}/4 + \cdots + j_n/2^{n-k+1}$.

This tensor product structure means each output qubit depends on the input qubits through controlled phase rotations, which maps directly to a quantum circuit.

## Circuit Construction

The QFT circuit for $n$ qubits uses:
- $n$ Hadamard gates
- $n(n-1)/2$ controlled phase rotation gates
- A final layer of SWAP gates to reverse the qubit order

The controlled rotation $R_k$ applies a phase of $e^{2\pi i/2^k}$:

$$R_k = \begin{pmatrix} 1 & 0 \\ 0 & e^{2\pi i/2^k} \end{pmatrix}$$

For qubit $j$ (from most significant to least):
1. Apply $H$ to qubit $j$
2. Apply controlled-$R_2$ from qubit $j+1$
3. Apply controlled-$R_3$ from qubit $j+2$
4. Continue through controlled-$R_{n-j}$ from qubit $n-1$

```
q0: ──[H]──[R2]──[R3]──[Rn]──────────────────────×──
             │     │     │                         │
q1: ─────────●────┼─────┼────[H]──[R2]──[Rn-1]──┼──
                   │     │          │     │       │
q2: ──────────────●─────┼──────────●────┼────────┼──
                         │               │       │
...                      │               │       │
qn: ────────────────────●──────────────●────[H]──×──
```

## Complexity

| Metric | QFT | Classical FFT | Classical DFT |
|---|---|---|---|
| Gates/Operations | $O(n^2)$ | $O(N \log N)$ = $O(n \cdot 2^n)$ | $O(N^2) = O(4^n)$ |
| Depth | $O(n^2)$, or $O(n \log n)$ with parallelization | N/A | N/A |
| Space | $n$ qubits | $O(N)$ = $O(2^n)$ classical bits | $O(N)$ |

```{admonition} Exponential Speedup?
:class: note
The QFT appears to give an exponential speedup over the classical FFT, but there is a caveat. The QFT transforms *amplitudes*, which cannot be directly read out. Measuring the output gives a single sample from the Fourier transform. The utility of the QFT comes from how it fits into larger algorithms (like QPE and Shor) where the Fourier-transformed amplitudes encode useful information that can be extracted with high probability.
```

## Approximate QFT

For large $n$, many of the controlled phase gates apply very small rotations ($R_k$ for large $k$). These can be omitted with negligible error. The **approximate QFT** keeps only rotations $R_k$ with $k \leq m$ for some cutoff $m = O(\log n)$, reducing the gate count from $O(n^2)$ to $O(n \log n)$ while maintaining accuracy sufficient for most applications.

## The Inverse QFT

The inverse QFT is simply the Hermitian conjugate: $\text{QFT}^{-1} = \text{QFT}^\dagger$. In circuit terms, reverse the gate order and negate all phase angles. The inverse QFT appears in QPE and Shor's algorithm.

## Implementations

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.circuit.library import QFT
import numpy as np

# Built-in QFT
n = 4
qft = QFT(n)
print(qft.draw())

# Manual QFT construction
def manual_qft(n):
    qc = QuantumCircuit(n)
    for j in range(n):
        qc.h(j)
        for k in range(j + 1, n):
            angle = np.pi / 2**(k - j)
            qc.cp(angle, k, j)
    # Swap qubits for correct ordering
    for i in range(n // 2):
        qc.swap(i, n - 1 - i)
    return qc

qc = manual_qft(4)
print(qc.draw())
```
:::

:::{tab-item} Cirq
```python
import cirq
import numpy as np

def qft_cirq(qubits):
    """Construct QFT circuit on given qubits."""
    n = len(qubits)
    circuit = cirq.Circuit()

    for j in range(n):
        circuit.append(cirq.H(qubits[j]))
        for k in range(j + 1, n):
            angle = np.pi / 2**(k - j)
            circuit.append(cirq.CZPowGate(exponent=angle / np.pi)(qubits[k], qubits[j]))

    # Swap for correct ordering
    for i in range(n // 2):
        circuit.append(cirq.SWAP(qubits[i], qubits[n - 1 - i]))

    return circuit

qubits = cirq.LineQubit.range(4)
print(qft_cirq(qubits))

# Or use built-in
print(cirq.Circuit(cirq.qft(*qubits)))
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml
import numpy as np

n = 4
dev = qml.device("default.qubit", wires=n)

@qml.qnode(dev)
def manual_qft():
    """Manual QFT implementation."""
    # Prepare a test state
    qml.PauliX(wires=0)

    # QFT
    for j in range(n):
        qml.Hadamard(wires=j)
        for k in range(j + 1, n):
            angle = np.pi / 2**(k - j)
            qml.ctrl(qml.PhaseShift, control=k)(angle, wires=j)

    for i in range(n // 2):
        qml.SWAP(wires=[i, n - 1 - i])

    return qml.state()

# Or use built-in QFT
@qml.qnode(dev)
def builtin_qft():
    qml.PauliX(wires=0)
    qml.QFT(wires=range(n))
    return qml.state()

print(np.allclose(manual_qft(), builtin_qft()))  # True
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CPHASE, SWAP
import numpy as np

def qft_pyquil(n):
    p = Program()

    for j in range(n):
        p += H(j)
        for k in range(j + 1, n):
            angle = np.pi / 2**(k - j)
            p += CPHASE(angle, k, j)

    # Swap for correct ordering
    for i in range(n // 2):
        p += SWAP(i, n - 1 - i)

    return p

program = qft_pyquil(4)
print(program)
```
:::

::::

## Further Reading

- Coppersmith, D. "An approximate Fourier transform useful in quantum computing." IBM Research Report RC19642 (1994). [arXiv:quant-ph/0201067](https://arxiv.org/abs/quant-ph/0201067)
- Nielsen, M. A. & Chuang, I. L. *Quantum Computation and Quantum Information*, Section 5.1. Cambridge University Press, 2010.
- Hales, L. & Hallgren, S. "An improved quantum Fourier transform algorithm and applications." *Proceedings of FOCS*, 515-525 (2000).
