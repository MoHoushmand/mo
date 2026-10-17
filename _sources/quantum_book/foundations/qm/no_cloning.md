# The No-Cloning Theorem

> Why arbitrary quantum states cannot be perfectly copied. Proof, implications for quantum cryptography, and the connection to the linearity of quantum mechanics.

The no-cloning theorem states that there is no physical process that can create an identical copy of an arbitrary unknown quantum state. This result, proved independently by Wootters and Zurek and by Dieks in 1982, is a direct consequence of the linearity of quantum mechanics. It has profound implications for quantum cryptography, quantum error correction, and the foundations of quantum information.

## Statement of the Theorem

**No-Cloning Theorem**: There exists no unitary operator $U$ such that for all quantum states $|\psi\rangle$:

$$U(|\psi\rangle \otimes |0\rangle) = |\psi\rangle \otimes |\psi\rangle$$

where $|0\rangle$ is a fixed initial "blank" state.

## Proof

The proof is short and uses only the linearity of quantum mechanics.

Suppose such a $U$ exists. Consider two states $|\psi\rangle$ and $|\phi\rangle$. By assumption:

$$U(|\psi\rangle|0\rangle) = |\psi\rangle|\psi\rangle$$

$$U(|\phi\rangle|0\rangle) = |\phi\rangle|\phi\rangle$$

Take the inner product of both sides:

$$\langle\psi|\phi\rangle \cdot \langle 0|0\rangle = (\langle\psi|\phi\rangle)^2$$

Since $\langle 0|0\rangle = 1$:

$$\langle\psi|\phi\rangle = (\langle\psi|\phi\rangle)^2$$

This equation has only two solutions: $\langle\psi|\phi\rangle = 0$ (orthogonal states) or $\langle\psi|\phi\rangle = 1$ (identical states). A cloning machine can only copy states that are either identical or orthogonal, not arbitrary unknown states. $\square$

```{admonition} Why Linearity is the Key
:class: note
The proof fails if $U$ is allowed to be nonlinear. Quantum mechanics is a linear theory (superpositions of solutions are solutions), and this linearity is what prevents cloning. If nature were described by a nonlinear theory, cloning might be possible, but so would faster-than-light signaling.
```

## What Can and Cannot Be Copied

| Scenario | Clonable? | Reason |
|---|---|---|
| Known state $\|0\rangle$ | Yes | Prepare another $\|0\rangle$ from scratch |
| Known state $\|+\rangle$ | Yes | Apply $H$ to $\|0\rangle$ |
| Unknown state $\|\psi\rangle$ | No | No-cloning theorem |
| Classical bit (0 or 1) | Yes | Measure and copy the result |
| Orthogonal set $\{\|0\rangle, \|1\rangle\}$ | Yes | Measure in computational basis, copy result |
| Non-orthogonal set | No | Cannot distinguish without error |

The critical distinction: you can copy a state if you know what it is (just prepare another copy). You cannot copy a state if it is unknown to you and could be any state in a continuous set.

## Approximate Cloning

While perfect cloning is impossible, **approximate cloning** is allowed. The optimal universal cloning machine (Buzek-Hillery, 1996) produces two copies of a single qubit with fidelity:

$$F = \frac{5}{6} \approx 0.833$$

This is the best achievable fidelity for any device that works equally well on all input states. The fact that $F < 1$ means that some information is inevitably lost, and the copies are imperfect.

## Implications for Quantum Cryptography

The no-cloning theorem is the physical basis for quantum key distribution (QKD).

### BB84 Protocol Security

In BB84, Alice sends qubits in randomly chosen bases ($Z$ or $X$). An eavesdropper (Eve) cannot:

1. **Copy the qubit** to measure it and forward the original (no-cloning forbids this)
2. **Measure without disturbance** (measurement in the wrong basis introduces errors)

Any eavesdropping strategy introduces a detectable error rate. If the error rate exceeds a threshold, Alice and Bob abort the protocol.

### Quantum Money

Stephen Wiesner proposed quantum money (1983): banknotes containing qubits in secret states. The no-cloning theorem guarantees that counterfeiting is impossible without access to the bank's secret basis information.

## Implications for Quantum Error Correction

At first glance, the no-cloning theorem seems to forbid quantum error correction: if you cannot copy a quantum state, how can you add redundancy? The resolution is that quantum error correction encodes information not by copying the state but by spreading it across an entangled multi-qubit state:

$$|\psi\rangle \mapsto |\psi_{\text{logical}}\rangle \in \mathcal{H}^{\otimes n}$$

The logical qubit is encoded in the correlations between physical qubits, not by duplicating the state. Error correction measures the **error syndrome** (which tells you what error occurred) without measuring the encoded information.

```{admonition} No-Cloning Does Not Prevent Error Correction
:class: important
The Shor code (1995) and Steane code (1996) demonstrated that quantum error correction is possible despite no-cloning. The key insight is that you can detect and correct errors by measuring parity checks on entangled qubits, which reveals error information without revealing (or disturbing) the encoded state.
```

## Related No-Go Theorems

The no-cloning theorem is part of a family of quantum no-go results:

- **No-deleting theorem**: An unknown quantum state cannot be perfectly deleted (the time-reverse of no-cloning). Proved by Pati and Braunstein (2000).
- **No-broadcasting theorem**: The mixed-state generalization of no-cloning. An unknown mixed state cannot be broadcast to two parties. Proved by Barnum et al. (1996).
- **No-communication theorem**: Entanglement alone cannot transmit information. Local operations on one qubit of an entangled pair cannot be detected by measuring the other qubit.

## Further Reading

- Wootters, W. K. & Zurek, W. H. (1982). "A single quantum cannot be cloned." *Nature*, 299, 802-803.
- Dieks, D. (1982). "Communication by EPR devices." *Physics Letters A*, 92(6), 271-272.
- Scarani, V., Iblisdir, S., Gisin, N., & Acin, A. (2005). "Quantum cloning." *Reviews of Modern Physics*, 77(4), 1225-1256.
