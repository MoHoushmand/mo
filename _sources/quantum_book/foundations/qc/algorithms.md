# Quantum Algorithms Overview

> A taxonomy of quantum algorithms: exponential speedups (Shor), quadratic speedups (Grover), variational methods, and quantum simulation.

Quantum algorithms are not simply faster versions of classical algorithms. They exploit quantum mechanical phenomena (superposition, entanglement, interference) to restructure the computation itself. The known quantum algorithms fall into a small number of families, each based on a distinct quantum technique.

## Taxonomy of Quantum Algorithms

### Fourier-Based Algorithms (Exponential Speedup)

These algorithms use the Quantum Fourier Transform (QFT) to extract periodic structure from quantum states. The speedup arises because the QFT on $2^n$ amplitudes requires only $O(n^2)$ gates, compared to the classical FFT's $O(n \cdot 2^n)$ operations on a full state vector.

| Algorithm | Problem | Speedup | Key Technique |
|---|---|---|---|
| Deutsch-Jozsa | Constant vs. balanced oracle | Exponential (deterministic) | Interference + oracle |
| Bernstein-Vazirani | Hidden linear function | Exponential | Hadamard + oracle |
| Simon's problem | Hidden period (mod 2) | Exponential | Coset sampling |
| Shor's algorithm | Integer factorization | Exponential | QFT + period finding |
| Quantum Phase Estimation | Eigenvalue estimation | Exponential | QFT + controlled unitaries |

Shor's algorithm is the most consequential member of this family because it breaks RSA, DSA, and ECDSA.

### Amplitude Amplification (Quadratic Speedup)

Grover's algorithm and its generalizations amplify the probability of measuring a desired state. Starting from a uniform superposition, repeated applications of the Grover operator rotate the state toward the target.

| Algorithm | Problem | Speedup | Key Technique |
|---|---|---|---|
| Grover's search | Unstructured search | $O(N) \to O(\sqrt{N})$ | Amplitude amplification |
| Quantum counting | Count solutions | Quadratic | Grover + QPE |
| Quantum walk search | Graph search problems | Quadratic (sometimes better) | Quantum random walks |
| Amplitude estimation | Estimate probability | Quadratic | Grover + phase estimation |

```{admonition} Quadratic vs. Exponential
:class: note
A quadratic speedup sounds modest, but for $N = 2^{128}$ (AES-128 keyspace), it reduces the search from $2^{128}$ to $2^{64}$ operations. This is why NIST recommends doubling symmetric key sizes (AES-256) for post-quantum security. Quadratic speedups are provably optimal for unstructured search (BBBV theorem, 1997).
```

### Variational / Hybrid Algorithms

These algorithms are designed for NISQ hardware. They use a quantum computer to prepare and measure parameterized quantum states, while a classical optimizer tunes the parameters.

| Algorithm | Problem | Approach |
|---|---|---|
| VQE | Ground state energy | Variational ansatz + classical optimizer |
| QAOA | Combinatorial optimization | Problem Hamiltonian + mixer Hamiltonian |
| VQD | Excited state energies | Orthogonality constraints + VQE |
| Quantum machine learning | Classification, regression | Parameterized circuits as models |

Variational algorithms have no proven exponential speedup for general problems, but they are the most practical algorithms for near-term hardware.

### Quantum Simulation

Simulating quantum systems was Feynman's original motivation for quantum computing (1982). A system of $n$ interacting qubits has a $2^n$-dimensional Hilbert space, making classical simulation exponentially expensive.

| Method | Technique | Best For |
|---|---|---|
| Trotterization | Decompose $e^{-iHt}$ into gate sequences | Time evolution |
| Quantum signal processing | Polynomial transformations of block encodings | Eigenvalue problems |
| Variational simulation | Parameterized time evolution | NISQ devices |
| Analog simulation | Direct Hamiltonian engineering | Specific hardware platforms |

```{important}
Quantum simulation of molecules and materials is widely considered the first commercially valuable application of quantum computing. Estimating the ground state energy of FeMoCo (the nitrogen fixation catalyst) to chemical accuracy (~1 kcal/mol) is a benchmark problem requiring roughly 4,000 logical qubits.
```

### Linear Algebra Algorithms

The HHL algorithm (Harrow, Hassidim, Lloyd, 2009) solves linear systems $Ax = b$ exponentially faster than classical methods under specific conditions: $A$ must be sparse and well-conditioned, and you need only certain properties of $x$ (not the full vector). The caveats are significant enough that practical quantum advantage from HHL remains uncertain.

## Complexity-Theoretic Context

Not all problems benefit from quantum computing. The known relationships:

$$\text{P} \subseteq \text{BPP} \subseteq \text{BQP} \subseteq \text{PSPACE}$$

```{warning}
Quantum computers are not believed to solve NP-complete problems in polynomial time. The best known quantum speedup for NP-complete problems is Grover's quadratic improvement. Claims that quantum computing solves NP-complete problems efficiently should be treated with skepticism.
```

## The Algorithm Zoo

The Quantum Algorithm Zoo (quantumalgorithmzoo.org) catalogs over 400 quantum algorithms. The fundamental techniques remain:

1. **Quantum Fourier Transform** for periodic structure
2. **Amplitude amplification** for searching
3. **Hamiltonian simulation** for physics
4. **Variational methods** for optimization on NISQ hardware
5. **Quantum walks** as a unifying framework connecting several of the above

## Further Reading

- Montanaro, A. "Quantum algorithms: an overview." *npj Quantum Information* 2, 15023 (2016). [arXiv:1511.04206](https://arxiv.org/abs/1511.04206)
- Childs, A. M. & van Dam, W. "Quantum algorithms for algebraic problems." *Reviews of Modern Physics* 82, 1 (2010).
- Jordan, S. "Quantum Algorithm Zoo." [quantumalgorithmzoo.org](https://quantumalgorithmzoo.org/)
- Preskill, J. "Quantum Computing in the NISQ era and beyond." *Quantum* 2, 79 (2018). [arXiv:1801.00862](https://arxiv.org/abs/1801.00862)
