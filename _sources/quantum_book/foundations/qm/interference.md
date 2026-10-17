# Quantum Interference

> Constructive and destructive interference of probability amplitudes. The double-slit experiment and Mach-Zehnder interferometer.

Interference is the mechanism by which quantum algorithms gain their advantage. Classical probabilities are non-negative and can only add up. Quantum probability amplitudes are complex numbers that can cancel (destructive interference) or reinforce (constructive interference). Every quantum speedup is, at its core, an engineered interference pattern that amplifies the probability of correct answers.

## Amplitudes vs. Probabilities

In classical probability, if there are two paths to an outcome with probabilities $p_1$ and $p_2$, the total probability is:

$$p_{\text{total}} = p_1 + p_2$$

In quantum mechanics, each path has a complex amplitude $A_1$ and $A_2$. The probability of the outcome is:

$$p_{\text{total}} = |A_1 + A_2|^2 = |A_1|^2 + |A_2|^2 + 2\text{Re}(A_1^* A_2)$$

The term $2\text{Re}(A_1^* A_2)$ is the **interference term**. It can be positive (constructive), negative (destructive), or zero. This term has no classical analog and is the source of all quantum computational advantage.

## The Double-Slit Experiment

The double-slit experiment is the most direct demonstration of quantum interference.

### Setup

A source emits particles (photons, electrons, or even molecules) one at a time toward a barrier with two narrow slits. A detector screen records where each particle arrives.

### Key Observations

**Both slits open**: An interference pattern of alternating bright and dark bands appears on the screen, even when particles are sent one at a time. The bright bands correspond to constructive interference; the dark bands to destructive interference.

**One slit blocked**: The interference pattern disappears. The screen shows a single broad distribution centered behind the open slit.

**Which-path detection**: If a detector is placed at the slits to determine which slit each particle passes through, the interference pattern also disappears, even though both slits are open.

### Mathematical Description

Let $A_1$ and $A_2$ be the amplitudes for reaching a point $x$ on the screen via slit 1 and slit 2 respectively. With both slits open:

$$P(x) = |A_1(x) + A_2(x)|^2$$

The amplitudes depend on the path lengths $d_1$ and $d_2$ from each slit to point $x$:

$$A_j(x) \propto e^{ikd_j(x)}$$

where $k = 2\pi/\lambda$ is the wave number. At positions where $d_1 - d_2 = n\lambda$ (integer wavelengths), the amplitudes add constructively. Where $d_1 - d_2 = (n + 1/2)\lambda$, they cancel.

```{admonition} Feynman's Dictum
:class: note
Richard Feynman called the double-slit experiment "the only mystery" of quantum mechanics, claiming that all quantum phenomena can be understood as variations of this single experiment. He was essentially correct: superposition, entanglement, and the measurement problem all manifest in variations of the double-slit setup.
```

## The Mach-Zehnder Interferometer

The Mach-Zehnder interferometer is the quantum-optics equivalent of the double-slit experiment, and it maps directly to qubit circuits.

### Setup

A single photon enters a 50/50 beam splitter (BS1), which creates a superposition of two paths. The paths are reflected by mirrors and recombined at a second beam splitter (BS2). Two detectors $D_0$ and $D_1$ sit at the outputs.

### Analysis

A 50/50 beam splitter acts as a Hadamard gate on the photon's path qubit:

$$\text{BS}: |0\rangle \mapsto \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle), \quad |1\rangle \mapsto \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)$$

For a photon entering port 0:

1. After BS1: $\frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$
2. After BS2: $H \cdot \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle) = |0\rangle$

The photon always exits at detector $D_0$. The path amplitudes interfere constructively at $D_0$ and destructively at $D_1$.

### Phase Shift

If a phase $\phi$ is introduced in one arm:

1. After BS1 and phase: $\frac{1}{\sqrt{2}}(|0\rangle + e^{i\phi}|1\rangle)$
2. After BS2: $\cos(\phi/2)|0\rangle + i\sin(\phi/2)|1\rangle$ (up to global phase)

Detection probabilities:

$$P(D_0) = \cos^2(\phi/2), \quad P(D_1) = \sin^2(\phi/2)$$

At $\phi = 0$: always $D_0$ (constructive). At $\phi = \pi$: always $D_1$ (destructive). This is the operating principle of quantum sensing and many quantum algorithms.

## Interference in Quantum Circuits

Every quantum circuit implements interference. The simplest example is the Hadamard-Hadamard circuit:

$$|0\rangle \xrightarrow{H} |+\rangle \xrightarrow{H} |0\rangle$$

The second Hadamard causes the $|1\rangle$ component to destructively interfere with itself, leaving only $|0\rangle$. This is identical to the Mach-Zehnder interferometer with no phase shift.

### Grover's Algorithm as Interference

Grover's search algorithm provides a clear example. Starting from an equal superposition over $N$ states, each iteration:

1. Flips the amplitude of the target state (oracle)
2. Reflects all amplitudes about the mean (diffusion operator)

After $O(\sqrt{N})$ iterations, constructive interference has concentrated nearly all amplitude on the target state. The non-target amplitudes have destructively interfered to near zero.

## Which-Path Information and Complementarity

The double-slit experiment reveals a fundamental trade-off: obtaining which-path information (determining which slit the particle passed through) destroys the interference pattern. This is not a technological limitation; it is a law of nature.

Quantitatively, the **Englert-Greenberger duality relation** states:

$$\mathcal{V}^2 + \mathcal{D}^2 \leq 1$$

where $\mathcal{V}$ is the visibility of the interference pattern (fringe contrast) and $\mathcal{D}$ is the distinguishability of the paths. Perfect which-path information ($\mathcal{D} = 1$) implies no interference ($\mathcal{V} = 0$), and vice versa.

This duality is the operational content of Bohr's complementarity principle and has been verified in numerous experiments with photons, atoms, and molecules.

## Further Reading

- Feynman, R. P., Leighton, R. B., & Sands, M. (1965). *The Feynman Lectures on Physics*, Vol. III, Chapter 1.
- Englert, B.-G. (1996). "Fringe Visibility and Which-Way Information: An Inequality." *Physical Review Letters*, 77(11), 2154.
- Arndt, M. et al. (1999). "Wave-particle duality of C60 molecules." *Nature*, 401, 680-682.
