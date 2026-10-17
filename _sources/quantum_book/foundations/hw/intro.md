# Introduction to Quantum Hardware

> The physical platforms competing to build scalable quantum computers. Current state-of-the-art, qubit counts, and technology readiness levels.

Building a quantum computer requires controlling individual quantum systems with extraordinary precision. Several physical platforms are being pursued, each with distinct strengths and weaknesses. No single platform has yet proven definitively superior for large-scale, fault-tolerant quantum computation. This chapter surveys the landscape.

## The Hardware Zoo

Quantum computing hardware spans a remarkable range of physical systems, from superconducting circuits cooled to millikelvins, to individual atoms held in vacuum, to photons traveling through waveguides. Each platform encodes a qubit differently:

| Platform | Qubit Encoding | Operating Temperature | Approximate Qubit Count (2025) | Key Players |
|---|---|---|---|---|
| Superconducting | Charge/flux in Josephson circuits | ~15 mK | 1,000+ | IBM, Google, Rigetti |
| Trapped Ion | Electronic states of ions | Room temp (vacuum) | ~50 | IonQ, Quantinuum |
| Spin (Quantum Dots) | Electron/nuclear spin in Si | ~100 mK | ~12 | Intel, UNSW, QuTech |
| Photonic | Polarization/path of photons | Room temp | 216 squeezed modes | Xanadu, PsiQuantum |
| NV Center | Electron spin in diamond | 4 K (or room temp) | ~10 | QuTech, Element Six |
| Neutral Atom | Hyperfine states of atoms | ~$\mu$K | 256+ | QuEra, Pasqal, Atom |
| Topological | Non-Abelian anyons | ~20 mK | 8 (announced 2025) | Microsoft |
| Quantum Annealer | Flux qubits (Ising spins) | ~15 mK | 5,000+ | D-Wave |

These numbers evolve rapidly. The qubit count alone is misleading without considering gate fidelity, connectivity, and coherence time.

## Technology Readiness

Not all qubits are equal. A useful metric is the **quantum volume**, which accounts for qubit count, connectivity, gate fidelity, and circuit depth. Another metric is the error rate per gate:

- **Trapped ions** currently lead in two-qubit gate fidelity (>99.9%)
- **Superconducting qubits** lead in qubit count and gate speed (~20 ns gates)
- **Photonic systems** operate at room temperature but face challenges with deterministic two-qubit gates
- **Topological qubits** promise inherent error protection but remain in early experimental stages

The path to a fault-tolerant quantum computer likely requires millions of physical qubits to encode thousands of logical qubits through quantum error correction. Current devices are in the "noisy intermediate-scale quantum" (NISQ) era, with hundreds to low thousands of physical qubits and error rates that limit circuit depth.

## What Makes a Good Qubit?

A good physical qubit needs several properties simultaneously:

1. **Long coherence time** relative to gate duration (the $T_2/t_\text{gate}$ ratio)
2. **High-fidelity gates** for both single-qubit and two-qubit operations
3. **Efficient initialization** into a known starting state
4. **Reliable measurement** to extract computation results
5. **Scalability** to large numbers of qubits with controllable interactions

These criteria were formalized by David DiVincenzo in 2000 and remain the standard framework for evaluating hardware platforms. We discuss them in detail in the next section.

## Roadmap for This Part

This part of the book proceeds as follows. We first review the classical computing background to understand why quantum hardware requires a fundamentally different approach. We then present the DiVincenzo criteria as the evaluation framework. The subsequent chapters survey each major platform in turn, concluding with an extended treatment of topological quantum computing.

```{admonition} A note on timelines
:class: tip
Hardware capabilities change faster than textbooks. The numbers cited here reflect the state of the field as of early 2025. For the latest benchmarks, consult the primary sources listed in each chapter's Further Reading section.
```

## Further Reading

- Ladd, T. D. et al., "Quantum computers," *Nature* **464**, 45 (2010). [doi:10.1038/nature08812](https://doi.org/10.1038/nature08812)
- Acin, A. et al., "The quantum technologies roadmap," *New J. Phys.* **20**, 080201 (2018). [doi:10.1088/1367-2630/aad1ea](https://doi.org/10.1088/1367-2630/aad1ea)
- National Academies of Sciences, *Quantum Computing: Progress and Prospects* (2019). [doi:10.17226/25196](https://doi.org/10.17226/25196)
