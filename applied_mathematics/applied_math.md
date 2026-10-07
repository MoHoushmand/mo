# Computational Fluid Dynamics

```{div} mo-lead
Simulating flowing fluids on a computer: the mathematics I came from, and the reason I came to quantum
computing.
```

Computational fluid dynamics (CFD) solves the equations of fluid motion numerically, from air over a
wing to paint spreading on a canvas. At its heart are the
[Navier–Stokes equations](PDEs/NS_eq.md): nonlinear partial differential equations whose solutions turn
turbulent at high speeds.

Most engineering CFD models the smallest eddies of a turbulent flow instead of resolving them. Direct
numerical simulation (DNS) resolves every scale, and so becomes enormously expensive as the flow gets
faster: only a few groups in the world run it at scale. That cost is one of the problems that drew me to
ask what quantum computers might do for simulation.

The numerical methods behind all of this, finite differences above all, I learned from Professor Hans
Petter Langtangen; his *Finite Difference Computing with Partial Differential Equations* is the best
place to start.
