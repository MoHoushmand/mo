# Experimental Quantum Mechanics

> Modern experiments confirming quantum phenomena: Bell test experiments, quantum teleportation demonstrations, and loophole-free tests of entanglement.

Quantum mechanics is the most precisely tested theory in physics. The predictions of QM have been verified to extraordinary accuracy across a century of increasingly sophisticated experiments. This section covers the landmark experiments most relevant to quantum information: Bell tests, teleportation, and entanglement verification.

## Bell Test Experiments

Bell's theorem (1964) showed that any local hidden variable theory predicts correlations bounded by the CHSH inequality $|S| \leq 2$, while quantum mechanics predicts violations up to $|S| = 2\sqrt{2} \approx 2.828$. Experimental tests aim to measure $S$ and determine whether nature respects the classical bound.

### Freedman and Clauser (1972)

The first experimental test of Bell's inequality used polarization-entangled photons from calcium atomic cascades. They measured $S = 2.697 \pm 0.015$, violating the classical bound by over 6 standard deviations. This was strong evidence against local hidden variables, but the experiment had significant loopholes.

### Aspect Experiments (1981--1982)

Alain Aspect and colleagues at the University of Paris-Sud performed three experiments with progressively tighter controls:

1. **Static polarizers** (1981): Confirmed violation with improved statistics
2. **Two-channel polarizers** (1982): Tested both correlation and anti-correlation
3. **Time-varying analyzers** (1982): Used acoustic-optical switches to change measurement settings while photons were in flight, partially closing the **locality loophole**

Aspect's results: $S = 2.697 \pm 0.015$, consistent with the quantum prediction and incompatible with local hidden variables.

### Experimental Loopholes

Two loopholes plagued early Bell test experiments:

| Loophole | Description | How it allows classical explanation |
|---|---|---|
| **Locality** | Measurement settings could influence each other | If Alice's detector setting is communicated to Bob's photon (at light speed), local hidden variables could reproduce QM predictions |
| **Detection** | Most photons are not detected | Undetected photons could carry the "missing" correlations needed to satisfy Bell's inequality |

Closing both loopholes simultaneously required decades of experimental progress.

### Loophole-Free Bell Tests (2015)

In 2015, three independent groups closed all major loopholes simultaneously:

**Hensen et al. (Delft)**: Used entangled nitrogen-vacancy (NV) center spins in diamond, separated by 1.3 km. The large separation ensured spacelike separation of measurement events (locality loophole closed). Detection efficiency was nearly 100% (detection loophole closed). Result: $S = 2.42 \pm 0.20$, violating the CHSH bound with $p < 0.039$.

**Giustina et al. (Vienna)**: Used entangled photons with high-efficiency superconducting detectors. Result: $p < 3.74 \times 10^{-31}$, an overwhelming violation.

**Shalm et al. (NIST Boulder)**: Used entangled photons with transition-edge sensor detectors. Result: $p < 5.9 \times 10^{-9}$.

```{admonition} The 2022 Nobel Prize
:class: note
The 2022 Nobel Prize in Physics was awarded to John Clauser, Alain Aspect, and Anton Zeilinger "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science." This was the first Nobel Prize explicitly recognizing quantum information as a field.
```

## Quantum Teleportation Experiments

Quantum teleportation, proposed by Bennett et al. in 1993, transfers a quantum state from one location to another using entanglement and classical communication. The protocol:

1. Alice and Bob share a Bell pair $|\Phi^+\rangle$
2. Alice performs a Bell measurement on her qubit and the state to be teleported
3. Alice sends the 2-bit measurement result to Bob classically
4. Bob applies the corresponding Pauli correction ($I$, $X$, $Z$, or $XZ$) to recover the state

### Innsbruck (1997)

The first experimental quantum teleportation was demonstrated by Bouwmeester et al. at the University of Innsbruck. They teleported the polarization state of a photon over an optical table with fidelity $F = 0.80 \pm 0.03$ (classical limit: $F = 2/3$).

### Long-Distance Teleportation

| Year | Group | Distance | System |
|------|-------|----------|--------|
| 1997 | Innsbruck | Table-top | Photon polarization |
| 2004 | Vienna/Danube | 600 m | Photon (fiber) |
| 2012 | La Palma/Tenerife | 143 km | Photon (free-space) |
| 2017 | Micius satellite | 1,400 km | Photon (ground-to-satellite) |
| 2022 | Delft | 1.3 km | NV center spins (matter qubits) |

The Micius satellite experiment (Ren et al., 2017) demonstrated ground-to-satellite quantum teleportation, a milestone toward global quantum communication networks.

### Teleportation Fidelity

The classical limit for teleporting a qubit is $F_{\text{classical}} = 2/3$. Any fidelity above this threshold certifies that genuine quantum resources (entanglement) were used. Modern experiments routinely achieve $F > 0.90$.

## Entanglement Distribution and Quantum Networks

Beyond point-to-point teleportation, recent experiments have demonstrated:

**Entanglement swapping**: Connecting two previously unentangled parties through a shared intermediary. This is the basic operation for a quantum repeater.

**Three-node quantum network** (Delft, 2021): Pompili et al. demonstrated entanglement distribution across a three-node network of NV centers, establishing entanglement between nodes that had no direct physical connection.

**Satellite-based QKD** (Micius, 2020): The Chinese Micius satellite established quantum key distribution between ground stations separated by 1,120 km, demonstrating the feasibility of global quantum communication.

## Tests of Fundamental Quantum Mechanics

### Wave-Particle Duality with Large Molecules

Arndt et al. (1999) demonstrated interference of C$_{60}$ fullerene molecules through a double-slit apparatus, confirming quantum superposition for objects containing 720 nucleons. Subsequent experiments have shown interference with molecules exceeding 25,000 amu (Fein et al., 2019).

### Delayed-Choice Experiments

Wheeler's delayed-choice experiment tests whether a photon "decides" to be a wave or particle before or after it passes through the interferometer. Jacques et al. (2007) implemented this with single photons and confirmed that the choice of wave or particle behavior is determined by the measurement configuration at detection time, not at the source.

### Quantum Eraser

Walborn et al. (2002) demonstrated that which-path information can be "erased" after a photon has been detected, restoring the interference pattern in post-selected data. This confirms that interference depends on the availability of which-path information in principle, not on the temporal ordering of events.

## Current Frontiers

| Frontier | Goal | Status (2026) |
|---|---|---|
| Loophole-free Bell tests | Close all loopholes simultaneously | Achieved (2015) |
| Long-distance teleportation | Satellite-to-ground | Achieved (2017) |
| Multi-node quantum networks | Internet-scale entanglement | 3 nodes demonstrated |
| Macroscopic superposition | Superposition of visible objects | Mechanical oscillators, $\sim 10^{12}$ atoms |
| Bell tests with massive particles | Entanglement of macroscopic objects | Demonstrated with drum oscillators |

```{admonition} From Foundations to Engineering
:class: tip
The progression from Aspect's table-top Bell test (1982) to satellite-based quantum communication (2017) took 35 years. The field has transitioned from testing whether quantum mechanics is correct (it is) to engineering quantum systems for practical applications. Understanding the experimental foundations is essential for appreciating both the capabilities and the limitations of current quantum technology.
```

## Further Reading

- Aspect, A., Grangier, P., & Roger, G. (1982). "Experimental Realization of Einstein-Podolsky-Rosen-Bohm Gedankenexperiment." *Physical Review Letters*, 49(2), 91-94.
- Hensen, B. et al. (2015). "Loophole-free Bell inequality violation using electron spins separated by 1.3 kilometres." *Nature*, 526, 682-686.
- Bouwmeester, D. et al. (1997). "Experimental quantum teleportation." *Nature*, 390, 575-579.
- Ren, J.-G. et al. (2017). "Ground-to-satellite quantum teleportation." *Nature*, 549, 70-73.
- The Nobel Prize in Physics 2022. [NobelPrize.org](https://www.nobelprize.org/prizes/physics/2022/summary/).
