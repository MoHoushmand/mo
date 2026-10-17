# Quantum Programming Frameworks

> An overview of the four major quantum SDKs: Qiskit, Cirq, PennyLane, and PyQuil. Philosophy, strengths, and ecosystem.

Four open-source Python frameworks dominate quantum software development. Each is backed by a quantum hardware company and reflects that company's philosophy and hardware architecture. Understanding their differences helps you choose the right tool for your project and translate between them when needed.

## Framework Comparison

| Feature | Qiskit | Cirq | PennyLane | PyQuil |
|---|---|---|---|---|
| **Developer** | IBM | Google | Xanadu | Rigetti |
| **License** | Apache 2.0 | Apache 2.0 | Apache 2.0 | Apache 2.0 |
| **Hardware** | IBM Quantum (superconducting) | Google Quantum AI | Xanadu (photonic) + any | Rigetti QCS (superconducting) |
| **Focus** | Full stack, education | Low-level circuit control | Differentiable QC, ML | Hybrid classical-quantum |
| **Circuit model** | `QuantumCircuit` | `cirq.Circuit` of `Moment`s | Functional (QNodes) | `Program` (Quil) |
| **Simulator** | Aer, StatevectorSimulator | `cirq.Simulator` | `default.qubit` | QVM (Quantum Virtual Machine) |
| **Transpiler** | Built-in (pass manager) | Custom + `cirq.optimize` | Device-level via plugins | Quilc compiler |
| **Community size** | Largest | Large | Growing fast | Smaller |

## Qiskit (IBM)

Qiskit is the most widely used quantum SDK, with the largest community, most tutorials, and deepest integration with real hardware (IBM Quantum has the largest fleet of publicly accessible quantum computers).

**Strengths**:
- Mature transpiler with optimization passes for IBM hardware
- Extensive educational materials (IBM Quantum Learning)
- Largest selection of accessible quantum hardware
- Rich ecosystem: Qiskit Nature (chemistry), Qiskit Machine Learning, Qiskit Finance

**Architecture**: Circuits are built as `QuantumCircuit` objects with gates added imperatively. The transpiler converts abstract circuits to hardware-native gates with connectivity-aware routing.

## Cirq (Google)

Cirq emphasizes low-level control over circuit structure, reflecting Google's research-oriented approach. It is designed for users who need precise control over gate placement, timing, and noise models.

**Strengths**:
- Fine-grained control over gate scheduling (`Moment`-based circuit model)
- Excellent noise simulation and custom noise models
- Direct support for Google's Sycamore and Willow hardware
- Strong support for quantum error correction research

**Architecture**: Circuits are sequences of `Moment`s (time slices). Each `Moment` contains non-overlapping gates that execute in parallel. This explicit parallelism model makes it natural to reason about circuit depth.

## PennyLane (Xanadu)

PennyLane takes a fundamentally different approach: quantum circuits are differentiable functions. This makes it the framework of choice for variational algorithms, quantum machine learning, and any workflow that requires computing gradients of quantum circuits.

**Strengths**:
- Automatic differentiation of quantum circuits (parameter-shift rule, backpropagation)
- Hardware-agnostic: plugins for IBM, Google, Rigetti, Amazon Braket, and more
- Seamless integration with PyTorch, TensorFlow, JAX
- Best framework for variational/hybrid algorithms

**Architecture**: Circuits are defined as Python functions decorated with `@qml.qnode`. The QNode is a differentiable function that can be composed with classical processing and optimized end-to-end.

## PyQuil (Rigetti)

PyQuil is Rigetti's SDK, built around the Quil instruction language. It provides direct access to Rigetti's quantum processors and the Quilc optimizing compiler.

**Strengths**:
- Quil language provides a human-readable IR for quantum programs
- Quilc compiler performs aggressive optimization
- Parametric compilation: compile once, run with different parameters
- QVM provides a fast local simulator

**Architecture**: Programs are built as `Program` objects containing Quil instructions. The Quilc compiler handles gate decomposition and routing for Rigetti hardware.

```{admonition} Which Framework Should I Learn First?
:class: tip
**Qiskit** if you want the most resources, tutorials, and hardware access. **PennyLane** if you are interested in variational algorithms or quantum ML. **Cirq** if you need fine-grained circuit control or work with Google hardware. **PyQuil** if you use Rigetti hardware. All four frameworks share the same underlying concepts; once you learn one, switching is straightforward.
```

## Framework Philosophy Summary

::::{tab-set}

:::{tab-item} Qiskit
```python
# Qiskit: imperative circuit construction
from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

# Qiskit handles transpilation to hardware automatically
# Focus: accessibility, education, full-stack integration
```
:::

:::{tab-item} Cirq
```python
# Cirq: explicit scheduling in Moments
import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit([
    cirq.Moment([cirq.H(q0)]),          # Time step 1
    cirq.Moment([cirq.CNOT(q0, q1)]),   # Time step 2
    cirq.Moment([cirq.measure(q0, q1, key='m')])
])
# Focus: precise control, research, noise modeling
```
:::

:::{tab-item} PennyLane
```python
# PennyLane: differentiable quantum functions
import pennylane as qml

dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def circuit(theta):
    qml.RY(theta, wires=0)
    qml.CNOT(wires=[0, 1])
    return qml.expval(qml.PauliZ(0))

# Compute gradient automatically
grad = qml.grad(circuit)(0.5)
# Focus: differentiability, ML integration, hardware-agnostic
```
:::

:::{tab-item} PyQuil
```python
# PyQuil: Quil instruction language
from pyquil import Program
from pyquil.gates import H, CNOT, MEASURE
from pyquil.quilbase import Declare

p = Program()
ro = p.declare('ro', 'BIT', 2)
p += H(0)
p += CNOT(0, 1)
p += MEASURE(0, ro[0])
p += MEASURE(1, ro[1])
# Focus: Quil IR, parametric compilation, Rigetti hardware
```
:::

::::

## Interoperability

The frameworks are increasingly interoperable:
- **PennyLane plugins**: `pennylane-qiskit`, `pennylane-cirq`, `pennylane-rigetti` let you use PennyLane's autodiff with any backend
- **Amazon Braket SDK**: Provides a unified interface to IBM, IonQ, and Rigetti hardware
- **OpenQASM 3**: Emerging standard intermediate representation that all frameworks can target

## Further Reading

- Qiskit documentation: [docs.quantum.ibm.com](https://docs.quantum.ibm.com/)
- Cirq documentation: [quantumai.google/cirq](https://quantumai.google/cirq)
- PennyLane documentation: [docs.pennylane.ai](https://docs.pennylane.ai/)
- PyQuil documentation: [pyquil-docs.rigetti.com](https://pyquil-docs.rigetti.com/)
- LaRose, R. "Overview and Comparison of Gate Level Quantum Software Platforms." *Quantum* 3, 130 (2019). [arXiv:1807.02500](https://arxiv.org/abs/1807.02500)
