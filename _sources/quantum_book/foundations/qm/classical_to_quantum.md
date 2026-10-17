# From Classical to Quantum

> The transition from classical mechanics to quantum mechanics. Why classical physics fails at the atomic scale, and the postulates that replace it.

Classical mechanics, codified by Newton and refined by Lagrange and Hamilton, describes the motion of macroscopic objects with extraordinary precision. Planets, bridges, and billiard balls all obey deterministic equations of motion. But at atomic scales, classical mechanics fails spectacularly. The failures are not small corrections; they are qualitative breakdowns that require an entirely new theoretical framework.

## Where Classical Physics Fails

### Failure 1: Blackbody Radiation

Classical electrodynamics predicts that a heated cavity should radiate infinite energy at short wavelengths (the Rayleigh-Jeans law). Experimentally, the spectrum peaks at a finite frequency and drops to zero at high frequencies. Planck's resolution (energy quantization, $E = nh\nu$) was the first sign that nature is discrete at small scales.

### Failure 2: Atomic Stability

According to classical electrodynamics, an orbiting electron should continuously radiate energy and spiral into the nucleus within $\sim 10^{-11}$ seconds. Atoms are stable. Classical physics cannot explain why.

### Failure 3: Discrete Spectra

Heated gases emit light at specific frequencies, not a continuous spectrum. The hydrogen spectrum follows the Rydberg formula:

$$\frac{1}{\lambda} = R_H \left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right)$$

Classical physics has no mechanism for producing discrete spectral lines.

### Failure 4: The Photoelectric Effect

Light below a threshold frequency cannot eject electrons from a metal, regardless of intensity. Above the threshold, electrons are ejected immediately, even at low intensity. This contradicts the classical wave picture of light and requires Einstein's photon hypothesis.

### Failure 5: Wave-Particle Duality

Electrons, neutrons, and even large molecules produce interference patterns when passed through a double slit, yet they arrive at the detector as discrete particles. No classical model can reproduce both behaviors simultaneously.

## The Postulates of Quantum Mechanics

Quantum mechanics replaces classical mechanics with a set of postulates formulated in the language of linear algebra. These postulates are not derived from more fundamental principles; they are axioms, justified by their agreement with every experiment performed to date.

### Postulate 1: State Space

The state of a quantum system is described by a unit vector $|\psi\rangle$ in a complex Hilbert space $\mathcal{H}$.

For a qubit, $\mathcal{H} = \mathbb{C}^2$. For $n$ qubits, $\mathcal{H} = (\mathbb{C}^2)^{\otimes n} = \mathbb{C}^{2^n}$.

```{admonition} Hilbert Space
:class: note
A Hilbert space is a complex vector space equipped with an inner product and complete with respect to the norm induced by that inner product. For finite-dimensional quantum systems (including all qubit-based quantum computing), $\mathcal{H} = \mathbb{C}^d$ with the standard inner product.
```

### Postulate 2: Evolution

A closed quantum system evolves according to the Schrodinger equation:

$$i\hbar \frac{d}{dt} |\psi(t)\rangle = \hat{H} |\psi(t)\rangle$$

where $\hat{H}$ is the Hamiltonian (a Hermitian operator representing the system's total energy). For time-independent $\hat{H}$, the solution is:

$$|\psi(t)\rangle = e^{-i\hat{H}t/\hbar} |\psi(0)\rangle$$

The evolution operator $U = e^{-i\hat{H}t/\hbar}$ is **unitary**: $U^\dagger U = I$. This means quantum evolution is reversible and preserves the norm of the state vector.

### Postulate 3: Measurement

A quantum measurement is described by a set of measurement operators $\{M_k\}$ satisfying $\sum_k M_k^\dagger M_k = I$. When measuring state $|\psi\rangle$:

- **Probability** of outcome $k$: $\; p(k) = \langle \psi | M_k^\dagger M_k | \psi \rangle$
- **Post-measurement state**: $\; |\psi_k\rangle = \frac{M_k |\psi\rangle}{\sqrt{p(k)}}$

For the special case of projective measurement in an orthonormal basis $\{|k\rangle\}$, this simplifies to the **Born rule**:

$$p(k) = |\langle k | \psi \rangle|^2$$

### Postulate 4: Composite Systems

The state space of a composite system is the tensor product of the component state spaces:

$$\mathcal{H}_{AB} = \mathcal{H}_A \otimes \mathcal{H}_B$$

If system $A$ is in state $|\phi\rangle$ and system $B$ is in state $|\chi\rangle$, the composite state is $|\phi\rangle \otimes |\chi\rangle$. Crucially, not all states in $\mathcal{H}_{AB}$ are product states. States that cannot be written as a tensor product are **entangled**.

## Classical vs. Quantum: A Comparison

| Feature | Classical Mechanics | Quantum Mechanics |
|---|---|---|
| State | Phase space point $(x, p)$ | Unit vector $\|\psi\rangle$ in Hilbert space |
| Evolution | Hamilton's equations (deterministic) | Schrodinger equation (deterministic) |
| Observables | Real-valued functions on phase space | Hermitian operators on Hilbert space |
| Measurement | Reveals pre-existing value | Probabilistic outcome, disturbs state |
| Composite systems | Cartesian product of state spaces | Tensor product (enables entanglement) |
| Information | Can be copied freely | No-cloning theorem forbids copying |

```{admonition} Evolution is Deterministic
:class: important
A common misconception is that quantum mechanics is "random." The Schrodinger equation is perfectly deterministic: given the state at time $t_0$, the state at any later time is uniquely determined. Randomness enters only through measurement (Postulate 3). Between measurements, quantum evolution is as deterministic as Newtonian mechanics.
```

## The Correspondence Principle

Quantum mechanics does not invalidate classical mechanics; it contains classical mechanics as a limiting case. When quantum numbers are large (many photons, massive objects, high energies), quantum predictions converge to classical predictions. This is Bohr's **correspondence principle**.

For quantum computing, this principle manifests in decoherence: as a quantum system interacts with its environment, it progressively loses its quantum character and behaves classically. Maintaining quantum behavior long enough to complete a computation is the central engineering challenge of quantum hardware.

## Further Reading

- Dirac, P. A. M. (1930). *The Principles of Quantum Mechanics*. Oxford University Press.
- Sakurai, J. J. & Napolitano, J. J. (2017). *Modern Quantum Mechanics*, 2nd ed. Cambridge University Press.
- Nielsen, M. A. & Chuang, I. L. (2010). *Quantum Computation and Quantum Information*, Chapter 2.
