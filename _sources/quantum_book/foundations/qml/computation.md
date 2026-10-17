# Quantum Models of Computation

> Gate model, adiabatic, measurement-based, and topological models. Equivalences and how each maps to ML workloads.

Several distinct models of quantum computation exist, each offering a different perspective on how quantum resources can be harnessed. All are computationally equivalent in the sense that they can simulate each other with at most polynomial overhead. For quantum machine learning, the gate model and adiabatic model are most directly relevant, but measurement-based and topological models offer conceptual insights that inform circuit design.

## The Gate Model

The gate model (also called the circuit model) is the most widely used framework for quantum computing. A computation proceeds in three stages:

1. **Initialization.** All qubits start in $|0\rangle$.
2. **Gate application.** A sequence of unitary gates acts on the qubits. Each gate operates on one or two qubits.
3. **Measurement.** Some or all qubits are measured in the computational basis.

The gate set must be **universal**: capable of approximating any unitary to arbitrary precision. A common universal set is $\{H, T, \text{CNOT}\}$, where $H$ is the Hadamard gate and $T$ is the $\pi/8$ phase gate. The Solovay-Kitaev theorem guarantees that any single-qubit gate can be approximated to precision $\epsilon$ using $O(\log^c(1/\epsilon))$ gates from a finite set.

In practice, continuous rotation gates $R_x(\theta), R_y(\theta), R_z(\theta)$ are used directly, since physical qubit control allows continuous parameter tuning. This is precisely what makes parameterized circuits natural for variational QML.

| Property | Gate Model |
|---|---|
| Elementary operations | Unitary gates on 1-2 qubits |
| Control flow | Fixed circuit layout (no branching) |
| Universality | Solovay-Kitaev theorem |
| ML mapping | Parameterized circuits as function approximators |

## Adiabatic Quantum Computing

Adiabatic quantum computing (AQC) encodes the solution to a problem in the ground state of a Hamiltonian $H_1$. The computation proceeds by:

1. Preparing the ground state of a simple Hamiltonian $H_0$ (typically $H_0 = -\sum_i \sigma_x^i$, whose ground state is the uniform superposition).
2. Slowly interpolating: $H(t) = (1 - t/T) H_0 + (t/T) H_1$.
3. The adiabatic theorem guarantees that if the interpolation is slow enough (relative to the minimum energy gap), the system remains in the ground state throughout.

The runtime is $T = O(1/\Delta^2_{\min})$, where $\Delta_{\min}$ is the minimum spectral gap during the evolution.

AQC is polynomially equivalent to the gate model. The Quantum Approximate Optimization Algorithm (QAOA) serves as a bridge: it discretizes the adiabatic path into alternating layers of $e^{-i\beta H_0}$ and $e^{-i\gamma H_1}$ operators that can be implemented as gate sequences.

```{admonition} Quantum annealing vs. AQC
:class: note
Quantum annealing (as implemented by D-Wave) is related to AQC but operates at finite temperature and does not guarantee adiabatic evolution. It is a heuristic approach that works well for certain optimization problems but lacks the formal guarantees of AQC.
```

## Measurement-Based Quantum Computing

Measurement-based quantum computing (MBQC), also called the one-way model, takes a radically different approach:

1. Prepare a highly entangled **cluster state** (a specific multi-qubit entangled state on a lattice).
2. Perform single-qubit measurements in adaptively chosen bases.
3. The choice of measurement bases and the use of classical feedforward implement the desired computation.

No multi-qubit gates are applied during the computation; all entanglement is "pre-baked" into the cluster state. The computation is driven entirely by measurements and classical processing.

MBQC is equivalent to the gate model. Its relevance to QML is primarily conceptual: it shows that entanglement is a consumable resource, and measurement adaptivity can substitute for gate depth.

| Property | Measurement-Based |
|---|---|
| Elementary operations | Single-qubit measurements |
| Entanglement | Pre-prepared cluster state |
| Control flow | Classical feedforward based on outcomes |
| ML mapping | Entanglement as a resource for feature extraction |

## Topological Quantum Computing

Topological quantum computing encodes information in the braiding of non-abelian anyons (quasiparticles in 2D systems). The key advantage is inherent error protection: the encoded information is immune to local perturbations because it depends only on the topology of the braiding pattern, not on geometric details.

This model is primarily of theoretical interest for QML: no large-scale topological quantum computer exists. However, topological error correction codes (such as the surface code) are the leading approach to building fault-tolerant quantum computers, which would eventually run the algorithms discussed in later chapters.

## Equivalences

All four models are polynomially equivalent:

```
Gate Model  ⟺  Adiabatic  ⟺  Measurement-Based  ⟺  Topological
```

This means a problem solvable in polynomial time in one model is solvable in polynomial time in all. The practical differences are in:

- **Hardware requirements**: different physical platforms naturally implement different models.
- **Circuit depth vs. width tradeoffs**: MBQC uses more qubits but no multi-qubit gates during computation.
- **Noise resilience**: topological computing has inherent error protection; gate-model computing requires active error correction.

## Mapping to ML Workloads

| ML Task | Gate Model | Adiabatic | MBQC |
|---|---|---|---|
| Classification | Parameterized circuits, kernel estimation | Ising encoding of objective | Cluster state + adaptive measurement |
| Optimization | QAOA, VQE | Natural formulation | Less explored |
| Generative modeling | Born machines, QGANs | Thermal sampling | Less explored |
| Feature extraction | Quantum feature maps | Ground state properties | Entanglement structure |

For the remainder of Part IV, we focus on the gate model and its hybrid extensions, as these are the basis for most practical QML algorithms. The adiabatic model enters through QAOA, covered in {doc}`adiabatic` and {doc}`optimization_ensemble`.

## Further Reading

- Aharonov, D. et al. "Adiabatic quantum computation is equivalent to standard quantum computation." *SIAM Journal on Computing* 37(1), 166-194 (2007)
- Raussendorf, R. and Briegel, H.J. "A one-way quantum computer." *Physical Review Letters* 86, 5188 (2001)
- Nayak, C. et al. "Non-Abelian anyons and topological quantum computation." *Reviews of Modern Physics* 80, 1083 (2008)
- Fingerhuth, M., Babej, T., and Wittek, P. "Open source software in quantum computing." *PLOS ONE* 13(12), e0208561 (2018)
