# Annealing in practice

```{div} mo-lead
The steps from a real problem to a result from an annealer.
```

1. **Formulate.** Write the problem as a QUBO or Ising model: binary variables, a quadratic cost, and
   constraints turned into penalty terms weighted by a Lagrange multiplier.
2. **Embed.** Map the problem's variables onto the annealer's physical qubits. The hardware connects
   each qubit to only a few others, so one variable may need a chain of qubits; tools such as
   minorminer find these embeddings.
3. **Sample.** Run the anneal many times. Each run returns a low-energy configuration, and the best of
   them is the answer, or a good approximation to it.
4. **Check.** Decode the samples back into the original problem, test the constraints, and compare
   with a classical solver.

The [Ruter](../../ruter/ruter.ipynb) notebook follows these steps for a small travelling-salesperson
route, using D-Wave's `dimod` and `dwave_networkx`.
