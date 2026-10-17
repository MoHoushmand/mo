# Majorana Fermions

> Majorana zero modes as building blocks for topological qubits. Semiconductor-superconductor heterostructures and experimental evidence.

Majorana fermions, particles that are their own antiparticles, are the most actively pursued building blocks for topological qubits. First proposed theoretically by Ettore Majorana in 1937 in the context of particle physics, their condensed-matter analogs, Majorana bound states (or Majorana zero modes), have become central to topological quantum computing.

## Majorana Operators

In condensed matter physics, a fermionic state can be either occupied (electron) or empty (hole). The creation operator $c^\dagger$ and annihilation operator $c$ satisfy the standard anticommutation relation $\{c, c^\dagger\} = 1$.

Any ordinary fermion can be decomposed into two Majorana operators:

$$\gamma_1 = \frac{1}{2}(c + c^\dagger), \quad \gamma_2 = -\frac{i}{2}(c - c^\dagger)$$

These operators are self-adjoint: $\gamma_j = \gamma_j^\dagger$. This is the defining property, a Majorana operator creates and destroys the same quasiparticle.

This decomposition is always possible mathematically. What makes Majorana bound states physically interesting is when the two Majorana operators correspond to spatially separated quasiparticles. In that case, the fermionic occupation number $n = c^\dagger c$ is stored nonlocally across two distant points, and no local measurement or perturbation at either point can determine or change $n$.

## The Topological Qubit

Two Majorana zero modes $\gamma_1$ and $\gamma_2$, separated by a distance $L$, encode one fermionic mode with occupation number $n \in \{0, 1\}$:

$$|0\rangle: n = 0, \quad |1\rangle: n = 1$$

This is a topological qubit. The two states are degenerate (both at zero energy) and protected by:

1. **Particle-hole symmetry** of the superconductor, which pins the Majorana modes to zero energy
2. **Spatial separation**, which suppresses tunneling between the modes exponentially as $\sim e^{-L/\xi}$, where $\xi$ is the coherence length

For $2N$ Majorana zero modes, the degenerate ground-state space has dimension $2^N$, encoding $N$ fermionic qubits.

## Where to Find Majoranas

Majorana bound states appear at zero energy inside the superconducting gap of a **topological superconductor**. Conventional $s$-wave superconductors do not host them because quantum-mechanical zero-point motion prevents states from sitting at exactly zero energy. A $p$-wave superconductor cancels this zero-point energy through an additional Berry phase of $\pi$, producing genuine zero-energy states.

Since natural $p$-wave superconductors are rare, the strategy is to **engineer** effective $p$-wave pairing from ordinary ingredients. The recipe, proposed independently by Lutchyn et al. and Oreg et al. in 2010:

1. A **semiconducting nanowire** with strong spin-orbit coupling (e.g., InAs or InSb)
2. Proximity-coupled to a conventional $s$-wave **superconductor** (e.g., Al)
3. Subjected to an external **magnetic field** $B$ along the wire axis

When the Zeeman energy $E_Z = g\mu_B B$ exceeds the induced superconducting gap $\Delta$, the system undergoes a topological phase transition. Majorana zero modes appear at the two ends of the nanowire.

The conditions for the topological phase:

$$E_Z > \sqrt{\Delta^2 + \mu^2}$$

where $\mu$ is the chemical potential (tunable by a gate voltage). This inequality defines a region in the $(B, \mu)$ parameter space where Majorana modes exist.

## Experimental Evidence

**2012, Delft (Mourik et al.):** The first experiment reporting signatures of Majorana bound states. An InSb nanowire coupled to a NbTiN superconductor showed a zero-bias conductance peak (ZBCP) emerging at finite magnetic field. The ZBCP is the hallmark of a Majorana zero mode: the mode sits at zero energy and produces a resonant Andreev reflection peak at zero voltage bias.

**2016, Copenhagen (Albrecht et al.):** Demonstrated that the energy of the zero-bias state is exponentially close to zero as a function of nanowire length, consistent with the expected exponential protection of spatially separated Majorana modes.

**2018, Delft (Zhang et al.):** Reported quantized conductance of $2e^2/h$ at the zero-bias peak, the theoretically predicted value for a single Majorana mode. This was considered strong evidence, though the retraction of a related Nature paper in 2021 highlighted the difficulty of unambiguously confirming Majorana signatures.

**Other platforms:**
- Magnetic atom chains on superconductors (Nadj-Perge et al., Princeton, 2014)
- Vortices in topological superconductors (Fu-Kane proposal)
- Planar Josephson junctions

## Andreev Reflection and Conductance Spectroscopy

The primary tool for detecting Majorana modes is tunneling spectroscopy. At a junction between a normal metal and a superconductor:

- An incoming electron combines with another electron from the Fermi sea to form a Cooper pair in the superconductor, reflecting a hole back into the metal. This is **Andreev reflection**.
- With a tunnel barrier, the sub-gap conductance goes as $T^2$ (two tunneling events: electron in, hole out).
- A Majorana zero mode provides a resonant channel at zero energy, enhancing the conductance to a quantized value of $2e^2/h$ regardless of barrier transparency $T$ (at zero temperature).

This quantized conductance is a robust prediction of Majorana physics, but distinguishing it from trivial zero-energy Andreev bound states (which can mimic Majorana signatures) remains a central experimental challenge.

```{admonition} The retraction challenge
:class: warning
Several high-profile Majorana claims have been contested or retracted. The 2018 Nature paper from Delft was retracted in 2021 due to data handling concerns. This underscores the difficulty of definitively identifying Majorana modes and the importance of multiple independent experimental signatures (quantized conductance, exponential length dependence, non-Abelian braiding statistics) rather than relying on a single measurement.
```

## Further Reading

- Lutchyn, R. M. et al., "Majorana Fermions and a Topological Phase Transition in Semiconductor-Superconductor Heterostructures," *Phys. Rev. Lett.* **105**, 077001 (2010). [doi:10.1103/PhysRevLett.105.077001](https://doi.org/10.1103/PhysRevLett.105.077001)
- Oreg, Y., Refael, G., and von Oppen, F., "Helical Liquids and Majorana Bound States in Quantum Wires," *Phys. Rev. Lett.* **105**, 177002 (2010). [doi:10.1103/PhysRevLett.105.177002](https://doi.org/10.1103/PhysRevLett.105.177002)
- Mourik, V. et al., "Signatures of Majorana Fermions in Hybrid Superconductor-Semiconductor Nanowire Devices," *Science* **336**, 1003 (2012). [doi:10.1126/science.1222360](https://doi.org/10.1126/science.1222360)
- Aguado, R., "Majorana quasiparticles in condensed matter," *Riv. Nuovo Cimento* **40**, 523 (2017). [doi:10.1393/ncr/i2017-10141-9](https://doi.org/10.1393/ncr/i2017-10141-9)
