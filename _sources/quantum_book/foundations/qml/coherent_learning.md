# Coherent Quantum Learning

> Learning algorithms that maintain coherence throughout computation. Quantum reservoir computing and echo state networks.

Most variational QML algorithms break coherence at every optimization step: the circuit runs, measurements collapse the state, results are processed classically, and new parameters are fed back. Coherent quantum learning explores algorithms where the quantum state remains coherent throughout the learning process, potentially accessing computational advantages that measurement-based approaches cannot.

## Coherent vs. Variational Approaches

| Property | Variational (Hybrid) | Coherent |
|---|---|---|
| Measurement | Every iteration | Only at the end |
| Classical feedback | Required for optimization | Minimal or none |
| Circuit depth | Shallow (NISQ-friendly) | Potentially deep |
| Hardware requirement | NISQ | Fault-tolerant (usually) |
| Quantum resources | Limited by decoherence | Requires long coherence times |

Coherent algorithms exploit quantum effects (interference, entanglement) throughout the entire computation, not just within short circuit bursts. The tradeoff is that they typically require fault-tolerant hardware with long coherence times.

## Quantum Reservoir Computing

Reservoir computing is a machine learning framework where a fixed, complex dynamical system (the reservoir) maps inputs to a high-dimensional space, and only a simple readout layer is trained. The reservoir itself is never trained, which avoids the optimization challenges of deep networks.

### Classical Reservoir Computing

In a classical echo state network, the reservoir is a recurrent neural network with fixed random weights. An input $\mathbf{u}(t)$ drives the reservoir state:

$$\mathbf{x}(t+1) = f(W_{\text{in}}\, \mathbf{u}(t) + W\, \mathbf{x}(t))$$

where $W_{\text{in}}$ is a fixed input weight matrix, $W$ is the fixed reservoir weight matrix, and $f$ is a nonlinear activation. Only the output weights $W_{\text{out}}$ are trained:

$$\mathbf{y}(t) = W_{\text{out}}\, \mathbf{x}(t)$$

### Quantum Reservoirs

A quantum reservoir replaces the classical dynamical system with a quantum system. The input is encoded into the Hamiltonian or initial state, the system evolves under its natural dynamics, and measurements of local observables serve as features for a classical readout.

**Advantages of quantum reservoirs:**

- The Hilbert space dimension grows exponentially with system size, providing an exponentially large feature space.
- Quantum dynamics are inherently nonlinear (due to the Born rule) and can generate complex temporal correlations.
- The reservoir does not need to be precisely controlled; its natural dynamics suffice.

**Implementation approaches:**

1. **Spin chains**: A chain of coupled qubits driven by input-dependent perturbations. Observables (local magnetizations) are measured as features.
2. **Photonic systems**: Optical cavities or waveguide networks where input modulates the system parameters.
3. **Superconducting circuits**: Arrays of coupled transmon qubits driven by microwave pulses.

```{admonition} No training of the quantum system
:class: important
The defining feature of reservoir computing is that the reservoir (quantum system) is never trained. Only the classical readout layer is optimized, typically via linear regression. This sidesteps the barren plateau problem entirely, since the quantum parameters are fixed.
```

## Quantum Echo State Properties

For a quantum reservoir to be useful, it must satisfy analogs of the echo state property:

- **Fading memory**: The reservoir state must depend primarily on recent inputs, not on the distant past. In quantum systems, this is related to the mixing time of the dynamics.
- **Separation property**: Different input sequences must produce distinguishable reservoir states. The exponential dimension of the Hilbert space helps here.
- **Computational universality**: With a sufficiently rich reservoir, any input-output mapping can be approximated by tuning only the readout weights.

## Quantum Extreme Learning Machines

A related approach is the quantum extreme learning machine (QELM), where a random quantum circuit serves as a fixed feature map:

1. Encode input $\mathbf{x}$ into a quantum state.
2. Apply a fixed random circuit $U$.
3. Measure multiple observables to obtain a feature vector.
4. Train a classical linear model on the features.

QELMs are simpler than reservoir computing (no temporal dynamics) but share the advantage of avoiding quantum parameter optimization.

## Coherent Quantum Perceptron

The quantum perceptron applies a non-linear activation function coherently, without measurement. Unlike classical neurons that apply $\sigma(w^T x + b)$ element-wise, a quantum perceptron must implement non-linearity within the unitary framework.

Approaches include:
- **Repeat-until-success circuits**: Use ancilla measurements and conditioned operations to implement non-linear transformations while keeping the target register coherent.
- **Quantum signal processing**: Polynomial transformations of eigenvalues can be implemented coherently, enabling non-linear functions like sign, step, and smooth approximations.

## Applications

| Application | Method | Advantage |
|---|---|---|
| Time series prediction | Quantum reservoir | Exponential feature space, natural temporal processing |
| Chaotic system modeling | Quantum reservoir | Rich dynamics match chaotic inputs |
| Classification | QELM | No barren plateaus, simple training |
| Sequence modeling | Quantum reservoir | Fading memory with quantum correlations |
| Function approximation | Coherent perceptron | Fully quantum pipeline for deep networks |

## Challenges

1. **Coherence time**: Maintaining coherence for the duration of the computation is the primary experimental challenge. Current NISQ devices have limited coherence, favoring variational approaches.
2. **Readout overhead**: Measuring many observables to construct the feature vector requires many circuit repetitions, partially negating the advantage of fixing the quantum parameters.
3. **Theoretical guarantees**: The theory of quantum reservoir computing is less developed than its classical counterpart. Conditions for universal approximation and optimal reservoir design are active research areas.
4. **Input encoding**: Sequential inputs must be injected into the quantum system over time, which complicates the circuit design and may introduce noise.

## Further Reading

- Fujii, K. and Nakajima, K. "Harnessing disordered-ensemble quantum dynamics for machine learning." *Physical Review Applied* 8, 024030 (2017)
- Chen, J., Nurdin, H.I., and Yamamoto, N. "Temporal information processing on noisy quantum computers." *Physical Review Applied* 14, 024065 (2020)
- Mujal, P. et al. "Opportunities in quantum reservoir computing and extreme quantum machine learning." *Advanced Quantum Technologies* 4, 2100027 (2021)
- Ghosh, S. et al. "Quantum reservoir processing." *npj Quantum Information* 5, 35 (2019)
