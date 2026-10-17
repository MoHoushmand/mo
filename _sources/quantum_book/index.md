# QDaria Quantum Book

> A comprehensive educational resource covering quantum mechanics, quantum computing, quantum machine learning, post-quantum cryptography, and their real-world applications across the QDaria product ecosystem.

---

## What You'll Learn

::::{grid} 2 2 3 3
:gutter: 3

:::{grid-item-card} Quantum Mechanics
:link: foundations/qm/intro
:link-type: doc
From wave-particle duality to density matrices. Build physical intuition for quantum phenomena.
:::

:::{grid-item-card} Quantum Computation
:link: foundations/qc/intro
:link-type: doc
Gate model, algorithms (Shor, Grover, VQE), error correction, and multi-framework programming.
:::

:::{grid-item-card} Quantum Hardware
:link: foundations/hw/intro
:link-type: doc
Superconducting qubits, trapped ions, photonics, topological approaches, and the DiVincenzo criteria.
:::

:::{grid-item-card} Quantum ML
:link: foundations/qml/intro
:link-type: doc
Variational circuits, quantum kernels, hybrid algorithms, and quantum-enhanced optimization.
:::

:::{grid-item-card} Post-Quantum Crypto
:link: foundations/pqc/intro
:link-type: doc
NIST FIPS 203/204/205, lattice cryptography, QRNG, and the quantum threat timeline.
:::

:::{grid-item-card} Interactive Notebooks
:link: notebooks/01_quickstart
:link-type: doc
15 hands-on Jupyter notebooks with Colab launch buttons. Learn by doing.
:::
::::

---

## QDaria Products

::::{grid} 2 2 3 5
:gutter: 2

:::{grid-item-card} Zipminator
:link: products/zipminator/overview
:link-type: doc
PQC encryption infrastructure
:::

:::{grid-item-card} Qm9
:link: products/qm9/intro
:link-type: doc
Quantum finance & HFT
:::

:::{grid-item-card} QDiana
:link: products/qdiana/intro
:link-type: doc
Education & ESG certification
:::

:::{grid-item-card} QMikeAI
:link: products/qmikeai/intro
:link-type: doc
Quantum HPC/CFD research
:::

:::{grid-item-card} THQAI
:link: products/thqai/intro
:link-type: doc
Quantum LLM & artifacts
:::
::::

---

## Framework Coverage

All code examples are provided in four quantum computing frameworks:

| Framework | Provider | Strengths |
|-----------|----------|-----------|
| **Qiskit** | IBM | Largest ecosystem, real hardware access |
| **Cirq** | Google | Low-level control, Sycamore access |
| **PennyLane** | Xanadu | ML integration, autodiff |
| **PyQuil** | Rigetti | Quilc compiler, forest SDK |

Q# (Microsoft) is included where topological quantum computing is discussed.

---

## How to Use This Book

1. **Foundations first**: Parts I-V build conceptual understanding
2. **Products**: Parts VI-X show real-world applications
3. **Notebooks**: Part XI provides hands-on practice with Colab buttons
4. **Appendix**: Reference material, glossary, and curated resources

```{admonition} Prerequisites
:class: tip
Basic linear algebra (vectors, matrices, eigenvalues) and Python programming. No prior quantum knowledge required.
```
