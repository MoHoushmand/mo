# Measurements and Mixed States

> Generalized measurements (POVMs), quantum channels, Kraus operators, and their role in quantum ML circuits.

Projective measurements in the computational basis are the simplest way to extract classical information from a quantum state. Real quantum systems require a richer framework: generalized measurements (POVMs), density matrices for mixed states, and quantum channels for describing noise and open-system dynamics. These tools are essential for understanding how quantum ML circuits behave on real hardware.

## Projective Measurements

A projective measurement is defined by a set of orthogonal projectors $\{P_m\}$ satisfying $\sum_m P_m = I$ and $P_m P_{m'} = \delta_{mm'} P_m$. When measuring a state $|\psi\rangle$:

- Outcome $m$ occurs with probability $p(m) = \langle\psi|P_m|\psi\rangle$
- The post-measurement state is $\frac{P_m|\psi\rangle}{\sqrt{p(m)}}$

For a single qubit measured in the computational basis, $P_0 = |0\rangle\langle 0|$ and $P_1 = |1\rangle\langle 1|$. This recovers Born's rule from the previous chapter.

### Measurement in Other Bases

We are not limited to the computational basis. The Hadamard basis $\{|+\rangle, |-\rangle\}$ where $|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$ and $|-\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)$ defines a different projective measurement. Measuring the state $|0\rangle$ in this basis gives $|+\rangle$ and $|-\rangle$ each with probability $1/2$.

The choice of measurement basis determines what information is extracted. In QML, measurement basis optimization is a key design variable.

## Density Matrices

Pure states $|\psi\rangle$ describe quantum systems with complete knowledge. When a system is in state $|\psi_i\rangle$ with classical probability $p_i$, we need the **density matrix**:

$$\rho = \sum_i p_i |\psi_i\rangle\langle\psi_i|$$

This is a **mixed state**. Key properties of density matrices:

- $\rho$ is Hermitian: $\rho = \rho^\dagger$
- $\rho$ is positive semidefinite: $\langle\phi|\rho|\phi\rangle \geq 0$ for all $|\phi\rangle$
- Unit trace: $\text{Tr}(\rho) = 1$
- Pure states satisfy $\text{Tr}(\rho^2) = 1$; mixed states have $\text{Tr}(\rho^2) < 1$

```{admonition} Pure vs. mixed states on the Bloch sphere
:class: note
Pure states live on the surface of the Bloch sphere. Mixed states live in the interior. The maximally mixed state $\rho = I/2$ sits at the center, representing complete ignorance about the qubit.
```

### The Partial Trace

Given a composite system $\rho_{AB}$ on $\mathcal{H}_A \otimes \mathcal{H}_B$, the **reduced density matrix** on subsystem $A$ is obtained by tracing out $B$:

$$\rho_A = \text{Tr}_B(\rho_{AB})$$

Even if $\rho_{AB}$ is a pure entangled state, $\rho_A$ is generally mixed. For example, tracing out one qubit of the Bell state $|\phi^+\rangle$ yields $\rho_A = I/2$, the maximally mixed state. This is why entangled subsystems appear random when examined locally.

## Generalized Measurements (POVMs)

A **Positive Operator-Valued Measure** (POVM) generalizes projective measurements. It is defined by a set of positive semidefinite operators $\{E_m\}$ satisfying:

$$\sum_m E_m = I, \quad E_m \geq 0$$

The probability of outcome $m$ is $p(m) = \text{Tr}(E_m \rho)$. Unlike projective measurements, POVM elements need not be orthogonal, and there can be more outcomes than the dimension of the Hilbert space.

```{important}
POVMs are physically realizable: any POVM on a system can be implemented as a projective measurement on a larger system (Naimark's theorem). In practice, this means adding ancilla qubits and performing a unitary followed by a projective measurement.
```

### POVMs in QML

POVMs are relevant to QML in several ways:

- **Optimal state discrimination**: distinguishing between non-orthogonal quantum states (e.g., classifying quantum data) often requires POVMs rather than projective measurements.
- **Informationally complete measurements**: POVMs with $d^2$ elements (for $d$-dimensional systems) can reconstruct the full density matrix, useful for quantum state tomography.
- **Soft measurements**: POVMs can extract partial information while minimally disturbing the state.

## Quantum Channels

The most general evolution of a quantum state (including noise, decoherence, and measurement) is described by a **quantum channel**: a completely positive, trace-preserving (CPTP) linear map $\mathcal{E}: \rho \mapsto \mathcal{E}(\rho)$.

### Kraus Representation

Every quantum channel can be written in **Kraus form**:

$$\mathcal{E}(\rho) = \sum_k K_k \rho K_k^\dagger$$

where the Kraus operators $\{K_k\}$ satisfy $\sum_k K_k^\dagger K_k = I$. This representation is not unique, but all representations of the same channel are related by unitary transformations.

### Common Noise Channels

| Channel | Kraus Operators | Physical Meaning |
|---|---|---|
| Bit flip | $K_0 = \sqrt{1-p}\,I$, $K_1 = \sqrt{p}\,X$ | Random NOT with probability $p$ |
| Phase flip | $K_0 = \sqrt{1-p}\,I$, $K_1 = \sqrt{p}\,Z$ | Random phase with probability $p$ |
| Depolarizing | $K_0 = \sqrt{1-3p/4}\,I$, $K_{1,2,3} = \sqrt{p/4}\,\sigma_{x,y,z}$ | Replaces state with $I/2$ with probability $p$ |
| Amplitude damping | $K_0 = \begin{bmatrix}1 & 0 \\ 0 & \sqrt{1-\gamma}\end{bmatrix}$, $K_1 = \begin{bmatrix}0 & \sqrt{\gamma} \\ 0 & 0\end{bmatrix}$ | Energy relaxation ($T_1$ decay) |

### Impact on QML

Noise channels are critical for understanding QML on real hardware:

- **Depolarizing noise** washes out quantum correlations, reducing the effective expressibility of variational circuits.
- **Amplitude damping** biases measurement outcomes toward $|0\rangle$, introducing systematic errors in expectation value estimation.
- **Error mitigation** techniques (zero-noise extrapolation, probabilistic error cancellation) attempt to undo the effects of noise channels without full error correction.

```{warning}
On current NISQ devices, noise limits circuit depth to roughly 10-100 two-qubit gates before the output is indistinguishable from random. This constraint shapes all practical QML algorithm design.
```

## Von Neumann Entropy

The quantum analog of Shannon entropy is the **von Neumann entropy**:

$$S(\rho) = -\text{Tr}(\rho \log_2 \rho) = -\sum_i \lambda_i \log_2 \lambda_i$$

where $\lambda_i$ are the eigenvalues of $\rho$. Properties:

- $S(\rho) = 0$ if and only if $\rho$ is a pure state.
- $S(\rho) \leq \log_2 d$ with equality for the maximally mixed state.
- For a bipartite pure state, $S(\rho_A) = S(\rho_B)$ measures entanglement.

## Further Reading

- Nielsen, M.A. and Chuang, I.L. *Quantum Computation and Quantum Information* (Cambridge, 2010), Chapters 2.4-2.5, 8.2-8.3
- Wilde, M.M. *Quantum Information Theory* (Cambridge, 2017), Chapters 3-4
- Preskill, J. "Quantum Computing in the NISQ era and beyond." *Quantum* 2, 79 (2018)
