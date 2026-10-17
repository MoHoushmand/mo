# Bit-Flip and Phase-Flip Codes

> The simplest quantum error correcting codes. 3-qubit bit-flip code, 3-qubit phase-flip code, and the 9-qubit Shor code.

The simplest quantum error correcting codes protect against a single type of error on a single qubit. They are not practical for real quantum computing, but they build the intuition needed to understand more powerful codes like the surface code.

## The 3-Qubit Bit-Flip Code

The bit-flip code encodes one logical qubit into three physical qubits, protecting against a single $X$ (bit-flip) error.

**Encoding**:

$$|0\rangle_L = |000\rangle, \quad |1\rangle_L = |111\rangle$$

A general logical state $\alpha|0\rangle_L + \beta|1\rangle_L = \alpha|000\rangle + \beta|111\rangle$.

**Error detection**: Measure the two stabilizer generators $Z_1 Z_2$ and $Z_2 Z_3$ (parity checks on pairs of qubits). These measurements do not disturb the encoded state.

| Error | $Z_1 Z_2$ | $Z_2 Z_3$ | Syndrome |
|---|---|---|---|
| None ($I$) | $+1$ | $+1$ | 00 |
| $X_1$ (flip qubit 1) | $-1$ | $+1$ | 10 |
| $X_2$ (flip qubit 2) | $-1$ | $-1$ | 11 |
| $X_3$ (flip qubit 3) | $+1$ | $-1$ | 01 |

**Correction**: Apply $X$ to the qubit identified by the syndrome.

```{admonition} Not Copying
:class: note
The encoding $|0\rangle \to |000\rangle$ looks like copying, but it is not the same as cloning. The encoding circuit entangles the three qubits; it maps $\alpha|0\rangle + \beta|1\rangle$ to $\alpha|000\rangle + \beta|111\rangle$, which is an entangled state, not three independent copies of the input. This distinction is critical: measurement of any individual qubit would collapse the entire state.
```

## The 3-Qubit Phase-Flip Code

The phase-flip code protects against a single $Z$ (phase-flip) error. It uses the Hadamard-rotated basis:

**Encoding**:

$$|0\rangle_L = |{+}{+}{+}\rangle, \quad |1\rangle_L = |{-}{-}{-}\rangle$$

where $|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$ and $|-\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)$.

**Error detection**: Measure $X_1 X_2$ and $X_2 X_3$. A phase flip $Z_i$ on qubit $i$ in the $|+\rangle/|-\rangle$ basis acts like a bit flip, so the same syndrome logic applies.

The phase-flip code is the bit-flip code conjugated by Hadamard. This duality is a recurring theme in quantum error correction.

## The 9-Qubit Shor Code

Shor's code (1995) was the first quantum error correcting code capable of correcting an arbitrary single-qubit error ($X$, $Z$, or $Y = iXZ$). It combines the bit-flip and phase-flip codes through concatenation.

**Encoding**: Encode against phase flips first, then against bit flips within each block:

$$|0\rangle_L = \frac{1}{2\sqrt{2}}(|000\rangle + |111\rangle)(|000\rangle + |111\rangle)(|000\rangle + |111\rangle)$$

$$|1\rangle_L = \frac{1}{2\sqrt{2}}(|000\rangle - |111\rangle)(|000\rangle - |111\rangle)(|000\rangle - |111\rangle)$$

**Structure**: 9 physical qubits arranged in 3 blocks of 3.
- Within each block: the 3-qubit bit-flip code corrects $X$ errors
- Across blocks: the 3-qubit phase-flip code corrects $Z$ errors
- Together: any single-qubit error is corrected

**Stabilizers**: The Shor code has 8 stabilizer generators (for 9 physical qubits encoding 1 logical qubit: $n - k = 8$):

| Stabilizers (bit-flip detection) | Stabilizers (phase-flip detection) |
|---|---|
| $Z_1 Z_2$ | $X_1 X_2 X_3 X_4 X_5 X_6$ |
| $Z_2 Z_3$ | $X_4 X_5 X_6 X_7 X_8 X_9$ |
| $Z_4 Z_5$ | |
| $Z_5 Z_6$ | |
| $Z_7 Z_8$ | |
| $Z_8 Z_9$ | |

## Encoding Circuits

::::{tab-set}

:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit

def shor_encode():
    """Encode one logical qubit into 9 physical qubits (Shor code)."""
    qc = QuantumCircuit(9)

    # Phase-flip encoding: entangle blocks
    qc.cx(0, 3)
    qc.cx(0, 6)

    # Hadamard on block leaders
    qc.h(0)
    qc.h(3)
    qc.h(6)

    # Bit-flip encoding within each block
    qc.cx(0, 1)
    qc.cx(0, 2)
    qc.cx(3, 4)
    qc.cx(3, 5)
    qc.cx(6, 7)
    qc.cx(6, 8)

    return qc

def bit_flip_encode():
    """Encode one logical qubit into 3 physical qubits."""
    qc = QuantumCircuit(3)
    qc.cx(0, 1)
    qc.cx(0, 2)
    return qc

print(shor_encode().draw())
```
:::

:::{tab-item} Cirq
```python
import cirq

def shor_encode_cirq():
    qubits = cirq.LineQubit.range(9)
    circuit = cirq.Circuit()

    # Phase-flip encoding
    circuit.append(cirq.CNOT(qubits[0], qubits[3]))
    circuit.append(cirq.CNOT(qubits[0], qubits[6]))

    # Hadamard on block leaders
    circuit.append(cirq.H(qubits[0]))
    circuit.append(cirq.H(qubits[3]))
    circuit.append(cirq.H(qubits[6]))

    # Bit-flip encoding within blocks
    for start in [0, 3, 6]:
        circuit.append(cirq.CNOT(qubits[start], qubits[start + 1]))
        circuit.append(cirq.CNOT(qubits[start], qubits[start + 2]))

    return circuit

print(shor_encode_cirq())
```
:::

:::{tab-item} PennyLane
```python
import pennylane as qml

dev = qml.device("default.qubit", wires=9)

@qml.qnode(dev)
def shor_encode(alpha, beta):
    """Prepare encoded state alpha|0_L> + beta|1_L>."""
    # Prepare logical input on qubit 0
    qml.RY(2 * alpha, wires=0)

    # Phase-flip encoding
    qml.CNOT(wires=[0, 3])
    qml.CNOT(wires=[0, 6])

    # Hadamard on block leaders
    qml.Hadamard(wires=0)
    qml.Hadamard(wires=3)
    qml.Hadamard(wires=6)

    # Bit-flip encoding
    for start in [0, 3, 6]:
        qml.CNOT(wires=[start, start + 1])
        qml.CNOT(wires=[start, start + 2])

    return qml.state()
```
:::

:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CNOT

def shor_encode_pyquil():
    p = Program()

    # Phase-flip encoding
    p += CNOT(0, 3)
    p += CNOT(0, 6)

    # Hadamard on block leaders
    p += H(0)
    p += H(3)
    p += H(6)

    # Bit-flip encoding within blocks
    for start in [0, 3, 6]:
        p += CNOT(start, start + 1)
        p += CNOT(start, start + 2)

    return p

print(shor_encode_pyquil())
```
:::

::::

## Limitations of Simple Codes

These codes have significant limitations:

- **The bit-flip code** cannot correct phase errors
- **The phase-flip code** cannot correct bit-flip errors
- **The Shor code** corrects arbitrary single-qubit errors but uses 9 physical qubits per logical qubit, more than the theoretical minimum of 5
- **None of these codes** have error thresholds close to practical values

The Steane $[[7,1,3]]$ code and the $[[5,1,3]]$ perfect code are more efficient. For practical quantum computing, topological codes (especially surface codes) are preferred because they have high error thresholds and require only nearest-neighbor interactions.

```{tip}
The progression from bit-flip code to Shor code to surface code follows a clear pedagogical path: first protect against one type of error, then combine protections via concatenation, and finally use topological structure for high-threshold fault tolerance. Each step builds on the concepts from the previous one.
```

## Further Reading

- Shor, P. W. "Scheme for reducing decoherence in quantum computer memory." *Physical Review A* 52(4), R2493 (1995).
- Gottesman, D. "Stabilizer Codes and Quantum Error Correction." PhD thesis, Caltech (1997). [arXiv:quant-ph/9705052](https://arxiv.org/abs/quant-ph/9705052)
- Nielsen, M. A. & Chuang, I. L. *Quantum Computation and Quantum Information*, Section 10.1-10.2. Cambridge University Press, 2010.
