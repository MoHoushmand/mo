# Unsupervised Quantum Learning

> Quantum autoencoders, quantum GANs, quantum clustering, and quantum principal component analysis.

Unsupervised learning seeks structure in unlabeled data: clusters, latent representations, generative models, and dimensionality reduction. Quantum computing offers potential advantages through access to exponentially large state spaces for representation learning and quantum-native sampling for generative modeling.

## Quantum Autoencoders

A quantum autoencoder compresses an $n$-qubit quantum state into $k < n$ qubits, discarding the remaining $n - k$ "trash" qubits. The circuit has an encoder $U(\boldsymbol{\theta})$ that maps the input state to a form where the trash qubits are in a fixed state (e.g., $|0\rangle$), allowing them to be discarded without information loss.

### Architecture

1. Apply the parameterized encoder $U(\boldsymbol{\theta})$ to the $n$-qubit input.
2. Measure the $n - k$ trash qubits. If they are in state $|0\rangle^{\otimes(n-k)}$, the compression succeeded.
3. The remaining $k$ qubits hold the compressed representation.
4. To decode, apply $U^\dagger(\boldsymbol{\theta})$ with fresh $|0\rangle$ qubits replacing the trash.

The cost function is the fidelity between the input and the reconstructed output, or equivalently the probability of measuring $|0\rangle^{\otimes(n-k)}$ on the trash qubits.

$$C(\boldsymbol{\theta}) = 1 - \text{Tr}\left[\rho_{\text{trash}} |0\rangle\langle 0|^{\otimes(n-k)}\right]$$

### Applications

- **Quantum data compression**: Reducing the number of qubits needed to store quantum states (e.g., molecular ground states).
- **Quantum error correction**: Finding efficient encoding circuits for error-correcting codes.
- **Feature extraction**: The latent space of a quantum autoencoder can serve as a quantum feature representation.

## Quantum Generative Adversarial Networks (QGANs)

QGANs adapt the GAN framework to quantum circuits. Two quantum (or hybrid) circuits compete:

- **Generator** $G(\boldsymbol{\theta}_G)$: Produces quantum states or classical samples that should resemble the training data.
- **Discriminator** $D(\boldsymbol{\theta}_D)$: Distinguishes between real data and generated samples.

Training alternates between optimizing $D$ to maximize discrimination accuracy and optimizing $G$ to fool $D$.

### Variants

| Variant | Generator | Discriminator | Data |
|---|---|---|---|
| Fully quantum | Quantum circuit | Quantum circuit | Quantum states |
| Hybrid QGAN | Quantum circuit | Classical NN | Classical data |
| Quantum-assisted GAN | Classical NN | Classical NN + quantum sampler | Classical data |

```{admonition} Advantage of quantum generators
:class: note
A quantum generator can produce samples from distributions that are provably hard for classical computers to sample from (under standard complexity assumptions). Whether these distributions are useful for practical ML tasks remains an open question.
```

## Born Machines

A Born machine is a generative model that directly uses the Born rule to define a probability distribution:

$$p(\mathbf{x}) = |\langle \mathbf{x}|U(\boldsymbol{\theta})|0\rangle|^2$$

The parameterized circuit $U(\boldsymbol{\theta})$ defines a probability distribution over bit strings. Training minimizes a divergence (KL, MMD, or Stein) between the Born machine distribution and the empirical data distribution.

Born machines are natural quantum generative models because sampling from $p(\mathbf{x})$ requires only running the circuit and measuring. Classically computing $p(\mathbf{x})$ or sampling from it may be exponentially hard for certain circuit families.

## Quantum Principal Component Analysis

Quantum PCA (Lloyd, Mohseni, and Rebentrost, 2014) extracts the principal components of a density matrix $\rho$ exponentially faster than classical PCA under certain conditions.

### Algorithm Overview

Given $\rho = \sum_i \lambda_i |\lambda_i\rangle\langle\lambda_i|$, quantum PCA:

1. Prepares multiple copies of $\rho$.
2. Uses $e^{-i\rho t}$ (exponentiation of the density matrix) to perform phase estimation.
3. Extracts eigenvalues $\lambda_i$ and prepares eigenstates $|\lambda_i\rangle$.

The key subroutine is density matrix exponentiation: given copies of $\rho$, implement $e^{-i\rho t}$ via the quantum simulation of swap operations. The runtime is $O(\log d)$ in the dimension $d$, compared to $O(d^3)$ classically.

```{warning}
Quantum PCA requires quantum access to the data (multiple copies of $\rho$). If the data is classical and must be loaded into quantum states, the loading step may negate the exponential speedup. This caveat applies to many fault-tolerant QML algorithms.
```

## Quantum Clustering

### Quantum $k$-Means

Quantum speedups for $k$-means clustering exploit quantum distance estimation. Given amplitude-encoded data points, the distance $\|\mathbf{x}_i - \mathbf{c}_j\|^2$ between a point and a centroid can be estimated using a swap test circuit in time $O(\log d)$ per distance, compared to $O(d)$ classically.

### Quantum Spectral Clustering

Spectral clustering relies on eigendecomposition of the graph Laplacian. Quantum phase estimation can compute the smallest eigenvalues in $O(\log N)$ time for an $N \times N$ Laplacian, potentially providing exponential speedup if the Laplacian can be efficiently loaded.

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit.circuit import QuantumCircuit, Parameter
import numpy as np

# Quantum autoencoder: 3 qubits -> 1 qubit latent space
n_total = 3
n_latent = 1
n_trash = n_total - n_latent

qc = QuantumCircuit(n_total + n_trash)  # extra qubits for reference

# Encoder: parameterized circuit
params = [Parameter(f'θ_{i}') for i in range(6)]
for i in range(n_total):
    qc.ry(params[i], i)
qc.cx(0, 1)
qc.cx(1, 2)
for i in range(n_total):
    qc.ry(params[i + 3], i)

# Swap test on trash qubits (simplified)
qc.measure_all()
print(qc)
```
:::
:::{tab-item} Cirq
```python
import cirq
import sympy

n_total = 3
qubits = cirq.LineQubit.range(n_total)

# Simple quantum autoencoder circuit
params = [sympy.Symbol(f'θ_{i}') for i in range(6)]
encoder = cirq.Circuit([
    cirq.ry(params[i]).on(qubits[i]) for i in range(n_total)
] + [
    cirq.CNOT(qubits[0], qubits[1]),
    cirq.CNOT(qubits[1], qubits[2]),
] + [
    cirq.ry(params[i+3]).on(qubits[i]) for i in range(n_total)
])

# Measure trash qubits (qubits 1 and 2)
encoder.append(cirq.measure(qubits[1], qubits[2], key='trash'))
print(encoder)
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np

n_total = 3
n_latent = 1
n_trash = n_total - n_latent
dev = qml.device("default.qubit", wires=n_total)

@qml.qnode(dev)
def autoencoder(params, state_params):
    # Prepare input state
    for i in range(n_total):
        qml.RY(state_params[i], wires=i)
    # Encoder
    for i in range(n_total):
        qml.RY(params[i], wires=i)
    qml.CNOT(wires=[0, 1])
    qml.CNOT(wires=[1, 2])
    for i in range(n_total):
        qml.RY(params[i + 3], wires=i)
    # Cost: probability of trash qubits in |0>
    return qml.probs(wires=[1, 2])

params = np.random.uniform(0, np.pi, 6)
state_params = np.random.uniform(0, np.pi, 3)
probs = autoencoder(params, state_params)
print(f"P(trash=|00>): {probs[0]:.4f}")
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import RY, CNOT, MEASURE
import numpy as np

n_total = 3
prog = Program()
ro = prog.declare('ro', 'BIT', n_total)

# Encoder circuit
angles = np.random.uniform(0, np.pi, 6)
for i in range(n_total):
    prog += RY(angles[i], i)
prog += CNOT(0, 1)
prog += CNOT(1, 2)
for i in range(n_total):
    prog += RY(angles[i + 3], i)

# Measure trash qubits
prog += MEASURE(1, ro[1])
prog += MEASURE(2, ro[2])

print(prog)
```
:::
::::

## Further Reading

- Romero, J. et al. "Quantum autoencoders for efficient compression of quantum data." *Quantum Science and Technology* 2, 045001 (2017)
- Lloyd, S. and Weedbrook, C. "Quantum generative adversarial learning." *Physical Review Letters* 121, 040502 (2018)
- Liu, J.G. and Wang, L. "Differentiable learning of quantum circuit Born machines." *Physical Review A* 98, 062324 (2018)
- Lloyd, S., Mohseni, M., and Rebentrost, P. "Quantum principal component analysis." *Nature Physics* 10, 631-633 (2014)
