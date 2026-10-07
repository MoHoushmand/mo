# Quantum Annealing

```{div} mo-lead
A different way to compute with qubits: let a quantum system settle into the answer.
```

A gate-based quantum computer applies a sequence of operations. A quantum annealer instead prepares its
qubits in the easy ground state of a simple Hamiltonian and slowly changes the Hamiltonian into one
whose ground state encodes the solution of an optimisation problem. If the change is slow enough, the
adiabatic theorem keeps the system in its ground state throughout, and measuring the qubits at the end
reads out the answer.

The problems annealers take are written as an Ising model, or equivalently as a quadratic unconstrained
binary optimisation (QUBO): find the binary variables that minimise a quadratic cost. Many scheduling,
routing and machine-learning problems can be put in that form.

This chapter is still short. The material already on the site:

- **Adiabatic quantum computing**: notebook 2.2 of the
  [quantum machine learning series](../../quantum_machine_learning/quantum_machine_learning.md), with
  D-Wave's Ocean tools.
- **Optimisation and learning on an annealer**: notebooks 3.1 and 3.2.
- **[Annealing in practice](quantum_annealing_op.md)**: from a problem to a QUBO to a sample.
