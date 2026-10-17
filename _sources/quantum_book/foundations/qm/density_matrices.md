# Density Matrices and Mixed States

> Pure vs. mixed states, the density operator $\rho$, partial trace, reduced density matrices, and decoherence.

So far, we have described quantum states as vectors $|\psi\rangle$ in a Hilbert space. This is sufficient for isolated quantum systems in a known state. But in practice, quantum systems interact with their environment, and we often have incomplete knowledge about which state a system is in. The **density matrix** formalism extends quantum mechanics to handle both situations.

## Pure States as Density Matrices

Any pure state $|\psi\rangle$ can be equivalently described by the density matrix:

$$\rho = |\psi\rangle\langle\psi|$$

For a qubit in state $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$:

$$\rho = \begin{pmatrix} |\alpha|^2 & \alpha\beta^* \\ \alpha^*\beta & |\beta|^2 \end{pmatrix}$$

The diagonal elements $|\alpha|^2$ and $|\beta|^2$ are the probabilities of measuring $|0\rangle$ and $|1\rangle$. The off-diagonal elements $\alpha\beta^*$ and $\alpha^*\beta$ are the **coherences**, which encode quantum superposition and are responsible for interference.

## Mixed States

A **mixed state** represents classical uncertainty about which quantum state the system is in. If a system is in state $|\psi_k\rangle$ with probability $p_k$, the density matrix is:

$$\rho = \sum_k p_k |\psi_k\rangle\langle\psi_k|$$

where $p_k \geq 0$ and $\sum_k p_k = 1$.

### Example: Maximally Mixed State

If a qubit is equally likely to be $|0\rangle$ or $|1\rangle$:

$$\rho = \frac{1}{2}|0\rangle\langle 0| + \frac{1}{2}|1\rangle\langle 1| = \frac{1}{2}\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \frac{I}{2}$$

This state has no off-diagonal elements (no coherence) and is completely random. It sits at the center of the Bloch sphere.

## Properties of Density Matrices

A valid density matrix must satisfy:

| Property | Mathematical condition |
|---|---|
| Hermitian | $\rho = \rho^\dagger$ |
| Positive semidefinite | $\langle\phi\|\rho\|\phi\rangle \geq 0$ for all $\|\phi\rangle$ |
| Unit trace | $\text{Tr}(\rho) = 1$ |

### Distinguishing Pure from Mixed

| Test | Pure state | Mixed state |
|---|---|---|
| $\text{Tr}(\rho^2)$ | $= 1$ | $< 1$ |
| Rank of $\rho$ | 1 | $> 1$ |
| Eigenvalues | One eigenvalue is 1, rest are 0 | Multiple non-zero eigenvalues |
| Bloch vector length | $\|\vec{r}\| = 1$ | $\|\vec{r}\| < 1$ |

The quantity $\text{Tr}(\rho^2)$ is called the **purity**. It ranges from $1/d$ (maximally mixed in $d$ dimensions) to $1$ (pure).

## Evolution and Measurement with Density Matrices

### Unitary Evolution

$$\rho \mapsto U\rho U^\dagger$$

### Measurement

The probability of outcome $k$ when measuring observable $\{P_k\}$:

$$p(k) = \text{Tr}(P_k \rho)$$

Post-measurement state:

$$\rho_k = \frac{P_k \rho P_k}{\text{Tr}(P_k \rho)}$$

### Expectation Values

$$\langle A \rangle = \text{Tr}(A\rho)$$

This replaces $\langle\psi|A|\psi\rangle$ from the pure-state formalism and works for both pure and mixed states.

## The Bloch Sphere for Mixed States

Any single-qubit density matrix can be written as:

$$\rho = \frac{I + \vec{r} \cdot \vec{\sigma}}{2} = \frac{1}{2}\begin{pmatrix} 1 + r_z & r_x - ir_y \\ r_x + ir_y & 1 - r_z \end{pmatrix}$$

where $\vec{\sigma} = (X, Y, Z)$ and $\vec{r} = (r_x, r_y, r_z)$ is the Bloch vector with $|\vec{r}| \leq 1$.

- $|\vec{r}| = 1$: pure state (surface of the sphere)
- $0 < |\vec{r}| < 1$: mixed state (interior of the sphere)
- $|\vec{r}| = 0$: maximally mixed state (center)

## Partial Trace and Reduced Density Matrices

For a composite system $AB$ in state $\rho_{AB}$, the **reduced density matrix** of subsystem $A$ is obtained by tracing out $B$:

$$\rho_A = \text{Tr}_B(\rho_{AB}) = \sum_k (I_A \otimes \langle k|_B) \rho_{AB} (I_A \otimes |k\rangle_B)$$

where $\{|k\rangle_B\}$ is any orthonormal basis for $B$.

### Example: Bell State

For $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$:

$$\rho_{AB} = |\Phi^+\rangle\langle\Phi^+| = \frac{1}{2}\begin{pmatrix} 1&0&0&1 \\ 0&0&0&0 \\ 0&0&0&0 \\ 1&0&0&1 \end{pmatrix}$$

Tracing out $B$:

$$\rho_A = \text{Tr}_B(\rho_{AB}) = \frac{1}{2}(|0\rangle\langle 0| + |1\rangle\langle 1|) = \frac{I}{2}$$

The reduced state of each qubit in a maximally entangled pair is the maximally mixed state. This is a defining property of maximal entanglement: all the information is in the correlations, none in the individual qubits.

```{admonition} Entanglement Test
:class: note
A pure bipartite state $|\psi_{AB}\rangle$ is entangled if and only if its reduced density matrix $\rho_A$ is mixed (i.e., $\text{Tr}(\rho_A^2) < 1$). The more mixed the reduced state, the more entangled the composite state.
```

## Decoherence

**Decoherence** is the process by which a quantum system loses its coherence (off-diagonal elements) through interaction with its environment. It is the main enemy of quantum computing.

### Dephasing (T2 Process)

The off-diagonal elements decay while diagonal elements are preserved:

$$\rho(t) = \begin{pmatrix} |\alpha|^2 & \alpha\beta^* e^{-t/T_2} \\ \alpha^*\beta e^{-t/T_2} & |\beta|^2 \end{pmatrix}$$

After time $t \gg T_2$, the state becomes a classical mixture with no interference capability.

### Relaxation (T1 Process)

The excited state $|1\rangle$ decays to the ground state $|0\rangle$ with time constant $T_1$:

$$P(|1\rangle \to |0\rangle) = 1 - e^{-t/T_1}$$

$T_1$ sets the maximum useful computation time. $T_2 \leq 2T_1$ always.

### Decoherence Times by Platform

| Platform | $T_1$ | $T_2$ |
|---|---|---|
| Superconducting | $\sim 100\;\mu$s | $\sim 100\;\mu$s |
| Trapped ion | $\sim 1$ s | $\sim 1$ s |
| NV center | $\sim 6$ ms | $\sim 1$ ms |
| Spin qubit (Si) | $\sim 1$ s | $\sim 1$ ms |

Quantum error correction is needed when the computation time exceeds $T_2$. Current error correction schemes require physical qubit error rates below $\sim 10^{-3}$ per gate.

## Further Reading

- Nielsen, M. A. & Chuang, I. L. (2010). *Quantum Computation and Quantum Information*, Section 2.4.
- Schlosshauer, M. (2007). *Decoherence and the Quantum-to-Classical Transition*. Springer.
- Preskill, J. (2023). *Quantum Computing in the NISQ Era and Beyond*. Lecture 3: Density operators.
