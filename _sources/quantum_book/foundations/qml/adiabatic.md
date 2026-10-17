# Adiabatic Quantum Computing

> The adiabatic theorem and quantum annealing for optimization. QAOA as the gate-model bridge to adiabatic computing.

Adiabatic quantum computing (AQC) offers a fundamentally different approach to quantum computation. Instead of applying a sequence of gates, the system is prepared in the ground state of a simple Hamiltonian and then slowly evolved to a problem Hamiltonian whose ground state encodes the answer. The Quantum Approximate Optimization Algorithm (QAOA) bridges adiabatic and gate-model paradigms, making this approach accessible on circuit-based quantum hardware.

## The Adiabatic Theorem

The adiabatic theorem states: if a quantum system starts in the ground state of a Hamiltonian $H_0$ and the Hamiltonian is changed sufficiently slowly to $H_1$, the system remains in the instantaneous ground state throughout the evolution.

The interpolating Hamiltonian is:

$$H(s) = (1 - s)\,H_0 + s\,H_1, \quad s \in [0, 1]$$

where $s = t/T$ parameterizes the evolution time. The runtime $T$ must satisfy:

$$T \gg \frac{\max_{s} |\langle E_1(s)| \frac{dH}{ds} |E_0(s)\rangle|}{\Delta_{\min}^2}$$

where $\Delta_{\min} = \min_s (E_1(s) - E_0(s))$ is the minimum energy gap between the ground state and the first excited state. Small gaps require slow evolution and long runtimes.

```{admonition} The gap determines the difficulty
:class: important
The minimum spectral gap $\Delta_{\min}$ is the critical quantity. For problems where the gap closes polynomially in system size, AQC runs in polynomial time. When the gap closes exponentially (as in some NP-hard problems), AQC provides no speedup over classical brute force.
```

## Setting Up an Optimization Problem

To solve a combinatorial optimization problem using AQC:

1. **Encode the cost function** as a diagonal Hamiltonian $H_1$. For binary optimization, map $x_i \in \{0,1\}$ to $\sigma_i^z$ eigenvalues via $x_i \to (1 - \sigma_i^z)/2$. The cost function becomes an Ising Hamiltonian:

$$H_1 = -\sum_{\langle i,j\rangle} J_{ij}\,\sigma_i^z \sigma_j^z + \sum_i h_i\,\sigma_i^z$$

2. **Choose a mixing Hamiltonian** $H_0 = -\sum_i \sigma_i^x$, whose ground state is the uniform superposition $|+\rangle^{\otimes n}$. This state is easy to prepare.

3. **Evolve** from $H_0$ to $H_1$ according to the interpolation schedule.

4. **Measure** in the computational basis. The result is the (approximate) solution to the optimization problem.

## Quantum Annealing

Quantum annealing is the practical, finite-temperature implementation of AQC. D-Wave's quantum processors implement this approach with thousands of qubits. Key differences from ideal AQC:

- The system operates at finite temperature, so thermal excitations can kick the system out of the ground state.
- The annealing schedule is not guaranteed to be slow enough for adiabaticity.
- Connectivity is limited; not all qubit pairs interact directly.

Despite these limitations, quantum annealing has shown practical utility for sampling, optimization heuristics, and hybrid workflows.

## From Adiabatic to Gate Model: QAOA

The Quantum Approximate Optimization Algorithm (QAOA) discretizes the adiabatic path into $p$ steps, each parameterized by angles $(\beta_k, \gamma_k)$:

$$|\boldsymbol{\gamma}, \boldsymbol{\beta}\rangle = \prod_{k=1}^{p} e^{-i\beta_k H_0}\, e^{-i\gamma_k H_1}\, |+\rangle^{\otimes n}$$

For $p \to \infty$ with appropriate parameter schedules, QAOA recovers the adiabatic evolution. For finite $p$, QAOA is a variational algorithm: $\gamma_k$ and $\beta_k$ are optimized classically to minimize $\langle H_1 \rangle$.

### QAOA Circuit Structure

For a MaxCut problem on a graph $G = (V, E)$:

1. Initialize all qubits in $|+\rangle$ (apply $H$ to each qubit).
2. For each QAOA layer $k = 1, \ldots, p$:
   - **Cost layer**: For each edge $(i,j) \in E$, apply $e^{-i\gamma_k \sigma_i^z \sigma_j^z}$ (implemented as CNOT-$R_z$-CNOT).
   - **Mixer layer**: For each qubit $i$, apply $R_x(2\beta_k)$.
3. Measure all qubits.

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit.circuit import QuantumCircuit, Parameter
import numpy as np

n_qubits = 4
p = 2  # QAOA depth
edges = [(0,1), (1,2), (2,3), (3,0)]  # cycle graph

gamma = [Parameter(f'γ_{k}') for k in range(p)]
beta = [Parameter(f'β_{k}') for k in range(p)]

qc = QuantumCircuit(n_qubits)

# Initial state: uniform superposition
qc.h(range(n_qubits))

for k in range(p):
    # Cost layer: ZZ interactions for each edge
    for i, j in edges:
        qc.cx(i, j)
        qc.rz(2 * gamma[k], j)
        qc.cx(i, j)
    # Mixer layer: X rotations
    for i in range(n_qubits):
        qc.rx(2 * beta[k], i)

qc.measure_all()
print(qc)
```
:::
:::{tab-item} Cirq
```python
import cirq
import sympy

n_qubits = 4
p = 2
qubits = cirq.LineQubit.range(n_qubits)
edges = [(0,1), (1,2), (2,3), (3,0)]

circuit = cirq.Circuit()
circuit.append(cirq.H.on_each(*qubits))

for k in range(p):
    gamma = sympy.Symbol(f'γ_{k}')
    beta = sympy.Symbol(f'β_{k}')
    # Cost layer
    for i, j in edges:
        circuit.append(cirq.ZZPowGate(exponent=gamma / np.pi).on(qubits[i], qubits[j]))
    # Mixer layer
    for i in range(n_qubits):
        circuit.append(cirq.rx(2 * beta).on(qubits[i]))

circuit.append(cirq.measure(*qubits, key='result'))
print(circuit)
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np

n_qubits = 4
p = 2
edges = [(0,1), (1,2), (2,3), (3,0)]
dev = qml.device("default.qubit", wires=n_qubits)

def cost_hamiltonian():
    coeffs = [-0.5] * len(edges)
    obs = [qml.PauliZ(i) @ qml.PauliZ(j) for i, j in edges]
    return qml.Hamiltonian(coeffs, obs)

@qml.qnode(dev)
def qaoa_circuit(gamma, beta):
    for i in range(n_qubits):
        qml.Hadamard(wires=i)
    for k in range(p):
        # Cost layer
        for i, j in edges:
            qml.CNOT(wires=[i, j])
            qml.RZ(2 * gamma[k], wires=j)
            qml.CNOT(wires=[i, j])
        # Mixer layer
        for i in range(n_qubits):
            qml.RX(2 * beta[k], wires=i)
    return qml.expval(cost_hamiltonian())

gamma = np.random.uniform(0, 2*np.pi, p)
beta = np.random.uniform(0, np.pi, p)
print(f"Cost: {qaoa_circuit(gamma, beta):.4f}")
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CNOT, RZ, RX, MEASURE
import numpy as np

n_qubits = 4
p = 2
edges = [(0,1), (1,2), (2,3), (3,0)]

prog = Program()
ro = prog.declare('ro', 'BIT', n_qubits)

# Initial superposition
for i in range(n_qubits):
    prog += H(i)

# QAOA layers (with fixed example parameters)
gamma = np.random.uniform(0, 2*np.pi, p)
beta = np.random.uniform(0, np.pi, p)

for k in range(p):
    for i, j in edges:
        prog += CNOT(i, j)
        prog += RZ(2 * gamma[k], j)
        prog += CNOT(i, j)
    for i in range(n_qubits):
        prog += RX(2 * beta[k], i)

for i in range(n_qubits):
    prog += MEASURE(i, ro[i])

print(prog)
```
:::
::::

## QAOA Performance

| $p$ (depth) | Approximation Ratio (MaxCut) | Notes |
|---|---|---|
| 1 | $\geq 0.6924$ | Proven bound for 3-regular graphs |
| 2 | $\geq 0.7559$ | Improved but diminishing returns |
| $p \to \infty$ | 1.0 | Recovers optimal solution |
| Classical best (GW) | $\geq 0.878$ | Goemans-Williamson SDP relaxation |

At low depth, QAOA underperforms the best classical approximation algorithms. The potential advantage lies in scaling to larger $p$ on quantum hardware where classical simulation becomes intractable.

## Further Reading

- Farhi, E., Goldstone, J., and Gutmann, S. "A quantum approximate optimization algorithm." arXiv:1411.4028 (2014)
- Albash, T. and Lidar, D.A. "Adiabatic quantum computation." *Reviews of Modern Physics* 90, 015002 (2018)
- Zhou, L. et al. "Quantum approximate optimization algorithm: performance, mechanism, and implementation on near-term devices." *Physical Review X* 10, 021067 (2020)
- Lucas, A. "Ising formulations of many NP problems." *Frontiers in Physics* 2, 5 (2014)
