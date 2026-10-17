# Superconducting Qubits

> Transmon qubits, flux qubits, and the Josephson junction. IBM and Google's approach, dilution refrigerators, and current qubit counts (1000+).

Superconducting qubits are the most widely deployed platform for gate-based quantum computing. IBM, Google, Rigetti, and several other companies have built processors with hundreds to over a thousand qubits using this technology. The approach leverages decades of microwave engineering and nanofabrication techniques.

## The Josephson Junction

All superconducting qubits rely on the Josephson junction: a thin insulating barrier (typically aluminum oxide, ~1 nm thick) sandwiched between two superconducting electrodes. Cooper pairs of electrons tunnel coherently through this barrier, producing a nonlinear inductance described by:

$$U(\varphi) = -E_J \cos\varphi$$

where $\varphi$ is the gauge-invariant phase difference across the junction and $E_J$ is the Josephson energy.

This cosine potential is the critical ingredient. A simple LC oscillator (capacitor + inductor) has a perfectly harmonic energy spectrum with equal spacing between levels. The Josephson junction's nonlinear inductance breaks this harmonic spacing, creating an **anharmonicity** that allows us to address just two levels as a qubit without accidentally exciting higher states.

## The Transmon

The transmon, introduced in 2007 by Koch et al. at Yale, is the dominant superconducting qubit design. In its simplest form, it consists of two superconducting islands connected by one or two Josephson junctions, with a large shunting capacitance.

The transmon Hamiltonian has two energy scales:

- $E_C = e^2 / (2C_\Sigma)$: the charging energy (capacitive)
- $E_J$: the Josephson energy (inductive)

In the transmon regime, $E_J / E_C \approx 50$-$80$, which exponentially suppresses sensitivity to charge noise at the cost of reduced anharmonicity. The typical anharmonicity is about $-300$ MHz, meaning $f_{12} \approx f_{01} - 300$ MHz. This is sufficient to confine dynamics to the lowest two levels using microwave pulses of ~20 ns duration.

Typical operating parameters:
- Qubit frequency $f_{01}$: 4-8 GHz
- Anharmonicity: -200 to -350 MHz
- $T_1$ (energy relaxation): 50-300 $\mu$s
- $T_2$ (dephasing): 50-200 $\mu$s
- Single-qubit gate time: ~20 ns
- Two-qubit gate time: 30-100 ns

## Other Superconducting Qubit Types

**Flux qubits** encode information in the direction of persistent current flowing around a superconducting loop interrupted by Josephson junctions. They are more sensitive to flux noise but less sensitive to charge noise than early charge qubits.

**Fluxonium** uses a small Josephson junction shunted by a large inductance (a chain of larger junctions). This gives very long coherence times ($T_1 > 1$ ms has been demonstrated) and large anharmonicity, but the low transition frequency (~1 GHz) complicates readout.

## Circuit Quantum Electrodynamics

Superconducting qubits are controlled and measured using the circuit QED architecture. Each qubit couples to a microwave resonator (a transmission-line cavity), analogous to an atom inside an optical cavity.

In the **dispersive regime**, the qubit and resonator are detuned from each other by $\Delta \gg g$ (where $g$ is the coupling strength). The resonator frequency shifts depending on the qubit state:

$$f_r^{|0\rangle} \neq f_r^{|1\rangle}$$

This state-dependent shift allows qubit readout by probing the resonator with a microwave pulse and measuring the transmitted or reflected signal. The qubit state is inferred without directly measuring the qubit itself.

Two-qubit gates are implemented by coupling qubits through a shared bus resonator or by tuning qubits into resonance with each other. Common two-qubit gates include the controlled-phase (CZ) gate and the cross-resonance gate.

## Scaling: The Surface Code Approach

IBM and Google both target the surface code for fault-tolerant quantum computing. This requires a 2D grid of qubits with nearest-neighbor connectivity. Key elements of a surface-code chip:

- **Qubits**: arranged on a square lattice
- **Coupling bus resonators**: connect nearest-neighbor qubits
- **Readout resonators**: one per qubit, for individual measurement
- **Flux lines**: one per qubit, for frequency tuning
- **Microwave drive lines**: one per qubit, for single-qubit gates
- **Feedlines**: shared lines that probe readout resonators via frequency multiplexing

IBM's 1,121-qubit Condor processor (2023) and Google's 72-qubit Sycamore (2019) and 105-qubit Willow (2024) represent different points on the scaling trajectory.

```{admonition} The dilution refrigerator
:class: note
Superconducting qubits must be cooled to approximately 15 mK (colder than outer space) to suppress thermal excitations. At these temperatures, $k_B T \approx 1.3 \,\mu\text{eV}$, well below the qubit energy splitting of ~25 $\mu$eV. A dilution refrigerator achieves this by circulating a mixture of helium-3 and helium-4. These refrigerators cost $\$1$-$5$ million and define the operating environment for every superconducting quantum computer.
```

## Strengths and Weaknesses

**Strengths:**
- Fast gate operations (tens of nanoseconds)
- Leverages mature nanofabrication technology
- Flexible circuit design ("artificial atoms")
- Demonstrated surface code error correction (Google, 2024)

**Weaknesses:**
- Requires millikelvin cooling
- Coherence times limited by materials defects (two-level systems in dielectrics)
- Every qubit is slightly different due to fabrication variation
- Wiring density becomes a bottleneck at large scale

## Further Reading

- Koch, J. et al., "Charge-insensitive qubit design derived from the Cooper pair box," *Phys. Rev. A* **76**, 042319 (2007). [doi:10.1103/PhysRevA.76.042319](https://doi.org/10.1103/PhysRevA.76.042319)
- Kjaergaard, M. et al., "Superconducting Qubits: Current State of Play," *Annu. Rev. Condens. Matter Phys.* **11**, 369 (2020). [doi:10.1146/annurev-conmatphys-031119-050605](https://doi.org/10.1146/annurev-conmatphys-031119-050605)
- Blais, A. et al., "Circuit quantum electrodynamics," *Rev. Mod. Phys.* **93**, 025005 (2021). [doi:10.1103/RevModPhys.93.025005](https://doi.org/10.1103/RevModPhys.93.025005)
