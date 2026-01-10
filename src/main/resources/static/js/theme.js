const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    document.body.setAttribute("data-theme", isDark ? "light" : "dark");
    localStorage.setItem("theme", isDark ? "light" : "dark");
  });
}

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.setAttribute("data-theme", savedTheme);
}
