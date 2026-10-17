# QRNG vs. PRNG

> Quantum random number generation vs. pseudorandom number generation. Entropy quality, statistical testing, and why the source of randomness matters for cryptographic key generation.

Randomness is the foundation of all cryptography. Every key, nonce, initialization vector, and salt depends on unpredictable random numbers. The quality of that randomness directly determines the security of the system. This chapter compares two fundamentally different sources: **pseudorandom number generators (PRNGs)** that produce deterministic output from a seed, and **quantum random number generators (QRNGs)** that derive randomness from quantum mechanical phenomena.

## The Randomness Hierarchy

```
                    Theoretical Strength
                           ↑
    ┌──────────────────────┼──────────────────────┐
    │                      │                      │
    │   Quantum RNG        │   True RNG           │
    │   (QRNG)             │   (hardware)         │
    │   Provably random    │   Based on physical  │
    │   from QM postulates │   processes           │
    │                      │                      │
    ├──────────────────────┼──────────────────────┤
    │                      │                      │
    │   CSPRNG             │   OS Entropy          │
    │   Cryptographically  │   /dev/urandom,      │
    │   secure PRNG        │   getrandom()        │
    │                      │                      │
    ├──────────────────────┼──────────────────────┤
    │                      │                      │
    │   PRNG               │   Mersenne Twister,  │
    │   Deterministic,     │   LCG, xorshift      │
    │   NOT for crypto     │                      │
    │                      │                      │
    └──────────────────────┴──────────────────────┘
```

## Pseudorandom Number Generators (PRNGs)

A PRNG is a deterministic algorithm that expands a short seed into a long sequence of numbers that *appear* random but are entirely determined by the seed.

### Cryptographically Secure PRNGs (CSPRNGs)

For cryptographic use, PRNGs must satisfy additional properties:

1. **Forward security**: Given the current state, you cannot predict past outputs
2. **Backward security**: Given past outputs, you cannot predict future outputs
3. **Computational indistinguishability**: No efficient algorithm can distinguish CSPRNG output from truly random bits

Common CSPRNGs:

| CSPRNG | Standard | Used By |
|---|---|---|
| AES-256-CTR-DRBG | NIST SP 800-90A | OpenSSL, Linux kernel |
| ChaCha20 | RFC 7539 | /dev/urandom (Linux 4.8+) |
| HMAC-DRBG | NIST SP 800-90A | Java, .NET |
| SHAKE-256 | FIPS 202 | ML-KEM key generation |

### The Seed Problem

A CSPRNG is only as strong as its seed. If an attacker can predict or influence the seed, all generated keys are compromised. Operating systems collect entropy from:

- Timing jitter in hardware interrupts
- Mouse/keyboard input timing
- Disk I/O timing
- CPU instruction timing (RDRAND/RDSEED on x86)
- Thermal noise in ADCs

```{admonition} The Dual_EC_DRBG Backdoor
:class: danger
In 2013, Edward Snowden's documents revealed that the NSA had influenced NIST to include Dual_EC_DRBG in SP 800-90A. This PRNG contained a suspected backdoor: the NSA could potentially predict outputs if they knew the relationship between two elliptic curve points in the algorithm. Dual_EC_DRBG was withdrawn from the standard in 2014. This incident demonstrates the risk of trusting PRNGs whose internal constants could be chosen adversarially.
```

## Quantum Random Number Generation (QRNG)

A QRNG derives randomness from fundamentally unpredictable quantum mechanical processes. Unlike PRNGs, which are deterministic, and classical TRNGs, which rely on complex-but-deterministic physical processes, QRNGs produce randomness guaranteed by the laws of quantum mechanics.

### Quantum Sources of Randomness

| Method | Principle | Bit Rate | Device Requirement |
|---|---|---|---|
| **Photon path** | Beam splitter 50/50 | ~1 Gbps | Photon source + detectors |
| **Vacuum fluctuations** | Homodyne detection | ~10 Gbps | Laser + balanced detector |
| **Photon arrival time** | Timing jitter | ~100 Mbps | Single-photon detector |
| **Hadamard measurement** | $\|0\rangle \xrightarrow{H}$ measure | ~kbps | Quantum computer |
| **Bell test** | Violation of CHSH | ~bps | Entangled photon pairs |

### Why QRNG is Different

The randomness in a QRNG is not due to ignorance (as in a coin flip, where randomness reflects our lack of information about initial conditions). It is *intrinsic* to quantum mechanics:

$$|0\rangle \xrightarrow{H} \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle) \xrightarrow{\text{measure}} \begin{cases} 0 & \text{with probability } 1/2 \\ 1 & \text{with probability } 1/2 \end{cases}$$

The measurement outcome is fundamentally unpredictable. No hidden variable, no amount of information about the quantum state, can predict which outcome will occur. This is guaranteed by:

- **The Born rule**: Measurement probabilities are given by $|\langle \psi | \phi \rangle|^2$
- **The Kochen-Specker theorem**: No deterministic hidden variable theory can reproduce all quantum predictions
- **Bell's theorem**: No local hidden variable theory can explain quantum correlations

```{admonition} Device-Independent QRNG
:class: tip
The strongest form of QRNG is **device-independent**: it certifies randomness through Bell inequality violations, without trusting the internal workings of the device. If the CHSH inequality $S \leq 2$ is violated ($S > 2$), the outputs must be random, regardless of what hardware produces them. This is the gold standard but currently too slow for most practical applications.
```

## Generating Quantum Random Numbers

### Using a Quantum Computer (Hadamard Method)

The simplest QRNG circuit: apply a Hadamard gate to $|0\rangle$ and measure.

::::{tab-set}
:::{tab-item} Qiskit
```python
from qiskit import QuantumCircuit
from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2

def qrng_bits(n_bits: int, backend_name: str = "ibm_brisbane") -> str:
    """Generate n_bits of quantum random bits."""
    service = QiskitRuntimeService()
    backend = service.backend(backend_name)

    qc = QuantumCircuit(n_bits, n_bits)
    qc.h(range(n_bits))          # Hadamard on all qubits
    qc.measure(range(n_bits), range(n_bits))

    sampler = SamplerV2(backend)
    job = sampler.run([qc], shots=1)
    result = job.result()

    # Extract the single measurement outcome
    counts = result[0].data.meas.get_counts()
    bitstring = list(counts.keys())[0]
    return bitstring

# Generate 128 bits of quantum randomness
bits = qrng_bits(128)
print(f"QRNG output: {bits[:32]}... ({len(bits)} bits)")
```
:::
:::{tab-item} Cirq
```python
import cirq

def qrng_bits(n_bits: int) -> str:
    """Generate n_bits of quantum random bits using Cirq."""
    qubits = cirq.LineQubit.range(n_bits)
    circuit = cirq.Circuit([
        cirq.H.on_each(*qubits),
        cirq.measure(*qubits, key='result')
    ])

    # Simulate (replace with hardware sampler for real QRNG)
    simulator = cirq.Simulator()
    result = simulator.run(circuit, repetitions=1)
    bits = result.measurements['result'][0]
    return ''.join(str(b) for b in bits)

bits = qrng_bits(128)
print(f"QRNG output: {bits[:32]}... ({len(bits)} bits)")
```
:::
:::{tab-item} PennyLane
```python
import pennylane as qml
import numpy as np

def qrng_bits(n_bits: int) -> str:
    """Generate n_bits of quantum random bits using PennyLane."""
    dev = qml.device("default.qubit", wires=n_bits, shots=1)

    @qml.qnode(dev)
    def circuit():
        for i in range(n_bits):
            qml.Hadamard(wires=i)
        return [qml.sample(qml.PauliZ(i)) for i in range(n_bits)]

    samples = circuit()
    # PennyLane returns +1/-1; convert to 0/1
    bits = [(1 - int(s)) // 2 for s in samples]
    return ''.join(str(b) for b in bits)

bits = qrng_bits(128)
print(f"QRNG output: {bits[:32]}... ({len(bits)} bits)")
```
:::
:::{tab-item} PyQuil
```python
from pyquil import Program
from pyquil.gates import H, MEASURE
from pyquil.quilbase import Declare

def qrng_bits(n_bits: int) -> str:
    """Generate n_bits of quantum random bits using PyQuil."""
    p = Program()
    ro = p.declare('ro', 'BIT', n_bits)

    for i in range(n_bits):
        p += H(i)
        p += MEASURE(i, ro[i])

    p.wrap_in_numshots_loop(1)

    # Execute on QVM (replace with QPU for real QRNG)
    from pyquil import get_qc
    qc = get_qc(f"{n_bits}q-qvm")
    executable = qc.compile(p)
    results = qc.run(executable).readout_data.get('ro')

    return ''.join(str(b) for b in results[0])

bits = qrng_bits(128)
print(f"QRNG output: {bits[:32]}... ({len(bits)} bits)")
```
:::
::::

### Bulk QRNG via Multi-Qubit Circuits

For generating large amounts of entropy, use all available qubits and multiple shots:

```python
def harvest_entropy(n_qubits: int, n_shots: int) -> bytes:
    """Harvest entropy from a quantum computer.

    Total bits = n_qubits * n_shots
    Total bytes = n_qubits * n_shots / 8
    """
    from qiskit import QuantumCircuit

    qc = QuantumCircuit(n_qubits, n_qubits)
    qc.h(range(n_qubits))
    qc.measure(range(n_qubits), range(n_qubits))

    # Execute with many shots
    # Each shot produces n_qubits bits
    # 120 qubits × 100,000 shots = 12 million bits = 1.5 MB
    ...
```

## Statistical Testing

Both PRNG and QRNG outputs should pass the same statistical tests. Passing tests is *necessary* but not *sufficient* for cryptographic quality: a PRNG with a known seed passes all tests despite being completely predictable.

### NIST SP 800-22 Test Suite

The standard battery for randomness testing:

| Test | What It Checks |
|---|---|
| Frequency (monobit) | Equal proportion of 0s and 1s |
| Block frequency | Uniform distribution within blocks |
| Runs | Oscillation between 0 and 1 |
| Longest run of ones | Maximum consecutive 1s in a block |
| Binary matrix rank | Linear dependence between bit subsequences |
| DFT (spectral) | Periodic features in the sequence |
| Non-overlapping template | Occurrences of specific patterns |
| Overlapping template | Sliding window pattern matching |
| Maurer's universal | Compressibility (entropy estimate) |
| Linear complexity | LFSR complexity of subsequences |
| Serial | Uniformity of $m$-bit patterns |
| Approximate entropy | Regularity of pattern frequencies |
| Cumulative sums | Maximum deviation of partial sums |
| Random excursions | Deviation from random walk |
| Random excursions variant | Frequency of specific states in random walk |

### Testing in Practice

```python
# Using the NIST SP 800-22 tests (nistrng package)
from nistrng import run_all_battery, pack_sequence

# Test PRNG output
import os
prng_data = os.urandom(1_000_000)  # 1 MB from OS CSPRNG
results_prng = run_all_battery(pack_sequence(prng_data), test_type='all')

# Test QRNG output (from quantum hardware)
qrng_data = open("quantum_entropy_pool.bin", "rb").read(1_000_000)
results_qrng = run_all_battery(pack_sequence(qrng_data), test_type='all')

# Both should pass all 15 tests
for name, result in results_prng:
    print(f"{name}: {'PASS' if result.passed else 'FAIL'} (p={result.p_value:.4f})")
```

## QRNG vs. PRNG: When Does It Matter?

| Scenario | PRNG Sufficient? | QRNG Recommended? | Why |
|---|:---:|:---:|---|
| Web server TLS sessions | Yes | No | Short-lived keys; OS entropy is adequate |
| Long-term signing keys | Yes | Yes | Key compromise has lasting impact |
| Root CA certificates | Yes | Yes | Multi-decade validity |
| Classified/military | Depends on policy | Often required | Regulatory mandate in some jurisdictions |
| Key generation for PQC | Yes | Yes | Belt-and-suspenders for quantum-resistant keys |
| Monte Carlo simulation | Yes | No | Statistical quality, not secrecy, matters |
| Gambling/lottery | Depends on regulation | Sometimes required | Regulatory fairness requirements |

### The Pragmatic View

For most applications, a well-seeded CSPRNG (e.g., `/dev/urandom` on Linux) provides adequate randomness. The OS entropy pool collects from multiple hardware sources and applies cryptographic mixing.

QRNG adds value when:
1. **Regulatory requirements** mandate quantum-derived entropy
2. **Defense in depth**: if the CSPRNG is ever compromised (backdoor, implementation bug, weak seeding), QRNG provides an independent entropy source
3. **Long-lived keys**: keys that must remain secure for decades benefit from the strongest available randomness source
4. **Symbolic value**: for a PQC product, using quantum entropy for quantum-resistant key generation is a coherent security story

### Hybrid Approach

The strongest practical approach combines both:

$$\text{seed} = \text{SHAKE-256}(\text{QRNG\_bytes} \| \text{OS\_entropy} \| \text{timestamp})$$

This way, the seed is at least as strong as the strongest input. Even if QRNG hardware malfunctions (producing biased output), the OS entropy provides a floor. Even if the OS CSPRNG has a weakness, the QRNG provides independent randomness.

## Entropy Rate and Min-Entropy

Raw QRNG output may have bias due to hardware imperfections. The key metric is **min-entropy**, which measures the worst-case unpredictability:

$$H_{\min}(X) = -\log_2 \max_x P(X = x)$$

For a perfect coin, $H_{\min} = 1$ bit per flip. For a biased coin with $P(\text{heads}) = 0.6$:

$$H_{\min} = -\log_2(0.6) \approx 0.737 \text{ bits per flip}$$

### Entropy Extraction

To convert raw QRNG output (with potential bias) into uniformly random bits, use a **randomness extractor**:

1. **Von Neumann extractor**: Pairs (0,1) $\rightarrow$ 0; pairs (1,0) $\rightarrow$ 1; discard (0,0) and (1,1). Simple but wastes ~75% of input.
2. **Toeplitz hashing**: Multiply input by a random Toeplitz matrix. Provably extracts near-uniform bits. Used in QRNG products.
3. **SHAKE-256 conditioning**: Hash raw QRNG output through a cryptographic sponge. The NIST-recommended approach for conditioning entropy sources.

## Further Reading

- [NIST SP 800-90A: Recommendation for Random Number Generation Using Deterministic RBGs](https://csrc.nist.gov/pubs/sp/800/90/a/r1/final)
- [NIST SP 800-22: A Statistical Test Suite for Random and Pseudorandom Number Generators](https://csrc.nist.gov/pubs/sp/800/22/r1a/final)
- Herrero-Collantes, M. and Garcia-Escartin, J.C. (2017). "Quantum random number generators." *Reviews of Modern Physics*, 89(1).
- Ma, X. et al. (2016). "Quantum random number generation." *npj Quantum Information*, 2, 16021.
