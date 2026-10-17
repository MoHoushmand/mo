# Trapped Ion Quantum Computing

> Individual ions held in electromagnetic traps. IonQ, Quantinuum, and the highest-fidelity gates in quantum computing today.

Trapped ion quantum computers hold individual atomic ions in electromagnetic traps and use laser or microwave pulses to manipulate their internal quantum states. This platform holds the records for the highest single-qubit and two-qubit gate fidelities of any quantum computing technology.

## Trapping Ions

Individual ions are confined using **Paul traps** (radiofrequency ion traps). Oscillating electric fields at MHz frequencies create an effective potential well that confines charged particles in all three spatial dimensions. The ions, once trapped, are cooled to near their motional ground state using laser cooling techniques.

A linear chain of ions in a Paul trap self-organizes into a crystal due to Coulomb repulsion, with inter-ion spacing of 2-10 $\mu$m. Each ion is individually addressable with focused laser beams.

Common ion species:

| Ion | Qubit Encoding | Qubit Frequency | Key Advantage |
|---|---|---|---|
| $^{171}$Yb$^+$ | Hyperfine ground states | 12.6 GHz | Microwave-driven gates |
| $^{40}$Ca$^+$ | Optical transition ($S_{1/2}$ to $D_{5/2}$) | 411 THz | Long-lived metastable state |
| $^{9}$Be$^+$ | Hyperfine ground states | 1.25 GHz | Light mass, fast gates |
| $^{137}$Ba$^+$ | Hyperfine/optical | Multiple | Visible-wavelength transitions |

## Qubit Operations

**Initialization** is achieved through optical pumping, driving the ion into a specific hyperfine or Zeeman sublevel with >99.9% fidelity.

**Single-qubit gates** are performed by driving Rabi oscillations between the two qubit states using resonant laser or microwave pulses. Typical gate times are 1-10 $\mu$s. Single-qubit gate fidelities exceed 99.99%.

**Two-qubit gates** exploit the shared motional modes of the ion chain. The Cirac-Zoller gate (1995) and the Molmer-Sorensen gate are the two primary approaches:

- A laser pulse couples the qubit state to the motional state of the ion chain
- The motional mode acts as a quantum bus, mediating entanglement between ions
- After the gate, the motional mode returns to its initial state, leaving only the qubit-qubit entanglement

Two-qubit gate fidelities of 99.9% have been demonstrated (Quantinuum, 2023), the highest of any platform.

**Measurement** uses state-dependent fluorescence, similar to NV centers. A laser resonant with a cycling transition causes one qubit state to scatter many photons (bright) while the other remains dark. Collecting even a few photons in a camera or photomultiplier suffices to discriminate the states with >99.5% fidelity.

## Coherence

Trapped ion qubits have exceptionally long coherence times because the qubit states are internal electronic states of the atom, isolated from the environment by the vacuum:

- $T_1$: effectively infinite (the ground-state hyperfine levels have lifetimes exceeding the age of the universe)
- $T_2$: seconds to minutes with dynamical decoupling
- $T_2^*$: milliseconds to seconds (limited by magnetic field fluctuations)

The quality ratio $T_2 / t_\text{gate}$ routinely exceeds $10^5$, the highest of any platform.

## All-to-All Connectivity

In a linear ion chain, the shared motional modes allow any pair of ions to interact, providing **all-to-all connectivity**. This is a major advantage over superconducting qubits, which are limited to nearest-neighbor interactions. All-to-all connectivity reduces the circuit depth needed for many algorithms, lowering the total error.

## Scaling Challenges

The primary weakness of trapped ions is scaling beyond a few dozen qubits in a single chain:

**Gate speed.** Two-qubit gates take 10-100 $\mu$s, roughly 1,000x slower than superconducting gates. This limits the number of operations within the coherence window for deep circuits.

**Motional mode crowding.** As the ion chain grows, the motional mode spectrum becomes dense. Addressing individual modes without crosstalk becomes increasingly difficult beyond ~50 ions.

**Shuttling architectures.** To scale beyond a single chain, ions can be shuttled between different trapping zones on a chip (the quantum charge-coupled device, or QCCD architecture). Quantinuum's H-series processors use this approach, physically moving ions between gate zones, memory zones, and readout zones on a microfabricated trap.

**Photonic interconnects.** For even larger systems, separate ion traps can be connected optically: each trap emits an entangled photon, and a joint measurement of photons from two traps creates remote entanglement. IonQ and others are pursuing this approach.

```{admonition} Commercial systems
:class: note
Quantinuum (formerly Honeywell Quantum Solutions) and IonQ are the leading commercial trapped-ion companies. Quantinuum's H2 processor uses a QCCD architecture with 56 qubits and has demonstrated the highest quantum volume of any system. IonQ uses photonic interconnects in its roadmap to scale beyond single-trap limits.
```

## Further Reading

- Cirac, J. I. and Zoller, P., "Quantum Computations with Cold Trapped Ions," *Phys. Rev. Lett.* **74**, 4091 (1995). [doi:10.1103/PhysRevLett.74.4091](https://doi.org/10.1103/PhysRevLett.74.4091)
- Bruzewicz, C. D. et al., "Trapped-ion quantum computing: Progress and challenges," *Appl. Phys. Rev.* **6**, 021314 (2019). [doi:10.1063/1.5088164](https://doi.org/10.1063/1.5088164)
- Moses, S. A. et al., "A Race-Track Trapped-Ion Quantum Processor," *Phys. Rev. X* **13**, 041052 (2023). [doi:10.1103/PhysRevX.13.041052](https://doi.org/10.1103/PhysRevX.13.041052)
