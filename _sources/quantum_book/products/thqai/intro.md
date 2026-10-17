# THQAI: Quantum AI Platform

> Quantum-enhanced large language models and quantum artifact generation. Building the "v0.dev of quantum computing."

THQAI (Therese-Helen Quantum AI) explores the intersection of quantum computing and generative AI. The platform has two research directions: quantum-enhanced LLMs that leverage quantum circuits for attention and inference, and quantum artifact generation where natural language prompts produce executable quantum circuits.

## Vision

Today, tools like v0.dev generate React components from natural language. THQAI aims to do the same for quantum computing: describe a quantum algorithm in English, and receive a working circuit implementation across multiple frameworks.

```
"Implement Grover's search for 3 marked items in a 16-element database"
                    │
                    ▼
            ┌──────────────┐
            │   THQAI      │
            │   Engine     │
            └──────┬───────┘
                   │
    ┌──────────────┼──────────────┐
    ▼              ▼              ▼
  Qiskit        Cirq         PennyLane
  circuit       circuit       circuit
  (runnable)    (runnable)    (runnable)
```

## Research Directions

| Direction | Maturity | Key Challenge |
|---|---|---|
| Quantum circuit generation from NL | Proof of concept | Circuit correctness verification |
| Quantum-enhanced attention | Theoretical | QPU latency vs. attention speedup |
| Quantum feature encoding for NLP | Early research | Encoding word embeddings efficiently |
| Quantum error correction code design | Promising | Large search space for optimal codes |

```{admonition} Research Stage
:class: note
THQAI is in the research and prototyping phase. The quantum-enhanced LLM direction requires fault-tolerant quantum hardware that does not yet exist. The quantum artifact generation direction is closer to practical deployment, leveraging classical LLMs with quantum domain knowledge.
```

## Further Reading

- {doc}`quantum_llm` -- Quantum-enhanced transformer architectures
- {doc}`quantum_artifacts` -- Natural language to quantum circuit compilation
- {doc}`/quantum_book/foundations/qml/intro` -- The QML foundations THQAI builds on
