# Quantum Matrix Inversion (HHL)

> The Harrow-Hassidim-Lloyd algorithm for solving linear systems. Exponential speedup conditions, caveats, and applications to ML.

The HHL algorithm (Harrow, Hassidim, and Lloyd, 2009) solves the linear system $A\mathbf{x} = \mathbf{b}$ with an exponential speedup over classical methods, under specific conditions. Since linear algebra underlies much of machine learning (regression, PCA, least squares, Gaussian processes), HHL has been called the "poster child" of quantum machine learning. However, the conditions required for the speedup are stringent, and understanding these caveats is as important as understanding the algorithm itself.

## The Problem

Given an $N \times N$ Hermitian matrix $A$ and a vector $\mathbf{b}$, find $\mathbf{x} = A^{-1}\mathbf{b}$.

Classically, direct methods (Gaussian elimination, LU decomposition) require $O(N^3)$ operations. Iterative methods (conjugate gradient) require $O(Ns\kappa\log(1/\epsilon))$ where $s$ is the sparsity, $\kappa$ is the condition number, and $\epsilon$ is the desired precision.

## The HHL Algorithm

HHL encodes $\mathbf{b}$ as a quantum state $|b\rangle$ and produces a quantum state proportional to $|x\rangle = A^{-1}|b\rangle$.

### Algorithm Steps

1. **State preparation**: Encode $\mathbf{b}$ as a quantum state $|b\rangle = \sum_i b_i |i\rangle$ on $\lceil\log_2 N\rceil$ qubits.

2. **Hamiltonian simulation**: Implement $e^{iAt}$ for the Hamiltonian $A$. This requires $A$ to be sparse or efficiently simulable.

3. **Phase estimation**: Apply QPE to extract the eigenvalues of $A$. If $A|u_j\rangle = \lambda_j|u_j\rangle$, then:
   $$|b\rangle = \sum_j \beta_j |u_j\rangle \xrightarrow{\text{QPE}} \sum_j \beta_j |\tilde{\lambda}_j\rangle|u_j\rangle$$

4. **Controlled rotation**: Apply a rotation on an ancilla qubit conditioned on the eigenvalue register:
   $$\sum_j \beta_j |\tilde{\lambda}_j\rangle|u_j\rangle|0\rangle \to \sum_j \beta_j |\tilde{\lambda}_j\rangle|u_j\rangle\left(\sqrt{1-\frac{C^2}{\lambda_j^2}}|0\rangle + \frac{C}{\lambda_j}|1\rangle\right)$$
   where $C$ is a normalization constant.

5. **Uncompute**: Reverse the QPE to disentangle the eigenvalue register.

6. **Post-selection**: Measure the ancilla. If outcome is $|1\rangle$, the remaining state is proportional to:
   $$|x\rangle \propto \sum_j \frac{\beta_j}{\lambda_j}|u_j\rangle = A^{-1}|b\rangle$$

### Complexity

HHL runs in $O(s^2 \kappa^2 \log(N) / \epsilon)$ time, compared to $O(Ns\kappa\log(1/\epsilon))$ for the best classical iterative method. The exponential speedup is in $N$: the quantum algorithm scales logarithmically in the matrix dimension.

## Conditions for Exponential Speedup

The speedup requires all of the following conditions simultaneously:

| Condition | Requirement | Why It Matters |
|---|---|---|
| Sparse or structured $A$ | $s = O(\text{polylog}\, N)$ | Hamiltonian simulation efficiency |
| Low condition number | $\kappa = O(\text{polylog}\, N)$ | Runtime scales as $\kappa^2$ |
| Efficient state preparation | $\|b\rangle$ in $O(\text{polylog}\, N)$ | Loading classical data is expensive |
| Quantum output suffices | Need $\langle x\|M\|x\rangle$, not $\mathbf{x}$ | Reading out all of $\mathbf{x}$ costs $O(N)$ |

```{warning}
HHL does not produce the classical solution vector $\mathbf{x}$. It produces a quantum state $|x\rangle$ from which only expectation values or sampling results can be efficiently extracted. If you need the full vector $\mathbf{x}$, you must measure $O(N)$ times, eliminating the exponential speedup.
```

## Caveats and Limitations

### The Input Problem

Encoding a classical vector $\mathbf{b}$ into a quantum state $|b\rangle$ generally requires $O(N)$ operations (arbitrary state preparation). This negates the $O(\log N)$ speedup unless:
- $\mathbf{b}$ has efficient structure (e.g., uniform superposition, sparse).
- $\mathbf{b}$ is already available as a quantum state from a prior quantum computation.
- Quantum Random Access Memory (QRAM) is available.

### The Output Problem

The output $|x\rangle$ is a quantum state. Useful information must be extracted via measurements:
- Expectation values $\langle x|M|x\rangle$ can be estimated efficiently.
- Sampling from $|x\rangle$ provides stochastic access to the solution.
- Full vector readout requires $O(N)$ measurements.

### The Condition Number

The runtime scales as $O(\kappa^2)$. Many practical linear systems have condition numbers that grow polynomially or even exponentially with $N$, severely limiting the speedup.

### Dequantization

Tang (2019) and subsequent work showed that for certain structured problems (low-rank matrices with sampling access), classical algorithms can achieve performance comparable to HHL-based methods. This narrowed the class of problems where HHL provides genuine advantage.

## Applications in Machine Learning

Despite the caveats, HHL (or its generalizations) is a subroutine in several QML algorithms:

| ML Task | How HHL is Used | Speedup Conditions |
|---|---|---|
| Least-squares regression | Solve $A^T A \mathbf{x} = A^T \mathbf{b}$ | Sparse design matrix, quantum output |
| Gaussian processes | Invert kernel matrix $K$ | Low-rank kernel, quantum predictions |
| Support vector machines | Solve dual QP via linear system | Sparse kernel matrix |
| Portfolio optimization | Solve covariance systems | Structured financial data |
| Differential equations | Discretize to $A\mathbf{x} = \mathbf{b}$ | Sparse discretization, quantum output |

```{admonition} Practical perspective
:class: note
As of 2026, HHL has been demonstrated on small systems (up to ~10 qubits) on quantum hardware. Practical applications require fault-tolerant quantum computers with thousands of logical qubits. The algorithm's primary value today is as a theoretical tool for understanding quantum computational advantage in linear algebra.
```

## Code Examples

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit.circuit import QuantumCircuit
from qiskit.circuit.library import QFT
from qiskit.quantum_info import Statevector
import numpy as np

# Simplified HHL for 2x2 system A|x> = |b>
# A = [[1, -1/3], [-1/3, 1]], eigenvalues 2/3 and 4/3
# |b> = |0> (encodes [1, 0])

n_clock = 2  # clock qubits for QPE
n_b = 1      # qubit for |b>
ancilla = n_clock + n_b

qc = QuantumCircuit(n_clock + n_b + 1, 1)

# |b> = |0> (already initialized)
# QPE: Hadamard on clock qubits
qc.h(0)
qc.h(1)

# Controlled unitary e^{iAt} (simplified)
# For demonstration, apply controlled rotations
qc.cp(np.pi * 2/3, 0, n_clock)
qc.cp(np.pi * 4/3, 1, n_clock)

# Inverse QFT on clock
qc.swap(0, 1)
qc.h(0)
qc.cp(-np.pi/2, 0, 1)
qc.h(1)

# Controlled rotation for eigenvalue inversion
qc.cry(np.pi, 1, ancilla)  # rotate ancilla based on eigenvalue

# Measure ancilla for post-selection
qc.measure(ancilla, 0)

print("Simplified HHL circuit:")
print(qc)
```
:::
:::{tab-item} Cirq
```python
import cirq
import numpy as np

# Simplified HHL demonstration
clock = cirq.LineQubit.range(2)
target = cirq.LineQubit(2)
ancilla = cirq.LineQubit(3)

circuit = cirq.Circuit()

# QPE
circuit.append(cirq.H.on_each(*clock))
circuit.append(cirq.ControlledGate(cirq.ZPowGate(exponent=2/3)).on(clock[0], target))
circuit.append(cirq.ControlledGate(cirq.ZPowGate(exponent=4/3)).on(clock[1], target))

# Inverse QFT
circuit.append(cirq.SWAP(clock[0], clock[1]))
circuit.append(cirq.H(clock[0]))
circuit.append(cirq.CZPowGate(exponent=-0.5).on(clock[0], clock[1]))
circuit.append(cirq.H(clock[1]))

# Eigenvalue inversion via controlled rotation
circuit.append(cirq.ry(np.pi).on(ancilla).controlled_by(clock[1]))

circuit.append(cirq.measure(ancilla, key='result'))
print(circuit)
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
from pennylane import numpy as np

# Simplified HHL on PennyLane
n_clock = 2
dev = qml.device("default.qubit", wires=4)  # 2 clock + 1 target + 1 ancilla

@qml.qnode(dev)
def hhl_simplified():
    # QPE on clock qubits (0, 1), target qubit (2)
    qml.Hadamard(wires=0)
    qml.Hadamard(wires=1)

    # Controlled unitaries (simplified)
    qml.ControlledPhaseShift(np.pi * 2/3, wires=[0, 2])
    qml.ControlledPhaseShift(np.pi * 4/3, wires=[1, 2])

    # Inverse QFT
    qml.SWAP(wires=[0, 1])
    qml.Hadamard(wires=0)
    qml.ControlledPhaseShift(-np.pi/2, wires=[0, 1])
    qml.Hadamard(wires=1)

    # Eigenvalue inversion
    qml.CRY(np.pi, wires=[1, 3])

    return qml.probs(wires=3)

probs = hhl_simplified()
print(f"P(ancilla=|0>): {probs[0]:.4f}")
print(f"P(ancilla=|1>): {probs[1]:.4f}")
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, CPHASE, SWAP, MEASURE
from pyquil.api import WavefunctionSimulator
import numpy as np

# Simplified HHL
prog = Program()
ro = prog.declare('ro', 'BIT', 1)

# QPE
prog += H(0)
prog += H(1)
prog += CPHASE(np.pi * 2/3, 0, 2)
prog += CPHASE(np.pi * 4/3, 1, 2)

# Inverse QFT
prog += SWAP(0, 1)
prog += H(0)
prog += CPHASE(-np.pi/2, 0, 1)
prog += H(1)

# Post-selection measurement on ancilla
prog += MEASURE(3, ro[0])

print(prog)
print("\nNote: Full HHL requires controlled rotation")
print("based on eigenvalue register, omitted for clarity.")
```
:::
::::

## Further Reading

- Harrow, A.W., Hassidim, A., and Lloyd, S. "Quantum algorithm for linear systems of equations." *Physical Review Letters* 103, 150502 (2009)
- Childs, A.M., Kothari, R., and Somma, R.D. "Quantum algorithm for systems of linear equations with exponentially improved dependence on precision." *SIAM Journal on Computing* 46, 1920-1950 (2017)
- Tang, E. "A quantum-inspired classical algorithm for recommendation systems." *STOC 2019*
- Aaronson, S. "Read the fine print." *Nature Physics* 11, 291-293 (2015)
