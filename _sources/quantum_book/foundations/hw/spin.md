# Spin Qubits

> Electron and nuclear spin qubits in silicon quantum dots. Intel and academic efforts, potential for CMOS compatibility, and current challenges.

Spin qubits encode quantum information in the spin of individual electrons (or nuclei) confined in semiconductor quantum dots. Their deep connection to conventional transistor technology makes them uniquely promising for large-scale integration.

## From Transistors to Qubits

A classical transistor controls current flow between source and drain using a gate voltage. A quantum dot takes this further: by placing multiple gates side by side, the electrostatic potential can be shaped to trap a small puddle of electrons, or even a single electron, in a nanoscale region of semiconductor.

The charging energy $E_C = e^2 / C$ sets the energy cost of adding one electron to the dot. For a dot with radius ~100 nm, $E_C \approx 3$ meV. Since the thermal energy at 4 K is $k_B T \approx 0.3$ meV, single-electron control requires cooling to at least this temperature. In practice, spin qubit experiments operate at 10-100 mK in a dilution refrigerator, where thermal noise is negligible compared to all relevant energy scales.

## The Spin-1/2 Qubit

Once a single electron is isolated in a quantum dot, its spin provides a natural two-level system:

$$|0\rangle = |\uparrow\rangle, \quad |1\rangle = |\downarrow\rangle$$

In a magnetic field $B$, the Zeeman splitting between spin-up and spin-down is:

$$\Delta E = g \mu_B B$$

where $g$ is the g-factor (~2 for electrons in silicon) and $\mu_B$ is the Bohr magneton. At $B = 1$ T, this splitting is approximately 28 GHz, well within the microwave frequency range for coherent control.

## Control and Readout

**Single-qubit gates** are performed using electron spin resonance (ESR). An oscillating magnetic field at the Larmor frequency drives coherent rotations of the spin. Alternatively, electric dipole spin resonance (EDSR) uses an oscillating electric field combined with spin-orbit coupling or a micromagnet gradient, which is easier to generate on-chip.

**Two-qubit gates** exploit the exchange interaction between electrons in neighboring dots. When the tunnel barrier between dots is lowered, the exchange coupling $J$ splits the singlet and triplet states. A controlled pulse of $J$ implements a SWAP-type gate.

**Readout** uses spin-to-charge conversion. The Pauli exclusion principle prevents two same-spin electrons from occupying the same orbital. By tuning the dot potentials, a spin-up electron can tunnel to a reservoir while spin-down cannot (or vice versa). A nearby charge sensor (another quantum dot or a single-electron transistor) detects whether the electron moved, revealing its spin state.

## Silicon: The Material of Choice

Silicon offers several advantages for spin qubits:

- **Long coherence times**: Natural silicon contains 4.7% $^{29}$Si, which has nuclear spin. Isotopically purified $^{28}$Si (spin-0) dramatically reduces magnetic noise, yielding $T_2^*$ times exceeding 100 $\mu$s and $T_2$ (with dynamical decoupling) above 10 ms.
- **CMOS compatibility**: Silicon quantum dots can be fabricated in the same foundries that produce classical processors, opening a path to billion-qubit chips.
- **Small size**: A quantum dot is roughly 30-100 nm across, enabling dense qubit arrays.

Intel's collaboration with QuTech uses 300 mm silicon wafer fabrication to produce spin qubit arrays. This industrial-scale fabrication provides the uniformity needed for scaling.

## Scaling Challenges

Despite the CMOS promise, significant challenges remain:

**Wiring density.** Each quantum dot requires multiple gate electrodes for confinement and tuning. A 2D array of $N$ qubits needs $O(N)$ control lines, but the connectors are orders of magnitude larger than the dots themselves.

**Crosstalk.** Voltages applied to one gate affect neighboring dots through capacitive coupling. This complicates tuning as qubit count increases.

**Variability.** Even with industrial fabrication, each dot has slightly different parameters due to charge traps and atomic-scale variations in the Si/SiO$_2$ interface.

**Crossbar architectures** (similar to display pixel addressing) have been proposed to reduce wiring overhead, potentially enabling arrays of 1,000+ qubits on a chip no larger than 30 $\times$ 30 $\mu$m.

```{admonition} Nuclear spin qubits
:class: tip
The nuclear spin of a $^{31}$P donor in silicon can also serve as a qubit, with coherence times exceeding 30 seconds in isotopically purified $^{28}$Si. The electron spin of the donor acts as a mediator for control and readout. This approach, pioneered by Andrea Morello's group at UNSW, holds the record for the longest-lived solid-state qubit.
```

## Further Reading

- Loss, D. and DiVincenzo, D. P., "Quantum computation with quantum dots," *Phys. Rev. A* **57**, 120 (1998). [doi:10.1103/PhysRevA.57.120](https://doi.org/10.1103/PhysRevA.57.120)
- Zwanenburg, F. A. et al., "Silicon quantum electronics," *Rev. Mod. Phys.* **85**, 961 (2013). [doi:10.1103/RevModPhys.85.961](https://doi.org/10.1103/RevModPhys.85.961)
- Burkard, G. et al., "Semiconductor spin qubits," *Rev. Mod. Phys.* **95**, 025003 (2023). [doi:10.1103/RevModPhys.95.025003](https://doi.org/10.1103/RevModPhys.95.025003)
