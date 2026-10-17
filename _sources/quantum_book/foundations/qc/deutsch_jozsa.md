# Deutsch-Jozsa Algorithm

> The first quantum algorithm to demonstrate exponential speedup over deterministic classical algorithms. Oracle construction and circuit implementation.

The Deutsch-Jozsa algorithm (1992) is historically the first example of a quantum algorithm that is exponentially faster than any deterministic classical algorithm for the same problem. While the problem it solves has no practical applications, it cleanly illustrates the core ideas of quantum computation: superposition, interference, and oracle queries.

## The Problem

Given a function $f: \{0,1\}^n \to \{0,1\}$ that is promised to be either:

- **Constant**: $f(x) = 0$ for all $x$, or $f(x) = 1$ for all $x$
- **Balanced**: $f(x) = 0$ for exactly half of all inputs, and $f(x) = 1$ for the other half

Determine which case holds.

**Classical complexity**: A deterministic algorithm must query $f$ at least $2^{n-1} + 1$ times in the worst case (just over half the inputs). A randomized algorithm needs only $O(1)$ queries with high probability, so the exponential separation is specifically over *deterministic* classical algorithms.

**Quantum complexity**: One query suffices.

## The Quantum Oracle

The function $f$ is provided as a quantum oracle $U_f$ that acts on $n+1$ qubits:

$$U_f|x\rangle|y\rangle = |x\rangle|y \oplus f(x)\rangle$$

The oracle computes $f$ reversibly by XOR-ing the result into an ancilla qubit. This is the standard oracle model used throughout quantum algorithm design.

## The Algorithm

1. Initialize $n$ qubits in $|0\rangle$ and one ancilla in $|1\rangle$
2. Apply $H^{\otimes(n+1)}$ (Hadamard on all qubits)
3. Apply the oracle $U_f$
4. Apply $H^{\otimes n}$ to the first $n$ qubits
5. Measure the first $n$ qubits

## The Math

After step 2, the state is:

$$\frac{1}{\sqrt{2^n}} \sum_{x \in \{0,1\}^n} |x\rangle \cdot \frac{|0\rangle - |1\rangle}{\sqrt{2}}$$

Applying the oracle with the ancilla in the $\frac{|0\rangle - |1\rangle}{\sqrt{2}}$ state produces a **phase kickback**:

$$U_f|x\rangle\frac{|0\rangle - |1\rangle}{\sqrt{2}} = (-1)^{f(x)}|x\rangle\frac{|0\rangle - |1\rangle}{\sqrt{2}}$$

The function value $f(x)$ has been encoded in the phase. After the final Hadamard on the first $n$ qubits, the amplitude of measuring $|0\rangle^{\otimes n}$ is:

$$\frac{1}{2^n} \sum_{x \in \{0,1\}^n} (-1)^{f(x)}$$

- If $f$ is constant: all terms have the same sign, the amplitude is $\pm 1$. Measurement yields $|0\rangle^{\otimes n}$ with certainty.
- If $f$ is balanced: half the terms are $+1$ and half are $-1$. The amplitude is $0$. Measurement *never* yields $|0\rangle^{\otimes n}$.

```{admonition} Phase Kickback
:class: tip
Phase kickback is one of the most important tricks in quantum computing. By preparing the target qubit in a superposition of its eigenstates, the oracle's action on the target "kicks back" a phase onto the control register. This converts function values into phases that can be manipulated by interference. The same trick appears in Grover's algorithm, Shor's algorithm, and QPE.
```

## Circuit Diagram

For $n = 3$:

```
|0> ──[H]──────●──────[H]──[M]
               │
|0> ──[H]──────●──────[H]──[M]
               │
|0> ──[H]──────●──────[H]──[M]
               │
|1> ──[H]────[U_f]─────────────
```

## Implementations

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

def deutsch_jozsa(oracle, n):
    """Run Deutsch-Jozsa with a given oracle on n qubits."""
    qc = QuantumCircuit(n + 1, n)

    # Initialize ancilla in |1>
    qc.x(n)

    # Apply Hadamard to all qubits
    qc.h(range(n + 1))

    # Apply oracle
    qc.compose(oracle, inplace=True)

    # Apply Hadamard to input qubits
    qc.h(range(n))

    # Measure input qubits
    qc.measure(range(n), range(n))
    return qc

# Constant oracle (f(x) = 0): identity
n = 3
oracle_constant = QuantumCircuit(n + 1)

# Balanced oracle: CNOT from q0 to ancilla
oracle_balanced = QuantumCircuit(n + 1)
oracle_balanced.cx(0, n)

circuit = deutsch_jozsa(oracle_balanced, n)
print(circuit.draw())
```
:::

:::{tab-item} Cirq
```python
import cirq

def deutsch_jozsa_cirq(n, balanced=True):
    qubits = cirq.LineQubit.range(n + 1)
    ancilla = qubits[-1]
    circuit = cirq.Circuit()

    # Initialize ancilla in |1>
    circuit.append(cirq.X(ancilla))

    # Hadamard on all
    circuit.append(cirq.H.on_each(*qubits))

    # Oracle
    if balanced:
        circuit.append(cirq.CNOT(qubits[0], ancilla))

    # Hadamard on input qubits
    circuit.append(cirq.H.on_each(*qubits[:-1]))

    # Measure input qubits
    circuit.append(cirq.measure(*qubits[:-1], key='result'))
    return circuit

circuit = deutsch_jozsa_cirq(3, balanced=True)
result = cirq.Simulator().run(circuit, repetitions=100)
print(result.histogram(key='result'))
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml
import numpy as np

n = 3
dev = qml.device("default.qubit", wires=n + 1)

@qml.qnode(dev)
def deutsch_jozsa(balanced=True):
    # Initialize ancilla
    qml.PauliX(wires=n)

    # Hadamard on all
    for i in range(n + 1):
        qml.Hadamard(wires=i)

    # Oracle (balanced: CNOT from q0 to ancilla)
    if balanced:
        qml.CNOT(wires=[0, n])

    # Hadamard on input qubits
    for i in range(n):
        qml.Hadamard(wires=i)

    return qml.probs(wires=range(n))

probs = deutsch_jozsa(balanced=True)
print(f"P(000) = {probs[0]:.4f}")  # Should be 0.0 for balanced
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, X, CNOT, MEASURE
from pyquil.quilbase import Declare

def deutsch_jozsa_pyquil(n, balanced=True):
    p = Program()
    ro = p.declare('ro', 'BIT', n)

    # Initialize ancilla in |1>
    p += X(n)

    # Hadamard on all
    for i in range(n + 1):
        p += H(i)

    # Oracle
    if balanced:
        p += CNOT(0, n)

    # Hadamard on input qubits
    for i in range(n):
        p += H(i)

    # Measure input qubits
    for i in range(n):
        p += MEASURE(i, ro[i])

    return p

program = deutsch_jozsa_pyquil(3, balanced=True)
print(program)
```
:::

::::

## Significance and Limitations

The Deutsch-Jozsa algorithm matters historically, not practically. No one needs to solve the Deutsch-Jozsa problem. Its importance lies in three insights:

1. **Quantum parallelism is real**: A single oracle query processes all $2^n$ inputs simultaneously through superposition.
2. **Phase kickback works**: Function values can be encoded into phases and extracted via interference.
3. **Exponential separation exists**: There is a provable exponential gap between quantum and deterministic classical query complexity for this problem.

```{warning}
The exponential speedup disappears if you allow randomized classical algorithms. A randomized algorithm can solve Deutsch-Jozsa with $O(1)$ queries and bounded error probability. The quantum advantage is over *deterministic* algorithms only. For unconditional exponential speedup, see Simon's problem and Shor's algorithm.
```

## Further Reading

- Deutsch, D. & Jozsa, R. "Rapid solution of problems by quantum computation." *Proceedings of the Royal Society A* 439, 553-558 (1992).
- Cleve, R. et al. "Quantum algorithms revisited." *Proceedings of the Royal Society A* 454, 339-354 (1998). [arXiv:quant-ph/9708016](https://arxiv.org/abs/quant-ph/9708016)
- Nielsen, M. A. & Chuang, I. L. *Quantum Computation and Quantum Information*, Section 1.4.4. Cambridge University Press, 2010.
