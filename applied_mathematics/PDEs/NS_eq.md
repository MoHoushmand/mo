# The Navier–Stokes equations

```{div} mo-lead
The equations of motion for a viscous fluid, and why their turbulent solutions are so costly to compute.
```

For an incompressible fluid with constant density $\rho$ and kinematic viscosity $\nu$, the velocity
field $\mathbf{u}(\mathbf{x}, t)$ and pressure $p(\mathbf{x}, t)$ satisfy

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla)\mathbf{u}
  = -\frac{1}{\rho}\nabla p + \nu \nabla^2 \mathbf{u} + \mathbf{f},
\qquad \nabla \cdot \mathbf{u} = 0.
$$

The first equation is Newton's second law for a small parcel of fluid: its acceleration, including the
nonlinear transport term $(\mathbf{u} \cdot \nabla)\mathbf{u}$, balances the pressure gradient, viscous
diffusion and any body force $\mathbf{f}$ such as gravity. The second states that the flow conserves
mass.

## Turbulence

How turbulent a flow is depends on the Reynolds number

$$
\mathrm{Re} = \frac{U L}{\nu},
$$

the ratio of inertial to viscous forces for a characteristic speed $U$ and length $L$. At high Reynolds
numbers the flow breaks into eddies over a wide range of sizes. A direct numerical simulation must
resolve them all, down to the smallest (Kolmogorov) scale; the number of grid points grows roughly as
$\mathrm{Re}^{9/4}$ and the total work as about $\mathrm{Re}^{3}$, which is why DNS of real engineering
flows remains out of reach of classical computers.
