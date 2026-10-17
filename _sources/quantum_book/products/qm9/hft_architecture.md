# HFT Architecture

> Low-latency quantum-classical hybrid architecture for high-frequency trading. FPGA integration, quantum coprocessors, and market microstructure.

## Design Principles

High-frequency trading demands sub-microsecond decision making for order placement, combined with complex optimization for portfolio rebalancing. Qm9's architecture separates these into two execution paths:

**Hot path** (microseconds): Classical FPGA-based order execution, market data parsing, and risk limit checks. No quantum computation; latency is paramount.

**Warm path** (milliseconds to seconds): Quantum-enhanced portfolio rebalancing, correlation analysis, and strategy optimization. QAOA/VQE runs between trading intervals.

```
                    ┌──────────────────────────┐
Market Data ──────►│   FPGA Signal Engine      │──────► Exchange
  (< 1 μs)         │   Order Management        │  (< 10 μs)
                    │   Risk Limits             │
                    └──────────┬───────────────┘
                               │ (async, 10-100 ms)
                    ┌──────────▼───────────────┐
                    │   Quantum Engine          │
                    │   Portfolio rebalance     │
                    │   Correlation update      │
                    │   Strategy optimization   │
                    └──────────┬───────────────┘
                               │
                    ┌──────────▼───────────────┐
                    │   Zipminator PQC Layer    │
                    │   Encrypted comms + QRNG  │
                    └──────────────────────────┘
```

## Quantum Coprocessor Model

The quantum engine operates as a coprocessor, similar to how GPUs accelerate specific workloads:

| Component | Role | Latency |
|---|---|---|
| Classical CPU | Strategy logic, risk management | ~100 ns |
| FPGA | Market data parsing, order routing | ~1 $\mu$s |
| QPU (remote) | Portfolio optimization (QAOA) | ~100 ms |
| QPU (future on-prem) | Real-time optimization | ~1 ms (target) |

Current quantum hardware access is cloud-based (100+ ms round trip), making it suitable only for warm-path optimization. On-premises quantum coprocessors would reduce this to milliseconds.

## Security Layer

All trading communications are secured with Zipminator's ML-KEM-768:

- Order routing: PQC-encrypted connections to exchanges
- Strategy parameters: Encrypted at rest with quantum-seeded keys
- Inter-node communication: PQC VPN between trading nodes
- Random number generation: QRNG for Monte Carlo simulations and order ID generation

## Market Microstructure Considerations

Quantum-enhanced HFT must account for:

- **Queue priority**: Faster rebalancing does not help if orders arrive late
- **Market impact**: Large quantum-optimized trades must be split to avoid moving the market
- **Regulatory**: MiFID II/Reg NMS requirements for algorithmic trading systems
- **Latency arbitrage**: Quantum advantage is in optimization quality, not raw speed

## Further Reading

- Chakrabarti, S. et al. (2021). "A threshold for quantum advantage in derivative pricing." *Quantum*, 5, 463.
- {doc}`/quantum_book/foundations/qc/vqe` -- Variational methods for the quantum engine
- {doc}`portfolio_optimization` -- QAOA portfolio optimization details
