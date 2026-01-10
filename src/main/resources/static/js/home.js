// Scroll to category
function scrollToCategory(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Collapse / Expand category
function toggleCategory(btn) {
  const content = btn.closest(".category-section")
                     .querySelector(".category-content");
  content.classList.toggle("collapsed");
  btn.textContent = content.classList.contains("collapsed") ? "▶" : "⌄";
}

// Auto highlight active category on scroll
const productScroll = document.getElementById("productScroll");
const sections = document.querySelectorAll(".category-section");
const menuItems = document.querySelectorAll(".category-sidebar li");

productScroll.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (productScroll.scrollTop >= top) {
      current = section.id;
    }
  });

  menuItems.forEach(li => {
    li.classList.toggle("active", li.dataset.cat === current);
  });
});
function scrollFromData(el) {
  const cat = el.getAttribute("data-cat");
  if (!cat) return;

  const section = document.getElementById(cat);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}
