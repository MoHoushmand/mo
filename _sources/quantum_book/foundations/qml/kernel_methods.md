# Kernel Methods in QML

> Quantum feature maps, quantum kernel estimation, and the quantum kernel trick. When quantum kernels offer advantage.

Kernel methods were the dominant paradigm in machine learning before deep learning. They remain relevant because they have strong theoretical foundations, work well on small datasets, and map naturally to quantum computing. A quantum computer can evaluate kernel functions that correspond to inner products in exponentially large Hilbert spaces, potentially accessing feature maps that have no efficient classical description.

## Classical Kernel Methods Review

A kernel function $k(\mathbf{x}_i, \mathbf{x}_j)$ computes the inner product of data points in a (possibly infinite-dimensional) feature space without explicitly computing the feature map:

$$k(\mathbf{x}_i, \mathbf{x}_j) = \langle\phi(\mathbf{x}_i), \phi(\mathbf{x}_j)\rangle_{\mathcal{F}}$$

where $\phi: \mathcal{X} \to \mathcal{F}$ maps data from input space $\mathcal{X}$ to a feature space $\mathcal{F}$. The kernel function must be positive semidefinite (Mercer's condition) for this interpretation to hold.

| Kernel | Formula | Feature Space |
|---|---|---|
| Linear | $\mathbf{x}_i^T \mathbf{x}_j$ | $\mathbb{R}^d$ |
| Polynomial | $(\mathbf{x}_i^T \mathbf{x}_j + c)^p$ | $\mathbb{R}^{\binom{d+p}{p}}$ |
| RBF / Gaussian | $\exp(-\gamma\|\mathbf{x}_i - \mathbf{x}_j\|^2)$ | Infinite-dimensional |

The kernel trick replaces all inner products in a learning algorithm with kernel evaluations. This enables algorithms like SVMs, kernel PCA, and kernel ridge regression to operate implicitly in high-dimensional feature spaces.

## Quantum Feature Maps

A quantum feature map $\phi_Q$ maps classical data $\mathbf{x}$ to a quantum state:

$$\mathbf{x} \mapsto |\phi(\mathbf{x})\rangle = U(\mathbf{x})|0\rangle^{\otimes n}$$

The quantum kernel is the squared overlap between the feature states:

$$k_Q(\mathbf{x}_i, \mathbf{x}_j) = |\langle\phi(\mathbf{x}_i)|\phi(\mathbf{x}_j)\rangle|^2$$

This kernel corresponds to an inner product in the $2^n$-dimensional Hilbert space. For $n$ qubits, the feature space has dimension $2^n$, exponentially larger than the number of qubits.

### Common Quantum Feature Maps

**ZZ Feature Map** (Havlicek et al., 2019):

$$U(\mathbf{x}) = \prod_{\ell=1}^{d} \left[\prod_{i<j} e^{i x_i x_j \sigma_i^z \sigma_j^z} \prod_i e^{i x_i \sigma_i^z}\right] H^{\otimes n}$$

This creates non-linear feature interactions through the $x_i x_j$ terms in the entangling gates.

**IQP (Instantaneous Quantum Polynomial) Feature Map**:

$$U(\mathbf{x}) = \exp\left(i \sum_{S} f_S(\mathbf{x}) \bigotimes_{j \in S} Z_j\right) H^{\otimes n}$$

where $f_S$ are functions of the data and $S$ ranges over subsets of qubits. IQP circuits are believed to be classically hard to simulate, which is a necessary condition for quantum advantage.

## Quantum Kernel Estimation

Computing the quantum kernel $k_Q(\mathbf{x}_i, \mathbf{x}_j)$ requires estimating the overlap $|\langle\phi(\mathbf{x}_i)|\phi(\mathbf{x}_j)\rangle|^2$. Two approaches:

### Compute-Uncompute Method

1. Apply $U(\mathbf{x}_i)$ to prepare $|\phi(\mathbf{x}_i)\rangle$.
2. Apply $U^\dagger(\mathbf{x}_j)$ to "uncompute" $|\phi(\mathbf{x}_j)\rangle$.
3. Measure all qubits. The probability of observing $|0\rangle^{\otimes n}$ is exactly $|\langle\phi(\mathbf{x}_i)|\phi(\mathbf{x}_j)\rangle|^2$.

This requires $O(1/\epsilon^2)$ shots to estimate the kernel to precision $\epsilon$.

### Swap Test

An alternative using an ancilla qubit and controlled-SWAP gates. Less common in practice due to the overhead of controlled operations.

```{admonition} Kernel matrix construction
:class: note
For $M$ training points, the full kernel matrix has $M^2$ entries. Each entry requires running a quantum circuit $O(1/\epsilon^2)$ times. The total cost is $O(M^2/\epsilon^2)$ circuit executions. This can be parallelized across multiple quantum processors.
```

## When Do Quantum Kernels Help?

Not all quantum kernels provide advantage over classical kernels. The conditions for quantum advantage:

1. **Classical intractability of the kernel**: The feature map must be hard to simulate classically. Circuits with sufficient entanglement and non-Clifford gates satisfy this.
2. **Relevance to the learning task**: The quantum kernel must capture structure in the data that classical kernels miss. A classically intractable kernel that is irrelevant to the classification boundary provides no practical advantage.
3. **Geometric difference**: Huang et al. (2021) formalized this as the "geometric difference" between quantum and classical kernel matrices. Large geometric difference is necessary for quantum advantage.

```{warning}
A quantum kernel that is hard to compute classically is not sufficient for ML advantage. The kernel must also be useful for the specific learning task. Random quantum circuits produce kernels that are hard to compute but essentially random, providing no useful structure for learning.
```

## The Interference-Based Kernel

A particularly elegant quantum kernel uses amplitude encoding and interference (Schuld, Fingerhuth, and Petruccione, 2017). Training and test instances are encoded as amplitudes in entangled registers. A Hadamard gate on an ancilla qubit creates interference between the registers, and post-selecting on the ancilla measurement yields a kernel:

$$k(\mathbf{x}, \tilde{\mathbf{x}}) \propto |\mathbf{x} + \tilde{\mathbf{x}}|^2$$

This kernel has no direct classical analog and can be computed on very shallow circuits.

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit.circuit import QuantumCircuit
from qiskit.primitives import StatevectorSampler
import numpy as np

def quantum_kernel(x1, x2, n_qubits=2):
    """Compute quantum kernel via compute-uncompute."""
    qc = QuantumCircuit(n_qubits)
    # Encode x1
    for i in range(n_qubits):
        qc.h(i)
        qc.rz(2 * x1[i], i)
    for i in range(n_qubits - 1):
        qc.cx(i, i + 1)
        qc.rz(2 * x1[i] * x1[i+1], i + 1)
        qc.cx(i, i + 1)
    # Uncompute x2 (adjoint of encoding x2)
    for i in range(n_qubits - 2, -1, -1):
        qc.cx(i, i + 1)
        qc.rz(-2 * x2[i] * x2[i+1], i + 1)
        qc.cx(i, i + 1)
    for i in range(n_qubits - 1, -1, -1):
        qc.rz(-2 * x2[i], i)
        qc.h(i)
    qc.measure_all()
    return qc

x1 = [0.3, 0.7]
x2 = [0.5, 0.2]
qc = quantum_kernel(x1, x2)
print(qc)
```
:::
:::{tab-item} Cirq
```python
import cirq
import numpy as np

def quantum_kernel(x1, x2, n_qubits=2):
    qubits = cirq.LineQubit.range(n_qubits)
    circuit = cirq.Circuit()
    # Encode x1
    circuit.append(cirq.H.on_each(*qubits))
    circuit.append(cirq.rz(2*x1[i]).on(qubits[i]) for i in range(n_qubits))
    for i in range(n_qubits - 1):
        circuit.append([
            cirq.CNOT(qubits[i], qubits[i+1]),
            cirq.rz(2*x1[i]*x1[i+1]).on(qubits[i+1]),
            cirq.CNOT(qubits[i], qubits[i+1]),
        ])
    # Uncompute x2
    for i in range(n_qubits - 2, -1, -1):
        circuit.append([
            cirq.CNOT(qubits[i], qubits[i+1]),
            cirq.rz(-2*x2[i]*x2[i+1]).on(qubits[i+1]),
            cirq.CNOT(qubits[i], qubits[i+1]),
        ])
    for i in range(n_qubits - 1, -1, -1):
        circuit.append(cirq.rz(-2*x2[i]).on(qubits[i]))
        circuit.append(cirq.H.on(qubits[i]))
    circuit.append(cirq.measure(*qubits, key='result'))
    return circuit

print(quantum_kernel([0.3, 0.7], [0.5, 0.2]))
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np

n_qubits = 2
dev = qml.device("default.qubit", wires=n_qubits)

def feature_map(x):
    for i in range(n_qubits):
        qml.Hadamard(wires=i)
        qml.RZ(2 * x[i], wires=i)
    for i in range(n_qubits - 1):
        qml.CNOT(wires=[i, i+1])
        qml.RZ(2 * x[i] * x[i+1], wires=i+1)
        qml.CNOT(wires=[i, i+1])

@qml.qnode(dev)
def kernel(x1, x2):
    feature_map(x1)
    qml.adjoint(feature_map)(x2)
    return qml.probs(wires=range(n_qubits))

x1 = np.array([0.3, 0.7])
x2 = np.array([0.5, 0.2])
k_val = kernel(x1, x2)[0]  # P(|00...0>)
print(f"Quantum kernel: {k_val:.4f}")
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, RZ, CNOT, MEASURE
import numpy as np

def quantum_kernel_circuit(x1, x2, n_qubits=2):
    prog = Program()
    ro = prog.declare('ro', 'BIT', n_qubits)
    # Encode x1
    for i in range(n_qubits):
        prog += H(i)
        prog += RZ(2 * x1[i], i)
    for i in range(n_qubits - 1):
        prog += CNOT(i, i+1)
        prog += RZ(2 * x1[i] * x1[i+1], i+1)
        prog += CNOT(i, i+1)
    # Uncompute x2
    for i in range(n_qubits - 2, -1, -1):
        prog += CNOT(i, i+1)
        prog += RZ(-2 * x2[i] * x2[i+1], i+1)
        prog += CNOT(i, i+1)
    for i in range(n_qubits - 1, -1, -1):
        prog += RZ(-2 * x2[i], i)
        prog += H(i)
    for i in range(n_qubits):
        prog += MEASURE(i, ro[i])
    return prog

print(quantum_kernel_circuit([0.3, 0.7], [0.5, 0.2]))
```
:::
::::

## Further Reading

- Schuld, M. and Killoran, N. "Quantum machine learning in feature Hilbert spaces." *Physical Review Letters* 122, 040504 (2019)
- Havlicek, V. et al. "Supervised learning with quantum-enhanced feature spaces." *Nature* 567, 209-212 (2019)
- Huang, H.Y. et al. "Power of data in quantum machine learning." *Nature Communications* 12, 2631 (2021)
- Schuld, M., Fingerhuth, M., and Petruccione, F. "Implementing a distance-based classifier with a quantum interference circuit." *Europhysics Letters* 119, 60002 (2017)
