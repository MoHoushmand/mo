# Green Quantum Certification

> Certifying quantum computing operations for sustainability. Energy efficiency metrics, cooling optimization, and environmental reporting.

## Certification Levels

QDiana's Green Quantum Certification assesses quantum computing facilities on four dimensions:

| Level | Name | Requirements | Badge |
|---|---|---|---|
| **GQ-Bronze** | Aware | Energy monitoring in place, annual reporting | Basic compliance |
| **GQ-Silver** | Efficient | Below-average energy per quantum operation, helium recovery | Good practice |
| **GQ-Gold** | Sustainable | Renewable energy powered, closed-cycle cooling, carbon offset | Industry leader |
| **GQ-Platinum** | Net-Zero | Net-zero operations, full lifecycle assessment, circular hardware | Exemplary |

## Assessment Criteria

### Energy (40% weight)
- Power Usage Effectiveness (PUE) specific to quantum facilities
- Energy per logical qubit-operation
- Idle power management (standby vs. full operation)

### Materials (20% weight)
- Helium recovery rate (>95% for Silver+)
- Rare earth element sourcing documentation
- Hardware end-of-life recycling plan

### Carbon (25% weight)
- Scope 1, 2, and 3 greenhouse gas accounting
- Renewable energy procurement (PPAs, RECs)
- Carbon offset quality (Gold Standard or equivalent)

### Governance (15% weight)
- Sustainability officer designated
- Annual public sustainability report
- Supply chain transparency

## Reporting Framework

Certified facilities submit quarterly metrics via the QDiana ESG Dashboard:

```
{
  "facility_id": "qd-oslo-01",
  "quarter": "2026-Q1",
  "energy_kwh": 145000,
  "renewable_pct": 98.2,
  "helium_recovery_pct": 97.5,
  "carbon_tonnes_co2e": 1.16,
  "qpu_utilization_pct": 18.3,
  "gates_executed": 2.4e9
}
```

## Norwegian Advantage

Norway offers unique advantages for sustainable quantum computing:
- 98% renewable electricity grid (hydroelectric)
- Cold climate reduces auxiliary cooling costs
- Strong regulatory framework for environmental reporting
- Government incentives for green technology infrastructure

## Further Reading

- {doc}`esg_sustainability` -- Detailed sustainability metrics and methodology
- [EU Corporate Sustainability Reporting Directive (CSRD)](https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en)
