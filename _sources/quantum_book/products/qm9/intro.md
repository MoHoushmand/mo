# Qm9: Quantum Finance Platform

> Quantum-enhanced high-frequency trading, portfolio optimization, and risk assessment. Leveraging quantum algorithms for financial advantage.

Qm9 applies quantum computing to quantitative finance, targeting three domains where quantum algorithms offer theoretical or near-term practical advantage: combinatorial portfolio optimization, Monte Carlo risk estimation, and low-latency trading signal generation.

## Why Quantum Finance?

Financial problems are among the most promising near-term applications of quantum computing:

| Problem | Classical Complexity | Quantum Advantage | Algorithm |
|---|---|---|---|
| Portfolio optimization (N assets) | $O(2^N)$ exact, polynomial approx. | Quadratic speedup for QUBO | QAOA, VQE |
| Monte Carlo (VaR, pricing) | $O(1/\epsilon^2)$ samples | $O(1/\epsilon)$ via amplitude estimation | QAE |
| Option pricing | Polynomial but slow for exotics | Quadratic speedup | Quantum Monte Carlo |
| Credit risk | Exponential in portfolio size | Polynomial with quantum walks | Grover-based search |

```{admonition} Near-Term vs. Fault-Tolerant
:class: note
Most quantum finance algorithms require fault-tolerant quantum computers for a genuine advantage over classical methods. Qm9's near-term strategy focuses on hybrid variational algorithms (QAOA, VQE) that can run on NISQ hardware with 50-200 qubits, supplemented by classical post-processing.
```

## Platform Architecture

```
Market Data Feeds (Bloomberg, Refinitiv)
        │
        ▼
┌──────────────────────┐
│   Classical Engine    │ ◄── Low-latency signal processing
│   (Rust + FPGA)      │     Order management, risk limits
├──────────────────────┤
│   Quantum Engine     │ ◄── Portfolio rebalancing (QAOA)
│   (Qiskit Runtime)   │     Risk estimation (QAE)
├──────────────────────┤
│   Zipminator Layer   │ ◄── PQC-encrypted communications
│   (ML-KEM-768)       │     Quantum entropy for simulations
└──────────────────────┘
```

## Core Capabilities

### Portfolio Optimization
Map Markowitz mean-variance optimization to a QUBO (Quadratic Unconstrained Binary Optimization) and solve with QAOA on quantum hardware. See {doc}`portfolio_optimization`.

### Risk Assessment
Quantum amplitude estimation for Value-at-Risk (VaR) and Conditional VaR (CVaR) with quadratic speedup over classical Monte Carlo. See {doc}`risk_assessment`.

### HFT Architecture
Ultra-low-latency quantum-classical hybrid trading with FPGA acceleration and quantum coprocessors for real-time portfolio rebalancing. See {doc}`hft_architecture`.

## Further Reading

- Orus, R. et al. (2019). "Quantum computing for finance: Overview and prospects." *Reviews in Physics*, 4, 100028.
- Egger, D.J. et al. (2020). "Quantum computing for finance: State-of-the-art and future prospects." *IEEE Transactions on Quantum Engineering*.
- {doc}`/quantum_book/foundations/qc/vqe` -- The VQE algorithm used in portfolio optimization
- {doc}`/quantum_book/foundations/qml/optimization_ensemble` -- QAOA for combinatorial optimization
