# Quantum Navier-Stokes Solvers

> Applying HHL and variational quantum linear solvers to discretized Navier-Stokes equations. Complexity analysis and current limitations.

## The Navier-Stokes Equations

The incompressible Navier-Stokes equations govern fluid motion:

$$\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla)\mathbf{u} = -\frac{1}{\rho}\nabla p + \nu \nabla^2 \mathbf{u}$$

$$\nabla \cdot \mathbf{u} = 0$$

where $\mathbf{u}$ is the velocity field, $p$ is pressure, $\rho$ is density, and $\nu$ is kinematic viscosity.

After spatial discretization (finite difference, finite volume, or finite element), each timestep reduces to solving:

$$\mathbf{A}\mathbf{x}^{n+1} = \mathbf{b}(\mathbf{x}^n)$$

This is where quantum linear solvers enter.

## HHL for Navier-Stokes

The HHL algorithm solves $\mathbf{A}\mathbf{x} = \mathbf{b}$ in $O(\log N \cdot \kappa^2 \cdot s^2 / \epsilon)$ time, exponentially faster in $N$ than classical methods.

### Requirements for HHL

| Requirement | Navier-Stokes Context | Challenge |
|---|---|---|
| Sparse $\mathbf{A}$ | FD/FV matrices are sparse | Satisfied |
| Low condition number $\kappa$ | CFD matrices: $\kappa \sim 10^3 - 10^6$ | Problematic; preconditioning needed |
| Efficient $\|b\rangle$ preparation | Requires quantum state encoding | $O(N)$ cost negates $O(\log N)$ advantage |
| Useful output | Often need full velocity field, not just expectation values | Readout bottleneck |

### Linearization

The nonlinear convective term $(\mathbf{u} \cdot \nabla)\mathbf{u}$ must be linearized for quantum linear solvers. Common approaches:

- **Picard iteration**: Replace $\mathbf{u}$ with previous iterate $\mathbf{u}^{(k)}$
- **Newton linearization**: Linearize around the current solution
- **Operator splitting**: Separate advection from diffusion

Each approach converts the nonlinear PDE into a sequence of linear systems.

## Variational Approach (VQLS)

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.circuit import ParameterVector
import numpy as np

def vqls_ansatz(n_qubits, depth=3):
    """Hardware-efficient ansatz for VQLS."""
    params = ParameterVector('theta', n_qubits * depth * 2)
    qc = QuantumCircuit(n_qubits)

    idx = 0
    for d in range(depth):
        for i in range(n_qubits):
            qc.ry(params[idx], i)
            qc.rz(params[idx + 1], i)
            idx += 2
        for i in range(n_qubits - 1):
            qc.cx(i, i + 1)

    return qc, params

# For a 2D Laplacian (diffusion term):
# A = tridiagonal(-1, 2, -1) / dx^2
# Decompose A into sum of Pauli strings for Hamiltonian simulation
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
import numpy as np

n_qubits = 4  # Encodes 2^4 = 16 grid points
dev = qml.device("default.qubit", wires=n_qubits)

@qml.qnode(dev)
def vqls_cost(params, A_coeffs, A_paulis, b_state):
    """VQLS cost function for Navier-Stokes linear system."""
    # Prepare ansatz |x(theta)>
    for i in range(n_qubits):
        qml.RY(params[2*i], wires=i)
        qml.RZ(params[2*i+1], wires=i)
    for i in range(n_qubits - 1):
        qml.CNOT(wires=[i, i+1])

    # Compute <x|A†A|x> and |<b|A|x>|^2
    return qml.expval(qml.Hermitian(A_matrix, wires=range(n_qubits)))
```
:::
::::

## Complexity Comparison

| Method | Complexity | Practical for CFD? |
|---|---|---|
| Classical CG/GMRES | $O(N \cdot \kappa \cdot s)$ | Yes (standard tool) |
| HHL (ideal) | $O(\log N \cdot \kappa^2 \cdot s^2 / \epsilon)$ | Only if data loading is cheap |
| VQLS (NISQ) | $O(\text{poly}(\kappa) \cdot \text{circuit depth})$ | Proof-of-concept stage |
| Quantum-inspired classical | $O(N \cdot \text{polylog}(N))$ | Growing competitor |

```{admonition} The Data Loading Problem
:class: warning
The exponential speedup of HHL applies to the linear solve step. However, encoding the classical right-hand side $\mathbf{b}$ into a quantum state and extracting the classical solution $\mathbf{x}$ both require $O(N)$ operations. For end-to-end quantum advantage, the problem must either start and end in quantum form, or use quantum random access memory (QRAM), which does not yet exist at scale.
```

## Research Directions

1. **Quantum-quantum pipeline**: Couple quantum PDE solvers with quantum optimization (avoid classical I/O)
2. **QRAM development**: Efficient quantum data loading would unlock HHL's full potential
3. **Preconditioning**: Reduce $\kappa$ before quantum solve to improve scaling
4. **Hybrid schemes**: Use quantum for the most expensive substep (e.g., pressure Poisson equation) and classical for the rest

## Further Reading

- Gaitan, F. (2020). "Finding flows of a Navier-Stokes fluid through quantum computing." *npj Quantum Information*, 6, 61.
- {doc}`/quantum_book/foundations/qml/matrix_inversion` -- HHL algorithm theory
- {doc}`cfd` -- Broader quantum CFD approaches
