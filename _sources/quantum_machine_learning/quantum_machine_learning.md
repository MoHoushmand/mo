# Quantum Machine Learning Intro

Introduction to Quantum Machine Learning

In the realm of classical computing, the foundational unit is the 'bit'. This binary entity can be likened to an unbiased coin flip, where the outcomes are Heads $(H)$ or Tails $(T)$, mathematically represented as

$$P(H)=P(T)=0.5$$

However, as we venture into the quantum domain, the analogous foundational unit is the 'qubit'. Unlike a static coin that's either heads or tails, a qubit can be visualized as a coin in perpetual spin. To the observer, this spinning coin, due to its superposition, appears as a sphere, representing its undecided state. This unique property of qubits, where they can exist in a combination of states, is what grants quantum computers their immense computational power and parallelism.

Quantum Machine Learning (QML) is an interdisciplinary field that merges principles from quantum physics with machine learning algorithms. The potential of QML is vast. By harnessing the power of quantum mechanics, QML algorithms can process and analyze vast datasets more efficiently than their classical counterparts. This efficiency arises from the inherent properties of quantum systems, such as superposition and entanglement, which allow quantum computers to explore multiple solutions simultaneously.

As we delve deeper into QML, it's essential to understand the nuances that differentiate classical and quantum systems, the potential advantages offered by quantum algorithms, and the challenges that lie ahead in this burgeoning field.

# Classical vs. Quantum

The fundamental difference between classical and quantum systems is the way they store information. Classical systems store information in bits, which can be in one of two states: 0 or 1. In contrast, quantum systems store information in qubits, which can be in a superposition of states. This superposition allows qubits to exist in a combination of states, which is what grants quantum computers their immense computational power and parallelism. 

The following table summarizes the key differences between classical and quantum systems:

| Classical | Quantum |
| --- | --- |
| Information stored in bits | Information stored in qubits |
| Bits can be in one of two states: 0 or 1 | Qubits can be in a superposition of states |
| Bits are independent | Qubits can be entangled |
| Bits are deterministic | Qubits are probabilistic |

# Quantum Advantage

The potential of QML is vast. By harnessing the power of quantum mechanics, QML algorithms can process and analyze vast datasets more efficiently than their classical counterparts. This efficiency arises from the inherent properties of quantum systems, such as superposition and entanglement, which allow quantum computers to explore multiple solutions simultaneously. 

# Challenges

Despite the potential advantages offered by quantum algorithms, there are several challenges that must be overcome before QML can be applied to real-world problems. These challenges include: 

- **Noise**: Quantum systems are susceptible to noise, which can cause errors in the computation.
- **Decoherence**: Quantum systems are prone to decoherence, which can cause the system to lose its quantum properties.
- **Measurement**: Quantum systems are probabilistic, which means that the same measurement can yield different results.
- **Scalability**: Quantum systems are difficult to scale, which means that the number of qubits is limited.
- **Error Correction**: Quantum systems are prone to errors, which means that error correction is required.
- **Quantum Volume**: Quantum systems are limited by their quantum volume, which means that the number of qubits is limited.

# What are the elements of a quantum circuit?

Every computation has three elements: Data, operations and result

In quantum circuits:

- Data = Qubits

- Operations = Quantum Gates (Unitary Transformation)

- Result = Measurements

## Data: Qubits

**Conceptual Explanation**

In classical computing, the smallest unit of data is a bit, which can take on values of 0 or 1 .
Quantum computing introduces a new unit of data called the qubit. Unlike bits, qubits can exist in a superposition of states. This means they can represent both 0 and 1 simultaneously, a property that gives quantum computing its computational power.

**Mathematical Explanation**


A qubit is mathematically represented by a state vector in a two-dimensional complex Hilbert space. The general state of a qubit, $\mid\psi\rangle$, can be expressed as:

$$
\mid\psi\rangle=\alpha\mid 0\rangle+\beta\mid 1\rangle
$$

Where:

$$
\mid\psi\rangle=\left[\begin{array}{l}
\alpha \\
\beta
\end{array}\right]
$$

Here, $\alpha$ and $\beta$ are complex numbers, and the constraints are:

1. $\mid\alpha\mid^2+\mid\beta\mid^2=1$ ensuring normalization.
2. $\mid 0\rangle$ and $\mid 1\rangle$ are the basis states representing the classical values $0$ and $1$ respectively.
For example, the state where a qubit is equally likely to be measured in the 0 or $1$ state is:

$$
\mid\psi\rangle=\frac{1}{\sqrt{2}}\mid0\rangle+\frac{1}{\sqrt{2}}|1\rangle
$$

## Operations: Quantum Gates

**Conceptual Explanation**

Quantum gates are the building blocks of quantum circuits. They perform operations on qubits, allowing us to manipulate quantum data. These gates are analogous to classical gates like AND, OR, NOT, but with the difference that quantum gates are reversible and operate on superpositions.

**Mathematical Explanation**
Quantum gates are represented by unitary matrices, which transform input qubit states to output qubit states. A common gate is the Pauli-X gate, which acts like a quantum NOT gate. It is represented by:

$$
X=\left[\begin{array}{ll}
0 & 1 \\
1 & 0
\end{array}\right]
$$

When this gate acts on a qubit state, it flips the state. For example, applying the $\mathrm{X}$ gate to $\mid 0\rangle$ yields $\mid 1\rangle$ and vice versa.
Another important gate is the Hadamard gate, which creates superposition:

$$
H=\frac{1}{\sqrt{2}}\left[\begin{array}{cc}
1 & 1 \\
1 & -1
\end{array}\right]
$$

Applying the Hadamard gate to $\mid 0\rangle$ gives:

$$
H\mid 0\rangle=\frac{1}{\sqrt{2}}(\mid 0\rangle+\mid 1\rangle)
$$

## Result: Measurements


**Conceptual Explanation**
In quantum computing, reading out the final result is done through a process called measurement. When a qubit in superposition is measured, it collapses to one of its basis states, $\mid 0\rangle$ or $\mid 1\rangle$, with a probability determined by its state vector.
Mathematical Explanation
If a qubit is in the state:

$$
\mid\psi\rangle=\alpha\mid 0\rangle+\beta\mid 1\rangle
$$

The probability of measuring the qubit in the state $\mid 0\rangle$ is $\mid \alpha\mid^2$ and in the state $\mid 1\rangle$ is $\mid\beta\mid^2$.
For instance, for the equally superposed state:

$$
\mid\psi\rangle=\frac{1}{\sqrt{2}}\mid 0\rangle+\frac{1}{\sqrt{2}}|1\rangle
$$

The probabilities are:

$$
P(\mid 0\rangle)=\mid\frac{1}{\sqrt{2}}\mid^2 =\frac{1}{2}
$$ 

$$
P(\mid 1\rangle)=\mid\frac{1}{\sqrt{2}}\mid^2=\frac{1}{2}
$$

This means that upon measurement, there's a $50 \%$ chance of the qubit collapsing to $\mid0\rangle$ and a $50 \%$ chance of it collapsing to $\mid 1\rangle$.

To wrap it up, quantum circuits operate on the principles of superposition, entanglement, and quantum interference, utilizing qubits, quantum gates, and measurements to perform computations that classical computers might find intractable.

In the realm of quantum physics, every quantum system we encounter operates as an open quantum system. Despite meticulous experimental measures to minimize extraneous external interactions, there persists a subtle yet unavoidable coupling between the system under examination and the surrounding environment.

Furthermore, the act of measurement inherently necessitates a connection to the measuring apparatus, introducing another layer of external perturbation. Thus, crafting sophisticated theoretical and computational tools to account for these interactions becomes paramount in comprehending the dynamics of real-world quantum systems.
