# Quantum Graphical Models

> Quantum Boltzmann machines, quantum Markov random fields, and quantum belief propagation.

Graphical models represent probability distributions as graphs, where nodes are random variables and edges encode dependencies. Quantum graphical models replace classical probability distributions with quantum states and classical energy functions with Hamiltonians. The resulting models can represent correlations that are impossible in classical graphical models, potentially offering richer generative and discriminative capabilities.

## Classical Boltzmann Machines

A Boltzmann machine defines a probability distribution over binary vectors $\mathbf{v}$ via the Gibbs distribution:

$$p(\mathbf{v}) = \frac{1}{Z}\exp\left(-E(\mathbf{v})\right), \quad E(\mathbf{v}) = -\sum_{i<j} w_{ij} v_i v_j - \sum_i b_i v_i$$

where $Z = \sum_{\mathbf{v}} \exp(-E(\mathbf{v}))$ is the partition function. Training adjusts weights $w_{ij}$ and biases $b_i$ to maximize the likelihood of the training data.

The challenge is computing gradients, which require sampling from the model distribution. Classical approaches use Gibbs sampling (contrastive divergence), which can be slow for complex distributions.

## Quantum Boltzmann Machines

A Quantum Boltzmann Machine (QBM) replaces the classical energy function with a Hamiltonian:

$$\rho_{\text{QBM}} = \frac{e^{-H}}{Z}, \quad Z = \text{Tr}(e^{-H})$$

where $H$ is a parameterized Hamiltonian, typically of the transverse-field Ising form:

$$H = -\sum_{i<j} w_{ij} \sigma_i^z \sigma_j^z - \sum_i b_i \sigma_i^z - \sum_i \Gamma_i \sigma_i^x$$

The transverse-field terms $\sigma_i^x$ introduce quantum effects (superposition, tunneling) that are absent in classical Boltzmann machines. The thermal state $\rho_{\text{QBM}}$ is a mixed state that generalizes the classical Gibbs distribution.

### Training

Training a QBM requires computing the gradient of the log-likelihood:

$$\frac{\partial \mathcal{L}}{\partial w_{ij}} = \langle \sigma_i^z \sigma_j^z \rangle_{\text{data}} - \langle \sigma_i^z \sigma_j^z \rangle_{\text{model}}$$

The "data" expectation clamps visible units to training data. The "model" expectation samples from the free-running QBM. Computing these expectations requires:

- **Quantum Gibbs sampling**: Preparing the thermal state $e^{-H}/Z$ on a quantum computer. This is a non-trivial task; algorithms exist but require fault-tolerant hardware.
- **Quantum annealing**: D-Wave hardware can approximately sample from transverse-field Ising models, providing a heuristic approach.
- **Variational methods**: Use a parameterized circuit to approximate the thermal state.

```{admonition} Quantum advantage in Boltzmann machines
:class: note
The transverse field terms in a QBM enable quantum tunneling between local minima, potentially allowing the model to explore the energy landscape more efficiently than classical Gibbs sampling. Whether this translates to faster training or better generalization on practical datasets is an active research question.
```

## Restricted Quantum Boltzmann Machines

Restricted Boltzmann machines (RBMs) limit connections to bipartite graphs: visible units connect only to hidden units. The quantum analog, Restricted QBMs, maintains this structure but adds transverse-field terms:

$$H = -\sum_{i,j} w_{ij} \sigma_i^z \sigma_j^z - \sum_i b_i^v \sigma_i^z - \sum_j b_j^h \sigma_j^z - \Gamma \sum_k \sigma_k^x$$

The bipartite structure simplifies inference and training, as in the classical case.

### Comparison

| Property | Classical RBM | Quantum RBM |
|---|---|---|
| State space | Binary vectors | Density matrices |
| Energy function | $E(\mathbf{v}, \mathbf{h})$ | Hamiltonian $H$ |
| Sampling | Gibbs sampling | Quantum Gibbs sampling |
| Correlations | Classical only | Quantum + classical |
| Training | Contrastive divergence | Quantum-enhanced CD |
| Expressiveness | Universal (with enough hidden units) | Potentially more efficient |

## Quantum Markov Random Fields

A Markov random field (MRF) factorizes a distribution according to the cliques of an undirected graph. The quantum generalization replaces the distribution with a quantum state and the factorization with a tensor product structure.

A quantum MRF on a graph $G$ is a state $\rho$ satisfying quantum Markov conditions: for any partition $A$-$B$-$C$ where $B$ separates $A$ from $C$, the quantum conditional mutual information vanishes:

$$I(A:C|B)_\rho = S(AB) + S(BC) - S(B) - S(ABC) = 0$$

The Hammersley-Clifford theorem has quantum analogs: under certain conditions, quantum Gibbs states of local Hamiltonians satisfy these Markov properties.

## Quantum Belief Propagation

Belief propagation is a message-passing algorithm for inference in graphical models. Quantum belief propagation extends this to quantum systems:

1. Messages are operators (density matrices) rather than probability vectors.
2. Message updates involve partial traces and operator products.
3. Convergence guarantees are weaker than in the classical case.

Quantum belief propagation is primarily used in condensed-matter physics to approximate properties of quantum many-body systems (e.g., ground states of 1D Hamiltonians). Its application to QML is nascent but promising for inference in quantum generative models.

## Applications to QML

| Application | Quantum Graphical Model | Advantage |
|---|---|---|
| Generative modeling | QBM | Richer correlations, quantum tunneling |
| Feature learning | Restricted QBM | Efficient unsupervised pre-training |
| Density estimation | Quantum MRF | Quantum conditional independence |
| Combinatorial optimization | QBM sampling | Tunneling past local minima |
| Anomaly detection | QBM likelihood | Sensitivity to quantum correlations |

## Further Reading

- Amin, M.H. et al. "Quantum Boltzmann machine." *Physical Review X* 8, 021050 (2018)
- Kieferova, M. and Wiebe, N. "Tomography and generative training with quantum Boltzmann machines." *Physical Review A* 96, 062327 (2017)
- Wiebe, N. et al. "Quantum deep learning." *Quantum Information and Computation* 16, 0541 (2016)
- Leifer, M. and Poulin, D. "Quantum graphical models and belief propagation." *Annals of Physics* 323, 1899-1946 (2008)
