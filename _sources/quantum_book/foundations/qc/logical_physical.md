# Logical vs. Physical Qubits

> The overhead of error correction: how many physical qubits are needed per logical qubit? Current estimates and the road to fault-tolerant quantum computing.

The distinction between logical and physical qubits is the central engineering reality of quantum computing. A **physical qubit** is a single quantum two-level system on hardware. A **logical qubit** is a unit of error-corrected quantum information encoded across many physical qubits. Every useful quantum algorithm specifies its requirements in logical qubits; the translation to physical qubits determines whether the algorithm is feasible on a given hardware platform.

## The Overhead Formula

For a surface code with distance $d$, each logical qubit requires approximately $2d^2$ physical qubits (data qubits plus measurement ancillas). The code distance $d$ is chosen to achieve the target logical error rate $p_L$:

$$p_L \approx A \left(\frac{p}{p_{\text{th}}}\right)^{\lfloor(d+1)/2\rfloor}$$

where $p$ is the physical error rate and $p_{\text{th}} \approx 1\%$ for the surface code. Solving for $d$:

$$d \geq 2 \left\lceil \frac{\log(p_L / A)}{\log(p / p_{\text{th}})} \right\rceil + 1$$

| Physical Error Rate | Target $p_L$ | Required $d$ | Phys. Qubits / Logical |
|---|---|---|---|
| $10^{-3}$ | $10^{-6}$ | 7 | ~98 |
| $10^{-3}$ | $10^{-10}$ | 11 | ~242 |
| $10^{-3}$ | $10^{-15}$ | 17 | ~578 |
| $10^{-4}$ | $10^{-10}$ | 7 | ~98 |
| $10^{-4}$ | $10^{-15}$ | 9 | ~162 |

```{admonition} Diminishing Returns
:class: note
Halving the physical error rate has a much larger impact on the required overhead than halving the target logical error rate. Moving from $p = 10^{-3}$ to $p = 10^{-4}$ dramatically reduces the required code distance. This is why improving physical qubit quality is as important as scaling qubit counts.
```

## Overhead for Key Algorithms

The total physical qubit count for an algorithm depends on three factors:
1. **Logical qubit count**: How many logical qubits the algorithm needs
2. **Code distance**: Determined by the target logical error rate and physical error rate
3. **Magic state distillation factories**: Additional qubits dedicated to producing $T$ states

| Algorithm | Logical Qubits | $T$ Gates | Physical Qubits ($p = 10^{-3}$) | Runtime |
|---|---|---|---|---|
| Shor (RSA-2048) | ~4,000 | ~$10^{10}$ | ~20 million | ~8 hours |
| Shor (ECC-256) | ~2,300 | ~$10^{9}$ | ~10 million | ~1 hour |
| VQE (small molecule) | 50-200 | ~$10^{5}$ | ~50,000 | Minutes |
| Quantum chemistry (FeMoCo) | ~4,000 | ~$10^{12}$ | ~4 million | Days |
| Grover (AES-128) | ~3,000 | ~$10^{40}$ | Impractical | Impractical |

```{warning}
Grover's algorithm for breaking AES-128 requires $2^{64}$ iterations, each with many $T$ gates. Even with perfect fault-tolerant hardware, the runtime would be astronomical. Grover provides a theoretical quadratic speedup, but practical quantum attacks on symmetric encryption are infeasible for the foreseeable future.
```

## Magic State Distillation Overhead

The $T$ gate cannot be implemented transversally in the surface code. Instead, it requires **magic state distillation**, which is the dominant source of overhead:

- Each $T$ gate consumes one distilled magic state $|T\rangle = \frac{1}{\sqrt{2}}(|0\rangle + e^{i\pi/4}|1\rangle)$
- Distillation uses a factory of ~15 logical qubits to produce one magic state with error rate $\sim p^3$ from noisy inputs
- Multiple levels of distillation may be needed to achieve the target magic state fidelity
- The factory must produce magic states fast enough to keep up with the computation

For Shor's algorithm on RSA-2048, magic state factories can constitute 50-70% of the total physical qubit count.

## The Road to Fault Tolerance

The milestones toward fault-tolerant quantum computing:

| Milestone | Status (2026) | Significance |
|---|---|---|
| Below-threshold error rates | Achieved (Google, 2024) | Surface code scaling demonstrated |
| Logical qubit with $p_L < p$ | Achieved | Error correction improves on raw error rate |
| Memory experiment ($d=7+$) | Demonstrated | Logical qubit stored reliably |
| Logical two-qubit gate | Demonstrated (lattice surgery) | Computation between logical qubits |
| Logical algorithm (small) | In progress | End-to-end fault-tolerant circuit |
| Cryptographic-scale ($10^6+$ qubits) | Projected 2030s-2040s | Shor on RSA-2048 |

## Comparing Hardware Platforms

Different hardware platforms have different physical error rates and connectivity, leading to different overhead estimates:

| Platform | 2-Qubit Gate Error | Connectivity | Surface Code Advantage |
|---|---|---|---|
| Superconducting | $\sim 5 \times 10^{-4}$ (best) | Nearest-neighbor 2D | Natural fit for surface code |
| Trapped ion | $\sim 10^{-3}$ | All-to-all (within chain) | Higher connectivity; fewer SWAPs |
| Neutral atom | $\sim 10^{-2}$ (improving) | Reconfigurable | Long-range gates possible |
| Photonic | $\sim 10^{-2}$ (fusion) | Graph state | Different error model |

```{important}
The race to fault tolerance is not just about qubit count. It is a race across three simultaneous fronts: (1) improving physical error rates to push further below threshold, (2) scaling the number of physical qubits to support useful code distances, and (3) reducing the overhead of magic state distillation through better protocols and codes. Progress on any front reduces the hardware requirements.
```

## Beyond the Surface Code

The surface code is the baseline, not the final answer. Newer codes may reduce overhead:

- **Quantum LDPC codes**: Encode more logical qubits per physical qubit ($k > 1$). Asymptotically better rates but harder to implement on 2D hardware.
- **Color codes**: Support transversal implementation of more gates, reducing magic state distillation costs.
- **Floquet codes**: Defined by periodic measurement sequences rather than static stabilizers. May have practical advantages on specific hardware.

## Further Reading

- Gidney, C. & Ekera, M. "How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits." *Quantum* 5, 433 (2021). [arXiv:1905.09749](https://arxiv.org/abs/1905.09749)
- Fowler, A. G. et al. "Surface codes: Towards practical large-scale quantum computation." *Physical Review A* 86, 032324 (2012). [arXiv:1208.0928](https://arxiv.org/abs/1208.0928)
- Bravyi, S. et al. "High-threshold and low-overhead fault-tolerant quantum memory." *Nature* 627, 778-782 (2024). [arXiv:2308.07915](https://arxiv.org/abs/2308.07915)
- Litinski, D. "A Game of Surface Codes." *Quantum* 3, 128 (2019). [arXiv:1812.01238](https://arxiv.org/abs/1812.01238)
