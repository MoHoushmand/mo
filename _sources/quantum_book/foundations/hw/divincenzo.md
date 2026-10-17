# The DiVincenzo Criteria

> Five requirements for a physical quantum computer: scalable qubits, initialization, long coherence, universal gates, and measurement. How each platform measures up.

In 2000, David DiVincenzo articulated five criteria that any physical system must satisfy to function as a quantum computer. Two decades later, these criteria remain the standard framework for evaluating hardware platforms.

## The Five Criteria

### 1. A Scalable Physical System with Well-Characterized Qubits

The system must provide a collection of two-level quantum systems (qubits) whose Hilbert space is well understood. "Scalable" means the architecture must, in principle, extend to the large qubit counts ($10^6$+) required for fault-tolerant computation.

This criterion eliminates systems where adding qubits fundamentally changes the physics or where qubit-qubit interactions cannot be controlled as the system grows.

### 2. Ability to Initialize the State of the Qubits

Before computation begins, all qubits must be set to a known state, typically $|0\rangle^{\otimes n}$. The initialization must be reliable and fast compared to the coherence time.

Common approaches include:
- **Thermalization**: Cooling to the ground state (superconducting, spin qubits)
- **Optical pumping**: Laser-driven state preparation (trapped ions, NV centers)
- **Measurement and reset**: Measuring each qubit and conditionally flipping it

### 3. Long Relevant Decoherence Times

The qubit must maintain its quantum state long enough to complete a meaningful computation. The key figure of merit is the ratio of coherence time to gate time:

$$\text{Quality ratio} = \frac{T_2}{t_\text{gate}}$$

A quality ratio above $10^4$ is typically needed for quantum error correction to work. Current platforms achieve:

| Platform | $T_2$ (typical) | $t_\text{gate}$ (two-qubit) | Quality Ratio |
|---|---|---|---|
| Trapped Ion | 1-10 s | 100 $\mu$s | $10^4$-$10^5$ |
| Superconducting | 50-200 $\mu$s | 20-100 ns | $10^3$-$10^4$ |
| Spin (Si) | 1-10 ms | 1-10 $\mu$s | $10^3$ |
| NV Center | 1 ms - 1 s | 10 $\mu$s | $10^2$-$10^5$ |
| Topological | Predicted: ms-s | Predicted: $\mu$s | Potentially $>10^6$ |

### 4. A Universal Set of Quantum Gates

The system must support a set of operations from which any unitary transformation can be approximated to arbitrary precision. A common universal gate set is:

$$\{H, T, \text{CNOT}\}$$

where $H$ is the Hadamard gate, $T$ is the $\pi/8$ phase gate, and CNOT is the controlled-NOT. In practice, any single-qubit rotation combined with an entangling two-qubit gate suffices.

The key metric is **gate fidelity**: how closely the physical operation matches the ideal unitary. State-of-the-art fidelities:

- Single-qubit gates: 99.99% (trapped ions, superconducting)
- Two-qubit gates: 99.9% (trapped ions), 99.5% (superconducting)

### 5. A Qubit-Specific Measurement Capability

Each qubit must be individually readable, projecting it onto the computational basis $\{|0\rangle, |1\rangle\}$ with high fidelity. Measurement must be fast enough that the result is available before decoherence destroys the remaining qubits.

Readout fidelities above 99% have been demonstrated in trapped ion, superconducting, and spin qubit platforms.

## Two Additional Criteria for Quantum Networks

DiVincenzo also specified two criteria for quantum communication:

**6. The ability to interconvert stationary and flying qubits.** Stationary qubits (matter-based) must be able to transfer their state to flying qubits (photons) for communication between nodes.

**7. The ability to faithfully transmit flying qubits.** Photons must travel between network nodes with sufficiently low loss.

These criteria are relevant for distributed quantum computing and the quantum internet.

## Platform Scorecard

| Criterion | Superconducting | Trapped Ion | Spin | NV Center | Photonic | Topological |
|---|---|---|---|---|---|---|
| Scalability | High | Medium | High | Low | High | Unknown |
| Initialization | Fast | Fast | Fast | Fast | On-demand | Predicted fast |
| Coherence | Good | Excellent | Good | Excellent | N/A (photon loss) | Predicted excellent |
| Gate fidelity | High | Highest | Good | Good | Medium | Predicted high |
| Readout | High | High | High | Medium | High | Unknown |

```{admonition} No platform satisfies all criteria perfectly
:class: important
Every platform has at least one significant weakness. Superconducting qubits are noisy and require extreme cooling. Trapped ions are slow and hard to scale. Spin qubits are difficult to couple over long distances. Topological qubits have yet to be fully demonstrated. The race is open.
```

## Further Reading

- DiVincenzo, D. P., "The Physical Implementation of Quantum Computation," *Fortschr. Phys.* **48**, 771 (2000). [arXiv:quant-ph/0002077](https://arxiv.org/abs/quant-ph/0002077)
- Nielsen, M. A. and Chuang, I. L., *Quantum Computation and Quantum Information*, Cambridge University Press (2010). Chapter 7.
