let cart = JSON.parse(localStorage.getItem("cart")) || [];

// product page local state
let localQty = 1;

// ---------- HELPERS ----------
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function findItem(id) {
  return cart.find(i => i.id === id);
}

// ---------- PRODUCT PAGE ----------
function changeLocalQty(delta) {
  localQty += delta;
  if (localQty < 0) localQty = 0;
  updateProductUI();
}

function commitToCart() {
  const card = document.getElementById("productCard");
  const id = card.dataset.id;
  const name = card.dataset.name;
  const price = parseInt(card.dataset.price);

  if (localQty === 0) return;

  let item = findItem(id);

  if (!item) {
    cart.push({ id, name, price, qty: localQty });
  } else {
    item.qty = localQty; // UPDATE quantity
  }

  saveCart();
  updateProductUI();
}

function updateProductUI() {
  const qtyEl = document.getElementById("localQty");
  const btn = document.getElementById("addToCartBtn");
  const card = document.getElementById("productCard");
  const item = findItem(card.dataset.id);

  qtyEl.innerText = localQty;

  if (localQty === 0) {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }

  if (item) {
    btn.innerText = "Update Quantity";
  } else {
    btn.innerText = "Add to Cart";
  }
}

// ---------- CART ----------
function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
}

function renderCart() {
  const el = document.getElementById("cartItems");
  const countEl = document.getElementById("cartCount");

  el.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    el.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong>
        <div class="cart-row">
          <div class="qty-controls">
            <button onclick="updateCartQty('${item.id}', -1)">−</button>
            <span>${item.qty} kg</span>
            <button onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
          <span>₹${item.price * item.qty}</span>
        </div>
      </div>
    `;
  });

  el.innerHTML += `
    <div class="cart-total">Total: ₹${total}</div>
    <button class="btn secondary" onclick="clearCart()">Clear Cart</button>
  `;

  countEl.innerText = count;
}

function updateCartQty(id, delta) {
  let item = findItem(id);
  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

// ---------- INIT ----------
updateProductUI();
renderCart();