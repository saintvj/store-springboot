/*************************
 * CART STATE
 *************************/
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const PRODUCT_QTY = 1000; // 1 unit = 1000 g

/*************************
 * HELPERS
 *************************/
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function findItem(id) {
  return cart.find(i => i.id === id);
}

/*************************
 * PRODUCT PAGE LOGIC
 *************************/
function syncProductControls() {
  const card = document.getElementById("productCard");
  if (!card) return;

  const id = card.dataset.id;
  const item = findItem(id);

  const qtyText = document.getElementById("productQty");
  const addBtn = document.getElementById("addToCartBtn");

  const count = item ? item.qty / PRODUCT_QTY : 0;

  qtyText.innerText = count;
  addBtn.disabled = count === 0;
}

function addFromProduct() {
  const card = document.getElementById("productCard");
  const id = card.dataset.id;
  const name = card.dataset.name;
  const price = parseInt(card.dataset.price);

  let item = findItem(id);

  if (!item) {
    cart.push({
      id,
      name,
      price,
      qty: PRODUCT_QTY
    });
  }

  saveCart();
  syncProductControls();
}

function increaseFromProduct() {
  const card = document.getElementById("productCard");
  const id = card.dataset.id;
  const name = card.dataset.name;
  const price = parseInt(card.dataset.price);

  let item = findItem(id);

  // 🔥 FIX: if item does not exist, re-add it
  if (!item) {
    cart.push({ id, name, price, qty: PRODUCT_QTY });
  } else {
    item.qty += PRODUCT_QTY;
  }

  saveCart();
  syncProductControls();
}

function decreaseFromProduct() {
  const card = document.getElementById("productCard");
  const id = card.dataset.id;

  let item = findItem(id);
  if (!item) return;

  item.qty -= PRODUCT_QTY;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  syncProductControls();
}

/*************************
 * CART DRAWER
 *************************/
function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
}

/*************************
 * CART RENDER
 *************************/
function renderCart() {
  const itemsEl = document.getElementById("cartItems");
  const countEl = document.getElementById("cartCount");

  if (!itemsEl || !countEl) return;

  itemsEl.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const units = item.qty / PRODUCT_QTY;
    const price = item.price * units;

    total += price;
    count += units;

    itemsEl.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong>

        <div class="cart-row">
          <div class="qty-controls">
            <button onclick="updateQty('${item.id}', -1)">−</button>
            <span>${item.qty} g</span>
            <button onclick="updateQty('${item.id}', 1)">+</button>
          </div>
          <span>₹${price}</span>
        </div>
      </div>
    `;
  });

  itemsEl.innerHTML += `
    <div class="cart-total">Total: ₹${total}</div>
    <button class="btn secondary full-width" onclick="clearCart()">
      Clear Cart
    </button>
  `;

  countEl.innerText = count;
  syncProductControls();
}

/*************************
 * CART ACTIONS
 *************************/
function updateQty(id, delta) {
  let item = findItem(id);
  if (!item) return;

  item.qty += delta * PRODUCT_QTY;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

/*************************
 * INIT
 *************************/
renderCart();
syncProductControls();