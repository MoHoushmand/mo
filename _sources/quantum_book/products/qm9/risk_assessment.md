# Quantum Risk Assessment

> Monte Carlo simulation with quantum speedup, quantum amplitude estimation for VaR/CVaR, and quantum-enhanced stress testing.

## Classical Monte Carlo in Finance

Financial risk metrics like Value-at-Risk (VaR) and Conditional VaR (CVaR) are typically computed via Monte Carlo simulation: generate $M$ random scenarios, compute portfolio losses for each, and estimate the tail of the loss distribution.

The classical convergence rate is $O(1/\sqrt{M})$: to halve the error, you need 4x more samples. For complex portfolios with many correlated risk factors, this becomes computationally expensive.

## Quantum Amplitude Estimation (QAE)

Quantum amplitude estimation achieves $O(1/M)$ convergence, a quadratic improvement:

| Precision $\epsilon$ | Classical Samples | Quantum Queries |
|---|---:|---:|
| 1% | 10,000 | 100 |
| 0.1% | 1,000,000 | 1,000 |
| 0.01% | 100,000,000 | 10,000 |

### How It Works

1. Encode the probability distribution of portfolio returns into a quantum state using controlled rotations
2. Define an indicator function for losses exceeding the VaR threshold
3. Apply quantum amplitude estimation to extract the probability of the tail event

$$\text{CVaR}_\alpha = \mathbb{E}[L \mid L > \text{VaR}_\alpha]$$

The quantum circuit computes this expectation value directly through amplitude estimation, avoiding the need for millions of classical samples.

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit_finance.circuit.library import NormalDistribution
from qiskit_algorithms import IterativeAmplitudeEstimation
from qiskit.primitives import Sampler

# Encode log-normal returns distribution
n_qubits = 5  # 2^5 = 32 discretization points
bounds = (-0.5, 0.5)  # return range
dist = NormalDistribution(n_qubits, mu=0.02, sigma=0.15, bounds=bounds)

# Amplitude estimation for VaR
iae = IterativeAmplitudeEstimation(
    epsilon_target=0.01,
    alpha=0.05,
    sampler=Sampler()
)
# result = iae.estimate(problem)  # Returns P(loss > threshold)
```
:::
:::{tab-item} Cirq
```python
import cirq
import numpy as np

# Simplified QAE for risk estimation
qubits = cirq.LineQubit.range(5)
ancilla = cirq.LineQubit(5)

def risk_oracle(threshold):
    """Mark states where loss exceeds threshold."""
    circuit = cirq.Circuit()
    # Encode threshold comparison
    # (simplified; full implementation requires arithmetic circuits)
    circuit.append(cirq.X(ancilla).controlled_by(*qubits[:3]))
    return circuit
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
import numpy as np

n_qubits = 5
dev = qml.device("default.qubit", wires=n_qubits + 1)

@qml.qnode(dev)
def risk_circuit(returns_params, threshold):
    # Encode return distribution
    for i in range(n_qubits):
        qml.RY(returns_params[i], wires=i)

    # Mark losses exceeding threshold
    qml.ctrl(qml.PauliX, control=list(range(n_qubits)))(wires=n_qubits)

    return qml.expval(qml.PauliZ(n_qubits))
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import RY, CNOT, H, MEASURE

def risk_estimation_circuit(n_qubits, distribution_params):
    p = Program()
    ro = p.declare('ro', 'BIT', 1)

    # Encode probability distribution
    for i in range(n_qubits):
        p += RY(distribution_params[i], i)

    # Grover iteration for amplitude estimation
    # (simplified; full QAE requires multiple iterations)
    p += MEASURE(n_qubits, ro[0])
    return p
```
:::
::::

## Quantum-Enhanced Stress Testing

Beyond VaR/CVaR, quantum computers can enhance stress testing by:

1. **Scenario generation**: Quantum sampling from complex multivariate distributions
2. **Correlation modeling**: Encoding non-linear correlations between risk factors in quantum states
3. **Extreme event estimation**: Grover search for worst-case portfolio scenarios

## Current State

Quantum risk assessment is in the proof-of-concept stage. IBM and Goldman Sachs have published joint research on quantum amplitude estimation for derivatives pricing. JPMorgan has demonstrated quantum Monte Carlo for option pricing on real hardware.

The path to production requires:
- ~1,000 logical qubits for meaningful portfolio sizes
- Error rates below $10^{-6}$ for accurate amplitude estimation
- Quantum random access memory (QRAM) for efficient data loading

## Further Reading

- Woerner, S. and Egger, D.J. (2019). "Quantum risk analysis." *npj Quantum Information*, 5, 15.
- Stamatopoulos, N. et al. (2020). "Option pricing using quantum computers." *Quantum*, 4, 291.
- {doc}`/quantum_book/foundations/qc/qpe` -- Quantum phase estimation, the foundation of QAE
