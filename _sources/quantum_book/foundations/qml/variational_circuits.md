# Variational Quantum Circuits

> Parameterized circuits as function approximators. Expressibility, entangling capability, barren plateaus, and circuit design strategies.

Variational quantum circuits (VQCs) are the workhorses of near-term quantum machine learning. They consist of parameterized gates whose angles are optimized by a classical outer loop, forming a hybrid classical-quantum feedback system. This chapter covers the theoretical properties that determine whether a VQC can learn effectively: expressibility, entangling capability, trainability, and the barren plateau phenomenon.

## The Variational Paradigm

Current quantum computers are noisy and limited in circuit depth. Variational algorithms address this by running short parameterized circuits and optimizing their parameters classically:

1. Prepare a parameterized quantum state $|\psi(\boldsymbol{\theta})\rangle = U(\boldsymbol{\theta})|0\rangle^{\otimes n}$.
2. Measure an observable to obtain a cost function value $C(\boldsymbol{\theta}) = \langle\psi(\boldsymbol{\theta})|H|\psi(\boldsymbol{\theta})\rangle$.
3. Update $\boldsymbol{\theta}$ using a classical optimizer.
4. Repeat until convergence.

The circuit $U(\boldsymbol{\theta})$ acts as a trainable model, analogous to a neural network. The measurement provides the loss signal, and the classical optimizer plays the role of backpropagation.

## Circuit Ansatze

An **ansatz** (plural: ansatze) is the structural template for the parameterized circuit. Common choices:

### Hardware-Efficient Ansatz

Layers of single-qubit rotations followed by entangling gates native to the hardware:

$$U(\boldsymbol{\theta}) = \prod_{\ell=1}^{L} \left[\prod_{i} R_y(\theta_{\ell,i})\, R_z(\phi_{\ell,i}) \cdot \text{Entangling}\right]$$

Advantages: minimal gate depth, hardware-native gates. Disadvantage: may not respect problem structure, prone to barren plateaus at large depth.

### Problem-Inspired Ansatz

Circuit structure reflects the problem Hamiltonian. For chemistry (VQE), the Unitary Coupled Cluster (UCC) ansatz applies excitation operators derived from the molecular Hamiltonian. For optimization (QAOA), the ansatz alternates between cost and mixer unitaries.

### Data Re-uploading

Instead of encoding data once, re-upload data features at each layer:

$$U(\mathbf{x}, \boldsymbol{\theta}) = \prod_{\ell=1}^{L} W(\boldsymbol{\theta}_\ell)\, S(\mathbf{x})$$

This is analogous to a deep neural network where each layer sees the input. Perez-Salinas et al. (2020) showed that a single-qubit data re-uploading circuit is a universal function approximator.

## Expressibility

**Expressibility** quantifies how well a parameterized circuit can explore the space of quantum states. Formally, it measures how close the ensemble of states $\{|\psi(\boldsymbol{\theta})\rangle\}$ (sampled over random $\boldsymbol{\theta}$) is to the uniform (Haar) distribution over states.

A circuit with high expressibility can represent a wide variety of quantum states. A circuit with low expressibility is restricted to a small submanifold.

```{admonition} Expressibility vs. trainability tradeoff
:class: warning
Highly expressible circuits (those that explore the full Hilbert space uniformly) tend to suffer from barren plateaus, making them hard to train. The art of circuit design is finding an ansatz that is expressible enough for the problem at hand but structured enough to avoid trainability issues.
```

## Entangling Capability

Entangling capability measures the circuit's ability to generate entanglement, typically quantified by the Meyer-Wallach entanglement measure averaged over random parameters. Circuits that cannot generate sufficient entanglement are limited to classically simulable computations.

| Ansatz | Entangling Capability | Expressibility |
|---|---|---|
| No entangling gates | Zero | Low (product states only) |
| Linear chain CNOT | Moderate | Moderate |
| All-to-all CNOT | High | High |
| Random circuits | Maximal (at sufficient depth) | Maximal |

## Barren Plateaus

The most significant challenge for variational QML is the **barren plateau** phenomenon: the gradient of the cost function vanishes exponentially with system size for certain circuit architectures and cost functions.

Formally, for a random parameterized circuit of sufficient depth:

$$\text{Var}_{\boldsymbol{\theta}}\left[\frac{\partial C}{\partial \theta_k}\right] \leq F(n)$$

where $F(n)$ decays exponentially in the number of qubits $n$. This means that for large systems, the cost landscape is essentially flat everywhere, and gradient-based optimization cannot find good parameters.

### Causes of Barren Plateaus

1. **Deep random circuits**: As depth increases, the parameter distribution approaches the Haar measure, and gradients vanish.
2. **Global cost functions**: Cost functions that involve all qubits (e.g., global fidelity) have exponentially small gradients. Local cost functions (involving few-qubit observables) can avoid this.
3. **Excessive entanglement**: Highly entangled states have nearly maximally mixed reduced density matrices, leading to flat local cost landscapes.
4. **Noise**: Quantum noise can induce barren plateaus even in circuits that are barren-plateau-free in the noiseless case.

### Mitigation Strategies

- **Shallow circuits**: Limit depth to avoid convergence to the Haar distribution.
- **Local cost functions**: Measure local observables rather than global ones.
- **Layerwise training**: Train one layer at a time, gradually building up depth.
- **Problem-inspired ansatze**: Use circuit structures that reflect the problem symmetries.
- **Parameter initialization**: Initialize parameters near identity (small random angles) so the initial circuit is close to the input state.
- **Classical pre-training**: Use a classical surrogate model to find good initial parameters.

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit.circuit import QuantumCircuit, Parameter
import numpy as np

def hardware_efficient_ansatz(n_qubits, n_layers):
    qc = QuantumCircuit(n_qubits)
    params = []
    for layer in range(n_layers):
        for i in range(n_qubits):
            ry = Parameter(f'ry_{layer}_{i}')
            rz = Parameter(f'rz_{layer}_{i}')
            qc.ry(ry, i)
            qc.rz(rz, i)
            params.extend([ry, rz])
        for i in range(n_qubits - 1):
            qc.cx(i, i + 1)
    return qc, params

qc, params = hardware_efficient_ansatz(4, 3)
print(f"Parameters: {len(params)}")
print(qc)
```
:::
:::{tab-item} Cirq
```python
import cirq
import sympy

def hardware_efficient_ansatz(n_qubits, n_layers):
    qubits = cirq.LineQubit.range(n_qubits)
    circuit = cirq.Circuit()
    for layer in range(n_layers):
        circuit.append([
            cirq.ry(sympy.Symbol(f'ry_{layer}_{i}')).on(qubits[i])
            for i in range(n_qubits)
        ])
        circuit.append([
            cirq.rz(sympy.Symbol(f'rz_{layer}_{i}')).on(qubits[i])
            for i in range(n_qubits)
        ])
        circuit.append([
            cirq.CNOT(qubits[i], qubits[i+1])
            for i in range(n_qubits - 1)
        ])
    return circuit

circuit = hardware_efficient_ansatz(4, 3)
print(circuit)
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np

n_qubits = 4
n_layers = 3
dev = qml.device("default.qubit", wires=n_qubits)

@qml.qnode(dev)
def variational_circuit(params):
    for layer in range(n_layers):
        for i in range(n_qubits):
            qml.RY(params[layer, i, 0], wires=i)
            qml.RZ(params[layer, i, 1], wires=i)
        for i in range(n_qubits - 1):
            qml.CNOT(wires=[i, i + 1])
    return qml.expval(qml.PauliZ(0))

params = np.random.uniform(-np.pi, np.pi, (n_layers, n_qubits, 2))
print(f"Output: {variational_circuit(params):.4f}")
print(f"Gradient shape: {qml.grad(variational_circuit)(params).shape}")
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import RY, RZ, CNOT, MEASURE
import numpy as np

n_qubits = 4
n_layers = 3

prog = Program()
ro = prog.declare('ro', 'BIT', n_qubits)

for layer in range(n_layers):
    for i in range(n_qubits):
        ry_param = prog.declare(f'ry_{layer}_{i}', 'REAL')
        rz_param = prog.declare(f'rz_{layer}_{i}', 'REAL')
        prog += RY(ry_param, i)
        prog += RZ(rz_param, i)
    for i in range(n_qubits - 1):
        prog += CNOT(i, i + 1)

for i in range(n_qubits):
    prog += MEASURE(i, ro[i])

print(prog)
```
:::
::::

## Further Reading

- McClean, J.R. et al. "Barren plateaus in quantum neural network training landscapes." *Nature Communications* 9, 4812 (2018)
- Sim, S., Johnson, P.D., and Aspuru-Guzik, A. "Expressibility and entangling capability of parameterized quantum circuits." *Advanced Quantum Technologies* 2, 1900070 (2019)
- Cerezo, M. et al. "Cost function dependent barren plateaus in shallow parametrized quantum circuits." *Nature Communications* 12, 1791 (2021)
- Perez-Salinas, A. et al. "Data re-uploading for a universal quantum classifier." *Quantum* 4, 226 (2020)
