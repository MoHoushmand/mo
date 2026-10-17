# Introduction to Quantum Machine Learning

> The intersection of quantum computing and machine learning. Quantum speedups for ML, quantum-enhanced features, and the current landscape.

Machine learning has transformed how we extract patterns from data. Quantum machine learning (QML) asks a natural follow-up question: can quantum computers learn patterns that classical computers cannot, or learn them faster? The answer depends on the problem, the data, and the specific quantum resources available. This chapter maps the QML landscape and sets the stage for the detailed treatments that follow.

## What is Quantum Machine Learning?

QML sits at the intersection of four quadrants defined by two axes: classical vs. quantum data, and classical vs. quantum processing.

| | Classical Data | Quantum Data |
|---|---|---|
| **Classical Processing** | Traditional ML (sklearn, PyTorch) | Quantum state tomography |
| **Quantum Processing** | Quantum-enhanced ML (this part) | Quantum simulation, error correction |

Most practical QML research today lives in the lower-left quadrant: using quantum processors to accelerate or improve learning on classical datasets. The lower-right quadrant, learning properties of quantum systems, is also an active area with near-term applications in chemistry and materials science.

## Sources of Quantum Advantage

Three properties of quantum mechanics provide potential computational leverage for learning:

**Superposition.** A register of $n$ qubits can represent $2^n$ amplitudes simultaneously. Algorithms like Grover's search exploit this to achieve quadratic speedups over brute-force search, which translates to speedups in unstructured optimization and sampling.

**Entanglement.** Correlations between qubits can exceed anything achievable by classical random variables. Entangled states define kernel functions and feature maps that have no efficient classical description, potentially enabling classifiers that operate in exponentially large Hilbert spaces.

**Interference.** Probability amplitudes can add constructively or destructively. Quantum algorithms steer amplitudes so that correct answers interfere constructively while wrong answers cancel. This mechanism underpins the exponential speedup in Shor's algorithm and the polynomial speedup in Grover's.

```{admonition} Speedup is not automatic
:class: warning
A quantum computer does not automatically speed up every ML task. Speedups depend on problem structure, data encoding costs, and the gap between quantum and classical algorithmic complexity. Several early claims of exponential speedup were later "dequantized" when classical algorithms with similar performance were discovered.
```

## The QML Taxonomy

QML algorithms broadly fall into three generations:

**Fault-tolerant algorithms.** These assume error-corrected quantum computers with thousands of logical qubits. Examples include HHL for linear systems (exponential speedup under specific conditions), quantum PCA, and quantum recommendation systems. These offer the strongest theoretical speedups but require hardware that does not yet exist.

**Variational (hybrid) algorithms.** Designed for noisy intermediate-scale quantum (NISQ) devices, these algorithms use short parameterized quantum circuits optimized by classical feedback loops. Examples include the Variational Quantum Eigensolver (VQE), QAOA, and quantum neural networks. They trade theoretical guarantees for practical executability on current hardware.

**Quantum kernel methods.** These use quantum circuits to compute kernel functions that are then plugged into classical ML pipelines (SVMs, kernel PCA). The quantum circuit defines an implicit feature map into an exponentially large Hilbert space.

## Key Concepts in This Part

The chapters in Part IV build from quantum foundations to practical QML algorithms:

| Chapter | Topic | Key Idea |
|---|---|---|
| {doc}`classical_quantum_prob` | Probability theory | Amplitudes generalize probabilities |
| {doc}`measurements_mixed` | Measurements | POVMs and quantum channels |
| {doc}`evolution_systems` | Time evolution | Hamiltonians drive computation |
| {doc}`many_body` | Many-body systems | Tensor networks and entanglement |
| {doc}`computation` | Computation models | Gate, adiabatic, measurement-based |
| {doc}`gate_model_qc` | Gate model for QML | Parameterized circuits as models |
| {doc}`adiabatic` | Adiabatic computing | Optimization via ground states |
| {doc}`variational_circuits` | Variational circuits | Expressibility and barren plateaus |
| {doc}`hybrid_algorithms` | Hybrid algorithms | VQE, QAOA, quantum neural networks |
| {doc}`kernel_methods` | Kernel methods | Quantum feature maps |
| {doc}`quantum_kernels_svm` | Quantum SVMs | Kernel estimation in practice |
| {doc}`matrix_inversion` | HHL algorithm | Linear systems with exponential speedup |

## The Current Landscape

As of 2026, the QML field is characterized by several trends:

1. **NISQ pragmatism.** Most experimental QML runs on devices with 50-400 noisy qubits. Circuit depth is limited, making variational and kernel methods the dominant paradigms.
2. **Dequantization results.** Tang (2019) and subsequent work showed that some quantum ML speedups (recommendations, PCA) can be partially matched classically when the input has low-rank structure. This sharpened the community's understanding of where quantum advantage truly lies.
3. **Quantum utility demonstrations.** IBM, Google, and others have shown that quantum processors can perform specific computations (random circuit sampling, certain kernel evaluations) faster than known classical methods.
4. **Classical-quantum convergence.** Techniques from quantum information (tensor networks, entanglement measures) are improving classical ML, while classical ML techniques (gradient descent, neural architecture search) are improving quantum algorithm design.

```{tip}
If you are new to quantum computing, start with {doc}`classical_quantum_prob` and work through the foundation chapters sequentially. If you already have a quantum computing background, you can skip directly to {doc}`variational_circuits` or {doc}`kernel_methods`.
```

## Further Reading

- Schuld, M. and Petruccione, F. *Machine Learning with Quantum Computers* (Springer, 2021)
- Biamonte, J. et al. "Quantum machine learning." *Nature* 549, 195-202 (2017)
- Cerezo, M. et al. "Variational quantum algorithms." *Nature Reviews Physics* 3, 625-644 (2021)
- Tang, E. "A quantum-inspired classical algorithm for recommendation systems." *STOC 2019*
