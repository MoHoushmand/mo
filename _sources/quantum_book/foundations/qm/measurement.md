# Quantum Measurement

> The measurement postulate, wavefunction collapse, Born rule, and the measurement problem. Projective vs. POVM measurements.

Measurement is the interface between the quantum and classical worlds. It is the only process in quantum mechanics that is both irreversible and probabilistic. All other quantum dynamics (unitary evolution) are deterministic and reversible. Understanding measurement is essential for quantum computing, where every useful computation ends with a measurement that extracts classical results from quantum states.

## The Born Rule

For a quantum state $|\psi\rangle$ measured in an orthonormal basis $\{|k\rangle\}$, the probability of obtaining outcome $k$ is:

$$P(k) = |\langle k|\psi\rangle|^2$$

This is the **Born rule**, named after Max Born (1926 Nobel Prize). It is the bridge between quantum amplitudes and classical probabilities.

### Example

Consider $|\psi\rangle = \frac{\sqrt{3}}{2}|0\rangle + \frac{1}{2}|1\rangle$ measured in the computational basis:

$$P(0) = \left|\frac{\sqrt{3}}{2}\right|^2 = \frac{3}{4}, \quad P(1) = \left|\frac{1}{2}\right|^2 = \frac{1}{4}$$

The probabilities sum to 1, as guaranteed by the normalization $\langle\psi|\psi\rangle = 1$.

## Projective Measurement

The standard measurement formalism in quantum computing uses **projective measurements** (also called von Neumann measurements).

### Definition

A projective measurement is defined by a Hermitian operator $M$ with spectral decomposition:

$$M = \sum_k m_k P_k, \quad P_k = |k\rangle\langle k|$$

where $m_k$ are the eigenvalues and $P_k$ are orthogonal projectors satisfying:

- $P_k P_j = \delta_{kj} P_k$ (orthogonality)
- $\sum_k P_k = I$ (completeness)
- $P_k^\dagger = P_k$ (Hermiticity)
- $P_k^2 = P_k$ (idempotence)

### Measurement Outcome

Given state $|\psi\rangle$:

1. **Probability**: $p(k) = \langle\psi|P_k|\psi\rangle$
2. **Post-measurement state**: $|\psi_k\rangle = \frac{P_k|\psi\rangle}{\sqrt{p(k)}}$
3. **Expected value**: $\langle M \rangle = \langle\psi|M|\psi\rangle = \sum_k m_k \, p(k)$
4. **Variance**: $(\Delta M)^2 = \langle M^2 \rangle - \langle M \rangle^2$

### Common Measurement Bases

| Observable | Operator | Eigenstates | Eigenvalues |
|---|---|---|---|
| $Z$ (computational) | $\begin{pmatrix}1&0\\0&-1\end{pmatrix}$ | $\|0\rangle, \|1\rangle$ | $+1, -1$ |
| $X$ (Hadamard) | $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ | $\|+\rangle, \|-\rangle$ | $+1, -1$ |
| $Y$ (circular) | $\begin{pmatrix}0&-i\\i&0\end{pmatrix}$ | $\|+i\rangle, \|-i\rangle$ | $+1, -1$ |

```{admonition} Measurement Changes the State
:class: important
After a projective measurement yielding outcome $k$, the system is in state $|k\rangle$. Repeating the same measurement immediately yields the same result with certainty. This is the **repeatability** property of projective measurements. It also means that measurement destroys the original superposition irreversibly.
```

## Measurement in Different Bases

Measuring state $|\psi\rangle$ in a basis $\{|b_k\rangle\}$ is equivalent to:

1. Applying a unitary $U$ that maps $\{|b_k\rangle\}$ to the computational basis $\{|k\rangle\}$
2. Measuring in the computational basis
3. Interpreting the result

This is how quantum computers implement non-computational-basis measurements: apply a gate, then measure in the standard basis.

For example, measuring in the $X$-basis is equivalent to applying $H$ then measuring in the $Z$-basis.

## Generalized Measurements (POVMs)

**Positive Operator-Valued Measures** (POVMs) generalize projective measurements. A POVM is a set of positive semidefinite operators $\{E_k\}$ satisfying:

$$E_k \geq 0, \quad \sum_k E_k = I$$

The probability of outcome $k$ is $p(k) = \langle\psi|E_k|\psi\rangle$.

POVMs differ from projective measurements in several ways:

| Property | Projective | POVM |
|---|---|---|
| Number of outcomes | $\leq d$ (dimension) | Can exceed $d$ |
| Operators | Orthogonal projectors | Positive semidefinite |
| Repeatable | Yes | Not necessarily |
| Post-measurement state | Defined | Requires additional specification |

### When POVMs Matter

POVMs are useful when you want more measurement outcomes than the system dimension. A qubit has dimension 2, but a POVM can have 3 or more outcomes. This is relevant for:

- **Quantum state discrimination**: Distinguishing non-orthogonal states optimally
- **Quantum tomography**: Reconstructing a density matrix from measurements
- **QKD security proofs**: Modeling eavesdropper measurements

## The Measurement Problem

The measurement postulate introduces a conceptual tension: between measurements, the state evolves smoothly via the Schrodinger equation. During measurement, it "collapses" instantaneously and probabilistically. The Schrodinger equation does not describe this collapse. Where exactly does the quantum/classical boundary lie?

This is the **measurement problem**, and it motivates various interpretations of quantum mechanics:

- **Copenhagen**: Collapse is a fundamental process. The quantum/classical boundary is pragmatic, not precise.
- **Many-Worlds**: No collapse occurs. The universe branches, and each outcome is realized in a different branch.
- **Decoherence**: Interaction with the environment effectively produces collapse through entanglement with environmental degrees of freedom. No additional postulate is needed.
- **QBism**: Quantum states represent an agent's beliefs, and "collapse" is a Bayesian update.

```{admonition} Pragmatic Stance
:class: tip
For quantum computing, the interpretation of measurement does not affect the mathematics. The Born rule gives the correct probabilities regardless of which interpretation one prefers. The measurement problem is a question of ontology, not computation.
```

## Measurement in Quantum Computing

In circuit-model quantum computing, measurement is typically the final operation. Key practical points:

- Measurement is destructive: the qubit cannot be used further (without re-initialization)
- Mid-circuit measurement is possible on some hardware and enables classical feedforward
- Measurement results are used for classical post-processing (error correction, decoding)
- Repeated measurements of identically prepared states are needed to estimate probabilities

## Further Reading

- von Neumann, J. (1932). *Mathematische Grundlagen der Quantenmechanik*. Springer. [English translation: *Mathematical Foundations of Quantum Mechanics*, Princeton University Press, 2018.]
- Peres, A. (1993). *Quantum Theory: Concepts and Methods*, Chapters 3 and 9. Kluwer.
- Nielsen, M. A. & Chuang, I. L. (2010). *Quantum Computation and Quantum Information*, Section 2.2.
