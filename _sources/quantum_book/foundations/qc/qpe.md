# Quantum Phase Estimation

> Estimating eigenvalues of unitary operators. The QPE circuit, Hadamard test, and applications in chemistry and cryptanalysis.

Quantum Phase Estimation (QPE) is one of the most important subroutines in quantum computing. Given a unitary operator $U$ and one of its eigenstates $|\psi\rangle$ with eigenvalue $e^{2\pi i\phi}$, QPE estimates the phase $\phi$ to $n$ bits of precision using $n$ ancilla qubits. QPE is the engine behind Shor's algorithm, quantum chemistry simulations, and many other quantum algorithms.

## The Problem

Given:
- A unitary operator $U$ with eigenstate $|\psi\rangle$ such that $U|\psi\rangle = e^{2\pi i\phi}|\psi\rangle$
- The ability to apply controlled-$U^{2^k}$ operations

Estimate $\phi$ to $n$ bits of precision.

## The QPE Circuit

The algorithm uses two registers:
- **Counting register**: $n$ ancilla qubits (determines precision)
- **Eigenstate register**: holds $|\psi\rangle$

Steps:
1. Apply $H^{\otimes n}$ to the counting register
2. Apply controlled-$U^{2^k}$ from the $k$-th counting qubit to the eigenstate register, for $k = 0, 1, \ldots, n-1$
3. Apply the inverse QFT to the counting register
4. Measure the counting register

```
|0> ──[H]──────────●────────────────────[QFT†]──[M]
                   │
|0> ──[H]──────────┼────────●───────────[QFT†]──[M]
                   │        │
|0> ──[H]──────────┼────────┼────●──────[QFT†]──[M]
                   │        │    │
|ψ> ──────────[U^(2^0)]─[U^(2^1)]─[U^(2^2)]────────
```

## How It Works

After the Hadamard gates and controlled unitaries, the counting register is in the state:

$$\frac{1}{\sqrt{2^n}} \sum_{k=0}^{2^n - 1} e^{2\pi i \phi k} |k\rangle$$

This is exactly the QFT of the state $|\tilde{\phi}\rangle$ where $\tilde{\phi} = 2^n \phi$. Applying the inverse QFT recovers $|\tilde{\phi}\rangle$, and measuring gives the binary representation of $\phi$ to $n$ bits.

If $\phi$ is exactly representable in $n$ bits (i.e., $2^n \phi$ is an integer), the algorithm succeeds with certainty. If not, the measurement yields the closest $n$-bit approximation with probability at least $4/\pi^2 \approx 0.41$, which can be boosted by using a few extra qubits.

## Precision and Resources

| Resource | Scaling |
|---|---|
| Precision | $n$ bits of $\phi$ |
| Ancilla qubits | $n$ |
| Controlled-$U$ calls | $2^0 + 2^1 + \cdots + 2^{n-1} = 2^n - 1$ |
| Success probability | $\geq 1 - \epsilon$ with $n + \lceil \log(2 + 1/(2\epsilon)) \rceil$ qubits |

```{admonition} The Cost of Controlled-U
:class: warning
The dominant cost of QPE is implementing controlled-$U^{2^k}$ for large $k$. For Shor's algorithm, $U$ is modular exponentiation. For quantum chemistry, $U = e^{-iHt}$ is Hamiltonian time evolution. The complexity of these controlled operations determines the overall resource requirements.
```

## The Hadamard Test

The Hadamard test is a simpler alternative that estimates $\text{Re}(\langle\psi|U|\psi\rangle)$ using a single ancilla qubit:

1. Prepare ancilla in $|0\rangle$, system in $|\psi\rangle$
2. Apply $H$ to ancilla
3. Apply controlled-$U$ (ancilla controls, system is target)
4. Apply $H$ to ancilla
5. Measure ancilla: $P(0) = \frac{1 + \text{Re}(\langle\psi|U|\psi\rangle)}{2}$

By adding an $S^\dagger$ gate before the final Hadamard, you can estimate $\text{Im}(\langle\psi|U|\psi\rangle)$ instead. The Hadamard test requires many repetitions but uses only one ancilla qubit.

## Applications

**Shor's algorithm**: QPE estimates the phase $\phi = s/r$ where $r$ is the period of $a^x \bmod N$. The continued fractions algorithm then extracts $r$.

**Quantum chemistry**: QPE on $e^{-iHt}$ (the time evolution operator) yields eigenvalues of the Hamiltonian $H$. The ground state energy of molecules can be estimated to chemical accuracy.

**Quantum simulation**: Energy spectra of many-body quantum systems.

## Implementations

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit.circuit.library import QFT
import numpy as np

def qpe_circuit(unitary, n_count):
    """QPE for a given unitary matrix."""
    n_target = int(np.log2(unitary.shape[0]))
    qc = QuantumCircuit(n_count + n_target, n_count)

    # Initialize eigenstate (e.g., |1> for a phase gate)
    qc.x(n_count)

    # Hadamard on counting qubits
    qc.h(range(n_count))

    # Controlled-U^(2^k)
    for k in range(n_count):
        power = 2**k
        for _ in range(power):
            qc.cp(np.pi / 4, k, n_count)  # Example: T gate phase

    # Inverse QFT
    qc.append(QFT(n_count, inverse=True), range(n_count))

    qc.measure(range(n_count), range(n_count))
    return qc

# Estimate phase of T gate (phi = 1/8)
circuit = qpe_circuit(np.eye(2), n_count=3)
print(circuit.draw())
```
:::

:::{tab-item} Cirq
```python
import cirq
import numpy as np

def qpe_cirq(n_count, phase):
    """QPE to estimate a known phase (for demonstration)."""
    count_qubits = cirq.LineQubit.range(n_count)
    target = cirq.LineQubit(n_count)
    circuit = cirq.Circuit()

    # Prepare eigenstate
    circuit.append(cirq.X(target))

    # Hadamard on counting qubits
    circuit.append(cirq.H.on_each(*count_qubits))

    # Controlled phase rotations
    for k, qubit in enumerate(count_qubits):
        angle = 2 * np.pi * phase * (2**k)
        circuit.append(cirq.CZPowGate(exponent=angle / np.pi)(qubit, target))

    # Inverse QFT
    circuit.append(cirq.qft(*count_qubits, inverse=True))

    circuit.append(cirq.measure(*count_qubits, key='phase'))
    return circuit

# Estimate phi = 1/4
result = cirq.Simulator().run(qpe_cirq(3, 0.25), repetitions=100)
print(result.histogram(key='phase'))
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml
import numpy as np

n_count = 3
dev = qml.device("default.qubit", wires=n_count + 1)

@qml.qnode(dev)
def qpe(phase):
    target = n_count

    # Prepare eigenstate
    qml.PauliX(wires=target)

    # Hadamard on counting qubits
    for i in range(n_count):
        qml.Hadamard(wires=i)

    # Controlled-U^(2^k)
    for k in range(n_count):
        angle = 2 * np.pi * phase * (2**k)
        qml.ctrl(qml.PhaseShift, control=k)(angle, wires=target)

    # Inverse QFT
    qml.adjoint(qml.QFT)(wires=range(n_count))

    return qml.probs(wires=range(n_count))

# Estimate phi = 1/8 (should peak at |001>)
probs = qpe(1/8)
print(f"Most likely outcome: {np.argmax(probs)} (expected: 1)")
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, X, CPHASE, MEASURE
from pyquil.quilbase import Declare
import numpy as np

def qpe_pyquil(n_count, phase):
    p = Program()
    ro = p.declare('ro', 'BIT', n_count)

    target = n_count

    # Prepare eigenstate
    p += X(target)

    # Hadamard on counting qubits
    for i in range(n_count):
        p += H(i)

    # Controlled phase rotations
    for k in range(n_count):
        angle = 2 * np.pi * phase * (2**k)
        p += CPHASE(angle, k, target)

    # Inverse QFT (manual decomposition)
    # Swap + controlled phases + Hadamards
    for i in range(n_count // 2):
        # SWAP qubits i and n_count-1-i
        pass
    for i in range(n_count):
        for j in range(i):
            p += CPHASE(-np.pi / 2**(i - j), j, i)
        p += H(i)

    for i in range(n_count):
        p += MEASURE(i, ro[i])
    return p
```
:::

::::

## Further Reading

- Kitaev, A. Y. "Quantum measurements and the Abelian Stabilizer Problem." [arXiv:quant-ph/9511026](https://arxiv.org/abs/quant-ph/9511026)
- Nielsen, M. A. & Chuang, I. L. *Quantum Computation and Quantum Information*, Section 5.2. Cambridge University Press, 2010.
- Cleve, R. et al. "Quantum algorithms revisited." *Proceedings of the Royal Society A* 454, 339-354 (1998). [arXiv:quant-ph/9708016](https://arxiv.org/abs/quant-ph/9708016)
