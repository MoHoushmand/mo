// Finds every <div class="mo-live" data-plate="NAME"> on the page and mounts plates/NAME.mjs into it.
// A classic script (Sphinx's html_js_files cannot mark a file as a module), so it loads the plates with
// dynamic import(), relative to its own address. The plates are .mjs files because Jupyter Book adds
// every *.js under a static path to every page as a classic script, which would break ES modules.
(function () {
  const base = document.currentScript.src;
  function mount() {
    document.querySelectorAll(".mo-live[data-plate]").forEach((node) => {
      const name = node.dataset.plate;
      if (!/^[a-z0-9-]+$/.test(name)) return;
      import(new URL(`${name}.mjs`, base).href)
        .then((m) => m.default(node))
        .catch((err) => {
          node.classList.add("mo-live--failed");
          node.textContent = "This interactive figure could not load.";
          console.error(`plate ${name}:`, err);
        });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
