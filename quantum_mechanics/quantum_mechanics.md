# Quantum Mechanics

```{div} mo-lead
The ideas a quantum computer runs on: superposition, entanglement and measurement, and what they let us
do with information.
```

This part works through four ideas, each followed by a short quiz:

- **Entanglement.** Two qubits that share one state. Why a maximally entangled pair can share none of
  its entanglement with a third party (its *monogamy*), and how measuring the pair gives correlated
  outcomes: in the Bell state $(|00\rangle + |11\rangle)/\sqrt{2}$, both qubits measured in the $Z$ basis,
  or both in the $X$ basis, always agree.
- **Teleportation.** Moving an unknown qubit state from one place to another with one entangled pair and
  two classical bits.
- **Measurement.** The probability of each outcome, and what measuring one part of an entangled state
  does to the rest.
- **Repeaters.** How a chain of short entangled links carries quantum information across distances an
  optical fibre cannot.

The mathematics behind these ideas, from ket notation to the Bloch sphere, is introduced in
[The Hardware of Quantum Computers](../quantum_computers/quantum_computers.md), where it is first put to
work, and the [quantum machine learning series](../quantum_machine_learning/quantum_machine_learning.md)
returns to it with code.

```{admonition} Sources
:class: mo-source
This part draws on TU Delft's courses on quantum internet and quantum computing on edX. I am grateful to
TU Delft, the University of Toronto and edX for making that teaching open to everyone.
```
