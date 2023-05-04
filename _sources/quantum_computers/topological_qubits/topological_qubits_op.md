# Operations on Topological Quantum Qubits

Anyons are an essential ingredient if you want to do quantum computing with topological qubits. In this first video Attila Geresdi will explain more about these anyons.

# What are anyons?

To understand the importance of anyons in quantum computation,
let’s take two identical elementary particles.

m5oa2

Quantum mechanics dictates that their state is described by their joint wavefunction.
If we now exchange these two particles, then this wavefunction picks up a phase, denoted by α.
If we now exchange them again, then we pick up the same phase, α, once again.

B2
In our three dimensional world, we are now back to our original wavefunction.
It then follows that we only have two types of elementary particles:
α is either zero and after two exchanges we also have zero rotation, the wavefunction that we started with.
This α defines bosons, such as photons.
Alternatively, α equals to π, and after two exchanges,
we rotated the wavefunction with 2π, which is a full circle.
In this case, we have fermions, such as electrons, protons, neutrinos.
In two dimensions, this picture changes dramatically,
because the particles can keep track of how many times they were exchanged around each other.
Therefore we lose the previous restriction of α, which only allowed for two types of elementary particles.
In two dimensions, the α phase can be anything, and we have a different set of particles for every α.
These particles are called anyons.
More generally, the exchange operation may be a non-trivial unitary operation,
which brings the system to a new quantum mechanical state after each exchange.
As these operations generally don’t commute, we call the associated anyons non-Abelian.
As a side-note, I mention that this expression comes from group theory in mathematics.
Now we have a connection to quantum computation: every quantum gate is a unitary operation,
so we will somehow have to harness this non-trivial exchange operation
to execute quantum algorithms with these particles.
We will discuss this in the next video.
Now let’s take a set of these non-Abelian anyons.
A key property of this system is that it has multiple quantum mechanical states with same, lowest energy.
In other words, it has a degenerate ground state.
The ground state is separated from the higher, incoherent energy levels by an energy gap.
To perform coherent operations, we want to stay in the ground state of the system.
Our exchange operation then moves the system from one ground state to another.
This means, that these states define a quantum bit, which is free from relaxation:
since it is in its ground state, it cannot lose energy to its environment.
It also cannot gain energy from its environment, because of the energy gap above the ground state.
We created a qubit which is protected from noise or thermal fluctuations from its environment
as long as those are smaller than the energy gap.
The size of the gap depends on the physical implementation of the qubit,
and it is one of the most important parameters to optimize.
Furthermore, small changes in the exchange path don’t matter;
if we exchange the same set of particles, we always do the same quantum operation.
And as a result, we can now understand why operating on these quantum particles
can lead to perfect quantum gates:
if we slightly change the exchange path because of external noise, or control infidelity,
our quantum operation remains the same.
This property is usually referred to as the topological equivalence of the exchange paths.
In the next video, we will see how the non-Abelian anyons
fulfill the requirements of building a quantum computer.

## Main takeaways

- A Majorana fermion is a fermion which is its own antiparticle. In principle they could exist, but nobody knows for sure if they do.
- In condensed matter, Majoranas regard Majorana bound states, rather than actual Majorana fermions.
- Two Majoranas together form one fermionic state and they always come in pairs.
- The possibility of spatially separating Majoranas protect against local perturbations, laying the basis of topological qubits.
- Superconductors are a good system for Majoranas, as linear superpositions of electrons and holes can be formed.

# Quantum computation on anyons

Now let’s do quantum computation with anyons.
If we want to develop a scalable quantum computer, we have to consider the DiVincenzo criteria:
We need a scalable system of quantum objects on which we operate.
These will be our qubits.
We first have to initialize our qubits.
Then, we have to able to do several gate operations
before this system loses coherence.
We need a universal set of quantum gates and, finally,
we have to measure the quantum state of each qubit at the end of the quantum algorithm.
So let’s see how these criteria are fulfilled for a set of anyons.
As Michael has shown in his lecture, we create the anyons from actual electrons.
Specifically, the Ising anyons we will discuss in detail later on,
are created pairwise.
Scalability is then provided by the ensemble of anyons we can create in our physical device.
The quantum gates, the unitary operations are linked to the exchange
of these anyons.
As we discussed in the previous video, we need the non-Abelian property of the anyons
to perform quantum gates.
Let’s see how the exchange of two anyons happens as a function of time.
If we follow the path of the particles, it now looks like a pair of braided looms.
This is why the quantum operations on topological qubits are called braiding.
Exchanging another pair of anyons leads to a different quantum operation.
Let’s see a few examples, specifically for the Majorana bound states,
which form Ising anyons:
We can create a Z gate by exchanging a pair of anyons twice.
On the same system, the exchange of another pair corresponds to an X gate.
Or the Hadamard gate can be performed by sequential braiding operations on these anyons.
It is important that these braiding operations are always discrete;
they either happen or don’t happen.
As a result, the quantum gates that we create here
are always perfect; their fidelity is 100%.
There is however a catch:
with discrete braiding operations we cannot reach the entire Bloch sphere of a qubit
so some quantum gates required
for universal quantum computation will be missing from the set that we can do with braiding.
These additional gates can be supplemented by topologically not protected operations
on the qubit, but with a less-than-100% gate fidelity.
And finally after all the quantum operations we have to measure the state of the qubit.
This operation is called fusion, which happens when we merge,
or fuse these particles.
This behavior of the anyons is described by their so-called fusion rules.
In our case, that is the Ising anyons,
this can result in a single electron (that is one elementary charge)
or no electron (zero charge).
We can then distinguish between these two states with charge sensors,
as it is done for instance for spin qubits.
In the next video, we will see this happening in a physical system.

Main takeaways

- The quantum gates, the unitary operations, are linked to the exchange of the anyons.
  Quantum operations on topological qubits is done via braiding.
- Braiding operations are always discrete. They either happen or don’t happen. As a result, the quantum gates have a fidelity of 100%.
- Braiding operations cannot reach the entire Bloch sphere. Additional gates can be supplemented with unprotected operations.

# Qubit implementation in nanowire networks

Let’s discuss some real-life implementations
of these topological quantum bits.
The most pursued platform consists of semiconductor nanowires
attached to superconducting leads where Majorana bound states emerge
and we have the braiding statistics of the Ising anyons.
Immediately when we envision a pair of these states in a one-dimensional nanowire,
we encounter a problem.
We cannot exchange these two particles without colliding them.
This would lead to fusing them
which then measures the quantum state,
and hence loses quantum coherence.
The way to perform braiding is a clever workaround
if we attach an extra segment to the nanowire,
we can move this topological object around,
just like you do a Y-turn with your car.
This allows for braiding of the two particles, orange and blue
as shown in the animation.
Since the presence of this additional arm is crucial for this research direction,
there is actually a lot of development effort going into creating these structures.
A few of these, published in scientific literature, are shown here.
Let’s go on to the quantum state measurement in this scheme.
Remember that a pair of Majorana states
encode either zero electron or one electron charge,
and these states are degenerate, that is they are at the same energy level.
If we want to distinguish between them,
we have to break this degeneracy.
If we close off the rest of the nanowire,
the two states split off
because of the charging energy of the system,
just like for quantum dots built for spin qubits.
Similarly, the two charge states can then be measured by charge detectors
that are put close to the nanowire.
This readout scheme,
relying on the interaction between electrons in the nanowire,
is called interaction-based operation.
What we need for this operation, is a set of valves
which we can open and close at will.
In real devices, these valves are electrostatic gates
which can locally control the flow of electrons inside the nanowire.
When we apply a negative voltage
we remove the electrons and hence close the valve.
On the other hand, when we apply a positive voltage on one of these gates
we open the valve, and let the electrons flow.
We can also use this concept to perform braiding
so that we need not to physically move the Majorana states
just like we did before.
We start from a T-device with a pair of Majorana’s in each segment.
With three valves, we can control the coupling between each pair
of topological segments, enabling interaction-based braiding.
The animation shows how to exchange, or braid states 2 and 3.
Importantly, each Majorana state is always located at the end of each segment.
When opening a valve, we create a longer topological segment
which shuttles the quantum state of the Majorana to the very end of this longer segment.
With this device, we can perform braiding operations
and we can also perform state measurement.
Therefore we have just sketched a prototype topological qubit.
As an outlook, let’s see a few proposed geometries of topological qubits,
similar to the one we have just discussed.
As you can see, there are many different schemes
showing that this is a very active research topic.
It remains to be seen which geometry will lead
to the very first experimental demonstration of a topological qubit
and, eventually, a scalable system of these intriguing qubits.

Main takeaways

- The way to performing braiding is using a Y-junction.
- In order to measure the states, degeneracy has to be broken by splitting off states.
- It remains to be seen which geometry will lead to the very first experimental demonstration of a topological qubit.

## Practice Quiz 11

### Question 1

0 points possible (ungraded)
Why is a Majorana bound state immune against thermal fluctuations in its environment?

- Because the ground state is degenerate.
- **It cannot lose energy because it is in the ground state; and it cannot gain energy because of the energy gap.**
- Because it is insensitive to imperfections in the exchange path.

### Question 2

Consider two Majorana bound states in a nanowire. Due to the 1D nature of the nanowire it is not possible to braid the bound states without fusing them. Attila mentioned a solution to that in the video. What was it?

- Fuse the Majorana bound states then unfuse them in the opposite direction.
- Apply a magnetic field to temporarily change the energy of one of the bound states so that they don’t fuse when their positions are exchanged.
- **Attach an extra segment to the nanowire that allows us to perform the braiding without the bound states crossing paths.**

## Quiz 11: Operations on topological qubits

### Question 1: Bosons

0.0/1.0 point (graded)
In the first video 'What are anyons' Atilla talks about how exchanging two particles in a three dimensional world leads to the classification in fermions or bosons.

Which of the following is a boson?

- electron
- **photon**
- quark
- neutrino

Explanation
Photons and Higgs bosons are bosons. In the lecture it was explained that the wavefunction of two bosons doesnt change if you exchange the two. Electrons are fermions, if you exchange two electrons (fermions) the total wavefunction will pick up a minus sign.

### Question 2: Fermions

Phonons and Higgs bosons are bosons. In the lecture Attila explained that the wavefunction of two bosons doesn't change if you exchange the two. Electrons are fermions, if you exchange two electrons (fermions) the total wavefunction will pick up a minus sign.

- phonon
- electron
- Higgs boson
- Anyon

### Question 3: Anyons

$0.0 / 1.0$ point (graded)
In this first video Atilla explains how the wavefunction changes when we exchange two particles. Here he introduced two wavefunctions, $\Psi(1,2)$ and $\Psi(2,1)$. The two are related as follows. When we exchange particle 1 and 2 , we pick up a phase $\alpha$ for the wavefunction. We write this as $\Psi(2,1)=e^{i \alpha} \Psi(1,2)$.
What value can $\alpha$ be for anyons?

- 0 or $\pi$
- only 0
- $\pi$
- **any real value**

Explanation
When exchanging two anyons, the wavefunction can pick up any phase. By a phase we mean any (possible) complex number $x$ for which hold that $|x|=1 .$ This holds for $\left|e^{i \alpha}\right|=1$ if $\alpha$ is a real number.

### Question 4: Measurements

In the previous modules we have discussed several other qubits. When looking at measurement, which sort of qubits have measurement setup similar to the setup discussed by Atilla in the last lecture (i.e. to measure the result of the fusion)?

- NV center qubits
- **Spin qubits**
- Transmon qubits

Explanation
During a measurement, the two states split off because of the charging energy of the system, just like for quantum dots built for spin quantum bits. Similarly, the two charge states can then be measured by charge detectors that are put close to the nanowire.

---

Introduction to the next questions
The next questions will involve matrix computations and complex conjugation. For this we want to remind you the following. Given a matrix $M=\left[\begin{array}{ll}a & b \\ c & d\end{array}\right]$ where $a, b, c, d$ are complex numbers. The conjugate transpose (denoted by $M^{\dagger}$ is given by $M^{\dagger}=\left[\begin{array}{cc}\bar{a} & \bar{c} \\ \bar{b} & \bar{d}\end{array}\right]$. Where $\bar{a}$ is the complex conjugate of the complex number $a$. For example, if $a=2+3 i$, then $\bar{a}=2-3 i$. And for $M$ given as below:

$$
M=\left[\begin{array}{cc}
1 & i \\
-i & i
\end{array}\right]
$$

we have

$$
M^{\dagger}=\left[\begin{array}{cc}
1 & i \\
-i & -i
\end{array}\right]
$$

See wikipedia for more information on conjugating complex numbers
https://en.wikipedia.org/wiki/Complex_conjugate

### Question 5: Braiding 12

As mentioned in the first video by Atilla, every quantum gate is an unitary operation. Later he discusses braiding operations as the way to do gate operations on topological qubits. Assume now that we have four anyons making up 1 qubit. For the following, let's have $\mathcal{B}_{12}=e^{-i \pi / 8}\left[\begin{array}{ll}1 & 0 \\ 0 & i\end{array}\right]$ as the operator for exchanging anyon 1 and 2 and $\mathcal{B}_{23}=\frac{1}{\sqrt{2}}\left[\begin{array}{cc}1 & -i \\ -i & 1\end{array}\right]$ as the operator for exchanging anyon 2 and 3. So these are both braiding operators. Atilla says that we can do quantum gate with these, but are these actually quantum gates?
Calculate $\mathcal{B}_{12} \mathcal{B}_{12}^{\dagger}$. What is the result?

$\left[\begin{array}{ll}1 & 0 \\ 0 & 1\end{array}\right]$
$\left[\begin{array}{cc}1 & 0 \\ 0 & -1\end{array}\right]$
$\left[\begin{array}{ll}0 & i \\ i & 0\end{array}\right]$
$\left[\begin{array}{cc}0 & -i \\ -i & 0\end{array}\right]$

```{admonition} Correct answer
$\left[\begin{array}{ll}1 & 0 \\ 0 & 1\end{array}\right]$
```

---

### Question 6: Braiding 23

0.0/1.0 point (graded)
Calculate $\mathcal{B}_{23} \mathcal{B}_{23}^{\dagger}$. What is the result?

- $\left[\begin{array}{ll}1 & 0 \\ 0 & 1\end{array}\right]$
- $\left[\begin{array}{cc}1 & 0 \\ 0 & -1\end{array}\right]$
- $\left[\begin{array}{ll}0 & i \\ i & 0\end{array}\right]$
- $\left[\begin{array}{cc}0 & -i \\ -i & 0\end{array}\right]$

```{admonition} Correct answer
$\left[\begin{array}{ll}1 & 0 \\ 0 & 1\end{array}\right]$
```

---

### Question 7: Braiding and unitaries

0.0/1.0 point (graded)
What can we conclude from the previous two questions?

- **Both braiding operations, $\mathcal{B}_{12}$ and $\mathcal{B}_{23}$ act as unitaries on the qubit state.**
- Braiding operation $\mathcal{B}_{12}$ act as unitarie on the qubit state.
- Braiding operation $\mathcal{B}_{23}$ act as unitarie on the qubit state.

---

### Question 8: Abelian and non-Abelian operations

$0.0 / 1.0$ point (graded)
We call a braiding group Abelian if for every combination of elements from the group it holds that $\mathcal{B}_{1} \mathcal{B}_{2}=\mathcal{B}_{2} \mathcal{B}_{1}$. In other words, the order in which we apply the operations doesn't matter. Lets have a look at the two braiding operators introduced before: $\mathcal{B}_{12}, \mathcal{B}_{23}$.
What do you get if you do the following multiplication (up to a phase!!): $\mathcal{B}_{12} \mathcal{B}_{23}=$

- $\left[\begin{array}{ll}0 & 1 \\ 1 & 0\end{array}\right]$
- $\left[\begin{array}{cc}1 & 1 \\ 1 & -1\end{array}\right]$
- $\left[\begin{array}{cc}1 & 0 \\ 0 & -1\end{array}\right]$
- $\left[\begin{array}{cc}1 & -i \\ 1 & i\end{array}\right]$

```{admonition} Correct answer
$\left[\begin{array}{cc}1 & -i \\ 1 & i\end{array}\right]$
```

### Question 9: More braiding

0.0/1.0 point (graded)
What do you get if you do the following multiplication (up to a phase!!): $\mathcal{B}_{12} \mathcal{B}_{12}=$

- $\left[\begin{array}{ll}0 & 1 \\ 1 & 0\end{array}\right]$
- $\left[\begin{array}{cc}1 & 1 \\ 1 & -1\end{array}\right]$
- $\left[\begin{array}{cc}1 & 0 \\ 0 & -1\end{array}\right]$
- $\left[\begin{array}{ll}1 & -i \\ 1 & -i\end{array}\right]$

```{admonition} Correct answer
$\left[\begin{array}{cc}1 & 0 \\ 0 & -1\end{array}\right]$
```

### Question 10: Braiding 2 and 3

0.0/1.0 point (graded)
What do you get if you do the following multiplication (up to a phase!!): $\mathcal{B}_{23} \mathcal{B}_{23}=$

- $\left[\begin{array}{ll}0 & 1 \\ 1 & 0\end{array}\right]$
- $\left[\begin{array}{cc}1 & 1 \\ 1 & -1\end{array}\right]$
- $\left[\begin{array}{cc}1 & 0 \\ 0 & -1\end{array}\right]$
- $\left[\begin{array}{rr}1 & -i \\1 & -i\end{array}\right]$

```{admonition} Correct answer
$\left[\begin{array}{ll}0 & 1 \\ 1 & 0\end{array}\right]$
```

Explanation
This is actually an X gate! So by braiding we can do bit flips!

### Question 11: Multiple braidings

0.0/1.0 point (graded)
What do you get if you do the following multiplication (up to a phase!!): $\mathcal{B}_{12} \mathcal{B}_{23} \mathcal{B}_{12}=$

- $\left[\begin{array}{ll}0 & 1 \\ 1 & 0\end{array}\right]$
- $\left[\begin{array}{cc}1 & 1 \\ 1 & -1\end{array}\right]$
- \*\left[\begin{array}{cc}1 & 0 \\ 0 & -1\end{array}\right]$
- $\left[\begin{array}{ll}1 & -i \\ 1 & -i\end{array}\right]$

```{admonition} Correct answer
$\left[\begin{array}{cc}1 & 0 \\ 0 & -1\end{array}\right]$
```

Explanation
This is actually a Hadamard gate!

### Question 12: Anyons in nanowires

In the third video we saw how we implement these anyons in nanowires.
What is a problem if we want to exchange two particles in a nanowire?

- We cannot target them individually.
- **We cannot exchange them without them colliding.**
- They won't fuse because of their coupling to the nanowire.

Explanation
Because a nanowire can be treated as a 1D system, the anyons cannot move around eachother. The thus can't exchange position without directly crossing eachother, which leads to an unwanted fusion.

# Learn More

https://www.youtube.com/watch?v=igPXzKjqrNg

This video (a segment of a lecture given by Professor John Preskill of Caltech) grants more insight in what topological quantum computation is.

Advanced introduction of topological quantum computing
This paper gives an elaborate introduction to topological quantum computing where also the underlying mathematics are explained. This material is mainly suited for participants with a background in quantum mechanics, do not be discouraged if it is hard to follow.
https://arxiv.org/pdf/1705.04103.pdf

## Topological Quantum Computer - Professor John Preskill, Caltech

you can use topology to make a quantum computer work now topology is the word that mathematicians use when they want to describe the properties of objects which remain unchanged if we smoothly deform the object without tearing it topology is irrelevant to quantum computation because we would like the way a quantum computer processes its protected information to remain invariant if we deform the quantum computer by introducing some noise or
error now physicists have known for a long time for decades that there are physical interactions that have a topological character for example I can transport an electron around a tube of magnetic flux and that will modify the quantum state of that electron even though the electron never enters the tube in a way that depends on the enclosed magnetic flux and that
modification of the electron state is unchanged if I deform the trajectory that the electron followed all that really matters is a topological property that the electron wrapped once around the flux tube now we know more exotic types of such topological interactions that can potentially occur for particles in two-dimensional systems which we call we call these particles non abelian anions so it turns out if you have many non-abelian anyons there is a very large number of possible quantum states for those particles and all of those states
locally look the same they differ only in the collective properties of many any ions and that's just the type of encoding of physical information that we would like to hide the physical state from the environment so quantum computation can work and not only that
we can process this information in a simple way simple in principle by exchanging the particles which changes the many particle quantum state of many any odds so we can envision operating what --get I have called a topological quantum computer we would initialize it by preparing pairs of any ons and then perform a sequence of exchanges of the particles so that the world lines of the antion's would trace out a braid in space-time and to read out the computer we would bring the antion's together in pairs and observe whether they annihilate one another and disappear or not well what's beautiful about this idea is that the information
that's being processed is very non locally encoded and therefore protected from the damage that could be caused by decoherence in principle as long as the braids traced out by the world lines of the particles is the right braids will do the right computation and get the right result well at least that's how it's supposed to work now the plight of the any on has been
noted by the poets who have said you and your buddy were made in a pair then wandered around braiding hair braiding there you'll fuse back together when braiding is through well bid you adieu as you vanished from view alexey exhibits a knack for persuading that some day will crunch quantum data by braiding with quantum states hidden where no one can see protected from damage through topology any on any on where do you roam braid for a while before you go home and this poem goes on to but you get the idea so this is the theorist version of computing with any owns can we really make it work in a real physical system well here too there's an interesting story that involves three members of the Cal Tech faculty Alexei Gil Raphael and
Jason Allison Alexei again started the ball rolling with a very stunning idea some time ago
he pointed out that it's possible under the right circumstances for an electron in a wire to split into two parts for an electron in effect to be sawed in half well what he told us was that if I have a wire in the quantum regime there are really two types of wire an ordinary
garden-variety superconductor and what we call a topological superconductor and at the boundary between these two types of wire there's an object we call a Meyer on a Fermi on what you can think of it as being like half an electron and if we allow an electron to be absorbed
by the topological superconductor it sort of dissolves away and disappears and thereby changes the state of these my Arana fermions so in this way there are really two different states one with the extra electron added and one without and locally these states look the same this is a topological encoding of information the type that we can hide from the environment that we might want to use in a quantum computer well originally in qatayef psy.d a-- was a rather mathematical proposal he had a model in which this phenomenon would occur and what Raphael and Alice say and others explain is how we can really make this practical by combining a semiconductor wire with a superconductor and some other clever tricks and just in the past year or so we've seen the first experimental evidence that an electron really can be absorbed by a topological superconductor and disappear as I described but the experiments are still
not definitive and more experiments will be needed if that is achieved it'll be a real milestone for physics apart from any long-term potential technological implications now can we really use these Bionic fermions for computing well here - I will say and Raphael and others had an interesting idea which is we can imagine a network of wires in which there are T junctions and if I want to exchange the positions of two of these my honor fermions I can do it in three steps first by using electric fields move the meijer on a Fermi on around the corner of the teeth Junction and park it then move the my Renault Fermi on that was initially on the right over to the left and then unpark the first guy and by that way we have exchanged the positions of the two particles without them ever coming close to one another that's just what we need to do to perform an operation on topologically encoded data that hasn't been done in experiments yet but we're hopeful that it can be in the next few years English
