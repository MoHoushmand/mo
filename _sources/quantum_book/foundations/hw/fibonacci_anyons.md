# Fibonacci Anyons

> Non-Abelian anyons that enable universal quantum computation through braiding alone. The theoretical gold standard for topological quantum computing.

Fibonacci anyons are the most computationally powerful type of non-Abelian anyon. A system of Fibonacci anyons can perform **universal quantum computation through braiding alone**, without any additional non-topological operations. They are the theoretical gold standard against which all topological qubit proposals are compared.

## Fusion Rules

Every anyon model is defined by its **fusion rules**, which describe what happens when two anyons are brought together. The Fibonacci anyon model has just two particle types:

- $\mathbf{1}$: the vacuum (trivial particle)
- $\tau$: the Fibonacci anyon

The fusion rules are:

$$\tau \times \tau = \mathbf{1} + \tau$$

This single rule encodes everything. When two Fibonacci anyons are brought together, they can fuse into either the vacuum or another Fibonacci anyon. The outcome is not determined until a measurement is made, and the two possibilities span a two-dimensional Hilbert space.

Compare this to Ising anyons (Majorana-based):

$$\sigma \times \sigma = \mathbf{1} + \psi$$

where $\sigma$ is the Ising anyon and $\psi$ is a fermion. Ising anyons also have a two-dimensional fusion space, but their braiding generates only the Clifford group, not the full unitary group. Fibonacci anyons generate a dense subset of $SU(2)$, which is universal.

## The Fibonacci Hilbert Space

The dimension of the Hilbert space for $n$ Fibonacci anyons grows as $\varphi^n$, where $\varphi = (1 + \sqrt{5})/2 \approx 1.618$ is the golden ratio. This is where the name "Fibonacci" comes from: the Hilbert space dimensions follow the Fibonacci sequence.

| Number of $\tau$ anyons | Fusion space dimension |
|---|---|
| 2 | 2 (fuse to $\mathbf{1}$ or $\tau$) |
| 3 | 3 |
| 4 | 5 |
| 5 | 8 |
| $n$ | $F_n$ (Fibonacci number) |

To encode a qubit, we use **three** Fibonacci anyons with total charge $\tau$. The two basis states correspond to different internal fusion channels:

$$|0\rangle: (\tau \times \tau) = \mathbf{1}, \text{ then } \mathbf{1} \times \tau = \tau$$
$$|1\rangle: (\tau \times \tau) = \tau, \text{ then } \tau \times \tau = \tau$$

## Braiding as Computation

The braiding of Fibonacci anyons implements unitary transformations on the fusion space. The elementary braiding matrices for exchanging adjacent anyons are:

For three anyons, the two generators of the braid group $B_3$ act as $2 \times 2$ matrices on the qubit space:

$$\sigma_1 = \begin{pmatrix} e^{-4\pi i/5} & 0 \\ 0 & e^{3\pi i/5} \end{pmatrix}, \quad \sigma_2 = \begin{pmatrix} \varphi^{-1} e^{-4\pi i/5} & \varphi^{-1/2} e^{3\pi i/5} \\ \varphi^{-1/2} e^{3\pi i/5} & -\varphi^{-1} \end{pmatrix}$$

where $\varphi$ is the golden ratio. The key result, proven by Freedman, Larsen, and Wang (2002): the set of all braids on Fibonacci anyons generates a **dense** subset of $SU(2)$. This means any single-qubit gate can be approximated to arbitrary precision by a finite braid sequence.

Combined with a two-qubit entangling gate (achieved by braiding anyons between two qubit triplets), this gives universality.

## Approximating Gates by Braiding

Because braiding generates a dense but discrete set of gates, specific braids must be found to approximate desired gates. The **Solovay-Kitaev theorem** guarantees that any target gate can be approximated to precision $\epsilon$ using a braid of length $O(\log^c(1/\epsilon))$ for some constant $c$.

In practice, efficient braid compilation algorithms search for short braid words that approximate target gates. For example, a Hadamard gate on a Fibonacci qubit can be approximated to error $10^{-3}$ with a braid of about 20 exchanges, and to error $10^{-10}$ with about 50 exchanges.

## Where to Find Fibonacci Anyons

Fibonacci anyons have not yet been experimentally confirmed. Candidate systems include:

**Fractional quantum Hall states.** The $\nu = 12/5$ fractional quantum Hall state is predicted to host Fibonacci anyons. Experimental evidence is limited because this state is fragile and difficult to stabilize.

**Read-Rezayi states.** The $\nu = k/(k+2)$ hierarchy of quantum Hall states is predicted to support non-Abelian anyons, with $k = 3$ giving Fibonacci anyons.

**Engineered lattice models.** Certain spin lattice models (e.g., the Levin-Wen string-net model with the Fibonacci input category) host Fibonacci anyons as excitations. These have been realized in small quantum simulators but not in a scalable platform.

**Topological superconductors.** While Majorana-based systems produce Ising anyons (not Fibonacci), there are theoretical proposals for engineering Fibonacci anyons from Majorana modes combined with parafermion modes in fractional quantum Hall edges.

## Fibonacci vs. Ising Anyons

| Property | Fibonacci $\tau$ | Ising $\sigma$ (Majorana) |
|---|---|---|
| Fusion rule | $\tau \times \tau = \mathbf{1} + \tau$ | $\sigma \times \sigma = \mathbf{1} + \psi$ |
| Braiding universality | Universal | Clifford only |
| Hilbert space growth | $\varphi^n$ | $2^{n/2}$ |
| Experimental status | No confirmed realization | Signatures observed |
| Additional gates needed | None | Magic state distillation |

The practical consequence: Majorana-based topological qubits (Ising anyons) still require a non-topological supplement for universal computation. Fibonacci anyons do not. This is the theoretical motivation for pursuing Fibonacci anyons despite their experimental difficulty.

```{admonition} The golden ratio in quantum computing
:class: tip
The golden ratio $\varphi$ appears throughout Fibonacci anyon physics: in the quantum dimension of $\tau$ (which is $\varphi$), in the growth rate of the Hilbert space, and in the braiding matrices. This is not a coincidence. The Fibonacci anyon model is built on the representation theory of the quantum group $SU(2)_3$, where $\varphi$ emerges naturally as a quantum dimension.
```

## Further Reading

- Freedman, M. H., Larsen, M., and Wang, Z., "A Modular Functor Which is Universal for Quantum Computation," *Commun. Math. Phys.* **227**, 605 (2002). [doi:10.1007/s002200200645](https://doi.org/10.1007/s002200200645)
- Trebst, S. et al., "A Short Introduction to Fibonacci Anyon Models," *Prog. Theor. Phys. Suppl.* **176**, 384 (2008). [doi:10.1143/PTPS.176.384](https://doi.org/10.1143/PTPS.176.384)
- Nayak, C. et al., "Non-Abelian anyons and topological quantum computation," *Rev. Mod. Phys.* **80**, 1083 (2008). [doi:10.1103/RevModPhys.80.1083](https://doi.org/10.1103/RevModPhys.80.1083)
- Bonesteel, N. E. et al., "Braid Topologies for Quantum Computation," *Phys. Rev. Lett.* **95**, 140503 (2005). [doi:10.1103/PhysRevLett.95.140503](https://doi.org/10.1103/PhysRevLett.95.140503)
