# Quantum Machine Learning

```{div} mo-lead
What quantum computers might add to machine learning, worked through in notebooks: first the quantum
systems themselves, then quantum computation, hybrid learning algorithms and coherent protocols.
```

In classical computing the basic unit is the bit. A random bit is like a fair coin toss, with outcomes
heads $(H)$ or tails $(T)$:

$$P(H)=P(T)=0.5$$

The quantum counterpart is the qubit. Picture it as a coin still spinning: until it is measured it is in
a superposition of both outcomes. Unlike the coin, a qubit carries complex amplitudes, not just
probabilities, so the possibilities can interfere with one another, and two or more qubits can be
entangled. Those two properties, interference and entanglement, are where any quantum advantage comes
from.

Quantum machine learning (QML) asks where they help learning algorithms: sampling from distributions
classical computers find hard, kernels computed in a large quantum feature space, and linear algebra on
quantum states. Which of those advantages survive the cost of loading data and the noise of today's
hardware is still an open question, and part of what makes the field interesting.

## How the series is organised

1. **Quantum systems** (notebooks 1.1 to 1.4): classical and quantum probability, measurements and mixed
   states, evolution in closed and open systems, and many-body physics.
2. **Quantum computation** (2.1 to 2.3): the gate model, adiabatic quantum computing and variational
   circuits.
3. **Classical–quantum hybrid learning algorithms** (3.1 to 3.4): discrete optimisation with ensemble
   and unsupervised learning, kernel methods and probabilistic graphical models.
4. **Coherent learning protocols** (4.1 and 4.2): quantum phase estimation and quantum matrix inversion.
5. **Quantum kernels** (5.1 and 5.2): support vector machines with quantum kernels, and variational
   kernels.

[About this series](qml/qml_0.md) explains where the notebooks come from and how their results are
shown.
