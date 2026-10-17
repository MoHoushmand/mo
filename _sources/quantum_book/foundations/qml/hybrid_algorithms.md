# Hybrid Quantum-Classical Algorithms

> VQE, QAOA, quantum neural networks, and the variational principle. Classical optimizers (COBYLA, SPSA, Adam) for quantum parameters.

Hybrid quantum-classical algorithms partition computation between a quantum processor (which evaluates short circuits) and a classical processor (which optimizes circuit parameters). This division is not a compromise; it is a design principle that matches the strengths of each processor type. The quantum circuit explores a Hilbert space that is exponentially large, while the classical optimizer navigates a parameter landscape that is polynomially sized.

## The Hybrid Loop

The general structure of a hybrid algorithm:

1. A classical optimizer proposes parameters $\boldsymbol{\theta}$.
2. A parameterized quantum circuit $U(\boldsymbol{\theta})$ is executed on quantum hardware.
3. Measurements yield an estimate of the cost function $C(\boldsymbol{\theta})$.
4. The optimizer updates $\boldsymbol{\theta}$ based on $C$ (and optionally its gradient).
5. Repeat until convergence.

The cost function is typically an expectation value:

$$C(\boldsymbol{\theta}) = \langle 0|U^\dagger(\boldsymbol{\theta})\, H\, U(\boldsymbol{\theta})|0\rangle$$

where $H$ is a problem-specific Hamiltonian or observable.

## Variational Quantum Eigensolver (VQE)

VQE finds the ground state energy of a Hamiltonian $H$ using the variational principle:

$$E_0 \leq \langle\psi(\boldsymbol{\theta})|H|\psi(\boldsymbol{\theta})\rangle \quad \text{for all } \boldsymbol{\theta}$$

The minimum over all parameters gives an upper bound on the ground state energy. VQE is the most studied hybrid algorithm and the primary approach for quantum chemistry on near-term devices.

### VQE for Molecular Hamiltonians

A molecular Hamiltonian in second quantization is mapped to qubit operators via Jordan-Wigner or Bravyi-Kitaev transformations. The result is a sum of Pauli strings:

$$H = \sum_i c_i P_i, \quad P_i \in \{I, X, Y, Z\}^{\otimes n}$$

Each term $\langle P_i \rangle$ is measured independently, and the results are classically summed with coefficients $c_i$.

```{admonition} Measurement overhead
:class: note
A molecular Hamiltonian on $n$ qubits may have $O(n^4)$ Pauli terms. Each term requires separate measurements (or grouping into commuting sets). This measurement overhead often dominates the total runtime of VQE.
```

## QAOA

The Quantum Approximate Optimization Algorithm applies the hybrid framework to combinatorial optimization. The circuit structure is fixed by the problem Hamiltonian (see {doc}`adiabatic`), and the classical optimizer tunes the $2p$ parameters $(\boldsymbol{\gamma}, \boldsymbol{\beta})$.

QAOA differs from generic VQE in that the ansatz is problem-inspired: the cost and mixer layers directly implement the problem structure, rather than using a hardware-efficient template.

## Quantum Neural Networks

Quantum neural networks (QNNs) use the hybrid framework for supervised learning tasks. The circuit takes classical data as input (via data encoding) and outputs predictions via measurement.

A QNN with $L$ layers computes:

$$f(\mathbf{x}; \boldsymbol{\theta}) = \langle 0|U^\dagger(\mathbf{x}, \boldsymbol{\theta})\, O\, U(\mathbf{x}, \boldsymbol{\theta})|0\rangle$$

where $O$ is a measurement observable. Training minimizes a loss function:

$$\mathcal{L}(\boldsymbol{\theta}) = \frac{1}{N}\sum_{i=1}^{N} \ell(f(\mathbf{x}_i; \boldsymbol{\theta}), y_i)$$

with $\ell$ being a task-specific loss (mean squared error for regression, cross-entropy for classification).

## Classical Optimizers

The choice of classical optimizer is critical. Quantum cost landscapes are noisy (due to shot noise and hardware noise) and potentially non-convex.

| Optimizer | Gradient-Free | Noise Robust | Notes |
|---|---|---|---|
| COBYLA | Yes | Moderate | Constrained optimization, good for few parameters |
| Nelder-Mead | Yes | Low | Simplex method, struggles in high dimensions |
| SPSA | No (approximates) | High | Stochastic perturbation, only 2 cost evaluations per step |
| Adam | No | Moderate | Momentum-based, requires gradient estimates |
| L-BFGS-B | No | Low | Quasi-Newton, fast convergence but noise-sensitive |
| NFT (Natural Gradient) | No | Moderate | Uses quantum Fisher information, better convergence |

### The Parameter Shift Rule

Gradients of quantum circuits can be computed exactly (up to shot noise) using the **parameter shift rule**. For a gate $R(\theta) = e^{-i\theta G/2}$ where $G$ has eigenvalues $\pm 1$:

$$\frac{\partial C}{\partial \theta} = \frac{C(\theta + \pi/2) - C(\theta - \pi/2)}{2}$$

This requires two circuit evaluations per parameter, making gradient computation scale linearly with the number of parameters.

```{tip}
SPSA (Simultaneous Perturbation Stochastic Approximation) requires only 2 circuit evaluations per optimization step regardless of the number of parameters, making it attractive for circuits with many parameters on noisy hardware.
```

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit.circuit import QuantumCircuit, Parameter
from qiskit.primitives import StatevectorEstimator
from qiskit.quantum_info import SparsePauliOp
from scipy.optimize import minimize
import numpy as np

# Simple VQE: find ground state of H = Z0 Z1 + 0.5 X0
H = SparsePauliOp.from_list([("ZZ", 1.0), ("XI", 0.5)])

n_qubits = 2
theta = [Parameter(f'θ_{i}') for i in range(4)]

qc = QuantumCircuit(n_qubits)
qc.ry(theta[0], 0)
qc.ry(theta[1], 1)
qc.cx(0, 1)
qc.ry(theta[2], 0)
qc.ry(theta[3], 1)

estimator = StatevectorEstimator()

def cost(params):
    bound = qc.assign_parameters(dict(zip(theta, params)))
    job = estimator.run([(bound, H)])
    return job.result()[0].data.evs

result = minimize(cost, np.random.randn(4), method='COBYLA')
print(f"Ground state energy: {result.fun:.4f}")
```
:::
:::{tab-item} Cirq
```python
import cirq
import numpy as np
from scipy.optimize import minimize

qubits = cirq.LineQubit.range(2)

def build_circuit(params):
    circuit = cirq.Circuit([
        cirq.ry(params[0]).on(qubits[0]),
        cirq.ry(params[1]).on(qubits[1]),
        cirq.CNOT(qubits[0], qubits[1]),
        cirq.ry(params[2]).on(qubits[0]),
        cirq.ry(params[3]).on(qubits[1]),
    ])
    return circuit

def cost(params):
    circuit = build_circuit(params)
    sim = cirq.Simulator()
    result = sim.simulate(circuit)
    state = result.final_state_vector
    # H = Z0 Z1 + 0.5 X0
    ZZ = np.diag([1, -1, -1, 1])
    XI = np.kron(np.array([[0,1],[1,0]]), np.eye(2))
    H = ZZ + 0.5 * XI
    return np.real(state.conj() @ H @ state)

result = minimize(cost, np.random.randn(4), method='COBYLA')
print(f"Ground state energy: {result.fun:.4f}")
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np

dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def cost_fn(params):
    qml.RY(params[0], wires=0)
    qml.RY(params[1], wires=1)
    qml.CNOT(wires=[0, 1])
    qml.RY(params[2], wires=0)
    qml.RY(params[3], wires=1)
    # H = Z0 Z1 + 0.5 X0
    return qml.expval(
        qml.PauliZ(0) @ qml.PauliZ(1) + 0.5 * qml.PauliX(0)
    )

opt = qml.AdamOptimizer(stepsize=0.1)
params = np.random.randn(4, requires_grad=True)

for step in range(100):
    params = opt.step(cost_fn, params)

print(f"Ground state energy: {cost_fn(params):.4f}")
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import RY, CNOT
from pyquil.api import WavefunctionSimulator
import numpy as np
from scipy.optimize import minimize

sim = WavefunctionSimulator()

def cost(params):
    prog = Program()
    prog += RY(params[0], 0)
    prog += RY(params[1], 1)
    prog += CNOT(0, 1)
    prog += RY(params[2], 0)
    prog += RY(params[3], 1)
    wf = sim.wavefunction(prog).amplitudes
    # H = Z0 Z1 + 0.5 X0
    ZZ = np.diag([1, -1, -1, 1])
    XI = np.kron(np.array([[0,1],[1,0]]), np.eye(2))
    H = ZZ + 0.5 * XI
    return np.real(wf.conj() @ H @ wf)

result = minimize(cost, np.random.randn(4), method='COBYLA')
print(f"Ground state energy: {result.fun:.4f}")
```
:::
::::

## Further Reading

- Peruzzo, A. et al. "A variational eigenvalue solver on a photonic quantum processor." *Nature Communications* 5, 4213 (2014)
- Cerezo, M. et al. "Variational quantum algorithms." *Nature Reviews Physics* 3, 625-644 (2021)
- Mitarai, K. et al. "Quantum circuit learning." *Physical Review A* 98, 032309 (2018)
- Schuld, M. et al. "Evaluating analytic gradients on quantum hardware." *Physical Review A* 99, 032331 (2019)
