# Glossary

> Definitions of key terms used throughout this book.

```{glossary}

Amplitude
  A complex number $\alpha$ in a quantum state $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$. The probability of measuring a basis state is $|\alpha|^2$.

Ancilla qubit
  An auxiliary qubit used as workspace during a quantum computation, typically initialized to $|0\rangle$ and measured or discarded at the end.

Annealing
  A quantum computation model where the system evolves from an easy-to-prepare ground state to the ground state of a problem Hamiltonian. Used by D-Wave systems.

Barren plateau
  A region in the parameter space of a variational quantum circuit where the gradient of the cost function is exponentially small, making optimization impractical.

Bell state
  One of four maximally entangled two-qubit states: $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$, $|\Phi^-\rangle$, $|\Psi^+\rangle$, $|\Psi^-\rangle$.

Bloch sphere
  A geometric representation of a single-qubit state as a point on the surface of a unit sphere. Pure states lie on the surface; mixed states lie inside.

Born rule
  The probability of measuring outcome $m$ is $P(m) = |\langle m | \psi \rangle|^2$.

CNOT gate
  Controlled-NOT: flips the target qubit if the control qubit is $|1\rangle$. The standard two-qubit entangling gate.

Coherence time
  The duration over which a qubit maintains its quantum properties (superposition, phase). Denoted $T_1$ (energy relaxation) and $T_2$ (dephasing).

CRQC
  Cryptographically Relevant Quantum Computer. A quantum computer large enough to break RSA-2048 or equivalent classical cryptography using Shor's algorithm.

CSPRNG
  Cryptographically Secure Pseudorandom Number Generator. A deterministic algorithm that produces output indistinguishable from random bits by any efficient adversary.

Decoherence
  The process by which a quantum system loses coherence due to interaction with its environment, transitioning from a pure state to a mixed state.

Density matrix
  A matrix $\rho$ that describes quantum states (pure or mixed). For a pure state, $\rho = |\psi\rangle\langle\psi|$. Satisfies $\text{Tr}(\rho) = 1$ and $\rho \geq 0$.

DiVincenzo criteria
  Five requirements for building a quantum computer: scalable qubits, initialization, long coherence, universal gates, and qubit-specific measurement.

DORA
  Digital Operational Resilience Act. EU regulation (effective July 2025) requiring financial institutions to maintain resilient ICT systems, including cryptographic policies.

Entanglement
  A quantum correlation between two or more qubits that cannot be described by the states of individual qubits. The entangled system is in a superposition that spans multiple qubits.

Error correction (quantum)
  Encoding logical qubits into multiple physical qubits to detect and correct errors without measuring (and thus destroying) the quantum information.

FIPS 203
  Federal Information Processing Standard defining ML-KEM (Module-Lattice-Based Key Encapsulation Mechanism). Published by NIST in 2024.

FIPS 140-3
  The standard for validating cryptographic modules. Requires testing by a CMVP-accredited laboratory. Distinct from algorithm specifications like FIPS 203.

Gate fidelity
  The accuracy of a quantum gate operation, measured as the overlap between the ideal and actual output states. Current state of the art: 99.5-99.9% for two-qubit gates.

GHZ state
  Greenberger-Horne-Zeilinger state. An $n$-qubit entangled state: $\frac{1}{\sqrt{2}}(|00\ldots0\rangle + |11\ldots1\rangle)$.

Grover's algorithm
  A quantum search algorithm that finds a marked item among $N$ unsorted items in $O(\sqrt{N})$ queries, compared to $O(N)$ classically.

Hadamard gate
  A single-qubit gate that creates superposition: $H|0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$.

HNDL
  Harvest Now, Decrypt Later. The strategy of collecting encrypted data today to decrypt it when a CRQC becomes available.

HHL algorithm
  The Harrow-Hassidim-Lloyd algorithm for solving linear systems $Ax = b$ in $O(\log N)$ time (under specific conditions).

KEM
  Key Encapsulation Mechanism. A cryptographic primitive for establishing shared secrets: KeyGen, Encaps, Decaps.

Lattice (cryptographic)
  A discrete subgroup of $\mathbb{R}^n$. The hardness of lattice problems (SVP, LWE) underpins post-quantum cryptographic algorithms.

Logical qubit
  A fault-tolerant qubit encoded across multiple physical qubits using an error-correcting code.

LWE
  Learning With Errors. A computational problem: given $\mathbf{b} = \mathbf{A}\mathbf{s} + \mathbf{e}$, recover $\mathbf{s}$. The foundation of ML-KEM and ML-DSA.

Majorana fermion
  A particle that is its own antiparticle. Majorana bound states in condensed matter are candidates for topological qubits.

ML-KEM
  Module-Lattice-Based Key Encapsulation Mechanism. Standardized as FIPS 203. Formerly known as CRYSTALS-Kyber.

ML-DSA
  Module-Lattice-Based Digital Signature Algorithm. Standardized as FIPS 204. Formerly known as CRYSTALS-Dilithium.

NISQ
  Noisy Intermediate-Scale Quantum. The current era of quantum computing with 50-1000+ qubits but without full error correction.

No-cloning theorem
  It is impossible to create an exact copy of an arbitrary unknown quantum state. A consequence of the linearity of quantum mechanics.

NTT
  Number Theoretic Transform. The finite-field analog of the FFT, used for efficient polynomial multiplication in lattice-based cryptography.

PQC
  Post-Quantum Cryptography. Cryptographic algorithms designed to be secure against both classical and quantum computers.

QAOA
  Quantum Approximate Optimization Algorithm. A variational algorithm for solving combinatorial optimization problems.

QPE
  Quantum Phase Estimation. An algorithm for estimating eigenvalues of unitary operators, used in Shor's algorithm and quantum chemistry.

QRAM
  Quantum Random Access Memory. A hypothetical device that can load classical data into quantum states efficiently. Required for many quantum speedup claims.

QRNG
  Quantum Random Number Generator. Produces random numbers from quantum mechanical processes (e.g., photon detection, qubit measurement).

Qubit
  The fundamental unit of quantum information. A two-level quantum system described by $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$.

Shor's algorithm
  A quantum algorithm for factoring integers in polynomial time, breaking RSA and related cryptosystems.

SLH-DSA
  Stateless Hash-Based Digital Signature Algorithm. Standardized as FIPS 205. Based on SPHINCS+.

Surface code
  A topological quantum error-correcting code using a 2D grid of qubits. The leading candidate for practical fault-tolerant quantum computing.

Superposition
  A quantum state that is a linear combination of basis states: $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ with $|\alpha|^2 + |\beta|^2 = 1$.

T gate
  The $\pi/8$ phase gate. Combined with Clifford gates, it forms a universal gate set. T gates are the most expensive gates in fault-tolerant quantum computing.

Topological qubit
  A qubit encoded in the topological properties of a physical system (e.g., Majorana bound states), providing inherent protection against local noise.

Transmon
  A type of superconducting qubit used by IBM and Google. A charge qubit made insensitive to charge noise by increasing the ratio of Josephson energy to charging energy.

VQE
  Variational Quantum Eigensolver. A hybrid quantum-classical algorithm for finding the ground state energy of a Hamiltonian.
```
