# Introduction to Post-Quantum Cryptography

> The quantum threat to classical cryptography and the global effort to standardize quantum-resistant algorithms.

Modern digital infrastructure relies on public-key cryptography for everything: TLS connections, digital signatures, software updates, banking, identity, and government communications. The two mathematical problems underpinning this infrastructure, integer factorization (RSA) and discrete logarithms (ECDH, ECDSA), are both efficiently solvable by a sufficiently large quantum computer running Shor's algorithm.

Post-quantum cryptography (PQC) is the field of cryptographic algorithms designed to resist attacks by both classical and quantum computers. Unlike quantum key distribution (QKD), which requires specialized hardware, PQC algorithms run on ordinary computers. They are drop-in replacements for RSA, ECDH, and ECDSA.

## The Quantum Threat

Shor's algorithm, discovered in 1994, factors integers and computes discrete logarithms in polynomial time on a quantum computer. The implications:

| Classical Algorithm | Purpose | Quantum Attack | Time to Break |
|---|---|---|---|
| RSA-2048 | Key exchange, signatures | Shor's algorithm | $O(n^3)$ quantum gates |
| ECDH (P-256) | Key agreement | Shor's (modified) | $O(n^3)$ quantum gates |
| ECDSA (P-256) | Digital signatures | Shor's (modified) | $O(n^3)$ quantum gates |
| AES-256 | Symmetric encryption | Grover's algorithm | $2^{128}$ ops (still secure) |
| SHA-256 | Hashing | Grover's algorithm | $2^{128}$ ops (still secure) |

Symmetric algorithms and hash functions lose at most a quadratic factor to Grover's algorithm, so doubling key sizes suffices. Public-key cryptography faces an existential threat.

```{admonition} When will this happen?
:class: note
No one knows when a cryptographically relevant quantum computer (CRQC) will exist. Estimates range from 2030 to 2050+. But data encrypted today can be stored and decrypted later, a strategy called **Harvest Now, Decrypt Later (HNDL)**. This means the threat is already real for long-lived secrets.
```

## How Big a Quantum Computer?

Breaking RSA-2048 with Shor's algorithm requires roughly 4,000 logical qubits. With current error rates and surface code error correction, that translates to millions of physical qubits. As of early 2026:

- IBM has 1,386 physical qubits (Condor, November 2023)
- Google has 105 physical qubits (Willow, December 2024)
- Quantinuum has 56 physical qubits (H2, 2024)

The gap between current hardware and a CRQC is large, but quantum computing capability has grown roughly 2x per year. The risk is not today; the risk is that today's encrypted data will still be sensitive when CRQCs arrive.

## The NIST Standardization Process

In December 2016, NIST launched the Post-Quantum Cryptography Standardization Project, the largest cryptographic competition since the AES selection process in the late 1990s.

```
2016  ──  Call for proposals (82 submissions)
  │
2019  ──  Round 2: 26 candidates
  │
2020  ──  Round 3: 7 finalists + 8 alternates
  │
2022  ──  NIST selects primary algorithms
  │         ├── CRYSTALS-Kyber  → KEM
  │         ├── CRYSTALS-Dilithium → Signatures
  │         ├── FALCON → Signatures
  │         └── SPHINCS+ → Signatures (hash-based)
  │
2024  ──  Final standards published
  │         ├── FIPS 203: ML-KEM (from Kyber)
  │         ├── FIPS 204: ML-DSA (from Dilithium)
  │         └── FIPS 205: SLH-DSA (from SPHINCS+)
  │
2025  ──  Federal agencies begin migration
  │
2030  ──  NIST deprecates RSA/ECDH for federal use
  │
2035  ──  NIST disallows RSA/ECDH entirely
```

The three standards cover the two fundamental cryptographic operations:

- **Key Encapsulation (KEM)**: Establishing shared secrets over insecure channels. ML-KEM replaces RSA-OAEP and ECDH.
- **Digital Signatures**: Authenticating messages and software. ML-DSA and SLH-DSA replace RSA-PSS and ECDSA.

## PQC Algorithm Families

Post-quantum algorithms draw hardness from mathematical problems believed to resist quantum attacks:

::::{grid} 2 2 2 2
:gutter: 3

:::{grid-item-card} Lattice-Based
**Standards**: ML-KEM (FIPS 203), ML-DSA (FIPS 204)

Based on the Learning With Errors (LWE) problem and its variants. Best balance of key size, performance, and security confidence. The most mature PQC family.
:::

:::{grid-item-card} Hash-Based
**Standard**: SLH-DSA (FIPS 205)

Based solely on the security of hash functions (SHA-256, SHAKE). Conservative choice with the highest confidence in security assumptions, but larger signatures.
:::

:::{grid-item-card} Code-Based
**Candidate**: Classic McEliece (Round 4)

Based on decoding random linear codes. Very large public keys (~1 MB) but fast operations and decades of cryptanalysis. Under consideration for NIST Round 4.
:::

:::{grid-item-card} Isogeny-Based
**Status**: Broken (SIKE, 2022)

SIDH/SIKE was broken by a classical attack in 2022. New isogeny schemes (CSIDH variants) are under research but not yet standardized. A cautionary tale about PQC security analysis.
:::
::::

## Hybrid Cryptography

During the migration period, many deployments use **hybrid cryptography**: running a classical algorithm (e.g., ECDH) in parallel with a PQC algorithm (e.g., ML-KEM). The shared secrets are combined so that the connection is secure as long as *either* algorithm holds.

$$k_{\text{hybrid}} = \text{KDF}(k_{\text{ECDH}} \| k_{\text{ML-KEM}})$$

This approach is recommended by:
- NIST SP 800-227 (draft)
- BSI (German Federal Office for Information Security)
- ANSSI (French National Cybersecurity Agency)
- ETSI (European Telecommunications Standards Institute)

Chrome, Firefox, and Safari have already deployed hybrid TLS using X25519+ML-KEM-768.

## Migration Timeline

Organizations should plan their PQC migration now, even if a CRQC is decades away:

| Phase | Timeline | Actions |
|---|---|---|
| **Inventory** | Now | Catalog all cryptographic assets: keys, certificates, protocols |
| **Risk Assessment** | Now | Identify data with long sensitivity lifetimes (HNDL risk) |
| **Testing** | 2025-2027 | Deploy PQC in test environments, measure performance impact |
| **Hybrid Deployment** | 2026-2030 | Run classical+PQC in parallel for production systems |
| **Full Migration** | 2028-2035 | Remove classical algorithms from critical paths |
| **Compliance** | 2030+ | Meet NIST deprecation deadlines, DORA Art. 6 requirements |

```{admonition} DORA Compliance (EU)
:class: important
The EU's Digital Operational Resilience Act (DORA), effective July 2025, requires financial institutions to document encryption policies and perform periodic cryptographic updates based on developments in cryptanalysis (Art. 6.1, 6.4). Quantum computing developments trigger this requirement. Non-compliance fines reach 2% of global turnover.
```

## What This Part Covers

The remaining chapters in Part V dive deeper:

1. **{doc}`nist_standards`** -- Detailed walkthrough of FIPS 203, 204, and 205
2. **{doc}`lattice_crypto`** -- The mathematics of lattice-based cryptography
3. **{doc}`qrng_vs_prng`** -- Quantum vs. classical random number generation
4. **{doc}`risk_assessment`** -- Building a quantum risk assessment for your organization

## Further Reading

- [NIST Post-Quantum Cryptography Project](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [NIST IR 8413: Status Report on the Third Round](https://csrc.nist.gov/pubs/ir/8413/upd1/final)
- [ETSI Quantum-Safe Cryptography Standards](https://www.etsi.org/technologies/quantum-safe-cryptography)
- [NSA CNSA 2.0 Algorithm Suite](https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF)
