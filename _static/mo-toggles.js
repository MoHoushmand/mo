// sphinx-book-theme 1.3 and pydata-sphinx-theme 0.17 both wire the sidebar toggles to the first
// .primary-toggle / .secondary-toggle on the page, which sits in pydata's top navbar (hidden by
// mo-paper.css). The visible buttons in the article header forward their clicks to those, so the menu
// opens on phones and the sidebar collapses on wide screens.
document.addEventListener("DOMContentLoaded", () => {
  for (const kind of ["primary", "secondary"]) {
    const target = document.querySelector(`#pst-header .${kind}-toggle`);
    if (!target) continue;
    document.querySelectorAll(`.bd-header-article .${kind}-toggle`).forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        target.click();
      }, true);
    });
  }
});
