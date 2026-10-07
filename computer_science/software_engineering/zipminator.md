# Zipminator

```{div} mo-lead
Post-quantum encryption software: data protected today against the quantum computers of tomorrow.
```

Zipminator began at NAV, the Norwegian Labour and Welfare Administration, as a tool for handling
sensitive data securely. It is now post-quantum encryption software, and one of QDaria's products.

## Why post-quantum

The public-key cryptography that protects most data today, RSA and elliptic curves, could be broken by a
large enough quantum computer running Shor's algorithm. Data encrypted now can be recorded and kept until
such a machine exists: *harvest now, decrypt later*. Post-quantum cryptography replaces those schemes
with ones built on problems believed to be hard for quantum computers as well.

## What it uses

- **ML-KEM-768**, the module-lattice key-encapsulation mechanism standardised by NIST as FIPS 203 (it grew
  out of CRYSTALS-Kyber, Kyber768).
- **Quantum entropy**: randomness from quantum sources for generating keys.

The source code is on [GitHub](https://github.com/MoHoushmand/zipminator-pqc).
