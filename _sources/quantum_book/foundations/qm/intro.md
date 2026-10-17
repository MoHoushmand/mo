# Introduction to Quantum Mechanics

> An overview of quantum mechanics, its historical development, and why it matters for computing and cryptography.

Quantum mechanics is the physical theory governing nature at atomic and subatomic scales. It replaced classical mechanics not because classical physics was wrong, but because it was incomplete: at small scales, energy is quantized, particles behave as waves, and measurement disturbs the system being measured. These are not philosophical curiosities. They are engineering constraints that determine what computers can and cannot do.

Every quantum technology, from quantum computing to quantum key distribution, exploits one or more distinctly quantum phenomena. Understanding these phenomena at the mathematical level is prerequisite to understanding quantum algorithms, quantum error correction, and post-quantum cryptography.

## Why Quantum Mechanics Matters for Computing

Classical computers manipulate bits: deterministic 0s and 1s. A classical processor with $n$ bits can be in exactly one of $2^n$ configurations at any time. Quantum computers manipulate **qubits**, which can exist in superpositions of $|0\rangle$ and $|1\rangle$. An $n$-qubit register lives in a $2^n$-dimensional Hilbert space, and a single operation can act on the entire space simultaneously.

This does not mean a quantum computer "tries all answers at once." The power comes from three specific phenomena:

| Phenomenon | What it enables |
|---|---|
| **Superposition** | Encoding information in probability amplitudes, not just bit values |
| **Entanglement** | Creating correlations between qubits with no classical analog |
| **Interference** | Amplifying correct answers and suppressing wrong ones |

Every quantum algorithm, from Shor's factoring to Grover's search to variational eigensolvers, is an engineered interference pattern. The algorithm arranges for the probability amplitudes of correct answers to add constructively, while incorrect answers cancel.

## Why Quantum Mechanics Matters for Cryptography

The security of RSA and elliptic-curve cryptography rests on the classical hardness of integer factorization and discrete logarithms. Shor's algorithm solves both in polynomial time on a quantum computer. This is not a hypothetical: it is a mathematical fact about the structure of these problems in a Hilbert space.

At the same time, quantum mechanics provides new cryptographic primitives:

- **Quantum Key Distribution (QKD)**: The no-cloning theorem guarantees that eavesdropping on a quantum channel is detectable.
- **Quantum Random Number Generation (QRNG)**: Measurement of quantum states produces true randomness, not pseudorandomness.
- **Post-Quantum Cryptography (PQC)**: Understanding which mathematical problems remain hard for quantum computers (lattice problems, hash functions) guides the design of quantum-resistant algorithms.

## What This Part Covers

Part I provides the mathematical and conceptual foundations needed for the rest of this book:

1. **{doc}`history`** -- From Planck's blackbody radiation to the quantum information age
2. **{doc}`classical_to_quantum`** -- Where classical physics fails, and the postulates of QM
3. **{doc}`braket_notation`** -- Dirac notation: the language of quantum mechanics
4. **{doc}`key_concepts`** -- Overview of the five foundational quantum phenomena
5. **{doc}`superposition`**, **{doc}`entanglement`**, **{doc}`interference`**, **{doc}`measurement`**, **{doc}`no_cloning`** -- Deep dives into each phenomenon
6. **{doc}`qubits`** -- The quantum bit: Bloch sphere, computational basis
7. **{doc}`single_qubit`** and **{doc}`multi_qubit`** -- Gates and circuits
8. **{doc}`density_matrices`** -- Mixed states and decoherence
9. **{doc}`experimental`** -- Bell tests and teleportation experiments

```{admonition} Prerequisites
:class: tip
This part assumes familiarity with linear algebra (vectors, matrices, eigenvalues, tensor products) and complex numbers. No prior physics background is required. If you need a refresher on the mathematical tools, see the Appendix.
```

## The Central Equations

Two equations govern all of quantum mechanics:

**The Schrodinger equation** describes how quantum states evolve in time:

$$i\hbar \frac{\partial}{\partial t} |\psi(t)\rangle = \hat{H} |\psi(t)\rangle$$

**The Born rule** connects quantum states to measurable probabilities:

$$P(\text{outcome } k) = |\langle k | \psi \rangle|^2$$

Everything in this part, from superposition to entanglement to quantum gates, follows from these two principles and the linear algebra of Hilbert spaces.

## Further Reading

- Griffiths, D. J. & Schroeter, D. F. (2018). *Introduction to Quantum Mechanics*, 3rd ed. Cambridge University Press.
- Nielsen, M. A. & Chuang, I. L. (2010). *Quantum Computation and Quantum Information*, 10th Anniversary ed. Cambridge University Press.
- Preskill, J. (2023). *Quantum Computing in the NISQ Era and Beyond*. [Lecture notes](http://theory.caltech.edu/~preskill/ph219/).
