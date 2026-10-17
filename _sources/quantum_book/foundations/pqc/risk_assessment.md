# Quantum Risk Assessment

> The 'Harvest Now, Decrypt Later' threat, migration timelines, DORA compliance, and building a quantum-readiness roadmap for your organization.

Quantum risk assessment is the process of evaluating an organization's exposure to the quantum computing threat and developing a migration plan to post-quantum cryptography. This is not a theoretical exercise: data encrypted today with RSA or ECDH can be recorded by adversaries and decrypted once a cryptographically relevant quantum computer (CRQC) becomes available.

## The Harvest Now, Decrypt Later (HNDL) Threat

The most immediate quantum risk is not a future attack on a future system. It is a present-day attack on present-day data:

1. An adversary intercepts encrypted communications today (TLS, VPN, email)
2. The adversary stores the encrypted data
3. Years later, a CRQC becomes available
4. The adversary decrypts the stored data

This attack is already feasible. Nation-states have the storage capacity and strategic motivation to collect encrypted traffic at scale. The question is not *whether* HNDL collection is happening, but *how much* data is being collected.

### The Mosca Inequality

Michele Mosca formalized the HNDL risk with a simple inequality:

$$x + y > z \implies \text{you need to act now}$$

Where:
- $x$ = shelf life of the data (how long the data must remain confidential)
- $y$ = migration time (how long it takes to deploy PQC across your systems)
- $z$ = time until a CRQC exists

If $x + y > z$, your data will be at risk before you can protect it.

```{admonition} Example
:class: note
A government agency has classified documents with a 30-year shelf life ($x = 30$). Migrating their systems to PQC will take 5 years ($y = 5$). If a CRQC arrives in 2040 ($z = 14$ years from 2026), then $x + y = 35 > 14 = z$. They needed to start migrating 21 years ago. In practice, they need to start **now**.
```

### Data Shelf Life by Sector

| Sector | Typical Data Shelf Life | HNDL Risk |
|---|---|---|
| Intelligence / military | 50+ years | Critical |
| Healthcare (patient records) | 20-50 years | High |
| Financial (transactions) | 7-25 years | High |
| Legal (contracts, IP) | 10-30 years | High |
| Government (policy, diplomatic) | 25-75 years | Critical |
| Retail (customer data) | 2-7 years | Moderate |
| Social media (messages) | 1-5 years | Low-Moderate |

## Conducting a Quantum Risk Assessment

A structured risk assessment follows five phases:

### Phase 1: Cryptographic Inventory

Catalog every cryptographic asset in your organization:

**What to inventory:**
- TLS certificates and their algorithms (RSA, ECDSA)
- VPN configurations (IKEv2 key exchange algorithms)
- SSH keys (RSA, ECDSA, Ed25519)
- Code signing certificates
- API authentication tokens (JWT signing algorithms)
- Database encryption (at-rest key types)
- Email encryption (S/MIME, PGP key types)
- Hardware security modules (HSM firmware, supported algorithms)
- IoT device firmware (embedded cryptographic libraries)

**For each asset, record:**
- Algorithm and key size
- Library/implementation
- Certificate validity period
- Data protection duration requirement
- Renewal/rotation schedule
- Migration complexity (easy/medium/hard)

```{admonition} Automated Discovery
:class: tip
Tools like [Cryptosense](https://cryptosense.com/), IBM's [Quantum Safe Explorer](https://www.ibm.com/quantum/quantum-safe), and open-source scanners can automate cryptographic inventory across codebases and network configurations.
```

### Phase 2: Risk Scoring

For each cryptographic asset, calculate a risk score:

$$\text{Risk} = \text{Impact} \times \text{Likelihood} \times \text{Exposure}$$

Where:
- **Impact** (1-5): Consequence of the asset being compromised
- **Likelihood** (1-5): Probability based on Mosca inequality and data shelf life
- **Exposure** (1-5): Accessibility of the encrypted data to adversaries (internet-facing = 5, air-gapped = 1)

| Risk Score | Priority | Action |
|---|---|---|
| 75-125 | Critical | Migrate immediately |
| 40-74 | High | Migrate within 12 months |
| 15-39 | Medium | Plan migration, execute within 24 months |
| 1-14 | Low | Monitor, include in next refresh cycle |

### Phase 3: Architecture Analysis

Assess the migration complexity for each system:

**Easy migration** (drop-in replacement):
- TLS 1.3 with hybrid key exchange (browser support already exists)
- SSH with hybrid key exchange (OpenSSH 9.0+ supports ML-KEM)
- Code signing with ML-DSA (if toolchain supports it)

**Medium migration** (protocol changes required):
- VPN reconfiguration (IKEv2 with PQC key exchange)
- Database re-encryption with PQC-wrapped keys
- JWT signing algorithm update (requires coordinated rollout)

**Hard migration** (system redesign):
- HSM firmware updates (hardware vendor dependency)
- IoT device firmware (may require physical access)
- Legacy systems with no vendor support for PQC
- Custom protocols with hardcoded algorithm choices

### Phase 4: Migration Roadmap

Based on risk scores and migration complexity, build a phased roadmap:

| Phase | Timeline | Focus | Success Criteria |
|---|---|---|---|
| **Immediate** | Now | Enable hybrid TLS on internet-facing services | All public endpoints support X25519+ML-KEM-768 |
| **Short-term** | 0-12 months | Migrate highest-risk internal systems | Critical-risk assets at 0 |
| **Medium-term** | 12-24 months | Enterprise-wide PQC deployment | High-risk assets at 0 |
| **Long-term** | 24-36 months | Legacy system migration, HSM updates | Full PQC coverage |
| **Ongoing** | Continuous | Monitor cryptanalysis developments | Algorithm agility in place |

### Phase 5: Algorithm Agility

The most important long-term investment is **crypto-agility**: the ability to swap cryptographic algorithms without redesigning systems.

Design principles:
- Abstract cryptographic operations behind interfaces (do not hardcode algorithm choices)
- Store algorithm identifiers alongside encrypted data (so you know how to decrypt it later)
- Plan for algorithm deprecation and rotation
- Test PQC algorithms in staging before production deployment

```{admonition} Lesson from SIKE
:class: warning
In 2022, SIKE (an isogeny-based KEM that was a NIST Round 4 candidate) was completely broken by a classical attack. Organizations that had begun early adoption of SIKE needed to quickly pivot. Crypto-agility makes this pivot manageable rather than catastrophic.
```

## Regulatory Landscape

### DORA (EU Digital Operational Resilience Act)

Effective July 2025, DORA applies to all EU financial entities (banks, insurance, investment firms, payment providers, crypto-asset service providers).

Relevant articles for quantum risk:

| Article | Requirement | Quantum Implication |
|---|---|---|
| **Art. 6.1** | Document encryption policies for data at rest, in transit, and in use | Must document current algorithms and PQC migration plan |
| **Art. 6.4** | Periodic updates to cryptographic measures based on developments in cryptanalysis | Quantum computing progress triggers mandatory review |
| **Art. 7** | Full key lifecycle management | PQC keys need the same governance as classical keys |
| **Art. 50** | Non-compliance penalties up to 2% of global annual turnover | Financial motivation to act |

DORA does not mandate PQC specifically, but Article 6.4's requirement to update cryptography based on "developments in cryptanalysis" is widely interpreted to include the quantum threat. Regulators will increasingly expect documented quantum risk assessments.

### NSA CNSA 2.0 (United States)

The NSA's Commercial National Security Algorithm Suite 2.0 sets timelines for US national security systems:

| Capability | Required Algorithm | Deadline |
|---|---|---|
| Software/firmware signing | ML-DSA or SLH-DSA | 2025 |
| Web browsers/servers | ML-KEM + ML-DSA | 2025 |
| Traditional networking (VPN, routers) | ML-KEM + ML-DSA | 2026 |
| Operating systems | ML-KEM + ML-DSA | 2027 |
| Custom/legacy applications | ML-KEM + ML-DSA | 2030 |
| Niche equipment (IoT, embedded) | ML-KEM + ML-DSA | 2033 |

### Other Regulations

| Regulation | Jurisdiction | Quantum Relevance |
|---|---|---|
| NIS2 Directive | EU | Requires "state of the art" encryption |
| GDPR Art. 32 | EU | "Appropriate technical measures" for data protection |
| UK Cyber Security Strategy | UK | Calls for "quantum-safe" by 2035 |
| NIST SP 800-131A Rev 2 | US | Transitions algorithms; PQC update expected |
| BSI TR-02102-1 | Germany | Recommends hybrid PQC from 2025 |

## Cost of Migration

Migration costs vary by organization size and complexity:

| Component | Small Org | Enterprise |
|---|---|---|
| Cryptographic inventory | $10K-$50K | $100K-$500K |
| Risk assessment | $5K-$25K | $50K-$200K |
| Library/SDK updates | $20K-$100K | $200K-$1M |
| Testing and validation | $10K-$50K | $100K-$500K |
| HSM firmware updates | $5K-$25K | $50K-$500K |
| FIPS 140-3 validation (optional) | N/A | $80K-$150K per module |
| Training and documentation | $5K-$20K | $50K-$200K |
| **Total** | **$55K-$270K** | **$630K-$3M+** |

The cost of *not* migrating is harder to quantify but potentially unbounded: a single compromise of quantum-vulnerable long-term secrets could result in regulatory fines, litigation, loss of competitive advantage, or national security damage.

## Quick-Start Checklist

For organizations beginning their quantum risk journey:

- [ ] Identify your most sensitive long-lived data (shelf life > 10 years)
- [ ] Calculate your Mosca inequality ($x + y$ vs. estimated $z$)
- [ ] Run a cryptographic inventory (even a partial one is valuable)
- [ ] Enable hybrid TLS on public-facing services (Chrome/Firefox already support it)
- [ ] Test ML-KEM and ML-DSA in a non-production environment
- [ ] Document your current encryption posture for DORA/NIS2 compliance
- [ ] Establish a crypto-agility roadmap for the next 3 years
- [ ] Brief executive leadership on the quantum risk (budget allocation requires awareness)

## Further Reading

- [NIST SP 800-227: Recommendations for Transition to PQC (draft)](https://csrc.nist.gov/pubs/sp/800/227/ipd)
- [NSA CNSA 2.0 Algorithm Suite](https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF)
- [ETSI White Paper: Quantum Safe Cryptography and Security](https://www.etsi.org/images/files/ETSIWhitePapers/QuantumSafeWhitepaper.pdf)
- Mosca, M. (2018). "Cybersecurity in an Era with Quantum Computers: Will We Be Ready?" *IEEE Security & Privacy*.
- [EU DORA Regulation (EU 2022/2554)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R2554)
