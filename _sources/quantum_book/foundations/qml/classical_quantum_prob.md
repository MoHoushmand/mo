# Classical and Quantum Probability

> Probability amplitudes vs. classical probabilities. Born's rule, interference effects in probability, and quantum Bayesian inference.

Probability theory is a cornerstone of machine learning. Quantum states can be understood as a generalization of classical probability distributions, with properties that distinguish them fundamentally from classical probabilities. Contrasting these properties provides a direct introduction to the concepts needed for quantum computing and quantum machine learning.

## Classical Probability Distributions

Consider a biased coin. We associate a random variable $X$ with the outcome: $X = 0$ for heads and $X = 1$ for tails. Each toss yields heads with probability $P(X=0) = p_0$ and tails with $P(X=1) = p_1$. In Kolmogorov probability theory, $p_i \geq 0$ for all $i$, and probabilities sum to one: $\sum_i p_i = 1$.

We can arrange probabilities in a column vector called a **stochastic vector**:

$$\vec{p} = \begin{bmatrix} p_0 \\ p_1 \end{bmatrix}$$

The normalization constraint says this vector has unit norm in the $\ell_1$ norm:

$$\|\vec{p}\|_1 = \sum_i |p_i| = 1$$

Since $p_i \geq 0$, all valid probability distributions for a coin lie on a line segment in the positive orthant connecting $(1, 0)$ and $(0, 1)$.

### Extracting Probabilities

We can extract $p_0$ by projecting onto the first axis using the matrix $\Pi_0 = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$. The probability is $\|\Pi_0 \vec{p}\|_1 = p_0$. Similarly, $\Pi_1 = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}$ extracts $p_1$. These projections foreshadow quantum measurements, where observables are operator-valued random variables.

### Transforming Distributions

A left **stochastic matrix** maps stochastic vectors to stochastic vectors: its columns sum to one. For example:

$$M = \begin{bmatrix} 0.7 & 0.6 \\ 0.3 & 0.4 \end{bmatrix}, \quad M\vec{p} = \vec{p}'$$

This is the classical analog of quantum evolution, where unitary matrices transform quantum states.

### Entropy

The Shannon entropy of a distribution measures its unpredictability:

$$H(p) = -\sum_i p_i \log_2 p_i$$

Entropy is maximized by the uniform distribution (unbiased coin) and equals zero for deterministic distributions. This concept generalizes to the von Neumann entropy for quantum states.

## Quantum States

A quantum state is a column vector similar to a stochastic vector, but with two critical differences:

1. The entries (called **probability amplitudes**) are complex numbers: $a_i \in \mathbb{C}$.
2. Normalization is in the $\ell_2$ norm, not the $\ell_1$ norm.

For a single qubit:

$$|\psi\rangle = \begin{bmatrix} a_0 \\ a_1 \end{bmatrix}, \quad \||\psi\rangle\|_2 = \sqrt{|a_0|^2 + |a_1|^2} = 1$$

The notation $|\psi\rangle$ (a "ket") indicates a column vector representing a quantum state. This is Dirac notation, which provides notational convenience far beyond the humble arrow over a classical vector.

### The Computational Basis

Two special qubits form the computational basis:

$$|0\rangle = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \quad |1\rangle = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

Any qubit can be expanded in this basis:

$$|\psi\rangle = a_0|0\rangle + a_1|1\rangle$$

This expansion is called a **superposition**.

### Born's Rule

Measuring a qubit in the computational basis yields outcome $0$ with probability $|a_0|^2$ and outcome $1$ with probability $|a_1|^2$. This is **Born's rule**, the bridge between amplitudes and observable probabilities. After measurement, the state collapses to the observed basis state.

```{admonition} Key distinction
:class: important
In classical probability, the entries of $\vec{p}$ are the probabilities themselves. In quantum mechanics, the entries of $|\psi\rangle$ are probability *amplitudes*, and probabilities are obtained by squaring their absolute values. This seemingly small change has profound consequences.
```

## The Bloch Sphere

Since a qubit has two complex amplitudes constrained by normalization, it has three real degrees of freedom (a global phase is unobservable). This allows visualization as a point on a unit sphere in three dimensions: the **Bloch sphere**.

- The north pole is $|0\rangle$, the south pole is $|1\rangle$.
- Points on the equator represent equal superpositions with different relative phases.
- Every point on the surface is a valid qubit state (pure state).
- Points inside the sphere represent mixed states (discussed in {doc}`measurements_mixed`).

```{note}
Orthogonal states appear as antipodal points on the Bloch sphere, not at right angles. The geometry of the sphere differs from ordinary 3D space in this respect.
```

## Interference

Complex-valued amplitudes enable **interference**, the most important quantum effect for computation. Consider a rotation $R_y(\pi/2)$ applied to $|0\rangle$:

$$R_y(\pi/2)|0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$$

Applying the same rotation to $|1\rangle$ gives $\frac{1}{\sqrt{2}}(-|0\rangle + |1\rangle)$. The negative amplitude is invisible in measurement statistics (both give 50/50 outcomes). But if we apply $R_y(\pi/2)$ twice to $|0\rangle$:

$$R_y(\pi/2)\left[\frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)\right] = \frac{1}{2}(|0\rangle + |1\rangle - |0\rangle + |1\rangle) = |1\rangle$$

The $|0\rangle$ amplitudes **destructively interfere** (cancel), producing the deterministic outcome $|1\rangle$. This is impossible with classical probabilities, which are always non-negative and can only add.

## Multi-Qubit States and Entanglement

Multi-qubit states are constructed using the tensor product. Given $|\psi\rangle$ and $|\psi'\rangle$:

$$|\psi\rangle \otimes |\psi'\rangle = \begin{bmatrix} a_0 b_0 \\ a_0 b_1 \\ a_1 b_0 \\ a_1 b_1 \end{bmatrix}$$

The basis states $|00\rangle, |01\rangle, |10\rangle, |11\rangle$ span $\mathbb{C}^2 \otimes \mathbb{C}^2$.

Not all states in this space can be written as tensor products. The Bell state

$$|\phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$$

cannot be decomposed as $|\psi\rangle \otimes |\psi'\rangle$ for any single-qubit states. Such states are called **entangled**. Entanglement produces correlations stronger than any classical probability distribution can achieve and is a key resource for quantum algorithms.

```{tip}
To verify that $|\phi^+\rangle$ is entangled, assume it can be written as a product. Then $a_0 b_0 = 1/\sqrt{2}$ and $a_1 b_1 = 1/\sqrt{2}$, but $a_0 b_1 = 0$ and $a_1 b_0 = 0$. These four equations have no consistent solution.
```

## Relevance to Machine Learning

The transition from classical to quantum probability has direct implications for ML:

| Property | Classical | Quantum | ML Consequence |
|---|---|---|---|
| Values | Non-negative reals | Complex numbers | Interference enables amplitude-based speedups |
| Normalization | $\ell_1$ norm | $\ell_2$ norm | Richer geometry of state space |
| Composition | Cartesian product | Tensor product | Exponential state space growth |
| Correlations | Bounded by Bell inequalities | Violate Bell inequalities | Stronger-than-classical feature correlations |

## Further Reading

- Nielsen, M.A. and Chuang, I.L. *Quantum Computation and Quantum Information* (Cambridge, 2010), Chapters 1-2
- Schuld, M. and Petruccione, F. *Supervised Learning with Quantum Computers* (Springer, 2018), Chapter 2
- Aaronson, S. *Quantum Computing since Democritus* (Cambridge, 2013), Chapter 9
