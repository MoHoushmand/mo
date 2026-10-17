# Awesome Quantum Resources

> Curated list of quantum computing tools, libraries, simulators, and learning resources.

## Quantum Computing Frameworks

| Framework | Language | Provider | Best For |
|---|---|---|---|
| [Qiskit](https://github.com/Qiskit/qiskit) | Python | IBM | Largest ecosystem, real hardware access |
| [Cirq](https://github.com/quantumlib/Cirq) | Python | Google | Low-level control, noise modeling |
| [PennyLane](https://github.com/PennyLaneAI/pennylane) | Python | Xanadu | ML integration, autodiff |
| [PyQuil](https://github.com/rigetti/pyquil) | Python | Rigetti | Quilc compiler, Quil language |
| [Q#](https://github.com/microsoft/qsharp) | Q#/Python | Microsoft | Topological simulation, resource estimation |
| [Amazon Braket SDK](https://github.com/amazon-braket/amazon-braket-sdk-python) | Python | AWS | Multi-backend access |
| [Stim](https://github.com/quantumlib/Stim) | Python/C++ | Google | Clifford circuit simulation, QEC |
| [cuQuantum](https://developer.nvidia.com/cuquantum-sdk) | Python/C++ | NVIDIA | GPU-accelerated simulation |

## Simulators

| Simulator | Type | Max Qubits | Notes |
|---|---|---|---|
| [Qiskit Aer](https://github.com/Qiskit/qiskit-aer) | Statevector, density matrix, MPS | ~30 (SV), 100+ (MPS) | GPU support |
| [Cirq Simulator](https://quantumai.google/cirq) | Statevector, density matrix | ~30 | Noise model support |
| [PennyLane default.qubit](https://pennylane.ai/) | Statevector | ~25 | Autodiff through simulation |
| [QuEST](https://github.com/QuEST-Kit/QuEST) | Statevector, distributed | 38+ (distributed) | MPI-parallel |
| [qsim](https://github.com/quantumlib/qsim) | Statevector | 40 (GPU) | Google's fast simulator |
| [MQT DDSIM](https://github.com/cda-tum/mqt-ddsim) | Decision diagram | 100+ (for specific circuits) | Memory-efficient |

## Quantum Chemistry

| Library | Focus | Integration |
|---|---|---|
| [Qiskit Nature](https://github.com/qiskit-community/qiskit-nature) | VQE, molecular simulation | Qiskit |
| [PennyLane-QChem](https://pennylane.ai/qml/demos_quantum-chemistry.html) | Quantum chemistry | PennyLane |
| [OpenFermion](https://github.com/quantumlib/OpenFermion) | Fermion-to-qubit mapping | Cirq, Qiskit |
| [PySCF](https://github.com/pyscf/pyscf) | Classical quantum chemistry | All (via integrals) |

## Quantum Machine Learning

| Library | Focus |
|---|---|
| [PennyLane](https://pennylane.ai/) | QML with PyTorch/TensorFlow integration |
| [Qiskit Machine Learning](https://github.com/qiskit-community/qiskit-machine-learning) | Quantum kernels, QNNs |
| [TensorFlow Quantum](https://www.tensorflow.org/quantum) | Hybrid quantum-classical ML |
| [TorchQuantum](https://github.com/mit-han-lab/torchquantum) | PyTorch-based QML |

## Error Correction

| Tool | Purpose |
|---|---|
| [Stim](https://github.com/quantumlib/Stim) | Fast Clifford simulation, decoder benchmarking |
| [PyMatching](https://github.com/oscarhiggott/PyMatching) | Minimum-weight perfect matching decoder |
| [LDPC](https://github.com/quantumgizmos/ldpc) | LDPC and quantum LDPC code tools |

## Post-Quantum Cryptography

| Library | Language | Algorithms |
|---|---|---|
| [liboqs](https://github.com/open-quantum-safe/liboqs) | C | ML-KEM, ML-DSA, SLH-DSA |
| [oqs-provider](https://github.com/open-quantum-safe/oqs-provider) | C | OpenSSL 3.x PQC provider |
| [pqcrypto](https://crates.io/crates/pqcrypto) | Rust | All NIST PQC algorithms |
| [Bouncy Castle](https://www.bouncycastle.org/) | Java/C# | ML-KEM, ML-DSA, SLH-DSA |
| [PQClean](https://github.com/PQClean/PQClean) | C | Reference implementations |
| [Zipminator](https://github.com/QDaria/zipminator) | Rust/Python | ML-KEM-768 with QRNG |

## Physics Simulation

| Library | Focus |
|---|---|
| [QuTiP](https://github.com/qutip/qutip) | Open quantum systems, master equations |
| [Kwant](https://kwant-project.org/) | Quantum transport simulations |
| [Strawberry Fields](https://github.com/XanaduAI/strawberryfields) | Photonic quantum computing |
| [NetKet](https://github.com/netket/netket) | Neural network quantum states |

## Learning Resources

### Textbooks
- Nielsen, M.A. and Chuang, I.L. *Quantum Computation and Quantum Information* (the "bible" of QC)
- Schuld, M. and Petruccione, F. *Machine Learning with Quantum Computers*
- Hidary, J.D. *Quantum Computing: An Applied Approach*
- Bernstein, D.J. and Lange, T. *Post-Quantum Cryptography* (Springer)

### Online Courses
- [IBM Quantum Learning](https://learning.quantum.ibm.com/)
- [Qiskit Textbook](https://github.com/Qiskit/textbook)
- [PennyLane QML Demos](https://pennylane.ai/qml/)
- [Brilliant.org Quantum Computing](https://brilliant.org/courses/quantum-computing/)

### Communities
- [Quantum Computing Stack Exchange](https://quantumcomputing.stackexchange.com/)
- [Qiskit Slack](https://qisk.it/join-slack)
- [Unitary Fund Discord](https://discord.unitary.fund/)
- [PennyLane Forum](https://discuss.pennylane.ai/)
