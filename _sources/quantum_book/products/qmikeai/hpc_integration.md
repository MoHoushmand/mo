# HPC Integration

> Integrating quantum coprocessors with classical HPC clusters. MPI+quantum hybrid workflows, job scheduling, and data movement.

## The Hybrid HPC Model

Quantum processors will not replace classical HPC clusters. They will augment them, accelerating specific subroutines within larger computational workflows. The integration model mirrors how GPUs were introduced to HPC in the 2000s.

```
┌─────────────────────────────────────┐
│           Job Scheduler (Slurm)      │
├──────────┬──────────┬───────────────┤
│ CPU Nodes│ GPU Nodes│ QPU Access    │
│          │          │ (cloud/local) │
│ Mesh gen │ Matrix   │ Linear solve  │
│ I/O      │ multiply │ Optimization  │
│ Pre/post │ ML infer │ Sampling      │
└──────────┴──────────┴───────────────┘
```

## Integration Patterns

### Pattern 1: QPU as Remote Accelerator

The quantum processor is accessed via cloud API. The HPC job submits circuits, waits for results, and continues.

```python
# Within an MPI-parallel CFD solver
from mpi4py import MPI
from qiskit_ibm_runtime import QiskitRuntimeService

comm = MPI.COMM_WORLD
rank = comm.Get_rank()

if rank == 0:
    # Only rank 0 submits quantum job
    service = QiskitRuntimeService()
    backend = service.backend("ibm_fez")
    # Submit circuit, get result
    quantum_result = run_quantum_linear_solve(A_sub, b_sub, backend)
else:
    quantum_result = None

# Broadcast result to all ranks
quantum_result = comm.bcast(quantum_result, root=0)
```

### Pattern 2: Quantum-in-the-Loop

Quantum subroutines are called iteratively within a classical solver loop (e.g., VQLS within each timestep of a PDE solver).

### Pattern 3: Batch Quantum Preprocessing

Quantum optimization runs as a separate batch job to precompute parameters (e.g., optimal mesh adaptivity, preconditioner selection) that the classical solver then uses.

## Data Movement Challenges

| Challenge | Description | Mitigation |
|---|---|---|
| State preparation | Classical $\rightarrow$ quantum encoding is $O(N)$ | Use quantum-native problem formulations |
| Measurement | Full state readout requires $O(N)$ shots | Extract only needed observables |
| Latency | Cloud QPU round-trip: 100+ ms | Batch jobs, overlap with classical work |
| Bandwidth | QPU produces $O(\text{shots} \times \text{qubits})$ bits | Modest; not a bottleneck |

## Job Scheduling

Quantum jobs require special scheduling considerations:

- **Calibration windows**: QPU properties change over time; submit jobs after fresh calibration
- **Queue times**: Cloud QPU queues range from seconds to hours
- **Shot budgets**: Balance statistical accuracy against cost/time
- **Error mitigation**: Post-processing overhead for noise reduction

## Security

All HPC-to-QPU communication should be encrypted with post-quantum algorithms. Zipminator's ML-KEM-768 secures the channel, ensuring that quantum computation results (which may encode sensitive simulation data) are protected against HNDL attacks.

## Further Reading

- Alexeev, Y. et al. (2021). "Quantum computer systems for scientific discovery." *PRX Quantum*, 2, 017001.
- {doc}`/quantum_book/foundations/pqc/risk_assessment` -- Securing quantum-classical communication
- {doc}`cfd` -- The quantum algorithms that HPC integrates
