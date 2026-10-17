# Quantum Kernels and SVMs

> Quantum support vector machines using quantum kernel estimation. Implementation across frameworks and comparison with classical SVMs.

Support vector machines (SVMs) are a natural fit for quantum kernel methods. The SVM training algorithm depends on the data only through the kernel matrix, so a quantum kernel can be plugged directly into a classical SVM solver like scikit-learn. This chapter walks through the full pipeline: quantum kernel computation, Gram matrix construction, SVM training, and comparison with classical baselines.

## SVM Review

A support vector machine finds the maximum-margin hyperplane separating two classes. For data $\{(\mathbf{x}_i, y_i)\}_{i=1}^{M}$ with $y_i \in \{-1, +1\}$, the dual formulation is:

$$\max_{\boldsymbol{\alpha}} \sum_i \alpha_i - \frac{1}{2}\sum_{i,j} \alpha_i \alpha_j y_i y_j\, k(\mathbf{x}_i, \mathbf{x}_j)$$

subject to $0 \leq \alpha_i \leq C$ and $\sum_i \alpha_i y_i = 0$. The solution depends entirely on the kernel matrix $K_{ij} = k(\mathbf{x}_i, \mathbf{x}_j)$.

For prediction on a new point $\mathbf{x}^*$:

$$f(\mathbf{x}^*) = \text{sign}\left(\sum_{i \in \text{SV}} \alpha_i y_i\, k(\mathbf{x}_i, \mathbf{x}^*) + b\right)$$

Only the support vectors (points with $\alpha_i > 0$) contribute, giving SVMs their characteristic sparsity.

## Quantum SVM Pipeline

The quantum SVM pipeline has four steps:

1. **Design a quantum feature map** $U(\mathbf{x})$ mapping data to quantum states.
2. **Compute the quantum kernel matrix** $K_{ij} = |\langle 0|U^\dagger(\mathbf{x}_j)U(\mathbf{x}_i)|0\rangle|^2$ using quantum hardware.
3. **Train a classical SVM** using the precomputed kernel matrix.
4. **Predict** on test data by computing kernel entries between test and training points.

```{admonition} scikit-learn integration
:class: tip
scikit-learn's `SVC(kernel='precomputed')` accepts a precomputed Gram matrix. This is the standard way to plug quantum kernels into a classical ML pipeline. You compute the kernel matrix on quantum hardware, then hand it to scikit-learn for training and prediction.
```

## Building the Gram Matrix

Given $M$ data points, the training Gram matrix is $M \times M$:

$$K^{\text{train}}_{ij} = k_Q(\mathbf{x}_i, \mathbf{x}_j), \quad i,j \in \{1, \ldots, M\}$$

For prediction on $M_{\text{test}}$ test points, we need a $M_{\text{test}} \times M$ test Gram matrix:

$$K^{\text{test}}_{ij} = k_Q(\mathbf{x}_i^{\text{test}}, \mathbf{x}_j^{\text{train}})$$

Each entry requires running a quantum circuit and collecting statistics. The symmetry $K_{ij} = K_{ji}$ halves the number of circuits for the training matrix.

## Comparison with Classical SVMs

| Property | Classical RBF Kernel | Quantum Kernel |
|---|---|---|
| Feature space dimension | Infinite | $2^n$ (exponential in qubits) |
| Kernel computation | $O(d)$ per pair | $O(1/\epsilon^2)$ shots per pair |
| Hyperparameters | $\gamma$ (bandwidth), $C$ | Circuit structure, $C$ |
| When advantageous | Smooth decision boundaries | Hard-to-classically-simulate structure |
| Hardware requirement | Classical CPU | Quantum processor |

The quantum kernel is not universally better. For many standard datasets (Iris, MNIST, etc.), classical kernels achieve equal or better performance. Quantum advantage requires data with structure that matches the quantum feature map.

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit.circuit import QuantumCircuit
from qiskit.quantum_info import Statevector
from sklearn.svm import SVC
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np

n_qubits = 2

def feature_map_circuit(x):
    qc = QuantumCircuit(n_qubits)
    for i in range(n_qubits):
        qc.h(i)
        qc.rz(2 * x[i], i)
    qc.cx(0, 1)
    qc.rz(2 * x[0] * x[1], 1)
    qc.cx(0, 1)
    return qc

def quantum_kernel(x1, x2):
    qc1 = feature_map_circuit(x1)
    qc2 = feature_map_circuit(x2)
    sv1 = Statevector.from_instruction(qc1)
    sv2 = Statevector.from_instruction(qc2)
    return abs(sv1.inner(sv2)) ** 2

def gram_matrix(A, B):
    return np.array([[quantum_kernel(a, b) for b in B] for a in A])

# Dataset
X, y = make_moons(n_samples=50, noise=0.15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

# Build Gram matrices
K_train = gram_matrix(X_train, X_train)
K_test = gram_matrix(X_test, X_train)

# Train SVM
svm = SVC(kernel='precomputed')
svm.fit(K_train, y_train)
acc = accuracy_score(y_test, svm.predict(K_test))
print(f"Quantum SVM accuracy: {acc:.2f}")
```
:::
:::{tab-item} Cirq
```python
import cirq
import numpy as np
from sklearn.svm import SVC
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

n_qubits = 2
qubits = cirq.LineQubit.range(n_qubits)
sim = cirq.Simulator()

def feature_map(x):
    ops = [cirq.H.on_each(*qubits)]
    ops += [cirq.rz(2*x[i]).on(qubits[i]) for i in range(n_qubits)]
    ops += [cirq.CNOT(qubits[0], qubits[1]),
            cirq.rz(2*x[0]*x[1]).on(qubits[1]),
            cirq.CNOT(qubits[0], qubits[1])]
    return cirq.Circuit(ops)

def quantum_kernel(x1, x2):
    c1 = feature_map(x1)
    c2 = feature_map(x2)
    sv1 = sim.simulate(c1).final_state_vector
    sv2 = sim.simulate(c2).final_state_vector
    return abs(np.vdot(sv1, sv2)) ** 2

def gram(A, B):
    return np.array([[quantum_kernel(a, b) for b in B] for a in A])

X, y = make_moons(n_samples=50, noise=0.15, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3)

svm = SVC(kernel='precomputed')
svm.fit(gram(X_tr, X_tr), y_tr)
print(f"Accuracy: {accuracy_score(y_te, svm.predict(gram(X_te, X_tr))):.2f}")
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np
from sklearn.svm import SVC
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

n_qubits = 2
dev = qml.device("default.qubit", wires=n_qubits)

def feature_map(x):
    for i in range(n_qubits):
        qml.Hadamard(wires=i)
        qml.RZ(2 * x[i], wires=i)
    qml.CNOT(wires=[0, 1])
    qml.RZ(2 * x[0] * x[1], wires=1)
    qml.CNOT(wires=[0, 1])

@qml.qnode(dev)
def kernel_circuit(x1, x2):
    feature_map(x1)
    qml.adjoint(feature_map)(x2)
    return qml.probs(wires=range(n_qubits))

def quantum_kernel(x1, x2):
    return kernel_circuit(x1, x2)[0]

def gram(A, B):
    return np.array([[quantum_kernel(a, b) for b in B] for a in A])

X, y = make_moons(n_samples=50, noise=0.15, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3)

svm = SVC(kernel='precomputed')
svm.fit(gram(X_tr, X_tr), y_tr)
print(f"Accuracy: {accuracy_score(y_te, svm.predict(gram(X_te, X_tr))):.2f}")
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, RZ, CNOT
from pyquil.api import WavefunctionSimulator
from sklearn.svm import SVC
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np

n_qubits = 2
sim = WavefunctionSimulator()

def feature_map(x):
    prog = Program()
    for i in range(n_qubits):
        prog += H(i)
        prog += RZ(2*x[i], i)
    prog += CNOT(0, 1)
    prog += RZ(2*x[0]*x[1], 1)
    prog += CNOT(0, 1)
    return prog

def quantum_kernel(x1, x2):
    wf1 = sim.wavefunction(feature_map(x1)).amplitudes
    wf2 = sim.wavefunction(feature_map(x2)).amplitudes
    return abs(np.vdot(wf1, wf2))**2

def gram(A, B):
    return np.array([[quantum_kernel(a, b) for b in B] for a in A])

X, y = make_moons(n_samples=50, noise=0.15, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3)

svm = SVC(kernel='precomputed')
svm.fit(gram(X_tr, X_tr), y_tr)
print(f"Accuracy: {accuracy_score(y_te, svm.predict(gram(X_te, X_tr))):.2f}")
```
:::
::::

## Further Reading

- Havlicek, V. et al. "Supervised learning with quantum-enhanced feature spaces." *Nature* 567, 209-212 (2019)
- Schuld, M. "Supervised quantum machine learning models are kernel methods." arXiv:2101.11020 (2021)
- Huang, H.Y. et al. "Power of data in quantum machine learning." *Nature Communications* 12, 2631 (2021)
- Thanasilp, S. et al. "Exponential concentration in quantum kernel methods." *Nature Communications* 15, 5200 (2024)
