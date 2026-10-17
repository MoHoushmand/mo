# Gate Model for QML

> Parameterized quantum circuits as ML models. Data encoding strategies (amplitude, angle, basis encoding) and trainable layers.

The gate model provides the hardware abstraction layer for most quantum machine learning algorithms. A quantum ML model is a parameterized quantum circuit: data is encoded into the circuit, trainable gates transform the state, and measurements produce predictions. This chapter covers the building blocks: standard gates, data encoding strategies, and the structure of trainable layers.

## Quantum Gates

A quantum gate is a unitary matrix acting on one or more qubits. The most common gates in QML circuits:

| Gate | Matrix | Action |
|---|---|---|
| $X$ (NOT) | $\begin{bmatrix}0 & 1\\1 & 0\end{bmatrix}$ | Bit flip: $\|0\rangle \leftrightarrow \|1\rangle$ |
| $Z$ | $\begin{bmatrix}1 & 0\\0 & -1\end{bmatrix}$ | Phase flip: $\|1\rangle \to -\|1\rangle$ |
| $H$ (Hadamard) | $\frac{1}{\sqrt{2}}\begin{bmatrix}1 & 1\\1 & -1\end{bmatrix}$ | Creates equal superposition |
| $R_x(\theta)$ | $e^{-i\theta\sigma_x/2}$ | Rotation around X axis |
| $R_y(\theta)$ | $e^{-i\theta\sigma_y/2}$ | Rotation around Y axis |
| $R_z(\theta)$ | $e^{-i\theta\sigma_z/2}$ | Rotation around Z axis |
| CNOT | $\|0\rangle\langle 0\|\otimes I + \|1\rangle\langle 1\|\otimes X$ | Entangling gate |

Unlike classical computers where the NOT gate is the only non-trivial single-bit operation, quantum computers have infinitely many single-qubit gates parameterized by continuous rotation angles. This continuity is what makes parameterized circuits natural function approximators.

## Data Encoding

Before a quantum circuit can process classical data, the data must be encoded into quantum states. The choice of encoding profoundly affects the model's expressiveness and the potential for quantum advantage.

### Basis Encoding

Map an integer $x$ to the corresponding computational basis state:

$$x = 5 \to |101\rangle$$

Requires $\lceil\log_2 N\rceil$ qubits for $N$ data points. Simple but limited: encodes only integers and uses exponentially many qubits for large datasets.

### Angle Encoding

Encode each feature $x_j$ as a rotation angle on a dedicated qubit:

$$|\psi(x)\rangle = \bigotimes_{j=1}^{d} R_y(x_j)|0\rangle$$

Requires $d$ qubits for $d$-dimensional data. This is the most common encoding in variational QML because it maps naturally to parameterized circuits and each feature gets its own qubit.

### Amplitude Encoding

Encode a normalized $d$-dimensional vector $\mathbf{x}$ as the amplitudes of a quantum state:

$$|\psi(x)\rangle = \sum_{j=0}^{d-1} x_j |j\rangle$$

Requires only $\lceil\log_2 d\rceil$ qubits, an exponential compression. However, preparing this state generically requires $O(d)$ gates, which negates the qubit savings. Amplitude encoding is most useful when the data has structure that allows efficient preparation.

### Comparison

| Encoding | Qubits | Gate Depth | Expressiveness |
|---|---|---|---|
| Basis | $\lceil\log_2 N\rceil$ | $O(n)$ | Integers only |
| Angle | $d$ | $O(1)$ per qubit | Continuous features, one per qubit |
| Amplitude | $\lceil\log_2 d\rceil$ | $O(d)$ generic | Full vector, exponential compression |
| IQP / Hamiltonian | $d$ | $O(d^2)$ | Nonlinear feature interactions |

```{admonition} The encoding bottleneck
:class: warning
Data encoding is often the computational bottleneck in QML. If encoding $d$-dimensional data requires $O(d)$ gates, the quantum circuit is already as expensive as a classical linear operation. Quantum advantage in QML typically requires either structured data that admits efficient encoding or problems where the encoding itself provides the advantage (as in kernel methods).
```

## Parameterized Circuit Structure

A typical QML circuit alternates between data-encoding layers and trainable layers:

$$U(\mathbf{x}, \boldsymbol{\theta}) = \prod_{\ell=1}^{L} W(\boldsymbol{\theta}_\ell) \cdot S(\mathbf{x})$$

where $S(\mathbf{x})$ encodes the data and $W(\boldsymbol{\theta}_\ell)$ is a trainable unitary parameterized by angles $\boldsymbol{\theta}_\ell$. A single trainable layer typically consists of:

1. Single-qubit rotations $R_y(\theta_j)$ or $R_z(\theta_j)$ on each qubit.
2. Entangling gates (CNOTs) connecting pairs of qubits.

The output is an expectation value $\langle\psi|O|\psi\rangle$ for some observable $O$, which serves as the model's prediction.

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit.circuit import QuantumCircuit, Parameter
import numpy as np

n_qubits = 4
n_layers = 2

qc = QuantumCircuit(n_qubits)

# Data encoding: angle encoding
x = [Parameter(f'x_{i}') for i in range(n_qubits)]
for i in range(n_qubits):
    qc.ry(x[i], i)

# Trainable layers
for layer in range(n_layers):
    theta = [Parameter(f'θ_{layer}_{i}') for i in range(n_qubits)]
    for i in range(n_qubits):
        qc.ry(theta[i], i)
    for i in range(n_qubits - 1):
        qc.cx(i, i + 1)

qc.measure_all()
print(qc)
```
:::
:::{tab-item} Cirq
```python
import cirq
import sympy

n_qubits = 4
n_layers = 2
qubits = cirq.LineQubit.range(n_qubits)
circuit = cirq.Circuit()

# Data encoding: angle encoding
x = [sympy.Symbol(f'x_{i}') for i in range(n_qubits)]
circuit.append(cirq.ry(x[i]).on(qubits[i]) for i in range(n_qubits))

# Trainable layers
for layer in range(n_layers):
    theta = [sympy.Symbol(f'θ_{layer}_{i}') for i in range(n_qubits)]
    circuit.append(cirq.ry(theta[i]).on(qubits[i]) for i in range(n_qubits))
    circuit.append(cirq.CNOT(qubits[i], qubits[i+1]) for i in range(n_qubits - 1))

circuit.append(cirq.measure(*qubits, key='result'))
print(circuit)
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np

n_qubits = 4
n_layers = 2
dev = qml.device("default.qubit", wires=n_qubits)

@qml.qnode(dev)
def circuit(x, theta):
    # Data encoding: angle encoding
    for i in range(n_qubits):
        qml.RY(x[i], wires=i)
    # Trainable layers
    for layer in range(n_layers):
        for i in range(n_qubits):
            qml.RY(theta[layer, i], wires=i)
        for i in range(n_qubits - 1):
            qml.CNOT(wires=[i, i + 1])
    return qml.expval(qml.PauliZ(0))

x = np.random.uniform(0, np.pi, n_qubits)
theta = np.random.uniform(0, np.pi, (n_layers, n_qubits))
print(circuit(x, theta))
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import RY, CNOT, MEASURE
from pyquil.quilbase import Declare

n_qubits = 4
n_layers = 2
p = Program()
ro = p.declare('ro', 'BIT', n_qubits)

# Data encoding: angle encoding
# In practice, parameters are substituted at runtime
for i in range(n_qubits):
    theta_x = p.declare(f'x_{i}', 'REAL')
    p += RY(theta_x, i)

# Trainable layers
for layer in range(n_layers):
    for i in range(n_qubits):
        theta = p.declare(f'theta_{layer}_{i}', 'REAL')
        p += RY(theta, i)
    for i in range(n_qubits - 1):
        p += CNOT(i, i + 1)

for i in range(n_qubits):
    p += MEASURE(i, ro[i])

print(p)
```
:::
::::

## Further Reading

- Schuld, M. and Petruccione, F. *Machine Learning with Quantum Computers* (Springer, 2021), Chapter 5
- Havlicek, V. et al. "Supervised learning with quantum-enhanced feature spaces." *Nature* 567, 209-212 (2019)
- Perez-Salinas, A. et al. "Data re-uploading for a universal quantum classifier." *Quantum* 4, 226 (2020)
- Schuld, M., Sweke, R., and Meyer, J.K. "Effect of data encoding on the expressive power of variational quantum machine-learning models." *Physical Review A* 103, 032430 (2021)
