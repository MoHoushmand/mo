// Mo Paper plates: interactive, step-by-step figures inside a page.
//
// A page places <div class="mo-live" data-plate="NAME" aria-label="..."></div>; loader.js imports
// ./NAME.mjs and calls its default export with the element. A plate module calls plate(el, spec):
//
//   spec = { title, width, height, steps: [{ title, text, cite? }], setup(svg, ui), show(i, t, ui) }
//
// setup draws the static figure once; show(i, t, ui) draws step i at progress t in [0, 1] (t is 1 at
// rest; during a transition it runs 0 -> 1). ui.readout(label, value) sets a readout line. Physics is
// computed in the plate module from cited formulas; nothing here is a typed-in number.
//
// Controls: Back, Play/Pause, Next, Replay, a step counter "n / N", the arrow keys and the space bar.
// With prefers-reduced-motion, steps change instantly and Play advances without animation.

const SVG = "http://www.w3.org/2000/svg";
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function el(tag, attrs = {}, parent) {
  const node = document.createElementNS(SVG, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (parent) parent.appendChild(node);
  return node;
}

function button(label, text, onClick) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "mo-live-btn";
  b.setAttribute("aria-label", label);
  b.textContent = text;
  b.addEventListener("click", onClick);
  return b;
}

export function plate(root, spec) {
  root.classList.add("mo-live--ready");
  root.tabIndex = 0;
  root.setAttribute("role", "group");
  root.setAttribute("aria-roledescription", "interactive figure");
  if (!root.getAttribute("aria-label")) root.setAttribute("aria-label", spec.title);

  const stage = document.createElement("div");
  stage.className = "mo-live-stage";
  const svg = el("svg", { viewBox: `0 0 ${spec.width} ${spec.height}`, role: "img", "aria-label": spec.title });
  stage.appendChild(svg);
  const readouts = document.createElement("dl");
  readouts.className = "mo-live-readouts";
  stage.appendChild(readouts);

  const caption = document.createElement("div");
  caption.className = "mo-live-caption";
  caption.setAttribute("aria-live", "polite");
  const counter = document.createElement("span");
  counter.className = "mo-live-count";

  const bar = document.createElement("div");
  bar.className = "mo-live-bar";
  const back = button("Previous step", "Back", () => go(i - 1));
  const play = button("Play the steps", "Play", () => (timer ? pause() : start()));
  const next = button("Next step", "Next", () => go(i + 1));
  const replay = button("Start again", "Replay", () => { pause(); go(0, true); });
  bar.append(back, play, next, replay, counter);
  root.replaceChildren(stage, caption, bar);

  const lines = new Map();
  const ui = {
    readout(label, value) {
      let row = lines.get(label);
      if (!row) {
        const dt = document.createElement("dt"); dt.textContent = label;
        const dd = document.createElement("dd");
        readouts.append(dt, dd);
        row = dd; lines.set(label, dd);
      }
      row.innerHTML = value;
    },
    svg,
  };
  spec.setup(svg, ui);

  let i = 0, timer = null, frame = null;
  const n = spec.steps.length;

  function render(step, t) {
    spec.show(step, t, ui);
  }
  function describe() {
    const s = spec.steps[i];
    caption.innerHTML = `<p class="mo-live-step"><span>${i + 1}</span> ${s.title}</p><p>${s.text}</p>` +
      (s.cite ? `<p class="mo-live-cite">${s.cite}</p>` : "");
    counter.textContent = `${i + 1} / ${n}`;
    back.disabled = i === 0;
    next.disabled = i === n - 1;
    next.classList.toggle("mo-live-cue", i < n - 1 && !timer);
  }
  function go(target, instant = false) {
    if (target < 0 || target >= n) return;
    i = target;
    cancelAnimationFrame(frame);
    describe();
    if (instant || reduced()) return render(i, 1);
    const t0 = performance.now(), ms = spec.steps[i].ms ?? 900;
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / ms);
      render(i, 0.5 - Math.cos(Math.PI * t) / 2);   // ease in and out
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }
  function start() {
    if (i === n - 1) go(0, true);
    play.textContent = "Pause"; play.setAttribute("aria-label", "Pause the steps");
    timer = setInterval(() => (i < n - 1 ? go(i + 1) : pause()), reduced() ? 2500 : 3200);
    describe();
  }
  function pause() {
    clearInterval(timer); timer = null;
    play.textContent = "Play"; play.setAttribute("aria-label", "Play the steps");
    describe();
  }
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
    else if (e.key === " " && e.target === root) { e.preventDefault(); timer ? pause() : start(); }
  });
  go(0, true);
  return { go, pause };
}

// Solid, lit figures (Mo prefers solid, coloured, dimensional figures to line art). paint(svg) adds the
// shared gradients once per plate and returns their url()s, each id unique to this plate instance:
//   ball(tone)  a sphere lit from the upper left;  slab(tone)  a solid face, lighter at the top;
//   rod(tone)   a cylinder seen side-on (for axes, wires and stems).
// Tones are gold, teal, lilac, blue and paper; their colours live in plates.css, so both themes work.
let paintCount = 0;
export function paint(svg) {
  const id = `pl${++paintCount}`, defs = el("defs", {}, svg), made = new Set();
  const stops = (g, tone, list) => list.forEach(([offset, shade]) => el("stop", { offset, class: `pl-stop-${tone}-${shade}` }, g));
  const make = (kind, tone) => {
    const key = `${id}-${kind}-${tone}`;
    if (!made.has(key)) {
      made.add(key);
      if (kind === "ball") stops(el("radialGradient", { id: key, cx: "0.35", cy: "0.3", r: "0.75" }, defs), tone, [["0", "hi"], ["0.55", "mid"], ["1", "lo"]]);
      if (kind === "slab") stops(el("linearGradient", { id: key, x1: "0", y1: "0", x2: "0", y2: "1" }, defs), tone, [["0", "hi"], ["1", "mid"]]);
      if (kind === "rod") stops(el("linearGradient", { id: key, x1: "0", y1: "0", x2: "1", y2: "0" }, defs), tone, [["0", "lo"], ["0.4", "hi"], ["1", "lo"]]);
    }
    return `url(#${key})`;
  };
  return { ball: (t) => make("ball", t), slab: (t) => make("slab", t), rod: (t) => make("rod", t) };
}

// Small helpers the plates share.
export const fmt = (x, digits = 3) => (Math.abs(x) < 5e-4 ? "0" : x.toFixed(digits)).replace("-", "−");
export const lerp = (a, b, t) => a + (b - a) * t;
