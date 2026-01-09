function toggleTheme() {
  const body = document.body;
  const current = body.getAttribute("data-theme");

  if (current === "dark") {
    body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

// Persist theme on reload
(function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
  }
})();
