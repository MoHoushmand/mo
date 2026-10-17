# QPE-Based Learning

> Using quantum phase estimation for eigenvalue problems in ML: principal component analysis, recommendation systems.

Quantum phase estimation (QPE) is a fundamental subroutine that extracts eigenvalues of unitary operators. When combined with Hamiltonian simulation, QPE enables quantum algorithms for principal component analysis, recommendation systems, and other eigenvalue-based ML methods with exponential speedups under specific conditions. These algorithms require fault-tolerant quantum computers but represent some of the strongest theoretical results in QML.

## Quantum Phase Estimation

Given a unitary $U$ with eigenvector $|u\rangle$ and eigenvalue $e^{2\pi i \varphi}$, QPE estimates the phase $\varphi$ to $t$ bits of precision.

### Algorithm Steps

1. Prepare $t$ ancilla qubits in $|0\rangle$ and the target register in $|u\rangle$.
2. Apply Hadamard gates to all ancilla qubits.
3. Apply controlled-$U^{2^j}$ from ancilla qubit $j$ to the target register, for $j = 0, 1, \ldots, t-1$.
4. Apply the inverse Quantum Fourier Transform (QFT$^\dagger$) to the ancilla register.
5. Measure the ancilla register to obtain a $t$-bit approximation of $\varphi$.

The output state before measurement is approximately:

$$|\tilde{\varphi}\rangle|u\rangle$$

where $\tilde{\varphi}$ is the $t$-bit binary representation of $\varphi$. The success probability is at least $4/\pi^2 \approx 0.405$ for obtaining the best $t$-bit approximation, and can be boosted to $1 - \epsilon$ with $O(\log(1/\epsilon))$ additional ancilla qubits.

### Complexity

QPE requires $O(2^t)$ applications of controlled-$U$. The precision scales as $|\varphi - \tilde{\varphi}| \leq 2^{-t}$. When $U = e^{-iHt}$ for a Hamiltonian $H$, the eigenvalues of $H$ are extracted as phases.

## Quantum PCA

Classical PCA computes the eigendecomposition of the covariance matrix $\Sigma = \frac{1}{N}\sum_i \mathbf{x}_i \mathbf{x}_i^T$ and projects data onto the top eigenvectors. For a $d \times d$ covariance matrix, classical eigendecomposition costs $O(d^3)$.

### Quantum Algorithm (Lloyd, Mohseni, Rebentrost 2014)

Quantum PCA achieves an exponential speedup under specific conditions:

1. **Input**: Multiple copies of the quantum state $\rho = \sum_i \lambda_i |\lambda_i\rangle\langle\lambda_i|$ (a density matrix encoding the covariance structure).
2. **Density matrix exponentiation**: Use copies of $\rho$ to implement $e^{-i\rho t}$ via swap operations and partial traces.
3. **Phase estimation**: Apply QPE with $U = e^{-i\rho t}$ to extract eigenvalues $\lambda_i$.
4. **Output**: Eigenvalues and corresponding eigenstates.

The runtime is $O(\log d)$ in the matrix dimension, an exponential speedup over the classical $O(d^3)$.

```{warning}
The exponential speedup assumes quantum access to the data (copies of $\rho$ prepared by a quantum process). If the data is classical and must be loaded into quantum states, state preparation requires $O(d)$ operations, which may negate the speedup. This caveat, identified by Tang (2019), led to "dequantized" classical algorithms with similar performance for low-rank data.
```

## Quantum Recommendation Systems

The quantum recommendation system (Kerenidis and Prakash, 2016) uses QPE to perform low-rank matrix reconstruction exponentially faster than classical SVD.

### Problem Setting

Given a sparse preference matrix $A$ (users $\times$ items) with $m$ entries, recommend items to users by approximating $A$ with a low-rank matrix $A_k$ (keeping the top $k$ singular values).

### Quantum Algorithm

1. Prepare quantum states encoding rows of $A$ using QRAM.
2. Apply QPE to extract singular values and vectors.
3. Project onto the top-$k$ subspace.
4. Sample to obtain recommendations.

Runtime: $O(\text{poly}(k) \cdot \text{polylog}(mn))$, compared to $O(mn \cdot k)$ classically.

### Dequantization

Tang (2019) showed that if sampling access to $A$ is available (the ability to sample rows proportional to their norms), a classical algorithm achieves $O(\text{poly}(k) \cdot \text{polylog}(mn))$ runtime as well. This dequantization result demonstrated that the quantum advantage came from the input model (QRAM), not from quantum computation per se.

```{admonition} Lessons from dequantization
:class: important
The dequantization of quantum recommendation systems was a watershed moment for QML. It showed that: (1) quantum speedups must be carefully attributed to quantum computation vs. input model, (2) sampling access can sometimes substitute for quantum superposition, and (3) low-rank structure in the data enables classical algorithms to match quantum performance.
```

## QPE for Kernel Methods

QPE can accelerate kernel methods by enabling efficient computation of kernel matrices for certain structured kernels:

1. **Spectral kernels**: For kernels defined by functions of the eigenvalues of a matrix (e.g., $k(A) = e^{-\beta A}$), QPE extracts the eigenvalues and the function is applied coherently.
2. **Graph kernels**: Kernels based on the spectrum of graph Laplacians can be computed via QPE on the Laplacian unitary.

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit.circuit import QuantumCircuit
from qiskit.circuit.library import QFT
import numpy as np

def qpe_circuit(unitary_gate, n_counting=3, n_target=1):
    """Build a QPE circuit."""
    n_total = n_counting + n_target
    qc = QuantumCircuit(n_total, n_counting)

    # Initialize target in eigenstate (|1> for Z gate example)
    qc.x(n_counting)

    # Hadamard on counting qubits
    for i in range(n_counting):
        qc.h(i)

    # Controlled-U^(2^j)
    for j in range(n_counting):
        power = 2 ** j
        for _ in range(power):
            qc.cp(unitary_gate, j, n_counting)

    # Inverse QFT on counting qubits
    qft_inv = QFT(n_counting, inverse=True)
    qc.append(qft_inv, range(n_counting))

    # Measure counting qubits
    qc.measure(range(n_counting), range(n_counting))
    return qc

# QPE for phase gate with phase pi/4
qc = qpe_circuit(np.pi / 4, n_counting=3)
print(qc)
```
:::
:::{tab-item} Cirq
```python
import cirq
import numpy as np

def qpe_circuit(phase, n_counting=3):
    counting = cirq.LineQubit.range(n_counting)
    target = cirq.LineQubit(n_counting)
    circuit = cirq.Circuit()

    # Target in eigenstate
    circuit.append(cirq.X(target))

    # Hadamard on counting qubits
    circuit.append(cirq.H.on_each(*counting))

    # Controlled phase gates
    for j in range(n_counting):
        power = 2 ** j
        circuit.append(
            cirq.ControlledGate(cirq.ZPowGate(exponent=power * phase / np.pi))
            .on(counting[j], target)
        )

    # Inverse QFT (simplified)
    for i in range(n_counting):
        for j in range(i):
            circuit.append(
                cirq.CZPowGate(exponent=-1/2**(i-j)).on(counting[j], counting[i])
            )
        circuit.append(cirq.H(counting[i]))

    circuit.append(cirq.measure(*counting, key='phase'))
    return circuit

circuit = qpe_circuit(np.pi / 4)
print(circuit)
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np

n_counting = 3
n_total = n_counting + 1
dev = qml.device("default.qubit", wires=n_total)

@qml.qnode(dev)
def qpe(phase):
    target = n_counting  # last wire

    # Target eigenstate
    qml.PauliX(wires=target)

    # Hadamard on counting qubits
    for i in range(n_counting):
        qml.Hadamard(wires=i)

    # Controlled rotations
    for j in range(n_counting):
        power = 2 ** j
        qml.ControlledPhaseShift(power * phase, wires=[j, target])

    # Inverse QFT
    qml.adjoint(qml.QFT)(wires=range(n_counting))

    return qml.probs(wires=range(n_counting))

phase = np.pi / 4  # eigenvalue e^{i*pi/4}
probs = qpe(phase)
estimated = np.argmax(probs) / 2**n_counting
print(f"True phase/(2pi): {phase/(2*np.pi):.4f}")
print(f"Estimated:        {estimated:.4f}")
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, X, CPHASE, MEASURE
import numpy as np

n_counting = 3
target = n_counting

prog = Program()
ro = prog.declare('ro', 'BIT', n_counting)

# Target eigenstate
prog += X(target)

# Hadamard on counting qubits
for i in range(n_counting):
    prog += H(i)

# Controlled phase rotations
phase = np.pi / 4
for j in range(n_counting):
    power = 2 ** j
    prog += CPHASE(power * phase, j, target)

# Simplified inverse QFT
for i in range(n_counting - 1, -1, -1):
    for j in range(i - 1, -1, -1):
        prog += CPHASE(-np.pi / 2**(i-j), j, i)
    prog += H(i)

for i in range(n_counting):
    prog += MEASURE(i, ro[i])

print(prog)
```
:::
::::

## Further Reading

- Lloyd, S., Mohseni, M., and Rebentrost, P. "Quantum principal component analysis." *Nature Physics* 10, 631-633 (2014)
- Kerenidis, I. and Prakash, A. "Quantum recommendation systems." arXiv:1603.08675 (2016)
- Tang, E. "A quantum-inspired classical algorithm for recommendation systems." *STOC 2019*
- Nielsen, M.A. and Chuang, I.L. *Quantum Computation and Quantum Information* (Cambridge, 2010), Section 5.2
