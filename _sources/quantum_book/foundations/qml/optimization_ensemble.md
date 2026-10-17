# Optimization and Ensemble Methods

> Quantum-enhanced optimization: QAOA for combinatorial problems, quantum approximate counting, and quantum boosting.

Combinatorial optimization and ensemble learning are two areas where quantum computing may offer near-term advantages. QAOA provides a structured approach to optimization on quantum hardware, while quantum-enhanced ensemble methods explore whether quantum sampling can improve boosting and bagging techniques.

## QAOA for Combinatorial Optimization

QAOA (covered in depth in {doc}`adiabatic`) is the primary quantum algorithm for combinatorial optimization on gate-model hardware. Here we focus on how specific problems are encoded and solved.

### Problem Encoding: QUBO and Ising

Many combinatorial problems can be expressed as Quadratic Unconstrained Binary Optimization (QUBO):

$$\min_{\mathbf{x} \in \{0,1\}^n} \mathbf{x}^T Q \mathbf{x}$$

The QUBO-to-Ising mapping $x_i = (1 - \sigma_i^z)/2$ converts this to finding the ground state of:

$$H_C = \sum_{i<j} J_{ij}\,\sigma_i^z\sigma_j^z + \sum_i h_i\,\sigma_i^z + \text{const}$$

### Example Problems

| Problem | Ising Encoding | Qubits | Two-Body Terms |
|---|---|---|---|
| MaxCut | $H_C = \sum_{(i,j)\in E} \frac{1}{2}(1 - \sigma_i^z\sigma_j^z)$ | $|V|$ | $|E|$ |
| Max-SAT | Clause penalties | $n$ variables | $O(n^2)$ |
| Portfolio optimization | Quadratic risk + return | $n$ assets | $O(n^2)$ |
| Traveling salesman | One-hot city encoding | $n^2$ | $O(n^4)$ |
| Graph coloring | Color assignment | $n \cdot k$ | $O(|E| \cdot k)$ |

```{admonition} Qubit overhead
:class: warning
The number of qubits required often exceeds the natural problem size. TSP with $n$ cities requires $n^2$ qubits in the standard one-hot encoding. Penalty terms for constraints further increase circuit complexity. This overhead limits the problem sizes tractable on near-term hardware.
```

### Warm-Starting QAOA

Standard QAOA initializes in the uniform superposition $|+\rangle^{\otimes n}$. Warm-starting techniques initialize from a classically computed approximate solution, biasing the quantum search toward promising regions:

$$|\psi_0\rangle = \bigotimes_{i=1}^{n} \left(\cos\frac{\alpha_i}{2}|0\rangle + \sin\frac{\alpha_i}{2}|1\rangle\right)$$

where $\alpha_i$ is derived from a classical relaxation. Warm-started QAOA can outperform standard QAOA at low depth.

## Quantum Approximate Counting

Quantum approximate counting estimates the number of solutions to a search problem. Given an oracle that marks solutions, the quantum counting algorithm combines Grover's operator with quantum phase estimation to estimate:

$$\theta = \arcsin\sqrt{M/N}$$

where $M$ is the number of solutions out of $N$ total possibilities. This requires $O(\sqrt{N/M})$ oracle calls, a quadratic improvement over classical counting.

Applications in ML include:
- Estimating the size of hypothesis classes
- Counting satisfying assignments in constraint satisfaction
- Estimating partition functions

## Quantum Boosting

Boosting algorithms (AdaBoost, gradient boosting) combine weak learners into a strong ensemble. Several quantum enhancements have been proposed:

### Quantum Sampling for Boosting

Classical boosting updates a distribution over training examples, emphasizing misclassified points. Quantum computers can prepare and sample from distributions more efficiently in certain cases:

- **Grover-enhanced sampling**: Use amplitude amplification to sample from the re-weighted distribution, achieving quadratic speedup in drawing hard-to-find misclassified examples.
- **Quantum random access**: Store the distribution in a quantum state and perform amplitude estimation to identify the most important training examples.

### QBoost

The QBoost algorithm (Neven et al., 2012) formulates the boosting problem as a QUBO:

$$\min_{\mathbf{w} \in \{0,1\}^T} \sum_{s=1}^{S}\left(\frac{1}{T}\sum_{t=1}^{T} w_t\, h_t(x_s) - y_s\right)^2 + \lambda \sum_t w_t$$

where $h_t$ are weak classifiers and $w_t$ are binary selection variables. This can be solved on a quantum annealer or via QAOA. The quantum advantage lies in exploring the exponentially large space of ensemble combinations.

## Quantum Random Forests

Random forests aggregate predictions from decision trees trained on random subsets of features and data. Quantum enhancements include:

- **Quantum feature selection**: Use Grover search to find optimal feature subsets.
- **Quantum majority voting**: Amplitude estimation for computing the ensemble vote more efficiently than classical counting.
- **Tensor network ensembles**: Represent the ensemble as a tensor network, potentially enabling more expressive combinations.

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit.circuit import QuantumCircuit, Parameter
from qiskit.primitives import StatevectorEstimator
from qiskit.quantum_info import SparsePauliOp
from scipy.optimize import minimize
import numpy as np

# MaxCut on a triangle graph
edges = [(0,1), (1,2), (0,2)]
n_qubits = 3
p = 1

# Cost Hamiltonian: sum of 0.5*(1 - ZiZj) for each edge
terms = []
for i, j in edges:
    label = ['I'] * n_qubits
    label[i] = 'Z'
    label[j] = 'Z'
    terms.append((''.join(reversed(label)), -0.5))
terms.append(('I' * n_qubits, 0.5 * len(edges)))
H_cost = SparsePauliOp.from_list(terms)

gamma = Parameter('γ')
beta = Parameter('β')

qc = QuantumCircuit(n_qubits)
qc.h(range(n_qubits))
# Cost layer
for i, j in edges:
    qc.cx(i, j)
    qc.rz(2 * gamma, j)
    qc.cx(i, j)
# Mixer layer
for i in range(n_qubits):
    qc.rx(2 * beta, i)

estimator = StatevectorEstimator()

def cost(params):
    bound = qc.assign_parameters({gamma: params[0], beta: params[1]})
    job = estimator.run([(bound, H_cost)])
    return -job.result()[0].data.evs  # maximize cut

result = minimize(cost, np.random.randn(2), method='COBYLA')
print(f"MaxCut value: {-result.fun:.4f}")
```
:::
:::{tab-item} Cirq
```python
import cirq
import numpy as np
from scipy.optimize import minimize

qubits = cirq.LineQubit.range(3)
edges = [(0,1), (1,2), (0,2)]

def qaoa_maxcut(params):
    gamma, beta = params
    circuit = cirq.Circuit()
    circuit.append(cirq.H.on_each(*qubits))
    for i, j in edges:
        circuit.append(cirq.ZZPowGate(exponent=gamma/np.pi).on(qubits[i], qubits[j]))
    for q in qubits:
        circuit.append(cirq.rx(2*beta).on(q))
    sim = cirq.Simulator()
    state = sim.simulate(circuit).final_state_vector
    # Compute MaxCut cost
    cost = 0
    for i, j in edges:
        Z = np.ones(8)
        for k in range(8):
            bi = (k >> i) & 1
            bj = (k >> j) & 1
            Z[k] = 1 if bi != bj else 0
        cost += np.sum(np.abs(state)**2 * Z)
    return -cost

result = minimize(qaoa_maxcut, np.random.randn(2), method='COBYLA')
print(f"MaxCut value: {-result.fun:.4f}")
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np

n_qubits = 3
edges = [(0,1), (1,2), (0,2)]
dev = qml.device("default.qubit", wires=n_qubits)

cost_h = qml.Hamiltonian(
    [0.5]*len(edges),
    [qml.Identity(0) - qml.PauliZ(i) @ qml.PauliZ(j) for i, j in edges]
)

@qml.qnode(dev)
def qaoa(gamma, beta):
    for i in range(n_qubits):
        qml.Hadamard(wires=i)
    for i, j in edges:
        qml.CNOT(wires=[i, j])
        qml.RZ(2 * gamma, wires=j)
        qml.CNOT(wires=[i, j])
    for i in range(n_qubits):
        qml.RX(2 * beta, wires=i)
    return qml.expval(cost_h)

opt = qml.AdamOptimizer(0.1)
params = np.array([0.5, 0.5], requires_grad=True)
for _ in range(50):
    params = opt.step(lambda p: -qaoa(p[0], p[1]), params)
print(f"MaxCut value: {qaoa(params[0], params[1]):.4f}")
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CNOT, RZ, RX, MEASURE
from pyquil.api import WavefunctionSimulator
import numpy as np
from scipy.optimize import minimize

edges = [(0,1), (1,2), (0,2)]
n_qubits = 3
sim = WavefunctionSimulator()

def cost(params):
    gamma, beta = params
    prog = Program()
    for i in range(n_qubits):
        prog += H(i)
    for i, j in edges:
        prog += CNOT(i, j)
        prog += RZ(2*gamma, j)
        prog += CNOT(i, j)
    for i in range(n_qubits):
        prog += RX(2*beta, i)
    wf = sim.wavefunction(prog).amplitudes
    # MaxCut cost
    val = 0
    for i, j in edges:
        for k in range(2**n_qubits):
            bi, bj = (k >> i) & 1, (k >> j) & 1
            val += abs(wf[k])**2 * (bi != bj)
    return -val

result = minimize(cost, np.random.randn(2), method='COBYLA')
print(f"MaxCut value: {-result.fun:.4f}")
```
:::
::::

## Further Reading

- Farhi, E., Goldstone, J., and Gutmann, S. "A quantum approximate optimization algorithm." arXiv:1411.4028 (2014)
- Neven, H. et al. "QBoost: Large scale classifier training with adiabatic quantum optimization." *JMLR Workshop and Conference Proceedings* 25, 333-348 (2012)
- Brassard, G. et al. "Quantum amplitude amplification and estimation." *Contemporary Mathematics* 305, 53-74 (2002)
- Egger, D.J. et al. "Quantum computing for finance." *Nature Reviews Physics* 3, 738-748 (2021)
