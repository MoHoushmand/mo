# Variational Quantum Eigensolver (VQE)

> A hybrid quantum-classical algorithm for finding ground state energies. Ansatz design, parameter optimization, and applications in quantum chemistry.

The Variational Quantum Eigensolver (VQE), proposed by Peruzzo et al. in 2014, is the most prominent algorithm designed for near-term quantum hardware. Unlike QPE (which requires deep circuits and error correction), VQE uses shallow parameterized circuits that fit within NISQ device capabilities. It is a hybrid algorithm: a quantum computer evaluates the energy of a trial state, and a classical optimizer updates the circuit parameters to minimize it.

## The Variational Principle

The foundation of VQE is the variational principle from quantum mechanics:

$$E_0 \leq \langle\psi(\vec\theta)|H|\psi(\vec\theta)\rangle$$

For any parameterized state $|\psi(\vec\theta)\rangle$, its expectation value of the Hamiltonian $H$ is an upper bound on the true ground state energy $E_0$. By minimizing over the parameters $\vec\theta$, VQE finds the best approximation to $E_0$ within the expressibility of the ansatz.

## The Algorithm

1. Choose an **ansatz** (parameterized circuit) $U(\vec\theta)$
2. Prepare the trial state $|\psi(\vec\theta)\rangle = U(\vec\theta)|0\rangle^{\otimes n}$
3. Measure the expectation value $\langle H \rangle = \langle\psi(\vec\theta)|H|\psi(\vec\theta)\rangle$
4. Feed the energy to a **classical optimizer** that updates $\vec\theta$
5. Repeat until convergence

```
┌──────────────────────────────────────────┐
│  Classical Optimizer (COBYLA, L-BFGS-B)  │
│          updates θ                       │
└──────────────┬───────────────────────────┘
               │ θ
               ▼
┌──────────────────────────────────────────┐
│  Quantum Computer                        │
│  |0>──[U(θ)]──[Measure H terms]──→ <H>  │
└──────────────────────────────────────────┘
```

## Hamiltonian Decomposition

Quantum computers can only measure in the computational basis (Pauli-Z eigenbasis). To measure $\langle H \rangle$ for a general Hamiltonian, decompose it into a sum of Pauli strings:

$$H = \sum_i c_i P_i, \quad P_i \in \{I, X, Y, Z\}^{\otimes n}$$

Each Pauli string $P_i$ is measured independently, and the total energy is:

$$\langle H \rangle = \sum_i c_i \langle P_i \rangle$$

For a molecular Hamiltonian, the number of Pauli terms scales as $O(n^4)$ where $n$ is the number of spin-orbitals. Grouping commuting terms reduces the number of distinct measurement circuits needed.

```{admonition} Measurement Overhead
:class: warning
Each Pauli term requires many shots (measurements) to estimate $\langle P_i \rangle$ to precision $\epsilon$. With $M$ Pauli terms and $S$ shots per term, the total measurement cost is $O(M \cdot S / \epsilon^2)$. This measurement overhead is one of the primary bottlenecks of VQE.
```

## Ansatz Design

The choice of ansatz determines the quality and cost of VQE. Common choices:

**Hardware-efficient ansatz**: Layers of single-qubit rotations and entangling gates, designed to match hardware connectivity. Maximally expressive but may have optimization landscapes with barren plateaus.

**UCCSD (Unitary Coupled Cluster Singles and Doubles)**: Chemistry-inspired ansatz that applies fermionic excitation operators. More physically motivated, with better convergence properties but deeper circuits.

**ADAPT-VQE**: Iteratively grows the ansatz by adding the operator with the largest gradient at each step. Produces compact circuits tailored to the specific problem.

| Ansatz | Depth | Expressibility | Trainability |
|---|---|---|---|
| Hardware-efficient | Shallow | High | Barren plateaus at scale |
| UCCSD | Deep | Chemistry-specific | Good convergence |
| ADAPT-VQE | Adaptive | Problem-tailored | Best convergence |

## Classical Optimizers

VQE performance depends heavily on the classical optimizer. Common choices:

| Optimizer | Type | Gradient-based | Best For |
|---|---|---|---|
| COBYLA | Derivative-free | No | Noisy landscapes |
| Nelder-Mead | Derivative-free | No | Low dimensions |
| L-BFGS-B | Quasi-Newton | Yes | Smooth landscapes |
| SPSA | Stochastic | Approximate | Noisy gradients |
| Adam | Gradient descent | Yes | Many parameters |

```{tip}
On noisy hardware, gradient-free optimizers (COBYLA, SPSA) often outperform gradient-based methods because shot noise and hardware noise corrupt gradient estimates. The parameter-shift rule provides exact gradients on noiseless simulators but suffers on real devices.
```

## Implementations

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorEstimator
from qiskit.quantum_info import SparsePauliOp
from scipy.optimize import minimize
import numpy as np

# H2 Hamiltonian (simplified, STO-3G basis)
H = SparsePauliOp.from_list([
    ("II", -1.0523),
    ("IZ",  0.3979),
    ("ZI", -0.3979),
    ("ZZ", -0.0112),
    ("XX",  0.1809),
])

def ansatz(params):
    qc = QuantumCircuit(2)
    qc.ry(params[0], 0)
    qc.ry(params[1], 1)
    qc.cx(0, 1)
    qc.ry(params[2], 0)
    qc.ry(params[3], 1)
    return qc

estimator = StatevectorEstimator()

def cost_function(params):
    qc = ansatz(params)
    job = estimator.run([(qc, H)])
    return job.result()[0].data.evs

result = minimize(cost_function, x0=np.random.randn(4),
                  method='COBYLA')
print(f"Ground state energy: {result.fun:.4f} Ha")
```
:::

:::{tab-item} Cirq
```python
import cirq
import numpy as np
from scipy.optimize import minimize

# Define qubits and Hamiltonian terms
q0, q1 = cirq.LineQubit.range(2)

def ansatz_circuit(params):
    return cirq.Circuit([
        cirq.ry(params[0])(q0),
        cirq.ry(params[1])(q1),
        cirq.CNOT(q0, q1),
        cirq.ry(params[2])(q0),
        cirq.ry(params[3])(q1),
    ])

simulator = cirq.Simulator()

def evaluate_energy(params):
    circuit = ansatz_circuit(params)
    result = simulator.simulate(circuit)
    state = result.final_state_vector
    # Compute <H> from state vector
    # (simplified: use cirq.PauliString for full implementation)
    ZZ = np.diag([1, -1, -1, 1])
    return np.real(state.conj() @ ZZ @ state)

result = minimize(evaluate_energy, x0=np.random.randn(4),
                  method='COBYLA')
print(f"Energy: {result.fun:.4f}")
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np

# H2 Hamiltonian
coeffs = [-1.0523, 0.3979, -0.3979, -0.0112, 0.1809]
obs = [
    qml.Identity(0) @ qml.Identity(1),
    qml.Identity(0) @ qml.PauliZ(1),
    qml.PauliZ(0) @ qml.Identity(1),
    qml.PauliZ(0) @ qml.PauliZ(1),
    qml.PauliX(0) @ qml.PauliX(1),
]
H = qml.Hamiltonian(coeffs, obs)

dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def circuit(params):
    qml.RY(params[0], wires=0)
    qml.RY(params[1], wires=1)
    qml.CNOT(wires=[0, 1])
    qml.RY(params[2], wires=0)
    qml.RY(params[3], wires=1)
    return qml.expval(H)

# PennyLane native optimizer
opt = qml.GradientDescentOptimizer(stepsize=0.4)
params = np.random.randn(4, requires_grad=True)

for step in range(100):
    params = opt.step(circuit, params)

print(f"Ground state energy: {circuit(params):.4f} Ha")
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import RY, CNOT
from pyquil.quilbase import Declare
import numpy as np
from scipy.optimize import minimize

def vqe_ansatz(params):
    p = Program()
    ro = p.declare('ro', 'BIT', 2)
    theta = p.declare('theta', 'REAL', 4)

    p += RY(theta[0], 0)
    p += RY(theta[1], 1)
    p += CNOT(0, 1)
    p += RY(theta[2], 0)
    p += RY(theta[3], 1)
    return p

# On a QVM (Quantum Virtual Machine):
# from pyquil import get_qc
# qc = get_qc('2q-qvm')
# executable = qc.compile(vqe_ansatz(params))
# results = qc.run(executable, memory_map={'theta': params})
# ... compute expectation values from measurement results
```
:::

::::

## Challenges and Limitations

**Barren plateaus**: For random parameterized circuits, gradients vanish exponentially with system size, making optimization intractable. This is particularly severe for hardware-efficient ansatze.

**Local minima**: The VQE cost landscape is generally non-convex. Classical optimizers can get trapped in local minima that are far from the true ground state energy.

**Noise**: Hardware noise biases energy estimates upward and corrupts optimizer gradients. Error mitigation techniques (zero-noise extrapolation, probabilistic error cancellation) can partially compensate.

```{important}
Whether VQE can achieve quantum advantage for practically relevant molecular systems remains an open question. For molecules small enough to simulate classically, VQE offers no advantage. For molecules large enough that classical simulation fails, VQE requires circuits too deep for current NISQ hardware. Closing this gap is an active area of research.
```

## Further Reading

- Peruzzo, A. et al. "A variational eigenvalue solver on a photonic quantum processor." *Nature Communications* 5, 4213 (2014). [arXiv:1304.3061](https://arxiv.org/abs/1304.3061)
- Tilly, J. et al. "The Variational Quantum Eigensolver: a review of methods and best practices." *Physics Reports* 986, 1-128 (2022). [arXiv:2111.05176](https://arxiv.org/abs/2111.05176)
- McClean, J. R. et al. "Barren plateaus in quantum neural network training landscapes." *Nature Communications* 9, 4812 (2018). [arXiv:1803.11173](https://arxiv.org/abs/1803.11173)
