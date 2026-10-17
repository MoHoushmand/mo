# Shor's Factoring Algorithm

> Polynomial-time integer factorization using quantum period-finding. Why this threatens RSA and the motivation for post-quantum cryptography.

Shor's algorithm (1994) is the most consequential quantum algorithm discovered to date. It factors integers in polynomial time, breaking the computational hardness assumption that underpins RSA, DSA, ECDH, and ECDSA. This single algorithm is the reason post-quantum cryptography exists.

## The Problem

**Integer Factorization**: Given a composite integer $N$, find a non-trivial factor $p$ such that $1 < p < N$ and $p | N$.

The best known classical algorithm (General Number Field Sieve) runs in sub-exponential time: $O(\exp(c \cdot (\ln N)^{1/3} (\ln \ln N)^{2/3}))$. Shor's algorithm runs in polynomial time: $O(n^3)$ where $n = \log N$ is the number of bits.

| Algorithm | Time Complexity | Type |
|---|---|---|
| Trial division | $O(\sqrt{N})$ | Classical |
| Pollard's rho | $O(N^{1/4})$ | Classical (heuristic) |
| GNFS | $O(\exp(1.9 \cdot n^{1/3} (\ln n)^{2/3}))$ | Classical |
| Shor's | $O(n^3)$ | Quantum |

## The Reduction: Factoring to Period-Finding

Shor's key insight is that factoring reduces to finding the period of a function. The reduction is classical:

1. Pick a random $a < N$ with $\gcd(a, N) = 1$
2. Find the **order** $r$ of $a$ modulo $N$: the smallest positive integer such that $a^r \equiv 1 \pmod{N}$
3. If $r$ is even and $a^{r/2} \not\equiv -1 \pmod{N}$, then $\gcd(a^{r/2} \pm 1, N)$ gives a non-trivial factor

Step 2 is the hard part classically. Quantum computers solve it efficiently using the Quantum Fourier Transform.

```{admonition} Why Period-Finding Works
:class: note
The function $f(x) = a^x \bmod N$ is periodic with period $r$ (the order of $a$). If $r$ is even, then $a^r - 1 = (a^{r/2} - 1)(a^{r/2} + 1) \equiv 0 \pmod{N}$. Since $a^{r/2} \not\equiv \pm 1$, neither factor is divisible by $N$, so $\gcd(a^{r/2} - 1, N)$ and $\gcd(a^{r/2} + 1, N)$ are non-trivial factors. The probability that a random $a$ yields a useful $r$ is at least $1/2$.
```

## The Quantum Part: Period-Finding

The quantum subroutine estimates $r$ using two registers:

1. **First register**: $n$ qubits for the input (initialized in uniform superposition)
2. **Second register**: $n$ qubits for the output (stores $a^x \bmod N$)

The steps:
1. Prepare $\frac{1}{\sqrt{2^n}} \sum_{x=0}^{2^n - 1} |x\rangle |0\rangle$
2. Compute $f$: $\frac{1}{\sqrt{2^n}} \sum_x |x\rangle |a^x \bmod N\rangle$
3. Apply QFT to the first register
4. Measure the first register to obtain an estimate of $j/r$ for some integer $j$
5. Use the continued fractions algorithm to extract $r$ from $j/r$

The QFT converts the periodic structure in the amplitudes into sharp peaks at multiples of $2^n/r$, enabling efficient extraction of the period.

## Resource Estimates

For factoring an $n$-bit number:

| Resource | Estimate |
|---|---|
| Qubits | $2n + O(\log n)$ (textbook), $\sim 2n$ (optimized) |
| Gates | $O(n^3)$ with schoolbook multiplication, $O(n^2 \log n)$ with FFT-based |
| Circuit depth | $O(n^3)$ |

For RSA-2048 ($n = 2048$):
- Logical qubits needed: ~4,000
- Physical qubits (with surface codes at $10^{-3}$ error rate): ~20 million
- Runtime estimate: hours to days (depending on clock speed and code distance)

```{important}
No quantum computer has factored a cryptographically relevant number. The largest number factored by Shor's algorithm on real hardware is 21 (using 5 qubits, heavily optimized). The gap between current hardware and what is needed for RSA-2048 is enormous, but the algorithm's existence motivates the ongoing transition to post-quantum cryptography.
```

## Threat to Cryptography

Shor's algorithm (and its extension to discrete logarithms) breaks:

| Cryptosystem | Problem | Status |
|---|---|---|
| RSA | Integer factorization | Broken by Shor |
| DSA | Discrete logarithm | Broken by Shor |
| ECDH / ECDSA | Elliptic curve discrete log | Broken by Shor |
| Diffie-Hellman | Discrete logarithm | Broken by Shor |
| AES-256 | Symmetric key search | Grover reduces to $2^{128}$ (still secure) |
| SHA-256 | Hash preimage | Grover reduces to $2^{128}$ (still secure) |

This is why NIST standardized post-quantum cryptographic algorithms (ML-KEM, ML-DSA, SLH-DSA) based on problems believed to be hard for quantum computers.

## Implementations

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.circuit.library import QFT
import math

def shor_period_finding(a, N, n_count):
    """Quantum period-finding circuit for a^x mod N."""
    qc = QuantumCircuit(n_count + N.bit_length(), n_count)

    # Initialize counting register in superposition
    qc.h(range(n_count))

    # Initialize work register to |1>
    qc.x(n_count)

    # Controlled modular exponentiation
    for i in range(n_count):
        power = pow(a, 2**i, N)
        # Simplified: apply controlled multiplication by power mod N
        # Full implementation requires modular arithmetic circuits
        pass  # Placeholder for c-U^(2^i)

    # Inverse QFT on counting register
    qc.append(QFT(n_count, inverse=True), range(n_count))

    qc.measure(range(n_count), range(n_count))
    return qc

# Example: factor 15, a=7
# Full implementation requires modular exponentiation circuits
# See Qiskit textbook for complete worked example
```
:::

:::{tab-item} Cirq
```python
import cirq
import fractions

def make_order_finding_circuit(a, N, n_count):
    """Construct the QPE-based order finding circuit."""
    qubits = cirq.LineQubit.range(n_count + N.bit_length())
    count_qubits = qubits[:n_count]
    work_qubits = qubits[n_count:]

    circuit = cirq.Circuit()

    # Superposition on counting register
    circuit.append(cirq.H.on_each(*count_qubits))

    # |1> in work register
    circuit.append(cirq.X(work_qubits[0]))

    # Controlled modular exponentiation
    # (implementation depends on specific N and a)

    # Inverse QFT
    circuit.append(cirq.qft(*count_qubits, inverse=True))

    circuit.append(cirq.measure(*count_qubits, key='phase'))
    return circuit

# Extract period from measured phase using continued fractions
def extract_period(measured_phase, n_count, N):
    phase = measured_phase / (2**n_count)
    frac = fractions.Fraction(phase).limit_denominator(N)
    return frac.denominator
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml
import numpy as np

def shor_subroutine(a, N, n_count):
    """
    Shor's period-finding subroutine.
    Note: Full modular exponentiation requires
    problem-specific circuit construction.
    """
    n_work = int(np.ceil(np.log2(N)))
    dev = qml.device("default.qubit", wires=n_count + n_work)

    @qml.qnode(dev)
    def circuit():
        # Counting register in superposition
        for i in range(n_count):
            qml.Hadamard(wires=i)

        # Work register initialized to |1>
        qml.PauliX(wires=n_count)

        # Controlled modular exponentiation
        # ... (problem-specific implementation)

        # Inverse QFT on counting register
        qml.adjoint(qml.QFT)(wires=range(n_count))

        return qml.probs(wires=range(n_count))

    return circuit
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, X, MEASURE
from pyquil.quilbase import Declare

def shor_circuit(a, N, n_count):
    """
    Shor's period-finding circuit skeleton.
    Modular exponentiation must be implemented
    for specific (a, N) pairs.
    """
    p = Program()
    ro = p.declare('ro', 'BIT', n_count)

    # Counting register superposition
    for i in range(n_count):
        p += H(i)

    # Work register |1>
    p += X(n_count)

    # Controlled modular exponentiation
    # ... (problem-specific gates)

    # Inverse QFT (decomposed into gates)
    # ... (sequence of controlled-phase and H gates)

    for i in range(n_count):
        p += MEASURE(i, ro[i])
    return p
```
:::

::::

```{admonition} Implementation Note
:class: tip
The modular exponentiation step ($a^x \bmod N$) is the most complex part of Shor's algorithm to implement. For small examples (factoring 15 or 21), the circuit can be hard-coded. For general $N$, you need reversible modular arithmetic circuits (addition, multiplication, exponentiation), which significantly increase the gate count.
```

## Further Reading

- Shor, P. W. "Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer." *SIAM Journal on Computing* 26(5), 1484-1509 (1997). [arXiv:quant-ph/9508027](https://arxiv.org/abs/quant-ph/9508027)
- Gidney, C. & Ekera, M. "How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits." *Quantum* 5, 433 (2021). [arXiv:1905.09749](https://arxiv.org/abs/1905.09749)
- Beauregard, S. "Circuit for Shor's algorithm using 2n+3 qubits." *Quantum Information & Computation* 3(2), 175-185 (2003). [arXiv:quant-ph/0205095](https://arxiv.org/abs/quant-ph/0205095)
