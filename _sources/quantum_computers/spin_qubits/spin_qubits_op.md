# Operations on spin qubits

With standard semiconductor technology, billions of transistors can be inte- grated on a single chip. This forms one of the key motivations for quantum dot qubits, as these qubit types are fabricated using the same technology, such that one can envision billions of quantum bits on a chip. In this lecture we focus on the operation of these quantum dot qubits. We will discuss how qubits are de- fined, how they can be initialized and readout, how the qubits can be controlled and how these qubits can be coupled to one another to execute two-qubit logic gates.
Figure 17
We start with an empty quantum dot connected to an electron reservoir. The quantum dot energy levels are above the Fermi energy of the reservoir and so no electrons can tunnel from the reservoir to the dot. We define our qubit states on the spin states of the quantum dot. To do so, we apply a magnetic field on the order of a Tesla. Due to the Zeeman energy, the spin states are then split by about hundred micro electron volt, assuming a g-factor around

two. The lowest level corresponds then to the state spin down, while the upper level corresponds to the state spin up.
We can initialize our quantum dot in the state spin down, by simply lowering the energy level such that the state spin down is below the Fermi energy, while the state spin up is still above the Fermi energy. At this position, only an electron with state spin down can tunnel from the reservoir to the quantum dot. If we pulse the levels even deeper, the quantum dot will remain in the state spin down. No electrons can tunnel from the reservoir to the quantum dot, since it is already occupied, and thus the state remains spin down. If we want to readout the state, we can simply do the reverse protocol. We align the levels such that the Fermi energy of the reservoir is in between the spin down and spin up level. An electron will only tunnel out if the state is spin up. This sequence converts a spin in to charge, because there is only charge movement if the state is spin up. As quantum dot systems can also be used as highly sensitive and accurate electrometers, we can readout the spin state by measuring the charge transfer during this protocol. In the graph below we see the current through a quantum dot electrometer.
Figure 18
We see that there are different current levels. These differences correspond to the different gate voltages that are applied to align the electron reservoir and quantum dot levels. The middle level corresponds to the alignment for readout. In some cases we see that there is a small bump around one milliseconds and in some case we don’t see it. This corresponds to the spin-to-charge conver- sion. The experiment shown here is performed in gallium arsenide. Electrons in gallium arsenide have a negative g-factor. Now a good exercise is to verify yourself that in this particular case a bump corresponds to the state spin down and not to the statespin up, as one may expect. This method of readout is called Elzerman readout and has been one of the central methods for readout of spin qubits. Now that we know how to initialize and readout the spin state, we can start controlling the state and turn it into a qubit.
Figure 19
Qubit control can be realized by introducing an alternating magnetic field in a direction perpendicular to the applied magnetic field. This is done by applying an ac current through a small strip close to the quantum dot system. The AC current generates an electromagnetic wave. When the frequency of this wave matches the resonance frequency of the qubit, photons are generated with an energy equal to the Zeeman energy of the spin states and they can flip the spin state. If we introduce this alternating magnetic field then we will observe that the spin starts to rotate as a function of time.
10

Figure 20
These oscillations are called Rabi oscillations and they form the basis of our single qubit rotations. This mechanism has been demonstrated with quantum dot systems and first in the material gallium arsenide and in the figure you see that as a function of time, coherent oscillations appear with a frequency depen- dent on the applied electromagnetic power. Unfortunately, these oscillations do not survive until infinity. The oscillations decay due to qubit decoherence. A major source of decoherence for spin qubits in gallium arsenide is the interaction between the electron and nuclear spins in the environment. Gallium arsenide has many isotopes with a nonzero nuclear spin and these can interact with the qubit through the hyperfine interaction. These interactions vary over time. And consequently, the qubit frequency changes over time and so the emitted photons from the stripline are not always in resonance with the electron spin. This is a major limitation, but fortunately, it can be solved by simply changing the host material. Silicon can be purified to an isotope with zero nuclear spin, Silicon-28. As one can see, in this material one can just simply keep on going with rotating the electron spin. This is of course very favourable for qubit operations.
Figure 21
The resulting improvement becomes even more apparent if we compare the coherence time of electron spins in different materials. In this figure, you see three different sequences to determine the quantum coherence of a qubit. The simplest sequence is the Ramsey experiment. It starts by rotating the spin to the equator using a pi/2 pulse. Then, another pi/2 pulse is applied to rotate it to the state spin up. In the experiment, the waiting time in between these two pulses is varied. This results typically in an exponential decay, where the time constant in the exponent defines the coherence time.
Figure 22
The Hahn echo and CPMG sequences are more sophisticated sequences that can extend the quantum coherence time and they probe the ultimate quantum coherence. From the figure it becomes clear that the quantum coherence can be greatly improved by both using sophisticated sequences and by using materials with zero nuclear spins, resulting in a maximum coherence time of tens of mil- liseconds. And this is an eternity in the quantum world. Now that we know how to initialize and read and control qubits, we can start to couple qubits together. To do so, we use the exchange interaction. This interaction can be controlled by tuning the electric gates of a quantum dot qubit, which modulates the potential landscape. To turn the interaction on, the electric gates are pulsed such that the energy barrier between the qubits is short and low.

Figure 23
Consequently, the wave function of the two electron spins start to overlap and they hybridize. In the figure on the left, there is no interaction. In the figure on the right there is interaction. Now what is crucial here, is that when the interaction is on, the resonance frequency of one qubit is determined by the state of the other qubit. In the left figure, we see that the energy in flipping the red qubit is independent on the state of the blue qubit. It is good to verify this yourself.
Figure 24
If we overlay these figures it becomes clear that the scenario is different when interaction is on. When interaction is on, flipping the red qubit costs less energy when the blue qubit is in the state spin down, while it costs more energy when it is in the state spin up.
This is very important, as we can now control one qubit depending on the state of the other qubit, and use this, for example to create quantum entangle- ment. One can also see from the figure that we have two knobs that we can use for control.
Figure 25
First, we can directly control the tunnel barrier. Secondly, we can also change the relative energies of the electron spin states. By moving towards the state where one electron spin is almost doubly occupied, the exchange interaction increases. The first approach where one controls the tunnel barrier may be the preferred method, as operation is here at the so-called symmetry point.
At this point the qubit is the least sensitive to noise, as the slope of the energy level is to first order zero with respect to the detuning. However, the second approach is what is typically been exploited in experiments today as this is often easier to do. In the experiment we see here, the second option of controlling the detuning has been adopted and the experiment combines both single and two qubit gates. The two graphs on the right show two experiments.
Figure 26
In the top graph, the red qubit is always in the state spin up. In the bottom graph the red qubit is in the state spin down. The blue qubit is initialized using the Elzerman method by aligning the electron spin to the reservoir. Then a pi/2 pulse is executed by applying an AC current through the stripline. Now the detuning is changed. This detuning brings down the second empty level of
12

the red qubit. The state of the blue qubit hybridizes with this level and the resonance frequency changes accordingly. This change in resonance frequency causes in-plane rotations of the blue qubit. As we can see from the experiment, the blue qubit starts to rotate, but with a frequency that is dependent on the state of the red qubit. A special point is reached after roughly 0.5 a microsecond, as then there is exactly a pi-rotation difference between the two states. The experimental sequence is completed by another pi/2 pulse using the stripline.
We now see that at this special point of 0.5 microsecond, the blue qubit returns to the state spin up or spin down, depending on the state of the red qubit. This qubit dependent controlled rotation is called a controlled not gate or CNOT gate and constitutes a very important gate in quantum computation. Now we can combine all aspects, from readout and initialization, to single and two-qubit control, and use this implement elementary quantum algorithms.
Figure 27
For example, here you see an experiment where these operations are com- bined to demonstrate Grover’s search algorithm and the Deutsch-Jozsa algo- rithm. These experiments demonstrate the feasibility of quantum dot qubits, and now one of the main challenges is to up-scale the qubit number and qubit quality to go to large systems. In the field of quantum dot quantum compu- tation, the vision of a future quantum computer is one where small arrays of quantum dots are coupled together using long-range qubit links. The small ar- rays operate using the ingredients as we discussed here. The long-range links could be based on quantum buses, where an electron spin is transported over an array of quantum dots. Alternatively, the electron spin can be coupled to photons in superconducting microwave cavities. Such approaches are now ac- tively being pursued and rapid advancements are being made, and these lay the foundation for a future quantum dot quantum computer. 195-202
Figure 28
Main take-aways
• Applying a magnetic field on a quantum dots causes Zeeman splitting in the energy level of the qubit states. The g-factor gives a measure for this splitting with regards to the magnetic field strength.
• Qubit control can be realized by introducting an alternating magnetic field in a direction perpendicular to the applied magnetic field, causing Rabi oscillations.
• Exchange interaction is the mechanis behind coupling of two qubits.
• Using either quantum buses or coupling to photons in superconducting microwave cavities, small arrays can be coupled together.
13

---

## Practice Quiz 5

```{exercise} Practice Quiz 5 Question 1
:label: Practice-Quiz-5-Q1
:class: orange


In the absence of a magnetic field, electrons with spin up and electrons with spin down have the same energy. When a magnetic field is introduced

```

```{solution} Practice-Quiz-5-Q1
:label: sol-Practice-Quiz-5-Q1
:class: orange
:class: dropdown

- [ ] the energy of both spin up and spin down electrons will increase by the same amount.
- [ ] nothing changes.
- [x] electrons with spin up will have a higher energy than electrons with spin down, causing the original energy level to split into two energy levels.
```

```{exercise} Practice Quiz 5 Question 2
:label: PQ5Q2
:class: orange


In the presence of the external DC magnetic field, a qubit has a certain resonance frequency. By applying an AC magnetic field that has the same frequency as this resonance frequency we can perform quantum gates: a qubit pointing down can be rotated so that it points up, and vice versa.
What is the main reason it is difficult to have the AC field be on resonance with the qubit’s frequency?


```

```{solution} PQ5Q2
:label: sPQ5Q2
:class: orange
:class: dropdown
- [x] The DC magnetic field (which we know the amplitude of) is not the only field on the qubit. Nuclear spins in the background of the material induce an unpredicatable magnetic field that changes the qubit’s frequency in an unpredictable way.
- [ ] The earth’s magnetic field offsets the DC magnetic field applied to the qubit in an unpredictable way.
- [ ] The AC magnetic field comes from a transmission line that suffers from fabrication imperfections, which broaden the spectrum of the AC field (i.e. the AC field does not have one frequency; it has many).

```

---

## Quiz 5: Operations on spin qubits

### Question 1: Elzerman readout

```{exercise} Elzerman readout
:label: q5q1
:class: orange


One of the fundamental requirements of quantum computation is the ability to read out the qubits. In the case of quantum dots, we have seen that information is encoded in the two spin states of the electron: spin-up and spin-down. There are different ways to read out the spin state in a quantum dot; the method described in the lecture, called Elzerman readout, is the most commonly used.
How does it work?

```

```{solution} q5q1
:label: sq5q1
:class: orange
:class: dropdown
- [ ] Using a magnetometer placed close to the quantum dot we can sense the magnetic moment of the electron.
- [ ] Focusing a laser beam and then analyzing the light emission.
- [x] The spin is converted to a charge that can be read out via a nearby electrometer.
- [ ] Applying microwave pulses to the gate on top of a quantum dot.

```

```{admonition} Explanation
This indirect technique may seem complicated, but it is suc- cessful, because it is much easier to detect a moving electron than it is to directly detect a change in spin state using a magnetometer, for example.
```

### Question 2: More about spin readout

```{exercise} More about spin readout
:label: q5q2
:class: orange


As discussed in the lecture, in order to read out the state of a spin qubit in a quantum dot, we move the Fermi level of the reservoir in between the two spin states. Then, only a spin-up electron can tunnel out of the dot to one of the available states in the reservoir. A spin-down electron will remain trapped inside the quantum dot.
Which could be a limiting factor of this readout protocol?

```

```{solution} q5q2
:label: sq5q2
:class: orange
:class: dropdown
- [ ] It is not possible to read out a superposition of spin states.
- [ ] Three quantum dots are required to perform this readout protocol.
- [ ] Magnetic noise can prevent the spin-up electron to tunnel out, since the Lorentz force accelerates the electron perpendicular to the direction of motion.
- [x] A spin-down electron can acquire the energy necessary to tunnel out of the dot from thermal fluctuations.

```

```{admonition} Explanation
The energy gap between the spin-up and spin-down states is quite small, much smaller than the charging energy of a quantum dot, seen in the previous quiz. Since the fermi level of the reservoir is biased to be between the spin-down and spin-up states, this allows an even small fluctuation to excite a spin-down electron into the reservoir.
```

### Question 3: GaAs vs Si

```{exercise} More about spin readout
:label: q5q3
:class: orange

Early works on spin qubits focused on heterostructures built out of III-V ma- terials, such as gallium arsenide (GaAs). However, in recent years, silicon is attracting a lot of attention as a potential platform for spin qubits. Which are the relevant reasons?
Mark the 2 answers that apply.

```

```{solution} q5q3
:label: sq5q3
:class: orange
:class: dropdown
- [ ] Single qubit gates are faster in Silicon based spin qubits.
- [x] Thanks to isotopic purification, qubits can have long coherence times in Silicon.
- [ ] It is easier to make quantum dots in silicon rather than GaAs.
- [x] Industrial development can be easier because of the similarities with
- [ ] A silicon substrate has very low electrical noise.

```

```{admonition} Explanation
Silicon-28 has zero nuclear spin. This reduces the magnetic noise in the substrate, giving the spins long coherence times. Fabrication of large-scale silicon quantum chips can in principle be more accessible than other platforms because of the similarties with conventional manufacturing technol- ogy.
```

# Question 4: Single-qubit gates with spin qubits

```{exercise} More about spin readout
:label: q5q4
:class: orange


As discussed in the lecture, one way to perform single-qubit gates with electron spins is by applying time-dependent magnetic fields. In this question we will look closer into the mathematical model.
Let’s suppose we have an electron spin immersed in a magnetic field pointing in the Z direction. An on-chip microwave antenna can deliver to the spin a time dependent magnetic field, perpendicular to the static field. Under the assumptions that the time-dependent field is much smaller in amplitude than the static field, and the frequency matches the qubit resonance frequency, we can describe the system with a very simple Hamiltonian:

$$
H=\frac{\hbar \gamma}{2} B_1 \sigma_x=\frac{\hbar \gamma}{2} B_1(|1\rangle\langle 0|+| 0\rangle\langle 1|)
$$

where $\hbar$ is the reduced planck constant, $\gamma$ the gyromagnetic ratio, and $B_1$ the amplitude of the longitudinal field. Let's suppose that at the time $t=0$, the electron spin is in the state $|\psi(t=0)\rangle=|0\rangle$. We wish to calculate the time evolution of this state. In case of a time independent hamiltonian, the time evolution of a state can be written as:)

$$
|\psi(t)\rangle=\exp \left(-\frac{i H t}{\hbar}\right)|\psi(0)\rangle
$$

The exponential of a hamiltonian is easy to calculate when applied to eigenstates of the hamiltonian. So we will rewrite the state as a linear combination of $|+\rangle=\frac{|0\rangle+|1\rangle}{\sqrt{2}}$ and $|-\rangle=\frac{|0\rangle-|1\rangle}{\sqrt{2}}$

$$
|\psi(t)\rangle=\exp \left(-\frac{i H t}{\hbar}\right) \cdot \frac{|+\rangle+|-\rangle}{\sqrt{2}}=\frac{1}{\sqrt{2}}\left(\exp \left(-\frac{i \gamma B_1 t}{2}\right)|+\rangle+\exp \left(\frac{i \gamma B_1 t}{2}\right)|-\rangle\right)
$$

Which will be the state of the qubit, after we have applied a microwave pulse of duration $t=\frac{\pi}{\gamma B_1}$ ?

```

```{solution} q5q4
:label: sq5q4
:class: orange
:class: dropdown
- [ ] $|0\rangle$
- [x] $|1\rangle$
- [ ] $|+\rangle$
- [ ] $|-\rangle$

```

```{admonition} Explanation
We can think of the action of this pulse as a rotation in the Bloch sphere. The point at the north pole will be rotated 180 degrees (pi radians), due to the selected duration of the microwave pulse. Also note that the global phase in front of the calculated state is irrelevant, since it cannot affect the results of any measurement.
```

### Question 5: Qubit-qubit interaction

```{exercise} More about spin readout
:label: q5q5
:class: orange


Electron spins can interact with each other when they are sufficiently close together.

Which of the following methods can be used to push electrons close together and to control their interaction? Mark the 2 answers that apply.

```

```{solution} q5q5
:label: sq5q5
:class: orange
:class: dropdown
- [x] Control of the tunnel barrier between the two dots.
- [ ] Short voltage pulse on the gate of the sensing dot.
- [x] Relative shifting of energies of both dots.
- [ ] Control of the reservoir where the electrons are loaded.

```

```{admonition} Explanation
By applying a voltage on the gate controlling the tunnel coupling between the two dots, or by shifting the energy levels of the dots we can bring the electrons close together and make them interact.
```

### 2.6 Question 6: Strengths of spin qubits

```{exercise} More about spin readout
:label: q5q6
:class: orange


We have discussed many of the aspects of spin qubits. Which are the key strengths of spin qubits in silicon quantum dots? Mark the 2 answers that apply.
```

```{solution} q5q6
:label: sq5q6
:class: orange
:class: dropdown
- [x] Long coherence times.
- [ ] Compatibility with room temperature operation.
- [x] High density.
- [ ] Sub-nanoseconds gate operations.

```

```{admonition} Explanation
Low temperatures are a necessity for spin quantum dots, to allow trapping of single electrons, and to prevent thermal noise from randomly changing the spin state. In the absence of nuclear spins (as is the case when using a silicon-28 substrate), millisecond coherence times can be reached, which is far longer than the nanosecond or microsecond coherence times seen in gallium arsenide quantum dots. Operations can take up to a few microseconds, so they can be carried out quite coherently. Also, techniques from semiconductor manufacturing allow a typical dot size of 100 nanometres, permitting a high density of quantum dots on a chip.
```
