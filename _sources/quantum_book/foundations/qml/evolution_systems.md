# Evolution of Quantum Systems

> Time evolution under Hamiltonians, the Schrodinger equation, unitary evolution, and how it maps to quantum circuit execution.

Every quantum computation is fundamentally a controlled time evolution. Understanding how quantum states evolve under Hamiltonians connects the physics of quantum systems to the gates and circuits used in quantum machine learning. This chapter covers the mathematical framework of quantum dynamics and its direct mapping to circuit execution.

## The Schrodinger Equation

The state of a closed quantum system evolves according to the time-dependent Schrodinger equation:

$$i\hbar \frac{\partial}{\partial t}|\psi(t)\rangle = H(t)|\psi(t)\rangle$$

where $H(t)$ is the Hamiltonian operator (a Hermitian matrix) describing the system's energy. In quantum computing, we typically work in natural units where $\hbar = 1$.

For a time-independent Hamiltonian, the solution is:

$$|\psi(t)\rangle = e^{-iHt}|\psi(0)\rangle = U(t)|\psi(0)\rangle$$

The operator $U(t) = e^{-iHt}$ is **unitary** ($U^\dagger U = I$), which guarantees that probabilities are conserved. Every quantum gate is a unitary operator, and every unitary operator corresponds to evolution under some Hamiltonian for some duration.

## Hamiltonians

The Hamiltonian encodes the physics of the quantum system. For quantum computing and QML, several Hamiltonians appear repeatedly.

### Single-Qubit Hamiltonians

The Pauli matrices form a basis for single-qubit Hamiltonians:

$$\sigma_x = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}, \quad \sigma_y = \begin{bmatrix} 0 & -i \\ i & 0 \end{bmatrix}, \quad \sigma_z = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$$

Any single-qubit Hamiltonian can be written as $H = \alpha I + \beta \sigma_x + \gamma \sigma_y + \delta \sigma_z$ with real coefficients. The corresponding unitary is a rotation on the Bloch sphere.

The rotation gates commonly used in quantum circuits are exponentials of Pauli matrices:

$$R_x(\theta) = e^{-i\theta\sigma_x/2}, \quad R_y(\theta) = e^{-i\theta\sigma_y/2}, \quad R_z(\theta) = e^{-i\theta\sigma_z/2}$$

### Multi-Qubit Hamiltonians

Multi-qubit Hamiltonians are constructed from tensor products of Pauli operators. The Ising Hamiltonian, central to combinatorial optimization in QML, takes the form:

$$H_{\text{Ising}} = -\sum_{\langle i,j \rangle} J_{ij} \sigma_i^z \sigma_j^z + \sum_i h_i \sigma_i^z$$

where $J_{ij}$ are coupling strengths between qubits $i$ and $j$, and $h_i$ are local magnetic fields. The ground state of this Hamiltonian encodes the solution to many optimization problems.

```{admonition} From physics to optimization
:class: note
Many combinatorial optimization problems (MaxCut, graph coloring, traveling salesman) can be mapped to finding the ground state of an Ising Hamiltonian. This connection is the foundation of quantum annealing and QAOA.
```

## Eigenvalues and Eigenstates

A Hamiltonian $H$ has eigenvalues $E_k$ (energies) and eigenstates $|E_k\rangle$:

$$H|E_k\rangle = E_k|E_k\rangle$$

The eigenstates form an orthonormal basis. Expanding a state in this basis:

$$|\psi(0)\rangle = \sum_k c_k |E_k\rangle \implies |\psi(t)\rangle = \sum_k c_k e^{-iE_k t} |E_k\rangle$$

Each eigenstate acquires a phase proportional to its energy. This is the mechanism behind quantum phase estimation, a core subroutine in many QML algorithms (see {doc}`qpe_learning`).

## From Continuous Evolution to Discrete Gates

Quantum circuits approximate continuous Hamiltonian evolution using discrete gate sequences. The connection is made precise by two results.

### Product Formulas (Trotterization)

For a Hamiltonian $H = H_1 + H_2$, the Trotter-Suzuki decomposition approximates:

$$e^{-i(H_1 + H_2)t} \approx \left(e^{-iH_1 t/n} e^{-iH_2 t/n}\right)^n$$

The error decreases as $O(t^2/n)$. Higher-order formulas achieve better accuracy. This decomposition is how QAOA discretizes the adiabatic evolution path into alternating layers of gates.

### Universality

Any unitary on $n$ qubits can be decomposed into a sequence of single-qubit rotations and CNOT gates. The Solovay-Kitaev theorem guarantees that any single-qubit gate can be approximated to precision $\epsilon$ using $O(\log^c(1/\epsilon))$ gates from a finite universal set. This means continuous Hamiltonian evolution can always be compiled to a digital gate sequence.

## Time-Dependent Hamiltonians

When $H(t)$ varies with time, the evolution operator is the time-ordered exponential:

$$U(T) = \mathcal{T}\exp\left(-i\int_0^T H(t)\,dt\right)$$

This is directly relevant to adiabatic quantum computing, where the Hamiltonian is slowly varied from an initial Hamiltonian (with a known ground state) to a final Hamiltonian (whose ground state encodes the solution). See {doc}`adiabatic` for details.

## Simulating Hamiltonians

Simulating the time evolution of a quantum Hamiltonian is one of the original motivations for quantum computing (Feynman, 1982). For an $n$-qubit system, the Hilbert space has dimension $2^n$, making classical simulation exponentially expensive.

| Method | Complexity | Notes |
|---|---|---|
| Classical exact | $O(2^{2n})$ | Matrix exponentiation; impractical beyond ~20 qubits |
| Classical Trotter | $O(2^{2n} \cdot t^2/\epsilon)$ | Still exponential in $n$ |
| Quantum Trotter | $O(\text{poly}(n) \cdot t^2/\epsilon)$ | Exponential advantage in system size |
| Quantum signal processing | $O(\text{poly}(n) \cdot t)$ | Optimal scaling in $t$ |

This exponential advantage in Hamiltonian simulation is one of the most robust quantum speedups known and underpins quantum chemistry applications of VQE.

```{tip}
When designing a variational QML circuit, each parameterized gate $R_\alpha(\theta)$ corresponds to evolving under the Pauli $\sigma_\alpha$ Hamiltonian for time $\theta/2$. The parameters of the circuit are evolution times. This physical interpretation guides circuit design and initialization strategies.
```

## Further Reading

- Sakurai, J.J. and Napolitano, J.J. *Modern Quantum Mechanics* (Cambridge, 2020), Chapters 2-3
- Childs, A.M. "Lecture Notes on Quantum Algorithms." University of Maryland (2024)
- Lloyd, S. "Universal quantum simulators." *Science* 273, 1073-1078 (1996)
- Berry, D.W. et al. "Simulating Hamiltonian dynamics with a truncated Taylor series." *Physical Review Letters* 114, 090502 (2015)
