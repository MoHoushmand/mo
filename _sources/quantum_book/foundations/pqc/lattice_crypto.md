# Lattice-Based Cryptography

> The mathematical foundations of ML-KEM and ML-DSA: Learning With Errors, Ring-LWE, Module-LWE, and why lattice problems are believed to be quantum-hard.

Lattice-based cryptography is the most important family of post-quantum algorithms. Both ML-KEM (FIPS 203) and ML-DSA (FIPS 204) are built on lattice problems. Understanding the mathematics gives insight into why these algorithms work, what their security margins are, and where potential weaknesses might lie.

## What is a Lattice?

A **lattice** in $\mathbb{R}^n$ is the set of all integer linear combinations of a set of basis vectors:

$$\mathcal{L}(\mathbf{b}_1, \ldots, \mathbf{b}_n) = \left\{ \sum_{i=1}^n z_i \mathbf{b}_i : z_i \in \mathbb{Z} \right\}$$

Think of a lattice as an infinite, regularly-spaced grid of points in $n$-dimensional space. In 2D, it looks like a sheet of graph paper (possibly skewed). In high dimensions, lattices have properties that make certain problems extraordinarily difficult.

### Hard Lattice Problems

Two problems form the foundation of lattice cryptography:

**Shortest Vector Problem (SVP)**: Given a lattice basis, find the shortest non-zero lattice vector.

$$\text{SVP}: \text{Find } \mathbf{v} \in \mathcal{L} \setminus \{0\} \text{ minimizing } \|\mathbf{v}\|$$

**Closest Vector Problem (CVP)**: Given a lattice and a target point, find the lattice point closest to the target.

$$\text{CVP}: \text{Given } \mathbf{t}, \text{ find } \mathbf{v} \in \mathcal{L} \text{ minimizing } \|\mathbf{v} - \mathbf{t}\|$$

Both problems are NP-hard in their exact forms. More importantly for cryptography, their *approximate* versions (finding vectors within a polynomial factor of optimal) remain hard for both classical and quantum algorithms.

The best known quantum algorithm for SVP still requires $2^{\Omega(n)}$ time, where $n$ is the lattice dimension. This is the basis for believing lattice cryptography is quantum-resistant.

## Learning With Errors (LWE)

The **Learning With Errors** problem, introduced by Oded Regev in 2005, is the specific lattice problem that underpins modern lattice cryptography.

### The Problem

Given:
- A random matrix $\mathbf{A} \in \mathbb{Z}_q^{m \times n}$
- A secret vector $\mathbf{s} \in \mathbb{Z}_q^n$
- A small error vector $\mathbf{e} \in \mathbb{Z}_q^m$ (entries drawn from a narrow distribution)

The LWE samples are:

$$\mathbf{b} = \mathbf{A} \cdot \mathbf{s} + \mathbf{e} \pmod{q}$$

**Search-LWE**: Given $(\mathbf{A}, \mathbf{b})$, find $\mathbf{s}$.

**Decision-LWE**: Distinguish $(\mathbf{A}, \mathbf{b})$ from $(\mathbf{A}, \mathbf{u})$ where $\mathbf{u}$ is uniformly random.

Without the error $\mathbf{e}$, this is just a linear system solvable by Gaussian elimination. The error makes it hard. Regev proved that solving LWE is at least as hard as solving worst-case lattice problems (SVP, CVP) in dimension $n$.

### Why the Error Matters

The error vector $\mathbf{e}$ is what makes the problem hard. Each entry of $\mathbf{e}$ is small (typically drawn from a centered binomial distribution with standard deviation $\sigma \approx 1$). The ratio $\alpha = \sigma / q$ determines the hardness:

- Too small $\alpha$: The error can be rounded away, reducing to a linear system
- Too large $\alpha$: The ciphertext becomes too noisy to decrypt correctly
- Just right: Hard to solve, yet decryption works with high probability

This balance is the core design challenge in lattice-based schemes.

## Ring-LWE and Module-LWE

Plain LWE has large key sizes because $\mathbf{A}$ is a random $m \times n$ matrix. Structured variants trade some generality for efficiency:

### Ring-LWE

Replace $\mathbb{Z}_q^n$ with the polynomial ring $R_q = \mathbb{Z}_q[x]/(x^n + 1)$. Now:
- $\mathbf{A}$ is a single polynomial $a \in R_q$ (instead of a matrix)
- $\mathbf{s}, \mathbf{e}$ are polynomials in $R_q$
- $b = a \cdot s + e \in R_q$

Multiplication in $R_q$ can be performed efficiently using the Number Theoretic Transform (NTT), the finite-field analog of the FFT. This reduces:
- Key sizes from $O(n^2)$ to $O(n)$
- Multiplication from $O(n^2)$ to $O(n \log n)$

### Module-LWE (used in ML-KEM and ML-DSA)

Module-LWE is the middle ground: elements are vectors of polynomials over $R_q$. The matrix $\mathbf{A}$ is $k \times k$ with entries in $R_q$:

$$\mathbf{A} \in R_q^{k \times k}, \quad \mathbf{s} \in R_q^k, \quad \mathbf{e} \in R_q^k$$

$$\mathbf{t} = \mathbf{A} \cdot \mathbf{s} + \mathbf{e}$$

The parameter $k$ controls the security level:

| ML-KEM Variant | $k$ | $n$ (poly degree) | $q$ | Security |
|---|:---:|:---:|:---:|---|
| ML-KEM-512 | 2 | 256 | 3329 | Level 1 |
| ML-KEM-768 | 3 | 256 | 3329 | Level 3 |
| ML-KEM-1024 | 4 | 256 | 3329 | Level 5 |

Module-LWE gives more flexibility than Ring-LWE (security scales by adjusting $k$) while being more efficient than plain LWE (polynomial arithmetic via NTT).

### Security Hierarchy

```
Plain LWE (most conservative, largest keys)
    ⊇
Module-LWE (ML-KEM, ML-DSA)
    ⊇
Ring-LWE (most efficient, smallest keys)
```

Any attack on Module-LWE implies an attack on plain LWE. Conversely, special structure in Ring-LWE *could* theoretically enable attacks not possible against plain LWE. No such attacks are known, but Module-LWE provides a safety margin.

## The Number Theoretic Transform (NTT)

Polynomial multiplication is the performance bottleneck in lattice cryptography. The NTT accelerates it from $O(n^2)$ to $O(n \log n)$.

For $R_q = \mathbb{Z}_q[x]/(x^{256}+1)$ with $q = 3329$:

1. **Forward NTT**: Convert polynomial $a(x)$ to its evaluation representation $\hat{a}$
2. **Pointwise multiply**: $\hat{c}_i = \hat{a}_i \cdot \hat{b}_i \pmod{q}$
3. **Inverse NTT**: Convert back to coefficient representation

$$a \cdot b = \text{NTT}^{-1}(\text{NTT}(a) \circ \text{NTT}(b))$$

The modulus $q = 3329$ was chosen specifically because $3329 = 2^8 \cdot 13 + 1$, which means $\mathbb{Z}_q$ has 256th roots of unity, enabling the NTT over degree-256 polynomials.

All NTT arithmetic uses **Montgomery multiplication** for constant-time modular reduction, preventing timing side-channel attacks.

## Concrete Security Estimates

The security of ML-KEM is estimated by analyzing the best known classical and quantum attacks:

### Classical Attacks

The best classical attack against LWE is the **primal lattice attack** using BKZ (Block Korkine-Zolotarev) lattice reduction:

| Algorithm | Complexity (ML-KEM-768) |
|---|---|
| BKZ-2.0 | $\approx 2^{182}$ operations |
| BKZ with sieving | $\approx 2^{170}$ operations |
| Dual attack | $\approx 2^{175}$ operations |

### Quantum Attacks

Grover's algorithm can speed up the sieving subroutine in BKZ:

| Algorithm | Complexity (ML-KEM-768) |
|---|---|
| Quantum BKZ (Grover-enhanced sieving) | $\approx 2^{153}$ operations |

This still provides $> 128$ bits of quantum security, well above the NIST Category 3 threshold.

```{admonition} No Exponential Quantum Speedup
:class: important
Unlike factoring (where Shor's algorithm gives an exponential speedup), the best known quantum speedup for lattice problems is *at most polynomial*. Grover's algorithm provides a quadratic speedup for the sieving step, but the overall lattice reduction still requires exponential time. This is why lattice cryptography is considered quantum-resistant.
```

## Known Attacks and Research Directions

The lattice cryptanalysis community is active. Key developments to watch:

| Attack | Status | Impact |
|---|---|---|
| Primal/dual lattice attacks (BKZ) | Well-understood | Sets concrete security parameters |
| Algebraic attacks on Ring/Module-LWE | No breakthrough | Could exploit polynomial ring structure |
| Quantum sieving speedups | Modest ($\sqrt{}$ speedup) | Accounted for in parameter selection |
| Side-channel attacks | Practical risk | Mitigated by constant-time implementations |
| SIKE-style structural attacks | Not applicable to LWE | Different algebraic structure |

The 2022 break of SIKE (an isogeny-based scheme) by classical attacks serves as a reminder that no scheme is unconditionally secure. However, LWE has withstood over 15 years of intensive cryptanalysis with no significant structural weakness found.

## From Math to Code

The journey from abstract lattice math to a working KEM:

```
Mathematical Problem          Implementation
─────────────────────         ──────────────
Module-LWE                    ML-KEM specification
    ↓                             ↓
Sample A from seed            SHAKE-128 XOF expansion
Sample s, e from CBD          Centered binomial distribution
Compute t = As + e            NTT-domain matrix-vector multiply
Compress/decompress           Lossy encoding for smaller ciphertexts
FO transform                  CCA2 security via re-encapsulation
    ↓                             ↓
IND-CCA2 secure KEM           Constant-time Rust/C implementation
```

Each mathematical operation maps to a specific algorithmic primitive. The security proof guarantees that breaking the KEM requires solving Module-LWE, and solving Module-LWE requires solving worst-case lattice problems.

## Further Reading

- Regev, O. (2005). "On Lattices, Learning with Errors, Random Linear Codes, and Cryptography." *STOC 2005*.
- Lyubashevsky, V., Peikert, C., Regev, O. (2013). "On Ideal Lattices and Learning with Errors Over Rings." *EUROCRYPT 2010*.
- Bos, J. et al. (2018). "CRYSTALS-Kyber: A CCA-Secure Module-Lattice-Based KEM." *IEEE Euro S&P 2018*.
- Albrecht, M. et al. (2024). [Lattice Estimator](https://lattice-estimator.readthedocs.io/) -- Tool for estimating concrete security of lattice parameters.
