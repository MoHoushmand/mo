# Photonic Quantum Computing

> Linear optical quantum computing, boson sampling, and Xanadu's Borealis. Photon sources, interferometers, and photon detectors.

Photonic quantum computers use individual photons as qubits. Photons travel at the speed of light, barely interact with their environment, and can be manipulated at room temperature using standard optical components. These properties make photonics attractive, but the difficulty of making photons interact with each other poses a fundamental challenge for two-qubit gates.

## Encoding Qubits in Photons

A single photon offers several degrees of freedom for qubit encoding:

- **Polarization**: $|0\rangle = |H\rangle$ (horizontal), $|1\rangle = |V\rangle$ (vertical). Simple to manipulate with waveplates and polarizing beam splitters.
- **Path (dual-rail)**: The photon occupies one of two spatial modes. $|0\rangle = |1_a, 0_b\rangle$, $|1\rangle = |0_a, 1_b\rangle$. Beam splitters and phase shifters implement arbitrary single-qubit gates.
- **Time-bin**: The photon arrives in an early or late time window. Robust for long-distance fiber transmission.

Single-qubit operations are straightforward. A beam splitter acts as a Hadamard gate on dual-rail qubits. Phase shifters implement $Z$-rotations. Any single-qubit unitary can be decomposed into these elements.

## The Two-Qubit Gate Problem

Photons do not naturally interact with each other. In most media, two photons pass through one another with no effect. This makes entangling gates difficult.

**The KLM scheme** (Knill, Laflamme, Milburn, 2001) showed that universal quantum computation is possible using only linear optics (beam splitters and phase shifters), single-photon sources, and photon detectors. The key insight: **measurement-induced nonlinearity**. By performing auxiliary measurements, a probabilistic entangling gate can be made to work. When the measurement gives the right outcome, the gate succeeds; otherwise, the computation must be restarted or the failure handled by a protocol layer.

The success probability of a basic KLM CNOT is 1/16 without feedforward. With teleportation-based boosting and ancilla photons, the success probability can be increased, but at the cost of enormous resource overhead. This overhead is the central challenge of linear optical quantum computing.

## Measurement-Based Quantum Computing

An alternative paradigm avoids the gate-by-gate approach entirely. In **measurement-based quantum computing** (MBQC), a large entangled state (a cluster state) is prepared first, and computation proceeds by measuring individual qubits in chosen bases. The measurement outcomes, combined with classical feedforward, implement the desired quantum circuit.

For photonics, this means the hard part is generating the cluster state. Once it exists, computation requires only single-qubit measurements (which are easy for photons) and fast classical logic.

**Fusion-based quantum computing** (FBQC), developed by PsiQuantum, generates small entangled resource states and "fuses" them together probabilistically using beam splitters and detectors. Failed fusions create holes in the cluster state that are handled by the error-correcting code.

## Continuous-Variable Photonics

Instead of encoding qubits in single photons, continuous-variable (CV) approaches use the quadratures of the electromagnetic field. **Squeezed states** replace single photons as the resource, and homodyne detection replaces photon counting.

Xanadu's Borealis processor (2022) used 216 squeezed-light modes entangled in a time-multiplexed architecture to demonstrate a Gaussian boson sampling advantage. This is not universal quantum computing, but it represents a computational task that is intractable for classical computers.

## Hardware Components

| Component | State of the Art | Challenge |
|---|---|---|
| Single-photon source | InGaAs quantum dots, ~60% efficiency | Indistinguishability, scalability |
| Photon detector | Superconducting nanowire (SNSPD), >98% efficiency | Requires 1-4 K cooling |
| Interferometer | Silicon photonic chips, thousands of modes | Phase stability, loss |
| Fiber/waveguide loss | ~0.2 dB/km (telecom fiber) | On-chip loss adds up |
| Squeezer | 15 dB squeezing demonstrated | Integration, bandwidth |

## Room Temperature Operation

A significant advantage of photonic systems is that the optical manipulation occurs at room temperature. Beam splitters, waveplates, and phase shifters work without cryogenics. However, the best single-photon detectors (SNSPDs) still require cryogenic cooling, so a fully room-temperature system is not yet achievable.

```{admonition} Photonic advantage demonstrations
:class: note
Both Jiuzhang (USTC, 2020/2021) and Borealis (Xanadu, 2022) demonstrated quantum computational advantage using photonic systems. These were boson sampling tasks, not universal computation, but they showed that photonic processors can outperform classical supercomputers on specific problems.
```

## Further Reading

- Knill, E., Laflamme, R., and Milburn, G. J., "A scheme for efficient quantum computation with linear optics," *Nature* **409**, 46 (2001). [doi:10.1038/35051009](https://doi.org/10.1038/35051009)
- Bartolucci, S. et al., "Fusion-based quantum computation," *Nat. Commun.* **14**, 912 (2023). [doi:10.1038/s41467-023-36493-1](https://doi.org/10.1038/s41467-023-36493-1)
- Madsen, L. S. et al., "Quantum computational advantage with a programmable photonic processor," *Nature* **606**, 75 (2022). [doi:10.1038/s41586-022-04725-x](https://doi.org/10.1038/s41586-022-04725-x)
