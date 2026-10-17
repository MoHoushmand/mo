# Grover's Search Algorithm

> Quadratic speedup for unstructured search. Amplitude amplification, the oracle, and the diffusion operator. $O(\sqrt{N})$ vs. $O(N)$.

Grover's algorithm (1996) provides a quadratic speedup for searching an unstructured database. Given a function $f: \{0,1\}^n \to \{0,1\}$ with a single marked element $w$ such that $f(w) = 1$ and $f(x) = 0$ for all $x \neq w$, Grover's algorithm finds $w$ using $O(\sqrt{N})$ oracle queries where $N = 2^n$. Classically, this requires $O(N)$ queries.

This quadratic speedup is provably optimal for unstructured search (Bennett et al., 1997). No quantum algorithm can do better.

## The Setup

The algorithm works with two operators:

**Oracle operator** $O$: Flips the phase of the marked state.

$$O|x\rangle = \begin{cases} -|x\rangle & \text{if } f(x) = 1 \\ |x\rangle & \text{if } f(x) = 0 \end{cases}$$

In matrix form: $O = I - 2|w\rangle\langle w|$.

**Diffusion operator** $D$: Reflects about the uniform superposition $|s\rangle = \frac{1}{\sqrt{N}}\sum_x |x\rangle$.

$$D = 2|s\rangle\langle s| - I$$

This is also called "inversion about the mean" because it maps each amplitude $a_x$ to $2\bar{a} - a_x$, where $\bar{a}$ is the mean amplitude.

## The Grover Iteration

Each Grover iteration applies $G = D \cdot O$:

1. **Oracle**: Mark the target by flipping its amplitude
2. **Diffusion**: Amplify the marked amplitude by reflecting about the mean

Starting from the uniform superposition $|s\rangle$, after $k$ iterations the state is:

$$G^k|s\rangle = \sin((2k+1)\theta)|w\rangle + \cos((2k+1)\theta)|s'\rangle$$

where $\sin(\theta) = 1/\sqrt{N}$ and $|s'\rangle$ is the uniform superposition over all non-marked states.

The optimal number of iterations is:

$$k_{\text{opt}} = \left\lfloor \frac{\pi}{4}\sqrt{N} \right\rfloor$$

At this point, measuring yields the marked state with probability close to 1.

```{warning}
Too many iterations are as bad as too few. After $k_{\text{opt}}$, the state rotates *past* the target and the success probability decreases. If you do not know the number of solutions in advance, use quantum counting (Grover + QPE) to estimate it first.
```

## Geometric Interpretation

The Grover iteration is a rotation in the 2D plane spanned by $|w\rangle$ and $|s'\rangle$. Each iteration rotates the state by $2\theta$ toward $|w\rangle$. Starting at angle $\theta$ from $|s'\rangle$, after $k$ iterations the angle is $(2k+1)\theta$. The algorithm succeeds when this angle is close to $\pi/2$.

This geometric picture explains why the optimal number of iterations is $\sim \frac{\pi}{4}\sqrt{N}$: the initial angle is $\theta \approx 1/\sqrt{N}$, and you need to rotate by approximately $\pi/2$, so $k \approx \frac{\pi/2}{2/\sqrt{N}} = \frac{\pi}{4}\sqrt{N}$.

## Multiple Solutions

If there are $M$ marked items out of $N$ total, the optimal number of iterations becomes:

$$k_{\text{opt}} = \left\lfloor \frac{\pi}{4}\sqrt{N/M} \right\rfloor$$

The algorithm accelerates as more solutions exist.

## Circuit Construction

For $n$ qubits, the diffusion operator decomposes as:

$$D = H^{\otimes n} \cdot (2|0\rangle\langle 0| - I) \cdot H^{\otimes n}$$

The operator $2|0\rangle\langle 0| - I$ flips the phase of all states except $|0\rangle^{\otimes n}$, which is implemented as a multi-controlled Z gate.

## Implementations

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

def grover_circuit(n, marked):
    """Grover search for a marked state on n qubits."""
    qc = QuantumCircuit(n, n)

    # Initial superposition
    qc.h(range(n))

    # Number of iterations
    iterations = int(round(3.14159 / 4 * (2**n)**0.5))

    for _ in range(iterations):
        # Oracle: flip phase of marked state
        for i, bit in enumerate(format(marked, f'0{n}b')[::-1]):
            if bit == '0':
                qc.x(i)
        qc.h(n - 1)
        qc.mcx(list(range(n - 1)), n - 1)
        qc.h(n - 1)
        for i, bit in enumerate(format(marked, f'0{n}b')[::-1]):
            if bit == '0':
                qc.x(i)

        # Diffusion operator
        qc.h(range(n))
        qc.x(range(n))
        qc.h(n - 1)
        qc.mcx(list(range(n - 1)), n - 1)
        qc.h(n - 1)
        qc.x(range(n))
        qc.h(range(n))

    qc.measure(range(n), range(n))
    return qc

# Search for |101> = 5 in a 3-qubit space
circuit = grover_circuit(3, marked=5)
print(circuit.draw())
```
:::

:::{tab-item} Cirq
```python
import cirq
import math

def grover_cirq(n, marked):
    qubits = cirq.LineQubit.range(n)
    circuit = cirq.Circuit()

    # Initial superposition
    circuit.append(cirq.H.on_each(*qubits))

    iterations = int(round(math.pi / 4 * math.sqrt(2**n)))

    for _ in range(iterations):
        # Oracle: phase flip on marked state
        bits = format(marked, f'0{n}b')
        for i, b in enumerate(bits):
            if b == '0':
                circuit.append(cirq.X(qubits[i]))
        circuit.append(cirq.Z(qubits[-1]).controlled_by(*qubits[:-1]))
        for i, b in enumerate(bits):
            if b == '0':
                circuit.append(cirq.X(qubits[i]))

        # Diffusion
        circuit.append(cirq.H.on_each(*qubits))
        circuit.append(cirq.X.on_each(*qubits))
        circuit.append(cirq.Z(qubits[-1]).controlled_by(*qubits[:-1]))
        circuit.append(cirq.X.on_each(*qubits))
        circuit.append(cirq.H.on_each(*qubits))

    circuit.append(cirq.measure(*qubits, key='result'))
    return circuit

result = cirq.Simulator().run(grover_cirq(3, 5), repetitions=1000)
print(result.histogram(key='result'))
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml
import math

n = 3
marked = 5
dev = qml.device("default.qubit", wires=n)

def oracle():
    """Phase flip on marked state |101>."""
    bits = format(marked, f'0{n}b')
    for i, b in enumerate(bits):
        if b == '0':
            qml.PauliX(wires=i)
    qml.ctrl(qml.PauliZ, control=list(range(n - 1)))(wires=n - 1)
    for i, b in enumerate(bits):
        if b == '0':
            qml.PauliX(wires=i)

def diffusion():
    """Inversion about the mean."""
    for i in range(n):
        qml.Hadamard(wires=i)
        qml.PauliX(wires=i)
    qml.ctrl(qml.PauliZ, control=list(range(n - 1)))(wires=n - 1)
    for i in range(n):
        qml.PauliX(wires=i)
        qml.Hadamard(wires=i)

@qml.qnode(dev)
def grover():
    for i in range(n):
        qml.Hadamard(wires=i)
    iterations = int(round(math.pi / 4 * math.sqrt(2**n)))
    for _ in range(iterations):
        oracle()
        diffusion()
    return qml.probs(wires=range(n))

probs = grover()
print(f"P(|101>) = {probs[marked]:.4f}")
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, X, Z, MEASURE
from pyquil.quilbase import Declare
import math

def grover_pyquil(n, marked):
    p = Program()
    ro = p.declare('ro', 'BIT', n)

    # Initial superposition
    for i in range(n):
        p += H(i)

    iterations = int(round(math.pi / 4 * math.sqrt(2**n)))
    bits = format(marked, f'0{n}b')

    for _ in range(iterations):
        # Oracle (simplified for 3 qubits)
        for i, b in enumerate(bits):
            if b == '0':
                p += X(i)
        # Multi-controlled Z (decompose for PyQuil)
        # For 3 qubits: Toffoli + phase
        p += H(n - 1)
        # ... (use native Toffoli decomposition)
        p += H(n - 1)
        for i, b in enumerate(bits):
            if b == '0':
                p += X(i)

        # Diffusion
        for i in range(n):
            p += H(i)
            p += X(i)
        p += H(n - 1)
        p += H(n - 1)
        for i in range(n):
            p += X(i)
            p += H(i)

    for i in range(n):
        p += MEASURE(i, ro[i])
    return p
```
:::

::::

## Applications

Grover's algorithm is not limited to database search. Any problem reducible to "find $x$ such that $f(x) = 1$" benefits from Grover's quadratic speedup:

- **Cryptanalysis**: Searching key spaces. AES-128 security reduces from $2^{128}$ to $2^{64}$ quantum operations.
- **SAT solving**: Quadratic speedup over brute-force search for satisfying assignments.
- **Optimization**: Finding global optima by binary search on the objective value, using Grover to check feasibility at each threshold.
- **Collision finding**: Finding $x \neq y$ such that $f(x) = f(y)$ in $O(N^{1/3})$ queries (BHT algorithm, using Grover as a subroutine).

```{important}
Grover's algorithm gives a quadratic speedup, not an exponential one. For NP-complete problems, it reduces the search from $O(2^n)$ to $O(2^{n/2})$. This is significant but does not make NP-complete problems efficiently solvable.
```

## Further Reading

- Grover, L. K. "A fast quantum mechanical algorithm for database search." *Proceedings of STOC*, 212-219 (1996). [arXiv:quant-ph/9605043](https://arxiv.org/abs/quant-ph/9605043)
- Bennett, C. H. et al. "Strengths and weaknesses of quantum computing." *SIAM Journal on Computing* 26(5), 1510-1523 (1997). [arXiv:quant-ph/9701001](https://arxiv.org/abs/quant-ph/9701001)
- Boyer, M. et al. "Tight bounds on quantum searching." *Fortschritte der Physik* 46, 493-505 (1998). [arXiv:quant-ph/9605034](https://arxiv.org/abs/quant-ph/9605034)
