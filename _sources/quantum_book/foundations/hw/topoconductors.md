# Topoconductors

> Microsoft's topoconductor platform: engineered materials that host Majorana zero modes. The path from material science to topological qubits.

Microsoft's approach to topological quantum computing hinges on a new class of engineered materials called **topoconductors**: semiconductor-superconductor heterostructures specifically designed to host Majorana zero modes with sufficient quality for qubit operations.

## What Is a Topoconductor?

A topoconductor is not a naturally occurring material. It is a carefully engineered stack of thin films that combines:

1. A **semiconductor** with strong spin-orbit coupling (InAs or InSb)
2. A **superconductor** deposited epitaxially on top (typically Al)
3. Electrostatic **gates** to tune the chemical potential into the topological regime

The epitaxial interface between the semiconductor and superconductor is critical. A clean, atomically sharp interface ensures strong proximity-induced superconductivity in the semiconductor (a "hard gap"), which is necessary for well-defined Majorana modes. Poor interfaces produce soft gaps with subgap states that mimic or obscure Majorana signatures.

Microsoft coined the term "topoconductor" to describe materials that have passed a rigorous verification protocol for hosting topologically protected Majorana modes, as opposed to materials that merely show suggestive but inconclusive tunneling signatures.

## The Topological Gap Protocol

In 2022, Microsoft's research team at Station Q (Santa Barbara) and collaborators published the **topological gap protocol** (TGP), a systematic experimental procedure for distinguishing genuine topological superconductivity from trivial alternatives.

The protocol requires:

1. **Hard induced gap**: The tunneling conductance below the gap must be strongly suppressed, indicating the absence of subgap states
2. **Gap closure and reopening**: As the magnetic field increases through the topological phase transition, the gap must close (at the critical field $B_c$) and reopen
3. **Zero-bias peak**: A stable zero-bias conductance peak must appear after the gap reopens, persisting over a range of gate voltage and magnetic field
4. **Local and non-local signatures**: Consistent signatures must appear at both ends of the nanowire simultaneously

This protocol was designed to avoid the pitfalls that plagued earlier experiments, where trivial Andreev bound states or disorder-induced states could produce zero-bias peaks indistinguishable from Majorana modes in a single-point measurement.

## Material Requirements

Achieving a topoconductor demands extreme materials quality:

**Semiconductor nanowire/2DEG:**
- Electron mobility $> 10,000$ cm$^2$/Vs (to reduce disorder)
- Strong spin-orbit coupling ($\alpha \sim 0.1$-$0.5$ eV$\cdot$A)
- Low effective mass for large Zeeman-to-gap ratio

**Superconductor interface:**
- Epitaxial growth (lattice-matched or strain-accommodated)
- Induced gap $\Delta^* > 200$ $\mu$eV (for thermal protection at ~20 mK)
- Transparent interface (low Schottky barrier)

**Gate stack:**
- Precise control of chemical potential with minimal charge noise
- Multiple gates for defining wire segments and tunnel barriers

The progression from InSb nanowires (used in early experiments, 2012-2018) to InAs/Al two-dimensional electron gas (2DEG) platforms has improved material quality and reproducibility. The 2DEG geometry allows lithographic patterning of wire networks, which is essential for braiding.

## From Nanowires to Networks

A single nanowire with Majorana modes at its ends is a proof of concept, not a qubit. To build a functional topological qubit, the Majorana modes must be:

1. **Created** by tuning the wire into the topological phase
2. **Moved** along wire segments by adjusting gate voltages
3. **Braided** around each other through T-junction or cross-junction geometries
4. **Measured** through interferometric or charge-parity readout

Microsoft's architecture envisions networks of topoconductor wires connected at junctions. By electrostatic gating, segments of the network can be selectively tuned into or out of the topological phase, effectively moving Majorana modes along the network without physically transporting the underlying material.

## The Tetron Qubit

Microsoft's proposed qubit design, the **tetron**, uses four Majorana zero modes arranged in a specific geometry:

- Two parallel topological wire segments
- Each segment hosts two Majorana modes (one at each end)
- The four modes encode one logical qubit in the joint parity subspace
- Measurement-based braiding protocols implement gates without physically moving the anyons around each other

The tetron design avoids the need for complex T-junction fabrication by using measurement-based protocols that achieve the same logical operations as physical braiding.

```{admonition} From theory to fabrication
:class: note
The gap between theoretical proposals and working devices has been the central challenge in topological quantum computing. Microsoft invested over a decade in materials science before announcing a device that passed the topological gap protocol. The lesson: for topological qubits, materials quality is not an engineering detail but the fundamental physics challenge.
```

## Further Reading

- Aghaee, M. et al. (Microsoft Quantum), "InAs-Al hybrid devices passing the topological gap protocol," *Phys. Rev. B* **107**, 245423 (2023). [doi:10.1103/PhysRevB.107.245423](https://doi.org/10.1103/PhysRevB.107.245423)
- Lutchyn, R. M. et al., "Majorana zero modes in superconductor-semiconductor heterostructures," *Nat. Rev. Mater.* **3**, 52 (2018). [doi:10.1038/s41578-018-0003-1](https://doi.org/10.1038/s41578-018-0003-1)
- Karzig, T. et al., "Scalable designs for quasiparticle-poisoning-protected topological quantum computation with Majorana zero modes," *Phys. Rev. B* **95**, 235305 (2017). [doi:10.1103/PhysRevB.95.235305](https://doi.org/10.1103/PhysRevB.95.235305)
