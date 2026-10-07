# The gate model in brief

```{div} mo-lead
A short orientation before the longer treatments elsewhere on this site.
```

## Qubits

A qubit is a two-level quantum system. Its state is a superposition of the basis states $|0\rangle$ and
$|1\rangle$,

$$
|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \qquad |\alpha|^2 + |\beta|^2 = 1,
$$

where the complex amplitudes $\alpha$ and $\beta$ give the probabilities $|\alpha|^2$ and $|\beta|^2$ of
measuring $0$ or $1$. Two qubits have four basis states, and $n$ qubits have $2^n$; this exponential
growth of the state space is what quantum algorithms try to put to use.

## Gates and circuits

A quantum gate is a unitary operation on one or more qubits. Common single-qubit gates are the Pauli
$X$ gate, which flips $|0\rangle$ and $|1\rangle$; the $Z$ gate, which flips the sign of $|1\rangle$;
and the Hadamard gate $H$, which turns $|0\rangle$ into the equal superposition
$(|0\rangle + |1\rangle)/\sqrt{2}$. The two-qubit controlled-NOT (CNOT) gate flips its target qubit when
its control qubit is $|1\rangle$; applied after a Hadamard it produces an entangled Bell state,

$$
\mathrm{CNOT}\,(H \otimes I)\,|00\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}.
$$

A quantum circuit is a sequence of gates followed by measurements. A small set of gates, such as $H$, the
$T$ phase gate and CNOT, is *universal*: any unitary operation can be approximated to any accuracy by a
circuit built from them.

## Measurement

Measuring a qubit gives $0$ or $1$ at random, with the probabilities above, and leaves it in the state
that was measured. A quantum algorithm is therefore arranged so that interference raises the amplitude
of the useful answers before the final measurement.

## Where to go next

The [quantum machine learning series](../../quantum_machine_learning/quantum_machine_learning.md) builds
these ideas up with code, starting from classical and quantum probability; notebook 2.1 covers the gate
model in depth.
