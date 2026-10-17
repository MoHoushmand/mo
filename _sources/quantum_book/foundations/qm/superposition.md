# Superposition

> A quantum system can exist in multiple states simultaneously. Mathematical formalism, physical intuition, and the Stern-Gerlach experiment.

Superposition is the principle that a quantum system, rather than being confined to a single definite state, can exist in a linear combination of states. This is not a statement about our ignorance of the system's state. The system genuinely occupies multiple states at once, with complex probability amplitudes governing the likelihood of each measurement outcome.

## Mathematical Formalism

Given a basis $\{|0\rangle, |1\rangle\}$ for a qubit, the most general state is:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$$

where $\alpha, \beta \in \mathbb{C}$ satisfy the normalization condition:

$$|\alpha|^2 + |\beta|^2 = 1$$

The coefficients $\alpha$ and $\beta$ are **probability amplitudes**. They are not probabilities: amplitudes are complex numbers that can interfere. Probabilities are the squared moduli of amplitudes:

$$P(0) = |\alpha|^2, \quad P(1) = |\beta|^2$$

### Superposition is Basis-Dependent

A state that appears to be a superposition in one basis may be a definite state in another. The state $|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$ is a superposition in the computational ($Z$) basis but a definite eigenstate in the Hadamard ($X$) basis.

This is analogous to how a vector $(1,1)/\sqrt{2}$ is a superposition of the $x$ and $y$ unit vectors but points in a definite direction along the diagonal. The physics does not depend on the choice of basis; only measurement outcomes depend on which observable is measured.

### General Superposition

For a $d$-dimensional system with orthonormal basis $\{|k\rangle\}_{k=0}^{d-1}$:

$$|\psi\rangle = \sum_{k=0}^{d-1} c_k |k\rangle, \quad \sum_{k=0}^{d-1} |c_k|^2 = 1$$

The number of independent real parameters needed to specify the state is $2d - 2$ (accounting for normalization and global phase).

## The Stern-Gerlach Experiment

The Stern-Gerlach experiment (1922) provided the first direct evidence of quantized angular momentum and remains the clearest physical demonstration of superposition and measurement.

### Setup

A beam of silver atoms passes through an inhomogeneous magnetic field. The field exerts a force proportional to the component of the atom's magnetic moment along the field direction.

### Classical Prediction

The magnetic moment should be oriented in all directions, producing a continuous distribution on the detector screen.

### Quantum Result

The beam splits into exactly two spots, corresponding to spin-up ($|{\uparrow}\rangle$) and spin-down ($|{\downarrow}\rangle$) along the field axis. The angular momentum component is quantized: $S_z = \pm\hbar/2$.

### Sequential Measurements

The power of superposition becomes clear with sequential Stern-Gerlach devices:

1. **Z then Z**: A beam filtered to $|{\uparrow}_z\rangle$ and passed through a second $Z$-oriented device always emerges as $|{\uparrow}_z\rangle$. No splitting occurs.

2. **Z then X**: A beam filtered to $|{\uparrow}_z\rangle$ and passed through an $X$-oriented device splits 50/50. The $Z$-eigenstate is a superposition of $X$-eigenstates:

$$|{\uparrow}_z\rangle = \frac{1}{\sqrt{2}}(|{\uparrow}_x\rangle + |{\downarrow}_x\rangle)$$

3. **Z then X then Z**: After filtering $|{\uparrow}_z\rangle$, then filtering $|{\uparrow}_x\rangle$, the beam splits 50/50 in a final $Z$-measurement. The $X$-measurement has destroyed the $Z$-information, because $|{\uparrow}_x\rangle$ is a superposition in the $Z$-basis.

```{admonition} Key Insight
:class: important
The sequential Stern-Gerlach experiment demonstrates that quantum measurement is not passive observation. Measuring spin along $X$ does not simply reveal information; it actively resets the spin state, erasing any prior information about the $Z$-component.
```

## Superposition vs. Classical Mixtures

Superposition is fundamentally different from classical uncertainty (not knowing which state the system is in):

| Property | Superposition | Classical mixture |
|---|---|---|
| Description | $\alpha\|0\rangle + \beta\|1\rangle$ | "50% chance of $\|0\rangle$, 50% chance of $\|1\rangle$" |
| Density matrix | $\|\psi\rangle\langle\psi\|$ (pure, rank 1) | $\frac{1}{2}\|0\rangle\langle 0\| + \frac{1}{2}\|1\rangle\langle 1\|$ (mixed) |
| Interference | Yes | No |
| Off-diagonal elements | Non-zero | Zero |
| Basis dependence | Changes form | Remains mixed |

The off-diagonal elements of the density matrix (coherences) are the signature of superposition. Decoherence, the loss of these off-diagonal elements through interaction with the environment, is what converts a quantum superposition into a classical mixture.

## Superposition in Quantum Computing

In quantum computing, superposition has a specific operational meaning: a Hadamard gate $H$ maps a computational basis state to an equal superposition:

$$H|0\rangle = |+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$$

Applying $H$ to each of $n$ qubits initialized to $|0\rangle$ produces:

$$H^{\otimes n}|0\rangle^{\otimes n} = \frac{1}{\sqrt{2^n}} \sum_{x=0}^{2^n - 1} |x\rangle$$

This is an equal superposition over all $2^n$ computational basis states. The subsequent algorithm uses interference to concentrate probability amplitude on desired outcomes.

```{admonition} Superposition is Necessary but Not Sufficient
:class: warning
Creating a superposition is the easy part. The hard part is arranging for the amplitudes to interfere in a way that amplifies correct answers and suppresses wrong ones. Superposition without interference gives no computational advantage over random guessing.
```

## Further Reading

- Feynman, R. P., Leighton, R. B., & Sands, M. (1965). *The Feynman Lectures on Physics*, Vol. III, Chapter 5.
- Sakurai, J. J. & Napolitano, J. J. (2017). *Modern Quantum Mechanics*, Chapter 1 (Stern-Gerlach experiment).
- Nielsen, M. A. & Chuang, I. L. (2010). *Quantum Computation and Quantum Information*, Section 1.2.
