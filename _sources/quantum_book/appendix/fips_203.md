# FIPS 203 Reference

> Quick-reference card for NIST FIPS 203 (ML-KEM). Parameter sets, key sizes, algorithm steps, and implementation notes.

For the full educational treatment, see {doc}`/quantum_book/foundations/pqc/nist_standards`.

## Parameter Sets

| | ML-KEM-512 | ML-KEM-768 | ML-KEM-1024 |
|---|---:|---:|---:|
| NIST Security Level | 1 | 3 | 5 |
| Classical equivalent | AES-128 | AES-192 | AES-256 |
| Module rank ($k$) | 2 | 3 | 4 |
| Polynomial degree ($n$) | 256 | 256 | 256 |
| Modulus ($q$) | 3329 | 3329 | 3329 |
| Public key (bytes) | 800 | 1,184 | 1,568 |
| Secret key (bytes) | 1,632 | 2,400 | 3,168 |
| Ciphertext (bytes) | 768 | 1,088 | 1,568 |
| Shared secret (bytes) | 32 | 32 | 32 |
| CBD parameter ($\eta_1$) | 3 | 2 | 2 |
| CBD parameter ($\eta_2$) | 2 | 2 | 2 |
| Compression ($d_u$) | 10 | 10 | 11 |
| Compression ($d_v$) | 4 | 4 | 5 |

## Algorithm Overview

### KeyGen

1. $d \leftarrow \mathcal{B}^{32}$ (random 32-byte seed)
2. $(ρ, σ) \leftarrow G(d)$ where $G$ is SHA3-512
3. $\hat{\mathbf{A}} \leftarrow \text{Sam}(ρ)$ (expand $k \times k$ matrix via SHAKE-128)
4. $\mathbf{s}, \mathbf{e} \leftarrow \text{CBD}_{\eta_1}(σ)$ (sample from centered binomial distribution)
5. $\hat{\mathbf{s}} \leftarrow \text{NTT}(\mathbf{s})$, $\hat{\mathbf{e}} \leftarrow \text{NTT}(\mathbf{e})$
6. $\hat{\mathbf{t}} \leftarrow \hat{\mathbf{A}} \circ \hat{\mathbf{s}} + \hat{\mathbf{e}}$
7. **pk** $= (\hat{\mathbf{t}}, ρ)$, **sk** $= (\hat{\mathbf{s}}, \text{pk}, H(\text{pk}), z)$

### Encaps(pk)

1. $m \leftarrow \mathcal{B}^{32}$ (random 32-byte message)
2. $(K, r) \leftarrow G(m \| H(\text{pk}))$
3. $(\mathbf{u}, v) \leftarrow \text{Encrypt}(\text{pk}, m, r)$
4. **ct** $= (\text{Compress}(\mathbf{u}), \text{Compress}(v))$
5. **ss** $= K$ (32-byte shared secret)

### Decaps(ct, sk)

1. $m' \leftarrow \text{Decrypt}(\text{sk}, \text{ct})$
2. $(K', r') \leftarrow G(m' \| H(\text{pk}))$
3. $\text{ct}' \leftarrow \text{Encrypt}(\text{pk}, m', r')$ (re-encapsulate)
4. If $\text{ct}' = \text{ct}$: return $K'$ (FO verification passed)
5. Else: return $J(z \| \text{ct})$ (implicit rejection, constant-time)

## Constant-Time Requirements

These operations MUST be constant-time to prevent timing side-channel attacks:

- Comparison in step 4 of Decaps (use `subtle::ConstantTimeEq`)
- Selection between $K'$ and $J(z \| \text{ct})$ in step 4-5 (use `subtle::ConditionallySelectable`)
- CBD sampling (no early-exit branches)
- NTT butterfly operations (Montgomery multiplication)
- Compression/decompression (arithmetic masking, no conditional branches)

## Hash Functions Used

| Function | Purpose | Instantiation |
|---|---|---|
| $G$ | Seed expansion | SHA3-512 |
| $H$ | Public key hash | SHA3-256 |
| $J$ | Implicit rejection | SHAKE-256 |
| $\text{Sam}$ | Matrix sampling | SHAKE-128 |
| KDF | Shared secret derivation | SHA3-256 |

## NIST KAT Vectors

NIST provides Known Answer Test vectors using a deterministic DRBG (AES-256-CTR-DRBG). Implementations should verify against these vectors to confirm correctness.

- [ML-KEM KAT vectors (NIST)](https://csrc.nist.gov/projects/post-quantum-cryptography/selected-algorithms-2022)

## Further Reading

- [NIST FIPS 203 Final Standard (PDF)](https://csrc.nist.gov/pubs/fips/203/final)
- {doc}`/quantum_book/foundations/pqc/nist_standards` -- Full educational treatment
- {doc}`/quantum_book/foundations/pqc/lattice_crypto` -- Mathematical foundations
