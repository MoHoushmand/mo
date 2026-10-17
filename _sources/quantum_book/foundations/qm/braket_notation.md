# Dirac Bra-Ket Notation

> The mathematical language of quantum mechanics: kets $|\psi\rangle$, bras $\langle\phi|$, inner products, outer products, and their physical interpretation.

Dirac notation (bra-ket notation) is the standard language of quantum mechanics and quantum computing. Introduced by Paul Dirac in 1939, it provides a concise, basis-independent way to write quantum states, operators, and measurements. Every equation in quantum computing papers uses this notation. Learning it is not optional.

## Kets: Quantum States

A **ket** $|\psi\rangle$ represents a column vector in a complex Hilbert space. For a qubit:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}$$

where $\alpha, \beta \in \mathbb{C}$ and $|\alpha|^2 + |\beta|^2 = 1$ (normalization).

The **computational basis** for a single qubit is:

$$|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

Other commonly used single-qubit states:

| State | Notation | Vector | Basis |
|---|---|---|---|
| Plus | $\|+\rangle$ | $\frac{1}{\sqrt{2}}\begin{pmatrix}1\\1\end{pmatrix}$ | Hadamard ($X$) basis |
| Minus | $\|-\rangle$ | $\frac{1}{\sqrt{2}}\begin{pmatrix}1\\-1\end{pmatrix}$ | Hadamard ($X$) basis |
| Plus-$i$ | $\|+i\rangle$ | $\frac{1}{\sqrt{2}}\begin{pmatrix}1\\i\end{pmatrix}$ | Circular ($Y$) basis |
| Minus-$i$ | $\|-i\rangle$ | $\frac{1}{\sqrt{2}}\begin{pmatrix}1\\-i\end{pmatrix}$ | Circular ($Y$) basis |

## Bras: Dual Vectors

A **bra** $\langle\phi|$ is the conjugate transpose (Hermitian adjoint) of the corresponding ket:

$$\text{If } |\phi\rangle = \begin{pmatrix} a \\ b \end{pmatrix}, \text{ then } \langle\phi| = \begin{pmatrix} a^* & b^* \end{pmatrix}$$

The bra lives in the **dual space**, the space of linear functionals on the Hilbert space.

## Inner Products

The **inner product** $\langle\phi|\psi\rangle$ (a "bracket," hence "bra-ket") is a complex number obtained by multiplying a bra by a ket:

$$\langle\phi|\psi\rangle = \begin{pmatrix} a^* & b^* \end{pmatrix} \begin{pmatrix} \alpha \\ \beta \end{pmatrix} = a^*\alpha + b^*\beta$$

Properties:

- **Conjugate symmetry**: $\langle\phi|\psi\rangle = \langle\psi|\phi\rangle^*$
- **Linearity in the second argument**: $\langle\phi|(\alpha|\psi_1\rangle + \beta|\psi_2\rangle) = \alpha\langle\phi|\psi_1\rangle + \beta\langle\phi|\psi_2\rangle$
- **Positive definiteness**: $\langle\psi|\psi\rangle \geq 0$, with equality only if $|\psi\rangle = 0$

### Orthonormality

Two states are **orthogonal** if $\langle\phi|\psi\rangle = 0$. A state is **normalized** if $\langle\psi|\psi\rangle = 1$. The computational basis is orthonormal:

$$\langle 0|0\rangle = 1, \quad \langle 1|1\rangle = 1, \quad \langle 0|1\rangle = 0, \quad \langle 1|0\rangle = 0$$

This can be written compactly as $\langle i|j\rangle = \delta_{ij}$ (the Kronecker delta).

### Physical Meaning

The inner product $\langle\phi|\psi\rangle$ is the **probability amplitude** for measuring state $|\psi\rangle$ and finding it in state $|\phi\rangle$. The probability is the squared modulus:

$$P = |\langle\phi|\psi\rangle|^2$$

This is the Born rule in Dirac notation.

## Outer Products

The **outer product** $|\psi\rangle\langle\phi|$ is an operator (a matrix) that maps kets to kets:

$$|\psi\rangle\langle\phi| : |\chi\rangle \mapsto \langle\phi|\chi\rangle \cdot |\psi\rangle$$

In matrix form for qubits:

$$|0\rangle\langle 0| = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}, \quad |1\rangle\langle 1| = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$$

$$|0\rangle\langle 1| = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \quad |1\rangle\langle 0| = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}$$

### Projection Operators

The outer product $P_k = |k\rangle\langle k|$ is a **projector** onto state $|k\rangle$. Projectors satisfy $P_k^2 = P_k$ and $P_k^\dagger = P_k$.

### Completeness Relation

For any orthonormal basis $\{|k\rangle\}$, the projectors sum to the identity:

$$\sum_k |k\rangle\langle k| = I$$

This is called the **completeness relation** (or resolution of the identity). It is used constantly in quantum mechanics to insert bases, change representations, and decompose operators.

## Operators in Dirac Notation

Any linear operator $A$ can be written using outer products:

$$A = \sum_{i,j} A_{ij} |i\rangle\langle j|$$

where $A_{ij} = \langle i|A|j\rangle$ are the matrix elements of $A$ in the basis $\{|i\rangle\}$.

### Expectation Values

The expected value of an observable $A$ when measured on state $|\psi\rangle$:

$$\langle A \rangle = \langle\psi|A|\psi\rangle = \sum_k a_k |\langle a_k|\psi\rangle|^2$$

where $a_k$ are the eigenvalues and $|a_k\rangle$ the eigenstates of $A$.

## Tensor Products

For composite systems, the tensor product $|\psi\rangle \otimes |\phi\rangle$ is often written as $|\psi\rangle|\phi\rangle$ or $|\psi\phi\rangle$:

$$|0\rangle \otimes |1\rangle = |0\rangle|1\rangle = |01\rangle = \begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix}$$

The four computational basis states for two qubits are:

$$|00\rangle = \begin{pmatrix}1\\0\\0\\0\end{pmatrix}, \; |01\rangle = \begin{pmatrix}0\\1\\0\\0\end{pmatrix}, \; |10\rangle = \begin{pmatrix}0\\0\\1\\0\end{pmatrix}, \; |11\rangle = \begin{pmatrix}0\\0\\0\\1\end{pmatrix}$$

```{admonition} Notation Shortcuts
:class: tip
In quantum computing literature, you will see all of the following used interchangeably: $|0\rangle \otimes |1\rangle = |0\rangle|1\rangle = |0,1\rangle = |01\rangle = |1\rangle_{\text{decimal}}$. The last form uses the decimal representation of the binary string.
```

## Summary of Dirac Notation

| Symbol | Name | Type | Dimension (qubit) |
|---|---|---|---|
| $\|\psi\rangle$ | Ket | Column vector | $2 \times 1$ |
| $\langle\psi\|$ | Bra | Row vector | $1 \times 2$ |
| $\langle\phi\|\psi\rangle$ | Inner product | Scalar ($\mathbb{C}$) | $1 \times 1$ |
| $\|\psi\rangle\langle\phi\|$ | Outer product | Operator (matrix) | $2 \times 2$ |
| $\langle\psi\|A\|\psi\rangle$ | Expectation value | Scalar ($\mathbb{R}$) | $1 \times 1$ |

## Further Reading

- Dirac, P. A. M. (1939). "A New Notation for Quantum Mechanics." *Mathematical Proceedings of the Cambridge Philosophical Society*, 35(3), 416-418.
- Sakurai, J. J. & Napolitano, J. J. (2017). *Modern Quantum Mechanics*, Chapter 1.
- Nielsen, M. A. & Chuang, I. L. (2010). *Quantum Computation and Quantum Information*, Section 2.1.
