# Surface Codes

> The leading candidate for practical quantum error correction. Stabilizers, syndrome measurement, logical qubits, and error thresholds.

Surface codes are the most promising family of quantum error correcting codes for near-term implementation. They require only nearest-neighbor interactions on a 2D grid of qubits, tolerate error rates up to ~1%, and can be decoded in real time. Every major quantum hardware roadmap targets surface-code-based fault tolerance.

## The Toric Code

The surface code originates from Kitaev's toric code (1997), defined on a 2D lattice with periodic boundary conditions (a torus). Physical qubits sit on the edges of the lattice. There are two types of stabilizer generators:

**Vertex (star) operators** $A_v$: Product of $X$ on all edges meeting at vertex $v$.

$$A_v = \prod_{e \ni v} X_e$$

**Plaquette (face) operators** $B_p$: Product of $Z$ on all edges bounding plaquette $p$.

$$B_p = \prod_{e \in \partial p} Z_e$$

All stabilizers commute: $[A_v, B_p] = 0$ for all $v, p$. The code space is the simultaneous $+1$ eigenspace of all stabilizers.

## The Planar Surface Code

The practical surface code uses open boundary conditions on a planar grid, avoiding the need for a torus. A distance-$d$ surface code uses a grid of $d \times d$ data qubits with $(d-1) \times d + d \times (d-1)$ measurement (ancilla) qubits.

Total physical qubits: approximately $2d^2$ (data + ancilla) for one logical qubit.

```
  ○───●───○───●───○
  │   │   │   │   │
  ●───○───●───○───●
  │   │   │   │   │
  ○───●───○───●───○
  │   │   │   │   │
  ●───○───●───○───●
  │   │   │   │   │
  ○───●───○───●───○

  ● = data qubit    ○ = measure qubit
  X-stabilizers on white faces
  Z-stabilizers on grey faces
```

**Logical operators**: A logical $\bar{X}$ is a chain of $X$ operators spanning the lattice from left to right. A logical $\bar{Z}$ is a chain of $Z$ operators spanning from top to bottom. Both chains have minimum weight $d$, which is the code distance.

## Syndrome Measurement and Decoding

Each stabilizer is measured by an ancilla qubit that interacts with its neighboring data qubits via CNOT gates. The measurement outcome ($+1$ or $-1$) is the syndrome bit for that stabilizer.

**Error detection**: An $X$ error on a data qubit anticommutes with the two adjacent $Z$-stabilizers, creating a pair of $-1$ syndrome outcomes (called **defects** or **anyons**). Similarly, a $Z$ error creates defects in the $X$-stabilizer measurements.

**Decoding**: The decoder's task is to identify the most likely physical error given the observed syndrome. The optimal decoder (maximum likelihood) is computationally hard, but efficient approximate decoders exist:

| Decoder | Complexity | Threshold | Notes |
|---|---|---|---|
| Minimum Weight Perfect Matching (MWPM) | $O(n^3)$ | ~1.0% | Standard choice |
| Union-Find | $O(n \cdot \alpha(n))$ | ~0.8% | Near-linear time |
| Neural network | Depends on architecture | ~1.0% | Learned decoder |
| Maximum likelihood | NP-hard | ~1.1% | Theoretical optimum |

```{admonition} Why MWPM Works
:class: note
Errors create pairs of defects. MWPM finds the minimum-weight matching between defects, which corresponds to the most likely error pattern. If the actual error chain and the correction chain differ by a logical operator, a logical error occurs. This happens with probability that decreases exponentially with code distance $d$ when the physical error rate is below threshold.
```

## Error Threshold

The surface code threshold is the physical error rate below which increasing the code distance reduces the logical error rate exponentially:

$$p_L \approx 0.03 \left(\frac{p}{p_{\text{th}}}\right)^{\lfloor(d+1)/2\rfloor}$$

For the depolarizing noise model with MWPM decoding:
- **Threshold**: $p_{\text{th}} \approx 1.0\%$
- At $p = 0.1\%$ (ten times below threshold), each doubling of $d$ squares the logical error rate

| Code Distance | Physical Qubits | Logical Error Rate ($p = 0.1\%$) |
|---|---|---|
| $d = 3$ | ~17 | $\sim 10^{-2}$ |
| $d = 5$ | ~49 | $\sim 10^{-4}$ |
| $d = 7$ | ~97 | $\sim 10^{-6}$ |
| $d = 11$ | ~241 | $\sim 10^{-10}$ |
| $d = 17$ | ~577 | $\sim 10^{-16}$ |

## Logical Operations

**Clifford gates** ($H$, $S$, CNOT) can be implemented fault-tolerantly on surface codes through:
- **Lattice surgery**: Merging and splitting surface code patches by measuring joint stabilizers. This implements logical CNOT and other Clifford operations.
- **Code deformation**: Moving the boundaries of the surface code patch.

**Non-Clifford gates** (the $T$ gate) require **magic state distillation**: preparing a noisy $T$-state and purifying it through a distillation protocol. This is the dominant cost of fault-tolerant quantum computing.

```{important}
Magic state distillation for the $T$ gate consumes roughly 10-100x more resources than Clifford operations. A single distilled $T$ state may require ~15 surface code patches and ~15$d$ rounds of syndrome measurement. Algorithms like Shor's require millions of $T$ gates, making $T$-count optimization critical.
```

## Experimental Progress

Google's Willow chip (December 2024) demonstrated the key signature of surface code scaling: increasing the code distance from $d=3$ to $d=5$ to $d=7$ reduced the logical error rate by a factor of ~2 at each step, confirming that the physical error rate is below threshold. This was the first experimental demonstration of below-threshold surface code performance on a superconducting processor.

## Further Reading

- Kitaev, A. Y. "Fault-tolerant quantum computation by anyons." *Annals of Physics* 303(1), 2-30 (2003). [arXiv:quant-ph/9707021](https://arxiv.org/abs/quant-ph/9707021)
- Fowler, A. G. et al. "Surface codes: Towards practical large-scale quantum computation." *Physical Review A* 86, 032324 (2012). [arXiv:1208.0928](https://arxiv.org/abs/1208.0928)
- Google Quantum AI. "Quantum error correction below the surface code threshold." *Nature* 638, 920-926 (2025). [arXiv:2408.13687](https://arxiv.org/abs/2408.13687)
- Dennis, E. et al. "Topological quantum memory." *Journal of Mathematical Physics* 43, 4452 (2002). [arXiv:quant-ph/0110143](https://arxiv.org/abs/quant-ph/0110143)
