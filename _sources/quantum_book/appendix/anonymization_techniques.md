# Anonymization Techniques Reference

> Reference for data anonymization methods: k-anonymity, l-diversity, t-closeness, differential privacy, and Zipminator's 10-level system.

## Why Anonymization Matters

Post-quantum encryption protects data in transit and at rest. Anonymization protects data *in use*: when datasets are shared for analysis, research, or compliance, the original identities must not be recoverable.

## Technique Overview

| Technique | What It Does | Strength | Weakness |
|---|---|---|---|
| **k-Anonymity** | Each record is indistinguishable from $k-1$ others | Simple, well-understood | Vulnerable to homogeneity/background knowledge attacks |
| **l-Diversity** | Each equivalence class has $l$ distinct sensitive values | Protects against homogeneity | Does not consider value distribution |
| **t-Closeness** | Distribution of sensitive values in each class is within $t$ of the overall distribution | Strong distributional privacy | Computationally expensive |
| **Differential Privacy** | Adding calibrated noise ensures individual records cannot be distinguished | Formal mathematical guarantee ($\epsilon$-DP) | Reduces data utility |
| **Synthetic Data** | Generate new data with same statistical properties | Preserves utility, no real records | Quality depends on generation model |

## k-Anonymity

A dataset satisfies $k$-anonymity if every combination of quasi-identifiers (age, zip code, gender) appears at least $k$ times.

**Techniques to achieve k-anonymity:**
- **Generalization**: Replace specific values with ranges (age 28 $\rightarrow$ 25-30)
- **Suppression**: Remove rare records or values
- **Cell suppression**: Replace individual cells with "*"

## l-Diversity

Extends k-anonymity by requiring that each equivalence class has at least $l$ distinct values for the sensitive attribute.

## t-Closeness

Extends l-diversity by requiring that the distribution of sensitive values in each equivalence class is within distance $t$ of the overall distribution, measured by Earth Mover's Distance.

## Differential Privacy

A randomized mechanism $\mathcal{M}$ satisfies $\epsilon$-differential privacy if for any two datasets $D$ and $D'$ differing in one record:

$$P[\mathcal{M}(D) \in S] \leq e^\epsilon \cdot P[\mathcal{M}(D') \in S]$$

The parameter $\epsilon$ (privacy budget) controls the privacy-utility trade-off:
- $\epsilon = 0.1$: Strong privacy, significant noise
- $\epsilon = 1.0$: Moderate privacy, usable for most analyses
- $\epsilon = 10$: Weak privacy, minimal noise

**Common mechanisms:**
- **Laplace mechanism**: Add $\text{Lap}(\Delta f / \epsilon)$ noise to numeric queries
- **Gaussian mechanism**: Add $\mathcal{N}(0, \sigma^2)$ noise with $(\epsilon, \delta)$-DP guarantee
- **Exponential mechanism**: Sample from a distribution proportional to utility score

## Zipminator's 10-Level Anonymization System

Zipminator provides a configurable anonymization pipeline with 10 progressive levels:

| Level | Name | What It Does |
|---|---|---|
| L0 | Raw | No anonymization (original data) |
| L1 | Pseudonymization | Replace names/IDs with random tokens |
| L2 | Generalization | Generalize quasi-identifiers (age ranges, zip prefixes) |
| L3 | k-Anonymity (k=5) | Ensure 5-anonymity on quasi-identifiers |
| L4 | k-Anonymity (k=10) | Stricter anonymity threshold |
| L5 | l-Diversity (l=3) | Add sensitive attribute diversity |
| L6 | t-Closeness (t=0.2) | Distributional privacy guarantee |
| L7 | Differential Privacy ($\epsilon=1.0$) | Formal DP guarantee, moderate noise |
| L8 | Differential Privacy ($\epsilon=0.1$) | Strong DP guarantee, more noise |
| L9 | Synthetic | Replace with synthetic data preserving statistical properties |

Levels L0-L3 are available on the Free tier. L4+ requires a Developer or higher subscription.

## PII Detection

Before anonymization, Zipminator scans for personally identifiable information across 15 countries:

| Region | PII Patterns Detected |
|---|---|
| US | SSN, driver's license, passport |
| UK | National Insurance, NHS number |
| NO | F-nummer, D-nummer, bank account |
| SE | Personnummer, samordningsnummer |
| DK | CPR-nummer |
| FI | HETU |
| DE | Personalausweis, Steuer-ID |
| FR | NIR, carte d'identite |
| EU | IBAN, VAT number, EHIC |
| IN | Aadhaar, PAN |
| BR | CPF, CNPJ |
| JP | My Number, driver's license |
| CA | SIN, driver's license |
| AU | TFN, Medicare |
| AE | Emirates ID |

## Further Reading

- Dwork, C. and Roth, A. (2014). "The Algorithmic Foundations of Differential Privacy." *Foundations and Trends in Theoretical Computer Science*.
- Sweeney, L. (2002). "k-Anonymity: A Model for Protecting Privacy." *International Journal of Uncertainty, Fuzziness and Knowledge-Based Systems*.
- {doc}`/quantum_book/products/zipminator/overview` -- Zipminator's full anonymization pipeline
