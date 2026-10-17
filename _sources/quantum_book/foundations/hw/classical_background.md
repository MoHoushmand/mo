# Classical Computing Background

> From transistors to GPUs: the classical computing stack. Moore's Law, its limits, and why quantum hardware takes a fundamentally different approach.

To appreciate why quantum hardware is built the way it is, it helps to understand the classical computing paradigm it aims to surpass for certain problems.

## The Transistor Revolution

The transistor, demonstrated at Bell Labs in 1947, is the fundamental switching element of classical computing. A transistor controls current flow between two terminals (source and drain) using a voltage applied to a third terminal (gate). By combining transistors into logic gates (AND, OR, NOT), any Boolean function can be computed.

The integrated circuit (1958) placed multiple transistors on a single silicon die, eliminating the need for hand-soldered connections. This innovation enabled the exponential scaling that has defined the industry.

## Moore's Law and Its Limits

In 1965, Gordon Moore observed that the number of transistors on a chip doubles approximately every two years. This observation, known as Moore's Law, held remarkably well for five decades:

| Year | Transistor Count | Feature Size |
|------|-----------------|--------------|
| 1971 | 2,300 (Intel 4004) | 10 $\mu$m |
| 1989 | 1.2 million (Intel 486) | 1 $\mu$m |
| 2004 | 125 million (Pentium 4) | 90 nm |
| 2020 | 54 billion (Apple M1) | 5 nm |
| 2024 | 200+ billion (GPUs) | 3 nm |

As transistors shrink below 5 nm, several physical limits emerge:

**Quantum tunneling leakage.** When the gate oxide is only a few atoms thick, electrons tunnel through the barrier even when the transistor is "off." This increases static power dissipation.

**Thermal density.** Dennard scaling (the observation that power density stays constant as transistors shrink) broke down around 2006. Modern chips cannot increase clock speeds without overheating, leading to the multicore era.

**Atomic granularity.** At 3 nm process nodes, critical features are roughly 10-15 atoms wide. Statistical variation in the placement of individual dopant atoms affects device characteristics.

## From CPUs to GPUs to Accelerators

The end of clock-frequency scaling drove a shift toward parallelism:

- **Multi-core CPUs** run multiple threads simultaneously
- **GPUs** provide thousands of simple cores for data-parallel workloads
- **TPUs and neural accelerators** optimize matrix operations for machine learning
- **FPGAs** offer reconfigurable hardware for specialized tasks

These architectures accelerate computation but remain fundamentally classical. They process information using deterministic bits that are either 0 or 1.

## Why Classical Computers Struggle

Certain computational problems have costs that grow exponentially with input size on any classical architecture:

- **Simulating quantum systems**: An $n$-qubit quantum state requires tracking $2^n$ complex amplitudes. A 50-qubit simulation needs petabytes of memory.
- **Integer factoring**: The best known classical algorithm (general number field sieve) runs in sub-exponential but super-polynomial time.
- **Combinatorial optimization**: Many NP-hard problems have no known polynomial-time classical algorithms.

These scaling walls are not engineering limitations. They are consequences of computational complexity theory. A quantum computer encodes information in $2^n$-dimensional Hilbert spaces natively, allowing certain problems to be solved with polynomial rather than exponential resources.

## The Quantum Advantage Thesis

A quantum computer does not simply run classical algorithms faster. It exploits:

1. **Superposition**: A qubit exists in a linear combination $\alpha|0\rangle + \beta|1\rangle$, encoding information in the complex amplitudes $\alpha$ and $\beta$.
2. **Entanglement**: Multi-qubit states can have correlations with no classical analog, enabling exponential state-space exploration.
3. **Interference**: Quantum algorithms amplify correct answers and cancel wrong ones through constructive and destructive interference of probability amplitudes.

The challenge is that these quantum properties are extraordinarily fragile. Any unwanted interaction with the environment destroys the quantum state (decoherence). This is why quantum hardware requires extreme isolation: millikelvin temperatures, ultra-high vacuum, or topological protection.

```{admonition} Classical simulation ceiling
:class: note
The largest exact quantum circuit simulations performed on classical supercomputers involve roughly 50 qubits. Beyond this, the memory required exceeds what any classical computer can provide. This is the regime where quantum hardware offers a potential advantage.
```

## Further Reading

- Moore, G. E., "Cramming more components onto integrated circuits," *Electronics* **38**(8), 114 (1965).
- Dennard, R. H. et al., "Design of ion-implanted MOSFETs with very small physical dimensions," *IEEE JSSC* **9**(5), 256 (1974). [doi:10.1109/JSSC.1974.1050511](https://doi.org/10.1109/JSSC.1974.1050511)
- Preskill, J., "Quantum Computing in the NISQ era and beyond," *Quantum* **2**, 79 (2018). [doi:10.22331/q-2018-08-06-79](https://doi.org/10.22331/q-2018-08-06-79)
