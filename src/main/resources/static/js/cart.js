const CART_KEY = "csg_cart";
const PHONE = "918446861047";

/* ================= CART CORE ================= */

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = getCart().length;
}

/* ================= ADD TO CART ================= */

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);

  if (existing) return; // do NOT re-add

  cart.push(product);
  saveCart(cart);
  flashCart();
  showToast("Added to cart 🛒");
}

/* ================= CART UI ================= */

function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cartItems");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty 🛒</p>";
    return;
  }

  let total = 0;
  container.innerHTML = "";

  cart.forEach(item => {
    const price = Math.round(
      (item.pricePerKg * item.quantityInGrams) / 1000
    );
    total += price;

    container.innerHTML += `
      <div class="cart-item">
        <div class="cart-row">
          <strong>${item.name}</strong>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
        </div>

        <div class="cart-row">
          <div class="qty-controls">
            <button onclick="changeQty(${item.id}, 'dec')">−</button>
            <span>${item.quantityInGrams} g</span>
            <button onclick="changeQty(${item.id}, 'inc')">+</button>
          </div>
          <div class="price">₹${price}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML += `
    <div class="cart-total">
      <strong>Total: ₹${total}</strong>
    </div>
  `;
}

/* ================= QUANTITY LOGIC ================= */

function changeQty(id, type) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  if (!item) return;

  if (type === "inc") {
    item.quantityInGrams *= 2;
  }

  if (type === "dec") {
    if (item.quantityInGrams === item.baseQuantityGrams) {
      removeFromCart(id);
      return;
    }
    item.quantityInGrams /= 2;
  }

  saveCart(cart);
  renderCart();
}

function removeFromCart(id) {
  const cart = getCart().filter(p => p.id !== id);
  saveCart(cart);
  renderCart();
}

/* ================= WHATSAPP ================= */

function placeOrderOnWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty 🛒");
    return;
  }

  let msg = "Hi, I want to order:\n\n";
  let total = 0;

  cart.forEach(item => {
    const price = Math.round(
      (item.pricePerKg * item.quantityInGrams) / 1000
    );
    total += price;
    msg += `- ${item.name} (${item.quantityInGrams}g) – ₹${price}\n`;
  });

  msg += `\nTotal: ₹${total}`;

  window.open(
    `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

/* ================= PRODUCT PAGE HOOK ================= */

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const addBtn = document.getElementById("addToCartBtn");
  const removeBtn = document.getElementById("removeFromCartBtn");
  const card = document.getElementById("productCard");
  if (!addBtn || !card) return;

  const productId = parseInt(card.dataset.id, 10);
  const cart = getCart();

  if (cart.some(p => p.id === productId)) {
    addBtn.textContent = "Added ✓";
    addBtn.classList.add("added");
    addBtn.disabled = true;
    if (removeBtn) removeBtn.style.display = "inline-block";
  }

  addBtn.addEventListener("click", () => {
    const qty = parseInt(document.getElementById("qty").value, 10);

    addToCart({
      id: productId,
      name: card.dataset.name,
      pricePerKg: parseInt(card.dataset.price),
      quantityInGrams: qty,
      baseQuantityGrams: qty,
      category: card.dataset.category
    });

    addBtn.textContent = "Added ✓";
    addBtn.classList.add("added");
    addBtn.disabled = true;
    if (removeBtn) removeBtn.style.display = "inline-block";
  });

  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      removeFromCart(productId);
      location.reload();
    });
  }
});

/* ================= VISUAL HELPERS ================= */

function flashCart() {
  const fab = document.querySelector(".cart-fab");
  if (!fab) return;
  fab.classList.add("flash");
  setTimeout(() => fab.classList.remove("flash"), 800);
}

function showToast(text) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}
