# Quantum Annealing

> D-Wave's approach to quantum optimization. Adiabatic quantum computing, QUBO formulation, and when annealing outperforms gate-based approaches.

Quantum annealing is a fundamentally different approach from gate-based quantum computing. Instead of applying a sequence of logic gates to qubits, a quantum annealer slowly evolves a physical system from an easy-to-prepare initial state toward the ground state of a problem Hamiltonian. The ground state encodes the solution to an optimization problem.

## The Adiabatic Principle

Quantum annealing is rooted in the **adiabatic theorem** of quantum mechanics. If a system starts in the ground state of some Hamiltonian $H_0$ and the Hamiltonian is changed sufficiently slowly to a target Hamiltonian $H_P$, the system remains in the instantaneous ground state throughout the evolution:

$$H(t) = \left(1 - \frac{t}{T}\right) H_0 + \frac{t}{T} H_P$$

where $T$ is the total anneal time. The initial Hamiltonian $H_0$ is chosen to have a ground state that is easy to prepare (typically a uniform superposition). The problem Hamiltonian $H_P$ encodes the optimization problem.

The catch: the anneal must be slow enough that the system does not jump to an excited state. The minimum gap $\Delta_{\min}$ between the ground state and first excited state during the evolution determines the required anneal time:

$$T \sim \frac{1}{\Delta_{\min}^2}$$

For hard optimization problems, $\Delta_{\min}$ can be exponentially small, meaning the anneal time may grow exponentially. This is the fundamental limitation of adiabatic quantum computing.

## QUBO Formulation

D-Wave's quantum annealers solve problems in the form of **Quadratic Unconstrained Binary Optimization** (QUBO):

$$\min_{\mathbf{x} \in \{0,1\}^n} \mathbf{x}^T Q \mathbf{x}$$

where $Q$ is a real matrix encoding the problem. Equivalently, problems can be expressed as Ising models:

$$H_P = \sum_i h_i \sigma_i^z + \sum_{i<j} J_{ij} \sigma_i^z \sigma_j^z$$

where $h_i$ are local fields and $J_{ij}$ are coupling strengths between qubits $i$ and $j$. The task is to find the spin configuration that minimizes this energy.

Many practical optimization problems can be cast into QUBO/Ising form:

- **Graph coloring** and partitioning
- **Traveling salesman** and vehicle routing
- **Portfolio optimization** in finance
- **Protein folding** energy minimization
- **Satisfiability** (SAT) problems

## D-Wave Hardware

D-Wave Systems, founded in 1999, is the only company selling commercial quantum annealers. Their processors use superconducting flux qubits:

| Processor | Year | Qubits | Topology |
|---|---|---|---|
| D-Wave One | 2011 | 128 | Chimera |
| D-Wave 2X | 2015 | 1,152 | Chimera |
| Advantage | 2020 | 5,000+ | Pegasus |
| Advantage2 | 2024 | 7,000+ | Zephyr |

Each qubit is a superconducting loop whose persistent current (clockwise or counterclockwise) represents the binary variable. Couplers between qubits are tunable inductive connections that implement the $J_{ij}$ terms.

**Topology matters.** Unlike gate-based processors, annealers do not have all-to-all connectivity. A problem that requires connections not present in the hardware graph must use **minor embedding**: chains of physical qubits represent a single logical variable, consuming qubits and reducing the effective problem size.

## Annealing vs. Gate-Based

| Property | Quantum Annealing | Gate-Based QC |
|---|---|---|
| Computation model | Continuous evolution | Discrete gate sequence |
| Problem type | Optimization (QUBO/Ising) | Universal (any quantum algorithm) |
| Qubit count (2025) | 7,000+ | ~1,000 |
| Error correction | None (analog process) | Surface code, etc. |
| Gate fidelity | N/A | Critical metric |
| Universality | Not universal | Universal |
| Temperature | ~15 mK | ~15 mK |

Quantum annealing is **not universal**: it solves a restricted class of problems. Adiabatic quantum computation (with arbitrary Hamiltonians) is theoretically universal, but D-Wave's hardware implements only the Ising model class.

## When Does Annealing Win?

The question of quantum advantage for annealing remains open. Classical algorithms, particularly simulated annealing and tensor network methods, are strong competitors for the same optimization problems.

Cases where annealing may offer an advantage:

- **Problems with rough energy landscapes** where classical algorithms get stuck in local minima
- **Sampling from complex distributions** rather than finding the exact ground state
- **Hybrid workflows** where the annealer provides warm-start solutions that are refined classically

D-Wave offers a hybrid solver service that combines quantum annealing with classical heuristics. For practical optimization problems with thousands of variables, these hybrid solvers often outperform purely classical approaches in time-to-solution.

```{admonition} Annealing is not the same as gate-based QC
:class: warning
Quantum annealing and gate-based quantum computing are different computational models. Demonstrating advantage with one does not imply advantage with the other. Shor's algorithm, Grover's algorithm, and quantum simulation require a gate-based (or universal adiabatic) processor. An annealer cannot run these algorithms.
```

## Further Reading

- Kadowaki, T. and Nishimori, H., "Quantum annealing in the transverse Ising model," *Phys. Rev. E* **58**, 5355 (1998). [doi:10.1103/PhysRevE.58.5355](https://doi.org/10.1103/PhysRevE.58.5355)
- Farhi, E. et al., "Quantum Computation by Adiabatic Evolution," (2000). [arXiv:quant-ph/0001106](https://arxiv.org/abs/quant-ph/0001106)
- McGeoch, C. C., "Adiabatic Quantum Computation and Quantum Annealing," *Synthesis Lectures on Quantum Computing* (2014). [doi:10.2200/S00585ED1V01Y201407QMC008](https://doi.org/10.2200/S00585ED1V01Y201407QMC008)
