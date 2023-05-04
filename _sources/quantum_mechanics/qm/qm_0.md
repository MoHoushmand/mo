---
jupytext:
  cell_metadata_filter: -all
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Entanglement

Quantum entanglement is a special connection between two qubits. There are many ways to generate entanglement. One way to produce it is by bringing two qubits close together, perform an operation to entangle them and then move them apart again. When they are entangled, you can move them arbitrarily far apart from each other and they will remain entangled. This entanglement will manifest itself in the outcomes of measurements on these qubits. When measured these qubits will always yield zero or one perfectly at random, but no matter how far away they are from each other, they will always yield the same outcome.
Entanglement has two very special properties that enable all the applications derived from it.

1. The first property is that entanglement cannot be shared. If two qubits are maximally entangled with each other, then no other party in the universe can have a share of this entanglement. This property is called the `monogamy` of entanglement.
2. The second property of entanglement, which makes it so powerful, is called `maximal coordination`. This property manifests itself when measuring the qubits.
When two qubits that are entangled are measured in the same basis, no matter how far away they are from each other, they will always yield the same outcome. This outcome is not decided beforehand, but it is completely random and is decided when the measurement happens.
It’s almost romantic to think that two particles can be entangled even when they are millions of kilometres apart.

---

More about quantum entanglement. How is it generated and what are the implications?
Entanglement further explained

# Entanglement further explained

So what is entanglement precisely? Imagine we have 2 particles: we have particle $A$ and particle B. And these particles can be either full, which is the filled have here, empty, or a superposition of the two. Now let’s say that particle A and B are entangled. The weird thing about this entanglement is that when we would measure one of the particles, say we’d like to measure particle A, and we get the outcome/result full. Instantaneously the particle at B collapses into the full state as well. This happens instantaneously, so even faster than the speed of light.
However, particle B, or an observer at particle B would never know if Alice, the observer at A has already measured her particle. In order for him to know if Alice measured her particle, Alice needs to send a signal over a classical internet,
$$
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
$$
which cannot exceed the speed of light, to notify Bob, who is at particle B, if the particle has been measured. Only then they can compare their results and see if their particles were indeed entangled. The particles can also be entangled in a different way. So, this corresponds to when the particle A would be full when we measure it, particle B would be empty, and vice versa: if A would result in empty, B would result in full. If we do not know beforehand which kind of entanglement we have, we can also not know what the state of B will be after measuring A.
Question 1: Entanglement from relative phases
In Module 1, we note that entangled states are those that cannot be written as tensor products.
The tensor product of two single-qubit states looks like this:

$$[
\left[\begin{array}{c}
\alpha\\
\beta
\end{array}\right]\otimes\left[\begin{array}{c}
\gamma\\
\delta
\end{array}\right]=\left[\begin{array}{c}
\alpha\gamma\\
\alpha\delta\\
\beta\gamma\\
\beta\delta
\end{array}\right]
\]$$

As an example, note that the state
$$\frac{\mid00\rangle+\mid11\rangle}{\sqrt{2}}=\frac{1}{\sqrt{2}}\left[\begin{array}{c}
1\\
0\\
0\\
1
\end{array}\right]$$

cannot be written as a tensor product, since

$$(\alpha\gamma)(\beta\delta)$$
must be equal to
$$(\alpha\delta)(\beta\gamma)$$ arithmetically, but this cannot be true if we multiply the coefficients of the given state. Is the state following state entangled?

$$\frac{1}{\sqrt{2}}\left[\begin{array}{c}
1\\
1\\
1\\
-1
\end{array}\right]$$  

Indeed!

## Different Ways of Entanglement

Entanglement can be generated in different ways. This difference will manifest itself in the outcome statistics when performing measurements. In this example you can see an entangled pair of qubits that always produces the opposite answers, rather than the same answers as we saw before.

## Question 1: Entanglement with general correlations

Correlated and anti-correlated states aren't the only maximally entangled states. In fact, any state which can be written as

$$\frac{1}{\sqrt{2}}\left(\mid\psi\rangle\otimes\mid\phi\rangle+\mid\psi^{\perp}\rangle\otimes\mid\phi^{\perp}\rangle\right)$$

is maximally entangled, where the symbol $\mid\psi^{\perp}\rangle$ is a state which is orthogonal to (has zero inner product with) $\mid\psi\rangle$

For example, if we set $$\mid\psi\rangle=\mid\phi\rangle=\mid0\rangle$$, then $$\mid\psi^{\perp}\rangle=\mid\phi^{\perp}\rangle=\mid1\rangle$$, and we produce the state $$\frac{1}{\sqrt{2}}\left(\mid00\rangle+\mid11\rangle\right)$$, which is the familiar fully-correlated entangled state we saw earlier.

```{admonition} Explanation
- [x] $\mathbf{\frac{1}{\sqrt{2}}\left(\mid00\rangle+\mid11\rangle\right)}$
- [] $\frac{1}{\sqrt{2}}\left(\mid00\rangle+\mid01\rangle\right)$
- [] $\frac{1}{\sqrt{3}}\left(\mid0+\rangle+\mid-1\rangle\right)$
- [x] $\mathbf{\frac{1}{\sqrt{2}}\left(\mid0+\rangle+\mid1-\rangle\right)}$
```

Which of the following states are maximally entangled?


```{admonition} Explanation
Multiplying the 1 state by $-1$ also results in a state orthogonal to the $0$ state, so we're allowed to insert these states into the construction above. The states of the plus/minus basis are orthogonal, which allows us to use them in the construction as well, though it is important to keep the order of the terms in the tensor product correct.
```

---

## Teleportation

Quantum teleportation is a method to send qubits using entanglement. Teleportation works as follows: First Alice and Bob need to establish an entangled pair of qubits between them. Alice then takes the qubit that she wants to send and the qubit that is entangled with Bob’s qubit and performs a measurement on them. This measurement collapses the qubits and destroys the entanglement, but gives her two classical outcomes in the form of two classical bits. She takes this two classical bits and sends them over the classical internet to Bob. Bob then applies a correction operation that depends on these two classical bits to his qubit. This allows him to recover the qubit that was originally in Alice’s possession. Note that we have now transmitted a qubit without really using a physical carrier that is capable of transmitting qubits. But of course you already need entanglement to do this. It is also important to note that quantum teleportation does not allow for faster than light communication. This is so because Bob cannot make sense of the qubit in her possession before he gets the classical measurement outcomes from Alice. These classical measurement outcomes must take a certain amount of time to be transmitted. And this time is lower bounded by the speed of light.

### Teleportation further explained

So we’ve talked a lot about entanglement, but now we will see how we can use this entanglement to teleport a certain quantum state. So let’s take a look at how this works. First, we have two stations: we have station Alice and we have station Bob. Alice and Bob share an entangled state, which means Bob has one qubit of the entangled state and Alice has the other one of the entangled state. What Alice also has is another qubit which is not entangled with any of those which has a state A. Alice and Bob’s goal is to teleport Alice’s state A to Bob’s qubit. The first thing they do is to perform some operations which we again denote as a black box. After the operations have been done, Alice will measure her qubits. Since Alice has 2 qubits the total outcome can be 4 different situations. For example: both the qubits could be measured into the state empty, the first qubit might have been full and the second empty and vice versa. And there is also the situation where both of the qubits are measured to be full. And these four situation also results in 4 different states for Bob. So in the empty-empty case we get the full state A back, but as you can see not all the measurement outcomes result in this nice state A. They do resemble A, but they are rotated or flipped a bit. So Bob needs to do something in order to correctly retrieve the state A. And for this he needs Alice’s help. What does Alice do? Alice uses her information she had on the measured qubits to send Bob instructions. If her first bit was measured to be full, she says to Bob: rotate your qubit 180 degrees clockwise. If it’s empty, do nothing. Almost the same goes for the second qubit, only now the rotation is 90 degrees clockwise. So if it’s full, Bob has to rotate the bit, if it’s empty Bob has to do nothing. So let’s take a look at what this would result in. So let’s take a look at the first case: Alice measured empty-empty. She knows now: I measured empty-empty, and because of my clever operations in the black box I know that Bob must already be in the state A. So I order him to do nothing. She sends Bob this information over a classical internet, so she cannot exceed the speed of light on this one. Then we go to the second possibility, so she measured full on the first qubit and empty on the second qubit. Remember: the instruction on this one was: rotate your qubit 180 degrees clockwise. So let’s take a look. We see we have an A upside down here, and we have to rotate it 180 degrees. And we see that we get the correct state A. So it works for this outcome. But now we take a look at what happened for the third possibility. What is the first qubit was empty and the second qubit was full. This corresponds to a 90 degrees clockwise rotation. So she sends this information to Bob, and Bob says: OK, right, 90 degrees, I can do this! So we see we have this sort of flipped A here, and were going to rotate it 90 degrees clockwise, again resulting in the state A. And you can already a little bit check for the final case, when both the qubits are full, we have to rotate 180 degrees clockwise and also rotate 90 degrees clockwise. So this would again result in: first the 180 degrees clockwise... ..and now the 90 degrees clockwise, which is again the state A. So if Bob follows the orders of Alice correctly, and Alice of course sends the correct information, Bob will always retrieve the quantum state A that Alice initially had. So the quantum state has been teleported from Alice’s lab to Bob’s lab.

# One-bit "Teleportation"

There's a simpler protocol, called "one-bit teleportation", which does not consume an entangled state, but requires Alice and Bob to be close together, such that they can perform the $\text{CNOT$ CNOT gate on their qubits:

$\text{CNOT:$ $$\ensuremath{\mid00\rangle\mapsto\mid00\rangle,\mid01\rangle\mapsto\mid01\rangle,\mid10\rangle}}\mapsto\mid11\rangle,\mid11\rangle\mapsto\mid10\rangle$$

Alice begins with the state $$\mid+\rangle=\frac{1}{\sqrt{2}}\left(\mid0\rangle+\mid1\rangle\right)$$
and Bob begins with the state $$\mid\psi\rangle=\alpha\mid0\rangle+\beta\mid1\rangle$$  

They then perform the $\text{CNOT}$.

What is the resulting state?

[] $\frac{1}{\sqrt{2}}\left(\alpha\mid0\rangle+\beta\mid1\rangle\right)\otimes\left(\mid0\rangle+\mid1\rangle\right)$
[x] $\mathbf{\frac{1}{\sqrt{2}}\left[\left(\alpha\mid0\rangle+\beta\mid1\rangle\right)\otimes\mid0\rangle+\left(\beta\mid0\rangle+\alpha\mid1\rangle\right)\otimes\mid1\rangle\right]}$
[] $\left(\alpha\mid0\rangle+\beta\mid1\rangle\right)\otimes\mid0\rangle+\left(\beta\mid0\rangle+\alpha\mid1\rangle\right)\otimes\mid1\rangle$

```{admonition} Explanation
If Bob now measures his qubit in the Z basis and receives 0, Alice has received Bob's initial state. If Bob receives a $1$, he can send a classical message to Alice telling her to perform the X operation, at which point she will possess Bob's initial state.
```

## Measurement

Measurement is the act of observing a quantum state. This observation will yield classical information such as a bit. It is important to note that this measurement process will change the quantum state. For instance if the state is in superposition, this measurement will ‘collapse’ it into a classical state; zero or one. This collapse process happens randomly. Before we do the measurement we have no way of knowing what the outcome will be. What we can do however is to calculate the probability of each outcome. This probability is a prediction about the quantum state, a prediction that we can test by preparing the state many times, measuring it and then counting the fraction of each outcome.

### Question 1: Probability of measurement outcome

A measurement defines a basis, with the measurement operator $\sum_{k}r_{k}\left\vert \psi_{k}\right\rangle \left\langle \psi_{k}\right\vert$  being a weighted sum of 'outer products' of these basis vectors. Once such a measurement is applied to an input state $\left\vert \phi\right\rangle$  , one of the states from the measurement's predefined basis is returned, with a probability given by Born's rule: $p_{k}=\left\vert \left\langle \phi\vert\psi_{k}\right\rangle \right\vert ^{2}$. For example, if we perform a measurement of the $\text{Z} operator$ $\left(\left\vert 0\right\rangle \left\langle 0\right\vert -\left\vert 1\right\rangle \left\langle 1\right\vert \right)$ on the state $\left\vert +\right\rangle =\frac{\left\vert 0\right\rangle +\left\vert 1\right\rangle }{\sqrt{2}}$ , we can calculate the probability of the $\left\vert 0\right\rangle state being output: p_{0}=\left\vert \left\langle +\vert0\right\rangle \right\vert ^{2}$. We write out the inner product: $$\left\langle +\vert0\right\rangle =\left(\frac{\left\langle 0\right\vert +\left\langle 1\right\vert }{\sqrt{2}}\right)\left\vert 0\right\rangle =\frac{1}{\sqrt{2}}\left(\left\langle 0\vert0\right\rangle +\left\langle 1\vert0\right\rangle \right)$$

We know that $\left\langle 0\vert0\right\rangle =1$ and $\left\langle 1\vert0\right\rangle =0$ , since the $0/1$ basis is orthonormal (see the ket notation for more information). This allows us to simplify the inner product:

$$\left(\frac{\left\langle 0\right\vert +\left\langle 1\right\vert }{\sqrt{2}}\right)\left\vert 0\right\rangle =\frac{1}{\sqrt{2}}\left(1+0\right)=\frac{1}{\sqrt{2}}$$

Therefore, $p_{0}=\frac{1}{2}$, since it is the squared magnitude of the inner product which we have calculated.

Suppose that we measure the operator $$X=\left\vert +\right\rangle \left\langle +\right\vert -\left\vert -\right\rangle \left\langle -\right\vert$$  
with the state $\mid0\rangle$ as input. What is the probability that the state $\mid+\rangle$ is produced withou replicating the calculation above.

[] $0$
[] $\frac{1}{4}$
[x] $\frac{\mathbf{1}}{\mathbf{2}}$$
[] $1$

```{admonition} Explanation
This probability must be equal to the probability that we calculated earlier, which is simply the squared magnitude of the inner product between the 0 and + states.
```

---

## Measurement in superposition

When performing measurement we do not necessarily have to collapse into the zero or the one state. We can also choose to collapse into a pair of superposition states. This has important consequences when measuring entangled pairs. When both parties perform the same type of measurement the outcomes will always agree. But if one party performs one type and the other party performs the other type the answers will no longer agree. In fact they will be completely uncorrelated.

### Question 1: Partial measurement of an entangled state

We can take a closer look at what happens when a maximally entangled state is measured using two bases which are not identical. Suppose that the initial state is $\frac{\left\vert 00\right\rangle +\left\vert 11\right\rangle }{\sqrt{2}}$, and we measure the operator $Z\otimes I$ (this corresponds to Alice measuring $Z$ and Bob measuring nothing):

$$Z\otimes I=\begin{bmatrix}1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & -1 & 0\\
0 & 0 & 0 & -1
\end{bmatrix}$$

Which of the eigenstates of $Z\otimes I$ may be output from this measurement, and with what probabilities? See also the exercise in "Measurement".

[] $\mid00\rangle with probability \frac{1}{2}, \mid10\rangle$ with probability $\frac{1}{2}$
[] $\mid00\rangle, \mid01\rangle , \mid10\rangle or \mid11\rangle$ each with probability $\frac{1}{4}$
[x] $\mid00\rangle with probability \frac{1}{2}, \mid11\rangle$ with probability $\frac{1}{2}$

```{admonition} Explanation
Explanation The measurement cannot return the 01 or 10 states, since the inner product of the input state with those basis states is zero. The inner products of the input state with the 00 and 11 states are equal, leading to a 50-50 distribution.
```

### Question 2: Partial measurement of an entangled state - continued

0 points possible (ungraded) Suppose that Alice and Bob have prepared some entangled state, and Alice has performed the partial measurement described above, resulting in the basis state \mid00\rangle .

What happens if Bob measures $𝑍$ or $𝑋$ on his qubit? See the previous ket notation, and/or previous exercises for definitions.

[] If Bob measures $𝑍$ , he receives $\mid0\rangle$, but if Bob measures $X$, he receives a random state from the basis defined by $X$.
[x] If Bob measures $𝑍$ , he receives he receives a random state from the basis defined by $𝑍$ , and if Bob measures $𝑋$ , he receives $\mid+\rangle$
[] Bob's state will be random, and uncorrelated with Alice's, regardless of the operator measured.

## Repeaters

Repeaters enable long distance communication over a quantum network. An optical fiber can transmit a qubit over roughly $100$ kilometers. If you want to send a quantum information over an very long distance just a fiber is not good enough. To send information over this long distances we need quantum repeaters. Quantum repeaters can be thought of as a series of short entangled links connecting the two points. The quantum information can then be teleported through these links and arrive safely at its destination.

### Repeaters Further Explained

So now I’d like to explain to you the quantum repeater. First of all, why do we need a quantum repeater? Well, suppose you want to create entanglement between to places which are very far apart. That problem is, is that when you send a qubit it might lose its information during its travels. So the longer the distance the qubit has to travel, the more information might be lost. So we would like to minimize these distances as much as possible. And for this we can use repeaters. So how do these repeaters actually work? Let’s take a look. First of all we start with the two separate stations: we have station Alice and we have station Bob. Alice has two qubits which are entangled and Bob also has two qubits which are entangled, but the two stations are not entangled with each other. This is where the repeater comes in, which is shown here in the middle. So for the next step Alice and Bob both send one of their qubits to the repeater, which looks like this. Now important to note here is that there is still no entanglement between Alice and Bob, because these two particles are not entangled. To create this entanglement, we need to do operations. These clever operations are performed here, in this black box. This black box performs some operations on the qubits and eventually measures them, which results in the qubits in the repeater to collapse and generate an entangled state between Alice and Bob. So we can see now that the two qubits which were there in the middle initially are now gone and there is a pure entangled state between Alice and Bob. Now I know I might have been a little bit vague about what happened in the black box. But this is because what happens in the black box might be a little bit too technical. If you’re still interested in the details, I’d like to refer you to the link below which explains what happens in the repeaters in more detail.

### Question 1: Definition of a quantum repeater

```{exercise} More about spin readout
:label: x0
:class: orange

As discussed in the lecture, in order to read out the state of a spin qubit in a quantum dot, we move the Fermi level of the reservoir in between the two spin states. Then, only a spin-up electron can tunnel out of the dot to one of the available states in the reservoir. A spin-down electron will remain trapped inside the quantum dot.
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

### fff

As discussed in the lecture, in order to read out the state of a spin qubit in a quantum dot, we move the Fermi level of the reservoir in between the two spin states. Then, only a spin-up electron can tunnel out of the dot to one of the available states in the reservoir. A spin-down electron will remain trapped inside the quantum dot.
Which could be a limiting factor of this readout protocol?

```{admonition} Explanation
Explanation We can think of the repeater protocol as being divided into two smaller protocols. First, Alice and the repeater generate shared entanglement. Then, Bob and the repeater generate shared entanglement, which they use to teleport half of the Alice/repeater entangled state to Bob

- [ ] It is not possible to read out a superposition of spin states.
- [ ] Three quantum dots are required to perform this readout protocol.
- [ ] Magnetic noise can prevent the spin-up electron to tunnel out, since the Lorentz force accelerates the electron perpendicular to the direction of motion.
- [x] A spin-down electron can acquire the energy necessary to tunnel out of the dot from thermal fluctuations.

```
