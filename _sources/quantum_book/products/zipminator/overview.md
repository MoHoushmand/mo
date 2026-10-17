# Zipminator: PQC Encryption Infrastructure

> The world's first PQC super-app: a QCaaS/QCaaP cybersecurity platform with 9 pillars of military-grade encryption infrastructure built on NIST FIPS 203 (ML-KEM-768).

Zipminator is not antivirus, not endpoint detection, not a firewall. It is **encryption infrastructure**: a platform that shields device network traffic, stored credentials, and data at rest from both classical and quantum adversaries.

## The 9 Pillars

| Pillar | What It Does | Key Technology |
|---|---|---|
| **1. PQC Crypto Core** | ML-KEM-768 key encapsulation | Rust implementation, constant-time, NIST KAT verified |
| **2. PQC VPN** | Quantum-resistant network tunnel | WireGuard protocol with ML-KEM handshake |
| **3. PQC Mail** | End-to-end encrypted email | ML-KEM key exchange + AES-256-GCM payload |
| **4. PQC Messenger** | Encrypted real-time messaging | Signal protocol adapted for PQC |
| **5. Q-AI Assistant** | AI with PII scanning | 15-country PII detection, anonymization |
| **6. PQC Browser** | Privacy-focused web browser | Tauri 2.x, 7 privacy subsystems |
| **7. VoIP** | Encrypted voice/video calls | SRTP with PQC key exchange |
| **8. ZipNDel** | Secure file destruction | DoD 5220.22-M 3-pass overwrite |
| **9. Q-Mesh** | Physical layer cryptography | ESP32-S3 WiFi CSI mesh with QRNG keys |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Flutter Super-App                   │
│            (macOS, Windows, Linux, iOS, Android, Web) │
├─────────────────────────────────────────────────────┤
│     Flutter Rust Bridge (FRB v2)  │   REST API       │
├───────────────────────────────────┤   (FastAPI)      │
│          Rust Crypto Core         │                   │
│   ML-KEM-768 · NTT · FO Transform│                   │
├───────────────────────────────────┴───────────────────┤
│                 Entropy Layer                          │
│   IBM Quantum (156-qubit) → qBraid → OS fallback     │
└─────────────────────────────────────────────────────┘
```

The Rust core (`crates/zipminator-core/`) implements ML-KEM-768 from scratch with:
- Number Theoretic Transform (NTT) for $O(n \log n)$ polynomial multiplication
- Montgomery multiplication for constant-time modular arithmetic
- Fujisaki-Okamoto transform for IND-CCA2 security
- `subtle` crate for all secret-dependent comparisons

## Quantum Entropy Harvesting

Zipminator seeds key generation with entropy harvested from IBM's 156-qubit Eagle r3 quantum processors (ibm_fez, ibm_marrakesh) via Hadamard circuits. The entropy provider chain:

1. Local pool file (pre-harvested quantum entropy)
2. IBM Quantum direct (Qiskit Runtime SamplerV2)
3. qBraid multi-cloud gateway
4. Rigetti QCS
5. OS entropy fallback (`getrandom` / `os.urandom`)

## SDK Quick Start

```python
from zipminator import keypair, encapsulate, decapsulate

# Generate ML-KEM-768 keypair
pk, sk = keypair()

# Encapsulate: produces ciphertext + 32-byte shared secret
ct, shared_secret = encapsulate(pk)

# Decapsulate: recovers the same shared secret
recovered = decapsulate(ct, sk)
assert shared_secret == recovered
```

| Operation | Key Size | Speed (M1 Max) |
|---|---:|---:|
| KeyGen | pk: 1,184 B, sk: 2,400 B | 321 $\mu$s |
| Encapsulate | ct: 1,088 B | 607 $\mu$s |
| Decapsulate | ss: 32 B | 620 $\mu$s |

## Compliance Posture

- Implements NIST FIPS 203 (ML-KEM-768)
- Verified against NIST Known Answer Test vectors (35 KAT tests)
- Constant-time operations for side-channel resistance
- DORA Art. 6/7 ready (documented encryption policies, key lifecycle management)
- 441 Rust tests, 429 Python tests, 23 Flutter tests

```{admonition} FIPS Language
:class: warning
Zipminator implements the FIPS 203 algorithm specification. It has **not** undergone FIPS 140-3 module validation (CMVP certification). Do not represent it as "FIPS certified" or "FIPS compliant."
```

## Documentation

For the full SDK documentation, interactive notebooks, and API reference, see the [Zipminator Jupyter Book](https://github.com/QDaria/zipminator). The notebooks in {doc}`Part XI </quantum_book/notebooks/01_quickstart>` of this book provide hands-on examples.

## Further Reading

- [Zipminator GitHub Repository](https://github.com/QDaria/zipminator)
- {doc}`/quantum_book/foundations/pqc/nist_standards` -- The NIST standards Zipminator implements
- {doc}`/quantum_book/foundations/pqc/lattice_crypto` -- The mathematics behind ML-KEM
- {doc}`/quantum_book/foundations/pqc/qrng_vs_prng` -- Why quantum entropy matters for key generation
