# Quantum LLM

> Quantum-enhanced transformer architectures, quantum attention mechanisms, and quantum-classical hybrid training for language models.

## Motivation

Large language models are bottlenecked by the attention mechanism, which scales as $O(n^2)$ in sequence length. Quantum computing offers two potential improvements:

1. **Quantum attention**: Using quantum circuits to compute attention weights with reduced complexity
2. **Quantum sampling**: Leveraging quantum parallelism for beam search and token sampling
3. **Quantum embeddings**: Encoding token representations in quantum states for richer feature spaces

## Quantum Attention Mechanism

Classical self-attention computes:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

The $QK^T$ matrix multiplication is the computational bottleneck. A quantum attention mechanism encodes queries and keys as quantum states and uses swap tests or inner product estimation to compute similarities:

$$|\langle q_i | k_j \rangle|^2 \approx \text{Attention}_{ij}$$

### Theoretical Complexity

| Operation | Classical | Quantum (theoretical) |
|---|---|---|
| Attention matrix | $O(n^2 d)$ | $O(n \cdot \text{poly}(d))$ with QRAM |
| Softmax normalization | $O(n^2)$ | $O(n \log n)$ via quantum sorting |
| Value aggregation | $O(n^2 d)$ | $O(n \cdot d)$ with quantum addressing |

```{admonition} QRAM Dependency
:class: warning
Most quantum speedups for attention require quantum random access memory (QRAM), which does not exist at scale. Without QRAM, data loading dominates and erases the quantum advantage. This is the fundamental bottleneck for quantum LLMs.
```

## Hybrid Training

A more near-term approach uses quantum circuits for specific components within an otherwise classical transformer:

1. **Quantum embedding layer**: Encode input tokens using parameterized quantum circuits
2. **Classical transformer layers**: Standard attention and feedforward blocks
3. **Quantum output layer**: Quantum sampling for token generation

This hybrid approach can run on current NISQ hardware for small-scale experiments, though it does not yet offer advantages over fully classical models.

## Open Questions

- Can quantum attention achieve practical speedup without QRAM?
- Do quantum embeddings capture linguistic structure better than classical embeddings?
- What is the minimum quantum hardware requirement for a useful quantum LLM component?
- Can quantum sampling improve the diversity/quality trade-off in text generation?

## Further Reading

- Cherrat, E.A. et al. (2024). "Quantum transformers: A theoretical framework." *arXiv:2312.08550*.
- {doc}`/quantum_book/foundations/qml/variational_circuits` -- Parameterized circuits for hybrid models
- {doc}`/quantum_book/foundations/qml/kernel_methods` -- Quantum feature maps for embeddings
