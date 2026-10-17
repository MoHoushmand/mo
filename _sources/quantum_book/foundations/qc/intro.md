# Introduction to Quantum Computing

> What quantum computing is, why it matters, and the computational advantage it promises over classical computing.

Classical computers process information as bits: deterministic 0s and 1s manipulated by Boolean logic gates. Every classical algorithm, from sorting a list to training a neural network, reduces to a sequence of AND, OR, and NOT operations on these bits. This model has scaled remarkably well for seven decades, but it has fundamental limitations. Some problems grow so rapidly in complexity that no classical computer, no matter how powerful, can solve them in a reasonable time.

Quantum computing is a fundamentally different model of computation. It exploits three properties of quantum mechanics, superposition, entanglement, and interference, to process information in ways that have no classical analog.

## The Computational Model

A quantum computer operates on **qubits** rather than bits. Where a classical bit is either 0 or 1, a qubit exists in a superposition:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \quad |\alpha|^2 + |\beta|^2 = 1$$

The amplitudes $\alpha$ and $\beta$ are complex numbers. Upon measurement, the qubit collapses to $|0\rangle$ with probability $|\alpha|^2$ or $|1\rangle$ with probability $|\beta|^2$. Superposition alone is not enough for a computational advantage; the power comes from manipulating amplitudes across entangled qubits so that correct answers interfere constructively and wrong answers interfere destructively.

## Why Quantum Computing Matters

The promise of quantum computing is not that it speeds up all problems. Most everyday computations (web serving, database queries, video encoding) gain nothing from quantum hardware. The advantage is concentrated in specific problem classes:

| Problem Class | Classical | Quantum | Speedup |
|---|---|---|---|
| Integer factorization | Sub-exponential (GNFS) | Polynomial (Shor) | Exponential |
| Unstructured search | $O(N)$ | $O(\sqrt{N})$ (Grover) | Quadratic |
| Quantum simulation | Exponential in system size | Polynomial | Exponential |
| Optimization (some) | NP-hard | Quadratic/heuristic | Problem-dependent |
| Linear algebra | $O(N^3)$ | $O(\text{poly}(\log N))$ (HHL) | Exponential (with caveats) |

```{admonition} Computational Advantage vs. Supremacy
:class: note
The term "quantum supremacy" (Preskill, 2012) refers to a quantum computer performing *any* task faster than any classical computer. Google's Sycamore experiment (2019) demonstrated this for a sampling problem. "Quantum advantage" is the more practical goal: solving *useful* problems faster. These are distinct milestones; supremacy has been demonstrated for contrived problems, but practical advantage for real-world problems has not yet been achieved at scale.
```

## Three Pillars of Quantum Speedup

### Superposition

An $n$-qubit register can exist in a superposition of all $2^n$ basis states simultaneously. This does not mean it stores $2^n$ values; measurement yields only one outcome. The utility is that quantum gates process all $2^n$ amplitudes in a single operation, enabling a form of parallelism in amplitude space.

### Entanglement

Two qubits can be placed in an entangled state where the measurement outcome of one instantaneously constrains the outcome of the other, regardless of physical separation. The Bell state $\frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$ is the simplest example. Entanglement is a computational resource with no classical equivalent; it enables quantum teleportation, superdense coding, and is essential for quantum error correction.

### Interference

Quantum algorithms are designed so that computational paths leading to correct answers accumulate amplitude (constructive interference) while paths leading to wrong answers cancel out (destructive interference). This is the mechanism that converts superposition into a useful computation. Without interference, measuring a superposition would yield a random answer.

## The Church-Turing Thesis, Extended

The **Extended Church-Turing Thesis** states that any physically realizable computation can be efficiently simulated by a probabilistic Turing machine. Quantum computing challenges this thesis. If a quantum computer can solve a problem exponentially faster than any classical algorithm, the extended thesis is false. Shor's factoring algorithm provides the strongest evidence, though proving the thesis false requires proving that no efficient classical factoring algorithm exists (an open problem in complexity theory).

The complexity class **BQP** (Bounded-Error Quantum Polynomial Time) contains problems solvable by a quantum computer in polynomial time. The relationship is believed to be:

$$\text{P} \subseteq \text{BPP} \subseteq \text{BQP} \subseteq \text{PSPACE}$$

Whether BQP strictly contains BPP (i.e., whether quantum computers can solve problems that classical computers fundamentally cannot) remains one of the deepest open questions in theoretical computer science.

## Current State of Quantum Hardware

As of early 2026, quantum computers are in the **Noisy Intermediate-Scale Quantum (NISQ)** era:

| Platform | Qubits | Qubit Type | Error Rate (2-qubit) |
|---|---|---|---|
| IBM Condor | 1,386 | Superconducting | ~$10^{-3}$ |
| Google Willow | 105 | Superconducting | ~$10^{-3}$ |
| Quantinuum H2 | 56 | Trapped ion | ~$10^{-3}$ |
| IonQ Forte | 36 | Trapped ion | ~$10^{-3}$ |
| QuEra | 256 | Neutral atom | ~$10^{-2}$ |

```{important}
NISQ devices are too noisy for running Shor's algorithm on cryptographically relevant key sizes. Breaking RSA-2048 requires roughly 4,000 *logical* qubits, which translates to millions of *physical* qubits with current error rates and error correction overhead. The gap between current hardware and a cryptographically relevant quantum computer (CRQC) is large, but this does not diminish the urgency of preparing post-quantum cryptographic defenses due to the Harvest Now, Decrypt Later threat.
```

## What This Part Covers

Part II walks through quantum computation from foundations to practice:

1. **Gate Model**: The universal gate set and how quantum circuits process information
2. **Circuit Notation**: Reading and writing quantum circuit diagrams
3. **Algorithms**: The major quantum algorithms (Deutsch-Jozsa, Grover, Shor, QPE, QFT, VQE)
4. **Error Correction**: Why quantum errors are different and how to correct them
5. **Frameworks**: Hands-on programming with Qiskit, Cirq, PennyLane, and PyQuil

## Further Reading

- Nielsen, M. A. & Chuang, I. L. *Quantum Computation and Quantum Information*. Cambridge University Press, 2010.
- Preskill, J. "Quantum Computing in the NISQ era and beyond." *Quantum* 2, 79 (2018). [arXiv:1801.00862](https://arxiv.org/abs/1801.00862)
- Aaronson, S. "Read the fine print." *Nature Physics* 11, 291-293 (2015).
- Montanaro, A. "Quantum algorithms: an overview." *npj Quantum Information* 2, 15023 (2016). [arXiv:1511.04206](https://arxiv.org/abs/1511.04206)
