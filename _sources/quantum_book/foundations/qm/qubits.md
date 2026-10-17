# Qubits: The Quantum Bit

> The fundamental unit of quantum information. Bloch sphere representation, single-qubit and multi-qubit systems.

The qubit is to quantum computing what the bit is to classical computing: the fundamental unit of information. But unlike a classical bit, which is always 0 or 1, a qubit can exist in a superposition of both. This section develops the mathematical representation of qubits, introduces the Bloch sphere, and establishes the notation used throughout the rest of this book.

## Definition

A **qubit** is a quantum system with a two-dimensional Hilbert space $\mathcal{H} = \mathbb{C}^2$. The most general qubit state is:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$$

where $\alpha, \beta \in \mathbb{C}$ and $|\alpha|^2 + |\beta|^2 = 1$.

The states $|0\rangle$ and $|1\rangle$ form the **computational basis** (also called the $Z$-basis or standard basis). They are the qubit analog of classical 0 and 1.

### Degrees of Freedom

A general qubit state has four real parameters (two complex numbers), constrained by:

- Normalization: $|\alpha|^2 + |\beta|^2 = 1$ (removes one parameter)
- Global phase: $|\psi\rangle$ and $e^{i\gamma}|\psi\rangle$ represent the same physical state (removes one parameter)

This leaves **two real parameters**, which can be taken as angles $\theta$ and $\phi$:

$$|\psi\rangle = \cos\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\frac{\theta}{2}|1\rangle$$

where $0 \leq \theta \leq \pi$ and $0 \leq \phi < 2\pi$.

## The Bloch Sphere

The two parameters $(\theta, \phi)$ define a point on the unit sphere in $\mathbb{R}^3$, called the **Bloch sphere**. Every pure qubit state corresponds to a unique point on this sphere.

### Key Points on the Bloch Sphere

| State | $\theta$ | $\phi$ | Position |
|---|:---:|:---:|---|
| $\|0\rangle$ | $0$ | -- | North pole |
| $\|1\rangle$ | $\pi$ | -- | South pole |
| $\|+\rangle$ | $\pi/2$ | $0$ | Positive $x$-axis |
| $\|-\rangle$ | $\pi/2$ | $\pi$ | Negative $x$-axis |
| $\|+i\rangle$ | $\pi/2$ | $\pi/2$ | Positive $y$-axis |
| $\|-i\rangle$ | $\pi/2$ | $3\pi/2$ | Negative $y$-axis |

### Bloch Vector

The Bloch vector $\vec{r} = (r_x, r_y, r_z)$ connects the origin to the state's point on the sphere:

$$r_x = \sin\theta\cos\phi, \quad r_y = \sin\theta\sin\phi, \quad r_z = \cos\theta$$

For pure states, $|\vec{r}| = 1$ (on the surface). For mixed states (see {doc}`density_matrices`), $|\vec{r}| < 1$ (inside the sphere). The maximally mixed state $\rho = I/2$ sits at the origin.

### Opposite Points

Orthogonal states are **antipodal** on the Bloch sphere: $|0\rangle$ and $|1\rangle$ are at opposite poles, $|+\rangle$ and $|-\rangle$ are on opposite sides of the $x$-axis, and so on. This is because the angular distance $\theta$ between orthogonal states on the Bloch sphere is $\pi$ (not $\pi/2$ as in the Hilbert space), due to the factor of $\theta/2$ in the parametrization.

```{admonition} The Factor of 2
:class: note
A $360°$ rotation on the Bloch sphere corresponds to multiplying the state by $-1$ (a global phase), not returning to the original state. It takes a $720°$ rotation to return to the exact same quantum state. This is the hallmark of spin-$\frac{1}{2}$ systems and has been verified experimentally with neutron interferometry.
```

## Physical Realizations

Qubits are not abstract. They are implemented in physical systems:

| Platform | $\|0\rangle$ | $\|1\rangle$ | Coherence Time |
|---|---|---|---|
| Superconducting (IBM, Google) | Ground state | First excited state | $\sim 100\;\mu$s |
| Trapped ion (Quantinuum, IonQ) | Ground hyperfine state | Excited hyperfine state | $\sim 1$ s |
| Photonic (Xanadu, PsiQuantum) | Horizontal polarization | Vertical polarization | Limited by loss |
| Spin (Intel, Silicon Quantum) | Spin-up | Spin-down | $\sim 1$ ms |
| Topological (Microsoft) | Ground-state degeneracy | Excited topological state | Projected: very long |
| NV center (diamond) | $m_s = 0$ | $m_s = \pm 1$ | $\sim 1$ ms at room temp |

The choice of physical system determines gate speeds, coherence times, connectivity, and error rates. All platforms implement the same mathematical abstraction: a two-level quantum system.

## Multi-Qubit State Space

For $n$ qubits, the state space is $\mathcal{H} = (\mathbb{C}^2)^{\otimes n} = \mathbb{C}^{2^n}$. A general $n$-qubit state:

$$|\psi\rangle = \sum_{x=0}^{2^n - 1} c_x |x\rangle, \quad \sum_{x} |c_x|^2 = 1$$

requires $2^n$ complex amplitudes to describe. For 300 qubits, this exceeds the number of atoms in the observable universe. This exponential state space is the fundamental resource that makes quantum computing potentially powerful.

```{admonition} Exponential Does Not Mean Exponential Speedup
:class: warning
The exponential size of the state space does not automatically provide an exponential speedup. You can prepare a superposition over $2^n$ states efficiently, but extracting useful information requires interference patterns that concentrate amplitude on desired outcomes. Most quantum states are not useful for computation.
```

## Classical Bits vs. Qubits

| Property | Classical bit | Qubit |
|---|---|---|
| Values | $\{0, 1\}$ | $\alpha\|0\rangle + \beta\|1\rangle$ |
| Read | Non-destructive | Destructive (collapse) |
| Copy | Free | Forbidden (no-cloning) |
| Operations | Boolean gates (AND, OR, NOT) | Unitary gates ($H$, $X$, $T$, CNOT) |
| $n$-unit state | $n$ bits | $2^n$ amplitudes |
| Error correction | Redundancy (copy the bit) | Entanglement (spread the information) |

## Further Reading

- Nielsen, M. A. & Chuang, I. L. (2010). *Quantum Computation and Quantum Information*, Section 1.2.
- Preskill, J. (2023). *Quantum Computing in the NISQ Era and Beyond*. Lecture 2: Qubits.
- Ladd, T. D. et al. (2010). "Quantum Computers." *Nature*, 464, 45-53.
