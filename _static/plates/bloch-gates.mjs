// Single-qubit gates as rotations of the Bloch sphere.
//
// A pure state cos(θ/2)|0⟩ + e^{iφ} sin(θ/2)|1⟩ is the point (sinθ cosφ, sinθ sinφ, cosθ) on the unit
// sphere (Nielsen and Chuang, eq. 1.4). Every single-qubit gate is a rotation of that sphere: X is a half
// turn about x, Z a half turn about z, S a quarter turn about z, H a half turn about the axis (x + z)/√2,
// and Ry(θ) a turn by θ about y (Nielsen and Chuang, §4.2). The figure rotates the state vector with
// Rodrigues' formula and reads every number off the vector it draws.
import { el, fmt, paint, plate } from "./engine.mjs";

const R = 150, CX = 230, CY = 200;
const AZ = -0.6, EL = 0.35;   // the viewing direction: +x comes out towards the lower left
const S2 = Math.SQRT1_2;
const CITE = "Nielsen and Chuang, <i>Quantum Computation and Quantum Information</i> (2010), eq. 1.4 and §4.2.";

const steps = [
  { gate: "start", from: [0, 0, 1], axis: null, angle: 0, title: "A qubit is a point on a sphere",
    text: "The state |0⟩ sits at the north pole and |1⟩ at the south pole. Every other pure state is a point in between: its latitude sets the probabilities, its longitude the relative phase.", cite: CITE },
  { gate: "X", from: [0, 0, 1], axis: [1, 0, 0], angle: Math.PI, title: "X is a half turn about the x axis",
    text: "The NOT gate swaps |0⟩ and |1⟩. On the sphere it turns the state half way round the x axis, from the north pole to the south pole." },
  { gate: "H", from: [0, 0, -1], axis: [S2, 0, S2], angle: Math.PI, title: "H is a half turn about the diagonal",
    text: "The Hadamard gate turns the sphere about the axis half way between x and z. It takes |1⟩ to |−⟩ on the equator: an equal superposition, with a minus sign between its parts." },
  { gate: "Z", from: [-1, 0, 0], axis: [0, 0, 1], angle: Math.PI, title: "Z changes the phase, not the probabilities",
    text: "Z is a half turn about the vertical axis. The state stays on the equator, so the chances of reading 0 or 1 do not change; only the relative phase does, from π to 0, which takes |−⟩ to |+⟩." },
  { gate: "S", from: [1, 0, 0], axis: [0, 0, 1], angle: Math.PI / 2, title: "S is a quarter turn",
    text: "S turns the state a quarter of the way round the equator, from |+⟩ to |+i⟩. Phase gates like S and T move a state in longitude only." },
  { gate: "Ry(θ)", from: [0, 0, 1], axis: [0, 1, 0], angle: Math.PI, ms: 3600, title: "The latitude is the probability",
    text: "Starting again from |0⟩, Ry(θ) tips the state over the y axis. Watch the readout: the probability of measuring 1 is sin²(θ/2), so it grows slowly near the poles and fastest at the equator.", cite: CITE },
];

function rotate(v, n, a) {   // Rodrigues: v cos a + (n × v) sin a + n (n · v)(1 − cos a)
  if (!n) return v;
  const [x, y, z] = v, [p, q, r] = n, c = Math.cos(a), s = Math.sin(a), d = (p * x + q * y + r * z) * (1 - c);
  return [x * c + (q * z - r * y) * s + p * d, y * c + (r * x - p * z) * s + q * d, z * c + (p * y - q * x) * s + r * d];
}

function ket(a, b, phi) {   // a|0⟩ + e^{iφ} b|1⟩, written as a textbook would (zero terms left out)
  const near = (x, y) => Math.abs(x - y) < 5e-3;
  const amp = (x) => (near(x, 1) ? "" : fmt(x));
  const terms = [];
  if (!near(a, 0)) terms.push(`${amp(a)}|0⟩`);
  if (!near(b, 0)) {
    const phase = near(phi, 0) ? ["+", ""] : near(phi, Math.PI) ? ["−", ""] : near(phi, Math.PI / 2) ? ["+", "i"]
      : near(phi, 1.5 * Math.PI) ? ["−", "i"] : ["+", `e<sup>i${fmt(phi / Math.PI, 2)}π</sup>`];
    terms.push(`${terms.length ? ` ${phase[0]} ` : phase[0] === "−" ? "−" : ""}${phase[1]}${amp(b)}|1⟩`);
  }
  return terms.join("");
}

function project([x, y, z]) {   // orthographic view: azimuth, then elevation
  const x1 = x * Math.cos(AZ) - y * Math.sin(AZ), y1 = x * Math.sin(AZ) + y * Math.cos(AZ);
  return { sx: CX + R * y1, sy: CY - R * (z * Math.cos(EL) - x1 * Math.sin(EL)), depth: x1 * Math.cos(EL) + z * Math.sin(EL) };
}

function circle3(f) {   // a great circle, as projected points with their depth
  return Array.from({ length: 97 }, (_, k) => project(f((2 * Math.PI * k) / 96)));
}
const pts = (list) => list.map((p) => `${p.sx.toFixed(1)},${p.sy.toFixed(1)}`).join(" ");

export default function mount(root) {
  let stem, tip, shadow, drop, axisRod, axisEnds, trail, trailPts = [], lastStep = -1;
  plate(root, {
    title: "Single-qubit gates as rotations of the Bloch sphere",
    width: 460, height: 400, steps,
    setup(svg) {
      const g = paint(svg);
      const equator = circle3((t) => [Math.cos(t), Math.sin(t), 0]);
      el("circle", { cx: CX, cy: CY, r: R, fill: g.ball("paper"), class: "pl-body" }, svg);          // the glass sphere
      el("polygon", { points: pts(equator), fill: g.slab("lilac"), class: "pl-disc" }, svg);       // the equatorial plane
      el("polyline", { points: pts(equator.filter((p) => p.depth >= 0)), class: "pl-rim" }, svg);
      el("polyline", { points: pts(circle3((t) => [Math.cos(t), 0, Math.sin(t)]).filter((p) => p.depth >= 0)), class: "pl-ring pl-faint" }, svg);
      for (const [v, label] of [[[0, 0, 1], "|0⟩"], [[0, 0, -1], "|1⟩"], [[1, 0, 0], "|+⟩"], [[-1, 0, 0], "|−⟩"], [[0, 1, 0], "|+i⟩"], [[0, -1, 0], "|−i⟩"]]) {
        const a = project(v), o = project([0, 0, 0]), b = project(v.map((c) => c * 1.16));
        el("line", { x1: o.sx, y1: o.sy, x2: a.sx, y2: a.sy, class: "pl-axis" }, svg);
        el("circle", { cx: a.sx, cy: a.sy, r: 3, class: "pl-node" }, svg);
        el("text", { x: b.sx, y: b.sy + 5, class: "pl-label", "text-anchor": "middle" }, svg).textContent = label;
      }
      axisRod = el("line", { class: "pl-gold-rod" }, svg);
      axisEnds = [0, 1].map(() => el("circle", { r: 6, fill: g.ball("gold") }, svg));
      trail = el("polyline", { class: "pl-trail" }, svg);
      shadow = el("ellipse", { rx: 9, ry: 3.5, class: "pl-shadow" }, svg);                         // the state's foot on the equator plane
      drop = el("line", { class: "pl-drop" }, svg);
      stem = el("line", { class: "pl-stem" }, svg);
      tip = el("circle", { r: 11, fill: g.ball("blue"), class: "pl-ball" }, svg);
    },
    show(i, t, ui) {
      const s = steps[i];
      const v = rotate(s.from, s.axis, s.angle * t);
      const o = project([0, 0, 0]), p = project(v), foot = project([v[0], v[1], 0]);
      if (t === 0 || i !== lastStep) trailPts = [];
      lastStep = i;
      trailPts.push(p);
      trail.setAttribute("points", pts(trailPts));
      for (const [node, a] of [[stem, [o, p]], [drop, [p, foot]]]) {
        node.setAttribute("x1", a[0].sx); node.setAttribute("y1", a[0].sy); node.setAttribute("x2", a[1].sx); node.setAttribute("y2", a[1].sy);
      }
      shadow.setAttribute("cx", foot.sx); shadow.setAttribute("cy", foot.sy);
      tip.setAttribute("cx", p.sx); tip.setAttribute("cy", p.sy);
      root.classList.toggle("pl-is-behind", p.depth < 0);
      const show = Boolean(s.axis);
      for (const node of [axisRod, ...axisEnds]) node.style.display = show ? "" : "none";
      if (show) {
        const a = project(s.axis.map((c) => c * 1.25)), b = project(s.axis.map((c) => -c * 1.25));
        axisRod.setAttribute("x1", a.sx); axisRod.setAttribute("y1", a.sy); axisRod.setAttribute("x2", b.sx); axisRod.setAttribute("y2", b.sy);
        [a, b].forEach((q, k) => { axisEnds[k].setAttribute("cx", q.sx); axisEnds[k].setAttribute("cy", q.sy); });
      }

      const z = Math.max(-1, Math.min(1, v[2])), theta = Math.acos(z);
      const phi = Math.hypot(v[0], v[1]) < 1e-9 ? 0 : (Math.atan2(v[1], v[0]) + 2 * Math.PI) % (2 * Math.PI);
      const p1 = (1 - z) / 2;
      ui.readout("gate", s.gate === "start" ? "none yet" : `${s.gate}${s.gate === "Ry(θ)" ? ` = ${fmt((s.angle * t) / Math.PI, 2)}π` : ""}`);
      ui.readout("θ, φ", `${fmt(theta / Math.PI, 2)}π, ${fmt(phi / Math.PI, 2)}π`);
      ui.readout("P(0), P(1)", `${fmt(1 - p1)}, ${fmt(p1)}`);
      ui.readout("state", ket(Math.cos(theta / 2), Math.sin(theta / 2), phi));
    },
  });
}
