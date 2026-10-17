# NIST PQC Standards (FIPS 203/204/205)

> The three NIST post-quantum standards finalized in August 2024: ML-KEM for key encapsulation, ML-DSA for digital signatures, and SLH-DSA for hash-based signatures.

In August 2024, NIST published three Federal Information Processing Standards that define quantum-resistant cryptographic algorithms. These standards represent the culmination of an 8-year evaluation process that started with 82 submissions and narrowed to 4 selected algorithms.

## FIPS 203: ML-KEM (Module-Lattice-Based Key Encapsulation)

ML-KEM is the standardized version of CRYSTALS-Kyber. It provides a **Key Encapsulation Mechanism (KEM)**: a way for two parties to establish a shared secret over an insecure channel.

### What is a KEM?

A KEM has three operations:

1. **KeyGen()** $\rightarrow$ (pk, sk) -- Generate a public/secret keypair
2. **Encaps(pk)** $\rightarrow$ (ct, ss) -- Using the public key, produce a ciphertext and shared secret
3. **Decaps(ct, sk)** $\rightarrow$ ss -- Using the secret key and ciphertext, recover the shared secret

Both parties end up with the same shared secret `ss` (32 bytes), which serves as a symmetric key for AES-256-GCM, ChaCha20-Poly1305, or any other authenticated encryption scheme.

```{admonition} KEM vs. Key Exchange
:class: note
A KEM is not identical to a Diffie-Hellman key exchange. In DH, both parties contribute randomness. In a KEM, only the encapsulator generates randomness; the decapsulator recovers it. For most protocols (TLS, SSH, Signal), this distinction does not matter because the handshake combines the KEM output with other contributions.
```

### Parameter Sets

| Parameter Set | Security Level | NIST Category | Classical Equivalent | Use Case |
|---|:---:|:---:|:---:|---|
| ML-KEM-512 | 1 | Category 1 | AES-128 | Lightweight / IoT |
| ML-KEM-768 | 3 | Category 3 | AES-192 | General purpose (recommended) |
| ML-KEM-1024 | 5 | Category 5 | AES-256 | High security / classified |

### Key and Ciphertext Sizes

| Object | ML-KEM-512 | ML-KEM-768 | ML-KEM-1024 |
|---|---:|---:|---:|
| Public key (bytes) | 800 | 1,184 | 1,568 |
| Secret key (bytes) | 1,632 | 2,400 | 3,168 |
| Ciphertext (bytes) | 768 | 1,088 | 1,568 |
| Shared secret (bytes) | 32 | 32 | 32 |

For comparison, ECDH with P-256 produces 32-byte shared secrets from 64-byte public keys. ML-KEM-768 keys are ~18x larger, but the algorithm is quantum-resistant.

### How ML-KEM Works

ML-KEM is built on the **Module Learning With Errors (MLWE)** problem. At a high level:

**Key Generation:**

$$\mathbf{t} = \mathbf{A} \cdot \mathbf{s} + \mathbf{e} \pmod{q}$$

where $\mathbf{A}$ is a public random matrix over $\mathbb{Z}_q[x]/(x^{256}+1)$, $\mathbf{s}$ is the secret vector of small polynomials, and $\mathbf{e}$ is a small error vector. The public key is $(\mathbf{A}, \mathbf{t})$; the secret key is $\mathbf{s}$.

**Encapsulation:**
The encapsulator samples fresh randomness and computes:

$$\mathbf{u} = \mathbf{A}^T \mathbf{r} + \mathbf{e}_1, \quad v = \mathbf{t}^T \mathbf{r} + e_2 + \lceil q/2 \rceil \cdot m$$

The ciphertext is $(\mathbf{u}, v)$. The shared secret is derived from $m$ via SHA3-256.

**Decapsulation:**
The decapsulator computes $v - \mathbf{s}^T \mathbf{u}$ to recover $m$, then re-encapsulates to verify correctness (Fujisaki-Okamoto transform). This provides IND-CCA2 security with implicit rejection: if verification fails, a pseudorandom value is returned instead of an error, preventing chosen-ciphertext attacks.

### Performance

Typical benchmarks on modern hardware (ARM Cortex-A76 / Apple M-series):

| Operation | ML-KEM-768 |
|---|---:|
| KeyGen | ~50 $\mu$s |
| Encaps | ~70 $\mu$s |
| Decaps | ~70 $\mu$s |

ML-KEM is faster than RSA-2048 for key exchange and comparable to ECDH P-256 when including serialization overhead.

---

## FIPS 204: ML-DSA (Module-Lattice-Based Digital Signature Algorithm)

ML-DSA is the standardized version of CRYSTALS-Dilithium. It provides digital signatures for authentication, integrity, and non-repudiation.

### Signature Operations

1. **KeyGen()** $\rightarrow$ (pk, sk)
2. **Sign(sk, msg)** $\rightarrow$ $\sigma$
3. **Verify(pk, msg, $\sigma$)** $\rightarrow$ accept/reject

### Parameter Sets

| Parameter Set | Security Level | NIST Category | Use Case |
|---|:---:|:---:|---|
| ML-DSA-44 | 2 | Category 2 | General purpose |
| ML-DSA-65 | 3 | Category 3 | Recommended for most uses |
| ML-DSA-87 | 5 | Category 5 | High security |

### Sizes

| Object | ML-DSA-44 | ML-DSA-65 | ML-DSA-87 |
|---|---:|---:|---:|
| Public key (bytes) | 1,312 | 1,952 | 2,592 |
| Secret key (bytes) | 2,560 | 4,032 | 4,896 |
| Signature (bytes) | 2,420 | 3,309 | 4,627 |

ML-DSA signatures are significantly larger than ECDSA (64 bytes) or Ed25519 (64 bytes). This is the primary trade-off for quantum resistance in signatures.

### How ML-DSA Works

ML-DSA uses **Fiat-Shamir with Aborts** over module lattices. Signing involves:

1. Sample a masking vector $\mathbf{y}$
2. Compute $\mathbf{w} = \mathbf{A} \cdot \mathbf{y}$
3. Hash $\mathbf{w}$ with the message to get challenge $c$
4. Compute $\mathbf{z} = \mathbf{y} + c \cdot \mathbf{s}$
5. **Rejection sampling**: If $\mathbf{z}$ is too large (would leak information about $\mathbf{s}$), restart from step 1

The rejection sampling loop runs 4-7 times on average, making signing slightly slower than verification.

---

## FIPS 205: SLH-DSA (Stateless Hash-Based Digital Signature Algorithm)

SLH-DSA is the standardized version of SPHINCS+. Unlike ML-KEM and ML-DSA, which rely on lattice assumptions, SLH-DSA relies *only* on the security of hash functions.

### Why a Hash-Based Standard?

Hash-based signatures provide a **hedge against lattice cryptanalysis**. If a breakthrough attack against LWE were discovered, ML-KEM and ML-DSA would both be broken. SLH-DSA would remain secure because its security rests on completely different assumptions (collision resistance and preimage resistance of SHA-256 or SHAKE-256).

NIST explicitly included SLH-DSA for this diversification purpose.

### Parameter Sets

SLH-DSA offers many parameter sets trading off signature size vs. speed:

| Parameter Set | Security Level | Signature Size | Signing Speed |
|---|:---:|---:|---|
| SLH-DSA-SHA2-128s | 1 | 7,856 bytes | Slow (small) |
| SLH-DSA-SHA2-128f | 1 | 17,088 bytes | Fast |
| SLH-DSA-SHA2-192s | 3 | 16,224 bytes | Slow (small) |
| SLH-DSA-SHA2-192f | 3 | 35,664 bytes | Fast |
| SLH-DSA-SHA2-256s | 5 | 29,792 bytes | Slow (small) |
| SLH-DSA-SHA2-256f | 5 | 49,856 bytes | Fast |

The "s" variants minimize signature size; the "f" variants minimize signing time. Even the smallest SLH-DSA signature (7,856 bytes) is ~120x larger than an Ed25519 signature.

### How SLH-DSA Works

SLH-DSA combines three components:

1. **WOTS+ (Winternitz One-Time Signature)**: Signs a single message using a chain of hash evaluations
2. **XMSS (eXtended Merkle Signature Scheme)**: Combines multiple WOTS+ keys into a Merkle tree
3. **FORS (Forest of Random Subsets)**: A few-time signature scheme for the top layer

The "stateless" property means the signer does not need to track which one-time keys have been used. Instead, the message hash determines which leaf to sign, using a randomized index.

---

## Comparison of All Three Standards

| Property | ML-KEM (FIPS 203) | ML-DSA (FIPS 204) | SLH-DSA (FIPS 205) |
|---|---|---|---|
| **Purpose** | Key encapsulation | Digital signatures | Digital signatures |
| **Replaces** | RSA-OAEP, ECDH | RSA-PSS, ECDSA | RSA-PSS, ECDSA |
| **Hardness** | Module-LWE | Module-LWE | Hash function security |
| **Key sizes** | 1-2 KB | 1-5 KB | 32-64 bytes (PK) |
| **Ct/Sig size** | 0.7-1.6 KB | 2.4-4.6 KB | 8-50 KB |
| **Speed** | Very fast | Fast (rejection loop) | Slow (many hash calls) |
| **Maturity** | High (10+ years) | High | Very high (hash security well-understood) |
| **Risk** | Lattice breakthrough | Lattice breakthrough | Hash function breakthrough (extremely unlikely) |

### When to Use Which

- **ML-KEM**: Always, for key exchange (TLS, SSH, VPN, messaging). No viable alternative for KEMs.
- **ML-DSA**: Default choice for signatures (code signing, certificates, authentication tokens).
- **SLH-DSA**: When you need maximum confidence in long-term security assumptions, or as a backup if lattice algorithms are ever weakened. Suitable for firmware signing, root certificates, and legal documents with multi-decade validity.

## FIPS 203 vs. FIPS 140-3

These are two different standards that are frequently confused:

| | FIPS 203 | FIPS 140-3 |
|---|---|---|
| **What** | Algorithm specification (ML-KEM) | Cryptographic module validation program |
| **Scope** | Defines the math, encoding, and test vectors | Defines physical security, key management, self-tests |
| **Cost** | Free (public standard) | $80,000-$150,000+ for CMVP lab testing |
| **Timeline** | Immediate (published 2024) | 6-18 months for testing and validation |
| **What you can claim** | "Implements FIPS 203" | "FIPS 140-3 Level N validated" (with CMVP certificate) |

```{admonition} Compliance Language
:class: warning
- **Safe**: "Implements NIST FIPS 203 (ML-KEM-768)"
- **Safe**: "Verified against NIST Known Answer Test vectors"
- **Unsafe**: "FIPS certified" or "FIPS compliant" (implies FIPS 140-3 validation without a CMVP certificate)
```

## Implementation Ecosystem

Open-source implementations of the NIST PQC standards:

| Library | Language | Standards | Notes |
|---|---|---|---|
| [liboqs](https://github.com/open-quantum-safe/liboqs) | C | All three | OQS project, most widely used |
| [pqcrypto](https://crates.io/crates/pqcrypto) | Rust | All three | Rust bindings to liboqs |
| [Botan](https://botan.randombit.net/) | C++ | ML-KEM, ML-DSA | Production use by several enterprises |
| [Bouncy Castle](https://www.bouncycastle.org/) | Java/C# | All three | Java ecosystem standard |
| [PQClean](https://github.com/PQClean/PQClean) | C | All three | Clean, portable references |
| [aws-lc](https://github.com/aws/aws-lc) | C | ML-KEM | Used in AWS TLS stack |

## Further Reading

- [NIST FIPS 203 (ML-KEM) specification](https://csrc.nist.gov/pubs/fips/203/final)
- [NIST FIPS 204 (ML-DSA) specification](https://csrc.nist.gov/pubs/fips/204/final)
- [NIST FIPS 205 (SLH-DSA) specification](https://csrc.nist.gov/pubs/fips/205/final)
- [NIST SP 800-227: Recommendations for Transition to PQC (draft)](https://csrc.nist.gov/pubs/sp/800/227/ipd)
- [Open Quantum Safe project](https://openquantumsafe.org/)
