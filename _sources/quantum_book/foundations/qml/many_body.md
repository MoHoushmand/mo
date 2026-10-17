# Many-Body Quantum Systems

> Tensor networks, entanglement entropy, area laws, and how ML techniques help simulate quantum many-body physics.

Quantum machine learning and many-body quantum physics are deeply intertwined. Tensor networks, originally developed to simulate quantum many-body systems, serve as both a classical ML architecture and a theoretical lens for understanding the expressiveness of quantum circuits. Entanglement entropy characterizes the computational difficulty of simulating quantum systems classically and governs the power of quantum feature maps.

## The Many-Body Problem

An $n$-qubit system lives in a Hilbert space of dimension $2^n$. A general state requires $2^n$ complex amplitudes:

$$|\psi\rangle = \sum_{i_1, \ldots, i_n \in \{0,1\}} c_{i_1 \cdots i_n} |i_1 \cdots i_n\rangle$$

For $n = 50$, this is already $2^{50} \approx 10^{15}$ amplitudes, far beyond classical memory. The many-body problem is about finding efficient representations and computational methods for states in this exponentially large space.

Fortunately, physically relevant states occupy only a tiny corner of the full Hilbert space. The structure of this corner is characterized by entanglement.

## Entanglement Entropy

For a bipartite pure state $|\psi\rangle_{AB}$, the **entanglement entropy** is the von Neumann entropy of the reduced density matrix:

$$S(\rho_A) = -\text{Tr}(\rho_A \log_2 \rho_A)$$

This quantifies the entanglement between subsystems $A$ and $B$.

### Area Laws

Ground states of gapped, local Hamiltonians in $d$ spatial dimensions obey an **area law**: the entanglement entropy of a region scales with the boundary area, not the volume:

$$S(\rho_A) \sim O(|\partial A|)$$

In one dimension, this means the entanglement entropy is bounded by a constant, independent of system size. This is a dramatic constraint: a generic state in the Hilbert space would have volume-law entanglement ($S \sim O(|A|)$).

```{admonition} Why area laws matter for ML
:class: important
Area laws explain why tensor network methods work so well for ground states: these states have limited entanglement that tensor networks can capture efficiently. They also suggest that quantum circuits with limited entanglement (shallow circuits) can only express a restricted class of functions, connecting to the barren plateau problem in variational QML.
```

Critical systems and highly excited states violate area laws with logarithmic or volume-law corrections, requiring more sophisticated methods.

## Tensor Networks

Tensor networks provide compact representations of many-body quantum states by decomposing the exponentially large coefficient tensor $c_{i_1 \cdots i_n}$ into a network of smaller tensors.

### Matrix Product States (MPS)

The simplest tensor network is the **Matrix Product State**, where the coefficient tensor is decomposed as:

$$c_{i_1 i_2 \cdots i_n} = \sum_{\alpha_1, \ldots, \alpha_{n-1}} A^{[1]i_1}_{\alpha_1} A^{[2]i_2}_{\alpha_1 \alpha_2} \cdots A^{[n]i_n}_{\alpha_{n-1}}$$

Each $A^{[k]}$ is a tensor of dimension $d \times \chi \times \chi$, where $d$ is the local Hilbert space dimension (2 for qubits) and $\chi$ is the **bond dimension**. The total number of parameters is $O(n d \chi^2)$, which is polynomial in $n$ for fixed $\chi$.

MPS can exactly represent states with entanglement entropy bounded by $\log_2 \chi$. For area-law states in 1D, a moderate $\chi$ suffices for an excellent approximation.

### Other Tensor Network Architectures

| Network | Topology | Best for | Entanglement |
|---|---|---|---|
| MPS / TT | Chain | 1D systems | Area law in 1D |
| PEPS | 2D grid | 2D systems | Area law in 2D |
| MERA | Hierarchical tree | Critical systems | Logarithmic violations |
| Tree Tensor Network | Binary tree | Hierarchical data | Logarithmic |

### Tensor Networks as ML Models

Tensor networks have been directly applied as machine learning models:

- **MPS classifiers** treat input features as indices of a tensor network. The output is a contraction of the network, and training optimizes the tensors via gradient descent.
- **Tensor network Born machines** define probability distributions via $p(x) = |c_x|^2$, where $c_x$ is computed by contracting a tensor network. These generative models directly mirror quantum state sampling.
- **DMRG-inspired optimization** (Density Matrix Renormalization Group) algorithms sweep through the tensor network, optimizing one tensor at a time, analogous to coordinate descent.

## Entanglement and Quantum Circuit Depth

The entanglement structure of a quantum state determines the minimum circuit depth required to prepare it. A circuit of depth $d$ on $n$ qubits with nearest-neighbor connectivity can generate at most $O(d)$ entanglement entropy across any cut. This establishes a hierarchy:

$$\text{Product states} \subset \text{MPS (low } \chi\text{)} \subset \text{Shallow circuits} \subset \text{Deep circuits} \subset \text{Full Hilbert space}$$

For QML, this hierarchy has practical consequences:

- Variational circuits with limited depth can only access states with limited entanglement.
- Data that requires highly entangled states for accurate representation may be hard to learn with shallow quantum circuits.
- Classical tensor network methods can efficiently simulate shallow quantum circuits, limiting the potential for quantum advantage.

```{note}
The entanglement structure of training data determines whether a quantum model offers any advantage over a classical tensor network model. If the data has low entanglement (e.g., images, tabular data), classical methods may suffice.
```

## Quantum Simulation and ML

The intersection of many-body physics and ML runs in both directions:

**Quantum computing for many-body physics.** Variational quantum eigensolvers (VQE) use parameterized circuits to find ground states of molecular and condensed-matter Hamiltonians. This is one of the most promising near-term applications of quantum computers.

**Many-body physics for ML theory.** Concepts from many-body physics illuminate QML:
- **Entanglement entropy** bounds the expressiveness of quantum circuits.
- **Phase transitions** in random circuits correspond to transitions in trainability (barren plateaus).
- **Renormalization group** ideas inspire hierarchical quantum feature extraction (MERA-based circuits).

## Further Reading

- Orus, R. "A practical introduction to tensor networks." *Annals of Physics* 349, 117-158 (2014)
- Stoudenmire, E.M. and Schwab, D.J. "Supervised learning with tensor networks." *NeurIPS 2016*
- Eisert, J., Cramer, M., and Plenio, M.B. "Area laws for the entanglement entropy." *Reviews of Modern Physics* 82, 277 (2010)
- Cirac, J.I. et al. "Matrix product states and projected entangled pair states." *Reviews of Modern Physics* 93, 045003 (2021)
