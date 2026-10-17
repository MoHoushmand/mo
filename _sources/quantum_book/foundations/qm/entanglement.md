# Entanglement

> Non-local correlations between quantum systems. Bell states, EPR paradox, Bell inequalities, and why Einstein called it "spooky action at a distance."

Quantum entanglement is a correlation between quantum systems that has no classical analog. When two qubits are entangled, the state of the pair cannot be described by specifying the state of each qubit independently. Measuring one qubit instantaneously determines the outcome of measuring the other, regardless of the distance separating them.

Entanglement is not merely a theoretical curiosity. It is the resource that powers quantum teleportation, superdense coding, quantum key distribution, and the speedups in many quantum algorithms.

## Definition

A pure state $|\psi_{AB}\rangle$ of a bipartite system is **entangled** if it cannot be written as a tensor product:

$$|\psi_{AB}\rangle \neq |\phi_A\rangle \otimes |\chi_B\rangle \quad \text{for any } |\phi_A\rangle, |\chi_B\rangle$$

States that *can* be written as tensor products are called **separable** or **product states**.

### Detecting Entanglement

For a two-qubit pure state $|\psi\rangle = a|00\rangle + b|01\rangle + c|10\rangle + d|11\rangle$, the state is entangled if and only if:

$$ad \neq bc$$

This is the condition that the $2 \times 2$ coefficient matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ has rank greater than 1.

## The Bell States

The four maximally entangled two-qubit states form the **Bell basis**:

$$|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle) \qquad |\Phi^-\rangle = \frac{1}{\sqrt{2}}(|00\rangle - |11\rangle)$$

$$|\Psi^+\rangle = \frac{1}{\sqrt{2}}(|01\rangle + |10\rangle) \qquad |\Psi^-\rangle = \frac{1}{\sqrt{2}}(|01\rangle - |10\rangle)$$

Properties of the Bell states:

- They form a complete orthonormal basis for two qubits
- Each qubit individually is in a maximally mixed state: $\rho_A = \frac{I}{2}$
- Measuring both qubits in the same basis always produces perfectly correlated ($\Phi^\pm$) or anti-correlated ($\Psi^\pm$) outcomes
- The sign ($\pm$) determines the relative phase, which affects correlations when measured in other bases

```{admonition} Monogamy of Entanglement
:class: note
If two qubits are maximally entangled with each other, neither can be entangled with any third party. This monogamy property, quantified by the Coffman-Kundu-Wootters inequality, is the foundation of quantum key distribution: if Alice and Bob share a maximally entangled pair, no eavesdropper can share any of that entanglement.
```

## The EPR Argument

In 1935, Einstein, Podolsky, and Rosen (EPR) argued that quantum mechanics is incomplete. Their reasoning:

1. Alice and Bob share $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$
2. If Alice measures her qubit and gets $|0\rangle$, Bob's qubit is instantly in state $|0\rangle$
3. Alice could instead measure in the $X$-basis; if she gets $|+\rangle$, Bob's qubit is instantly $|+\rangle$
4. Alice's choice of measurement basis determines Bob's state, but Alice and Bob can be arbitrarily far apart
5. EPR concluded that either (a) quantum mechanics is incomplete and there are "hidden variables" predetermining the outcomes, or (b) measurement involves "spooky action at a distance"

EPR favored option (a): the outcomes are predetermined by hidden variables that quantum mechanics fails to describe.

## Bell's Theorem (1964)

John Bell proved that *any* local hidden variable theory makes predictions that satisfy a specific inequality, and quantum mechanics violates it. This means EPR's option (a) is ruled out by experiment.

### The CHSH Inequality

The most commonly tested form is the Clauser-Horne-Shimony-Holt (CHSH) inequality. Alice chooses between measurements $A_1$ or $A_2$; Bob chooses between $B_1$ or $B_2$. Each measurement yields $\pm 1$. Define:

$$S = \langle A_1 B_1 \rangle + \langle A_1 B_2 \rangle + \langle A_2 B_1 \rangle - \langle A_2 B_2 \rangle$$

**Local hidden variable bound**: $|S| \leq 2$

**Quantum mechanics prediction**: $|S| \leq 2\sqrt{2} \approx 2.828$

The maximum quantum value $2\sqrt{2}$ is called the **Tsirelson bound**. It is achieved by measuring the Bell state $|\Phi^+\rangle$ with optimal measurement angles.

### Optimal Measurement Settings

The quantum maximum is achieved when:
- Alice measures at angles $0$ and $\pi/4$ from the $Z$-axis
- Bob measures at angles $\pi/8$ and $-\pi/8$

This gives:

$$S = 2\sqrt{2} > 2$$

The violation of the CHSH inequality has been confirmed in thousands of experiments, culminating in the loophole-free tests of 2015 (see {doc}`experimental`).

## Entanglement as a Resource

Entanglement enables several quantum information protocols:

| Protocol | What it does | Entanglement consumed |
|---|---|---|
| **Quantum teleportation** | Transmit qubit using 1 ebit + 2 classical bits | 1 Bell pair |
| **Superdense coding** | Transmit 2 classical bits using 1 qubit + 1 ebit | 1 Bell pair |
| **QKD (E91)** | Generate shared secret key | 1 Bell pair per key bit |
| **MBQC** | Measurement-based quantum computation | Cluster state |

```{admonition} Entanglement Cannot Transmit Information
:class: warning
Despite the instantaneous correlations, entanglement alone cannot transmit information faster than light. Bob's local measurement statistics are completely random ($50/50$ for any measurement basis) regardless of what Alice does. Only when Alice sends her measurement results through a classical channel can Bob extract useful information. This is consistent with special relativity.
```

## Quantifying Entanglement

For a pure bipartite state $|\psi_{AB}\rangle$, entanglement is quantified by the **von Neumann entropy** of the reduced density matrix:

$$E(|\psi_{AB}\rangle) = S(\rho_A) = -\text{Tr}(\rho_A \log_2 \rho_A)$$

where $\rho_A = \text{Tr}_B(|\psi_{AB}\rangle\langle\psi_{AB}|)$.

For maximally entangled states: $E = 1$ ebit (entropy bit). For product states: $E = 0$.

## Further Reading

- Bell, J. S. (1964). "On the Einstein Podolsky Rosen Paradox." *Physics Physique Fizika*, 1(3), 195-200.
- Clauser, J. F., Horne, M. A., Shimony, A., & Holt, R. A. (1969). "Proposed Experiment to Test Local Hidden-Variable Theories." *Physical Review Letters*, 23(15), 880-884.
- Horodecki, R., Horodecki, P., Horodecki, M., & Horodecki, K. (2009). "Quantum Entanglement." *Reviews of Modern Physics*, 81(2), 865-942.
- Nielsen, M. A. & Chuang, I. L. (2010). *Quantum Computation and Quantum Information*, Section 2.6.
