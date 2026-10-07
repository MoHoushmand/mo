# Draft: repeater quiz (moved from qm_0.md)

This block was moved out of the published Quantum Mechanics page in October 2026. It mixed spin-readout
quizzes copied from the spin-qubit chapter with the repeater explanation. Nothing was changed.

## Question 1: Definition of a quantum repeater

```{exercise} More about spin readout
:label: x0
:class: orange

In order to read out the state of a spin qubit in a quantum dot, we move the Fermi level of the reservoir in between the two spin states. Then, only a spin-up electron can tunnel out of the dot to one of the available states in the reservoir. A spin-down electron will remain trapped inside the quantum dot.
Which could be a limiting factor of this readout protocol?
```

```{solution} x0
:label: sq5q2
:class: orange
:class: dropdown
- [ ] It is not possible to read out a superposition of spin states.
- [ ] Three quantum dots are required to perform this readout protocol.
- [ ] Magnetic noise can prevent the spin-up electron to tunnel out, since the Lorentz force accelerates the electron perpendicular to the direction of motion.
- [x] A spin-down electron can acquire the energy necessary to tunnel out of the dot from thermal fluctuations.
```

d

dw

[x] True
[] False

dw

```{admonition} Explanation
Explanation We can think of the repeater protocol as being divided into two smaller protocols. First, Alice and the repeater generate shared entanglement. Then, Bob and the repeater generate shared entanglement, which they use to teleport half of the Alice/repeater entangled state to Bob
```

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

in order to read out the state of a spin qubit in a quantum dot, we move the Fermi level of the reservoir in between the two spin states. Then, only a spin-up electron can tunnel out of the dot to one of the available states in the reservoir. A spin-down electron will remain trapped inside the quantum dot.
Which could be a limiting factor of this readout protocol?

```{admonition} Explanation
Explanation We can think of the repeater protocol as being divided into two smaller protocols. First, Alice and the repeater generate shared entanglement. Then, Bob and the repeater generate shared entanglement, which they use to teleport half of the Alice/repeater entangled state to Bob

- [ ] It is not possible to read out a superposition of spin states.
- [ ] Three quantum dots are required to perform this readout protocol.
- [ ] Magnetic noise can prevent the spin-up electron to tunnel out, since the Lorentz force accelerates the electron perpendicular to the direction of motion.
- [x] A spin-down electron can acquire the energy necessary to tunnel out of the dot from thermal fluctuations.

```
