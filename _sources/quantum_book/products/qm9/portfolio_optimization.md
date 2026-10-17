# Portfolio Optimization

> QAOA and VQE for Markowitz portfolio optimization. Mapping portfolio selection to QUBO and solving on quantum hardware.

## The Markowitz Problem

Given $N$ assets with expected returns $\boldsymbol{\mu} \in \mathbb{R}^N$ and covariance matrix $\boldsymbol{\Sigma} \in \mathbb{R}^{N \times N}$, find the portfolio weights $\mathbf{w}$ that maximize return for a given risk tolerance $\lambda$:

$$\max_{\mathbf{w}} \quad \boldsymbol{\mu}^T \mathbf{w} - \lambda \mathbf{w}^T \boldsymbol{\Sigma} \mathbf{w}$$

subject to $\sum_i w_i = 1$ and $w_i \geq 0$.

For discrete asset selection (buy/don't buy), this becomes a binary optimization problem, which is NP-hard for large portfolios.

## QUBO Formulation

Binary portfolio selection maps naturally to QUBO. Let $x_i \in \{0, 1\}$ indicate whether asset $i$ is included:

$$\min_{\mathbf{x}} \quad \lambda \mathbf{x}^T \boldsymbol{\Sigma} \mathbf{x} - \boldsymbol{\mu}^T \mathbf{x} + A\left(\sum_i x_i - K\right)^2$$

where $K$ is the target number of assets and $A$ is a penalty weight enforcing the cardinality constraint.

## Quantum Approach: QAOA

The Quantum Approximate Optimization Algorithm (QAOA) solves QUBO by encoding the cost function into a quantum Hamiltonian and alternating between cost and mixer unitaries:

$$|\boldsymbol{\gamma}, \boldsymbol{\beta}\rangle = \prod_{p=1}^{P} e^{-i\beta_p H_M} e^{-i\gamma_p H_C} |+\rangle^{\otimes n}$$

where $H_C$ encodes the QUBO cost and $H_M = \sum_i X_i$ is the mixer Hamiltonian.

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit_optimization import QuadraticProgram
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit_algorithms import QAOA
from qiskit_algorithms.optimizers import COBYLA
from qiskit.primitives import Sampler

# Define portfolio problem
qp = QuadraticProgram("portfolio")
for i in range(4):
    qp.binary_var(f"asset_{i}")

# Objective: minimize risk - return
qp.minimize(
    linear=-expected_returns,
    quadratic=risk_factor * covariance_matrix
)

# Solve with QAOA
qaoa = QAOA(sampler=Sampler(), optimizer=COBYLA(maxiter=200), reps=2)
optimizer = MinimumEigenOptimizer(qaoa)
result = optimizer.solve(qp)
print(f"Selected assets: {result.x}")
```
:::
:::{tab-item} Cirq
```python
import cirq
import numpy as np

# Encode QUBO as Ising Hamiltonian
qubits = cirq.LineQubit.range(4)

def qaoa_circuit(gamma, beta, depth=2):
    circuit = cirq.Circuit()
    # Initial superposition
    circuit.append(cirq.H.on_each(*qubits))
    for p in range(depth):
        # Cost unitary (ZZ interactions from covariance)
        for i in range(4):
            for j in range(i+1, 4):
                circuit.append(cirq.ZZPowGate(exponent=gamma[p] * cov[i,j] / np.pi).on(qubits[i], qubits[j]))
        # Mixer unitary
        circuit.append(cirq.rx(2 * beta[p]).on_each(*qubits))
    circuit.append(cirq.measure(*qubits, key='result'))
    return circuit
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import qaoa
import numpy as np

n_assets = 4
dev = qml.device("default.qubit", wires=n_assets)

# Define cost Hamiltonian from covariance matrix
cost_h = qml.Hamiltonian(
    coefficients=[cov[i,j] for i in range(n_assets) for j in range(i+1, n_assets)],
    observables=[qml.PauliZ(i) @ qml.PauliZ(j) for i in range(n_assets) for j in range(i+1, n_assets)]
)
mixer_h = qaoa.x_mixer(range(n_assets))

@qml.qnode(dev)
def cost_function(gamma, beta):
    for i in range(n_assets):
        qml.Hadamard(wires=i)
    for p in range(depth):
        qaoa.cost_layer(gamma[p], cost_h)
        qaoa.mixer_layer(beta[p], mixer_h)
    return qml.expval(cost_h)
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CNOT, RZ, RX
from pyquil.quilbase import Declare

def qaoa_portfolio(gamma, beta, n_assets=4):
    p = Program()
    ro = p.declare('ro', 'BIT', n_assets)

    # Initial superposition
    for i in range(n_assets):
        p += H(i)

    # Cost layer (ZZ from covariance)
    for i in range(n_assets):
        for j in range(i+1, n_assets):
            p += CNOT(i, j)
            p += RZ(2 * gamma * covariance[i,j], j)
            p += CNOT(i, j)

    # Mixer layer
    for i in range(n_assets):
        p += RX(2 * beta, i)

    for i in range(n_assets):
        p += MEASURE(i, ro[i])
    return p
```
:::
::::

## Current Limitations

| Factor | Status |
|---|---|
| Problem size | NISQ: ~20-50 assets; fault-tolerant: 1000+ |
| Circuit depth | QAOA depth $p \geq 3$ needed for quality solutions |
| Noise impact | Significant on current hardware; error mitigation helps |
| Classical competition | Gurobi/CPLEX solve up to ~1000 assets optimally |

The quantum advantage for portfolio optimization is expected when portfolios exceed ~100 assets with complex constraints that make classical solvers struggle.

## Further Reading

- Brandhofer, S. et al. (2022). "Benchmarking the performance of portfolio optimization with QAOA." *Quantum Science and Technology*.
- {doc}`/quantum_book/foundations/qc/vqe` -- The variational approach underlying QAOA
- {doc}`/quantum_book/foundations/qml/optimization_ensemble` -- Broader quantum optimization methods
