# ESG & Sustainability

> Measuring and optimizing the environmental impact of quantum computing. Carbon footprint of dilution refrigerators, renewable energy integration, and sustainable quantum infrastructure.

## The Energy Footprint of Quantum Computing

Quantum computers have a unique energy profile compared to classical data centers:

| Component | Power Consumption | Notes |
|---|---|---|
| Dilution refrigerator | 15-25 kW | Cooling to 15 mK; runs 24/7 |
| Control electronics | 5-15 kW | Room-temperature microwave generators |
| Classical co-processing | 10-50 kW | Error correction, compilation |
| Facility overhead | 20-40 kW | HVAC, UPS, networking |
| **Total per QPU** | **50-130 kW** | Comparable to a small classical cluster |

For comparison, a single NVIDIA H100 GPU consumes ~0.7 kW. A quantum computer consumes 70-180x more power per processing unit, but solves fundamentally different problems.

## Sustainability Metrics

QDiana tracks four ESG metrics for quantum operations:

### Energy Efficiency
$$\text{QE}_{\text{eff}} = \frac{\text{Useful quantum operations (gates)}}{\text{Total energy consumed (kWh)}}$$

### Carbon Intensity
$$\text{CI}_q = \text{Energy (kWh)} \times \text{Grid carbon factor (gCO}_2\text{/kWh)}$$

Norwegian quantum computing benefits from one of the lowest grid carbon factors in Europe (~8 gCO$_2$/kWh from hydroelectric power), compared to the EU average (~230 gCO$_2$/kWh).

### Helium Consumption
Dilution refrigerators use helium-3 and helium-4. Helium-3 is scarce (produced primarily as a byproduct of nuclear weapons maintenance). Sustainable quantum computing requires closed-cycle helium recovery systems.

### Hardware Utilization
$$\text{Utilization} = \frac{\text{Time executing quantum circuits}}{\text{Total uptime}}$$

Current quantum computers have utilization rates of 5-20%. Improving scheduling and batching can significantly reduce per-computation energy costs.

## Cooling Optimization Strategies

1. **Pulse-level optimization**: Shorter gate sequences reduce total refrigeration time per computation
2. **Batch scheduling**: Group similar jobs to minimize refrigerator cycling
3. **Hybrid workload splitting**: Run only quantum-essential subroutines on the QPU; keep classical work on efficient CPUs/GPUs
4. **Location optimization**: Site quantum data centers near renewable energy sources and cold climates

## Further Reading

- Jaschke, D. and Montangero, S. (2023). "Is quantum computing green? An estimate for an energy-efficiency quantum advantage." *Quantum Science and Technology*.
- {doc}`green_certification` -- QDiana's sustainability certification program
