# Quantum CFD

> Quantum algorithms for fluid dynamics simulation. Lattice Boltzmann methods, quantum linear solvers for Navier-Stokes, and turbulence modeling.

## Why Quantum for CFD?

Computational fluid dynamics requires solving systems of partial differential equations (PDEs) on fine spatial grids. After discretization, these become large sparse linear systems:

$$\mathbf{A}\mathbf{x} = \mathbf{b}$$

where $\mathbf{A}$ is an $N \times N$ sparse matrix, $N$ can be $10^6$ to $10^9$ for practical 3D simulations.

Classical solvers (GMRES, conjugate gradient) scale as $O(N \cdot \kappa \cdot s)$ where $\kappa$ is the condition number and $s$ is the sparsity. The HHL quantum algorithm promises $O(\log N \cdot \kappa^2 \cdot s^2)$, an exponential improvement in $N$ under specific conditions.

## Quantum Lattice Boltzmann Method

The lattice Boltzmann method (LBM) simulates fluid dynamics by tracking particle distribution functions on a lattice rather than solving the Navier-Stokes equations directly. Quantum LBM encodes distribution functions in qubit amplitudes:

$$f_i(\mathbf{x}, t) \rightarrow \alpha_i |i\rangle$$

A quantum circuit performs the collision and streaming steps:

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
import numpy as np

def quantum_lbm_step(n_velocities: int = 9):
    """One step of D2Q9 quantum lattice Boltzmann."""
    n_qubits = int(np.ceil(np.log2(n_velocities)))
    qc = QuantumCircuit(n_qubits)

    # Encode distribution function
    # (amplitude encoding of f_i values)
    qc.initialize(distribution_amplitudes, range(n_qubits))

    # Collision operator (relaxation toward equilibrium)
    # Implemented as a unitary rotation
    qc.ry(omega * delta_t, 0)  # BGK collision

    # Streaming (permutation of velocity directions)
    # Implemented as SWAP network
    qc.swap(0, 1)

    return qc
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
import numpy as np

n_qubits = 4  # Encodes D2Q9 lattice directions
dev = qml.device("default.qubit", wires=n_qubits)

@qml.qnode(dev)
def lbm_collision_step(distribution, omega):
    """Quantum collision operator for LBM."""
    # Encode current distribution
    qml.AmplitudeEmbedding(distribution, wires=range(n_qubits), normalize=True)

    # BGK collision: relax toward equilibrium
    for i in range(n_qubits):
        qml.RY(omega, wires=i)

    return qml.state()
```
:::
::::

## Variational Quantum Linear Solver (VQLS)

For near-term quantum hardware, VQLS provides an alternative to HHL that works with shallow circuits:

$$\min_{\boldsymbol{\theta}} \quad C(\boldsymbol{\theta}) = 1 - \frac{|\langle \mathbf{b} | \mathbf{A} | \psi(\boldsymbol{\theta}) \rangle|^2}{\langle \psi(\boldsymbol{\theta}) | \mathbf{A}^\dagger \mathbf{A} | \psi(\boldsymbol{\theta}) \rangle}$$

The cost function $C$ is zero when $|\psi(\boldsymbol{\theta})\rangle$ is proportional to $\mathbf{A}^{-1}|\mathbf{b}\rangle$.

## Current Limitations

| Challenge | Impact |
|---|---|
| Data loading | Encoding classical data into quantum states costs $O(N)$, erasing the $O(\log N)$ advantage |
| Readout | Extracting the full solution requires $O(N)$ measurements |
| Matrix sparsity | HHL/VQLS require efficient Hamiltonian simulation of $\mathbf{A}$ |
| Condition number | Both algorithms scale with $\kappa$; CFD matrices are often ill-conditioned |
| Problem size | Current QPUs handle $N \sim 10^2$; practical CFD needs $N \sim 10^6$+ |

## Further Reading

- Budinski, L. (2022). "Quantum algorithm for the Navier-Stokes equations." *Applied Sciences*.
- Bharadwaj, S. and Sreenivasan, K.R. (2023). "Hybrid quantum-classical approach to fluid dynamics." *Physical Review A*.
- {doc}`/quantum_book/foundations/qml/matrix_inversion` -- The HHL algorithm in detail
