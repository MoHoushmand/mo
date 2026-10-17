# State of the Art

> Microsoft's 2025 Majorana 1 chip, recent experimental breakthroughs, and the timeline for topological quantum computers.

The year 2025 marks a turning point for topological quantum computing. After more than a decade of painstaking materials development, Microsoft announced the first chip designed to operate as a topological qubit. This section surveys the current experimental frontier.

## Microsoft's Majorana 1 (February 2025)

In February 2025, Microsoft unveiled **Majorana 1**, an 8-qubit topological quantum processor. The announcement represented several firsts:

1. **First chip to pass the topological gap protocol** across multiple qubit devices on a single processor
2. **First integrated topological qubit**: combining Majorana zero modes, parity readout, and control electronics on one chip
3. **First multi-qubit topological system**: eight qubits operating simultaneously

The Majorana 1 chip uses InAs/Al topoconductor heterostructures in a planar 2DEG geometry. Each qubit is a tetron (four Majorana zero modes) with measurement-based gate operations. The chip operates at approximately 20 mK in a dilution refrigerator.

Key reported specifications:
- Topological gap: $\sim 60$ $\mu$eV
- Quasiparticle poisoning time: tens of microseconds
- Parity readout fidelity: preliminary results (exact numbers not published at announcement)

```{admonition} Context for the announcement
:class: important
Microsoft's announcement was met with both excitement and skepticism. The company invested over $\$ 1$ billion and 18+ years in topological quantum computing research. The Majorana 1 chip demonstrates that the materials science challenges are being addressed, but key metrics (gate fidelity, error rates, coherence times under operation) have not yet been independently benchmarked. The gap between "first demonstration" and "fault-tolerant operation" remains large.
```

## The Road to Majorana 1

The Majorana 1 announcement was the culmination of a long research arc:

**2012**: First reported Majorana signatures in InSb nanowires (Delft, in collaboration with Microsoft's Station Q). Zero-bias conductance peaks observed but not quantized.

**2016**: Exponential length dependence of Majorana splitting demonstrated in InAs/Al nanowires (Copenhagen). This was the first evidence of genuine topological protection rather than trivial zero-energy states.

**2018**: Quantized conductance of $2e^2/h$ reported (Delft). This paper was later retracted in 2021 due to data concerns, setting the field back.

**2021-2022**: Microsoft developed and published the topological gap protocol, a rigorous experimental standard for verifying topological superconductivity. Shift from nanowires to planar 2DEG geometries for better material control and scalability.

**2023**: First devices passing the topological gap protocol reported in the literature. Microsoft published results showing reproducible signatures of topological superconductivity in InAs/Al 2DEG devices.

**2025**: Majorana 1 chip announced, integrating multiple tetron qubits on a single processor.

## Other Experimental Efforts

Microsoft is not the only group pursuing topological quantum computing, though it has the largest dedicated program.

**QuTech (Delft, Netherlands):** Pioneered Majorana experiments in nanowires. Continuing work on Majorana signatures and hybrid superconductor-semiconductor devices, now with tighter experimental protocols.

**Copenhagen (Niels Bohr Institute, Denmark):** Demonstrated key Majorana properties including exponential protection. Close collaboration with Microsoft. Leading center for epitaxial InAs/Al materials.

**Princeton (USA):** Demonstrated Majorana signatures in chains of magnetic atoms on superconductors using scanning tunneling microscopy. Different material platform but same underlying physics.

**RIKEN/Tokyo (Japan):** Pursuing Majorana modes in iron-based superconductors, which have intrinsic topological surface states. Potential advantage: no need for external magnetic fields.

**Fractional quantum Hall approaches:** Groups at MIT, Purdue, and others continue to pursue non-Abelian anyons in fractional quantum Hall states (particularly the $\nu = 5/2$ state), which would directly host Ising anyons.

## What Comes Next

Microsoft has outlined an ambitious roadmap following Majorana 1:

### Near-term (2025-2027)
- Characterize gate fidelities and error rates on the Majorana 1 architecture
- Demonstrate non-Abelian braiding statistics through measurement-based protocols
- Increase qubit count while maintaining topological gap quality
- Benchmark against surface-code superconducting qubits on equivalent tasks

### Medium-term (2027-2030)
- Demonstrate quantum error correction with topological qubits
- Show that topological protection reduces the overhead for fault tolerance
- Integrate classical control electronics with the cryogenic processor
- Scale to tens of topological qubits

### Long-term (2030+)
- Build a fault-tolerant topological quantum computer with thousands of logical qubits
- Demonstrate quantum advantage on commercially relevant problems
- Potentially combine topological protection with conventional error correction for even lower error rates

## Comparison: Topological vs. Leading Platforms (2025)

| Metric | Majorana 1 (Topological) | IBM Heron (Superconducting) | Quantinuum H2 (Trapped Ion) |
|---|---|---|---|
| Physical qubits | 8 | 156 | 56 |
| Two-qubit gate fidelity | TBD | ~99.5% | ~99.9% |
| Connectivity | TBD | Heavy-hex | All-to-all |
| Gate speed | TBD (~$\mu$s) | ~100 ns | ~100 $\mu$s |
| Error correction | Intrinsic + code | Surface code | Color code |
| Commercial availability | Not yet | Cloud access | Cloud access |

The topological approach is at an earlier stage than its competitors in terms of demonstrated performance. Its value proposition rests on the prediction that topological protection will dramatically reduce the number of physical qubits needed per logical qubit. If a topological qubit has a bare error rate of $10^{-6}$ (compared to $10^{-3}$ for superconducting), the overhead for fault tolerance drops by orders of magnitude.

Whether this prediction holds in practice is the central open question.

```{admonition} The stakes
:class: note
If topological qubits deliver on their promise of hardware-level error protection, they could reduce the estimated requirement for a fault-tolerant quantum computer from millions of physical qubits to thousands. This would transform the timeline for practical quantum computing from decades to years. The Majorana 1 chip is the first step toward testing this hypothesis experimentally.
```

## Further Reading

- Aghaee, M. et al. (Microsoft Quantum), "InAs-Al hybrid devices passing the topological gap protocol," *Phys. Rev. B* **107**, 245423 (2023). [doi:10.1103/PhysRevB.107.245423](https://doi.org/10.1103/PhysRevB.107.245423)
- Microsoft Quantum Blog, "Majorana 1: Microsoft's first topological quantum processor" (February 2025). [https://azure.microsoft.com/en-us/blog/quantum/](https://azure.microsoft.com/en-us/blog/quantum/)
- Nayak, C. et al., "Non-Abelian anyons and topological quantum computation," *Rev. Mod. Phys.* **80**, 1083 (2008). [doi:10.1103/RevModPhys.80.1083](https://doi.org/10.1103/RevModPhys.80.1083)
- Sarma, S. D., Freedman, M., and Nayak, C., "Majorana zero modes and topological quantum computation," *npj Quantum Inf.* **1**, 15001 (2015). [doi:10.1038/npjqi.2015.1](https://doi.org/10.1038/npjqi.2015.1)
