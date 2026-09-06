let cart = [];
let selected = [];

function money(n) {
  return "₹" + Number(n).toFixed(2);
}

/* ================= PRODUCTS ================= */

function renderProducts() {
  const box = document.getElementById("products");

  if (!box) return;

  box.innerHTML = products.map((p, i) => `
    <article class="product">

      <div class="product-img">
        <img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.parentElement.innerHTML='<span>Gift Customize</span>'"
        >
      </div>

      <div class="product-body">

        <span class="badge">50% OFF</span>

        <h3>${p.name}</h3>

        <p>${p.category} • Personalized gifting</p>

        <div class="price">
          <span class="old">${money(p.original)}</span>
          <b class="sale">${money(p.price)}</b>
        </div>

        <button
          class="btn dark"
          onclick="addProduct(${i})"
        >
          Add to Cart
        </button>

      </div>

    </article>
  `).join("");
}


/* ================= CUSTOM ITEMS ================= */

function renderCustom() {
  const box = document.getElementById("customGrid");

  if (!box) return;

  box.innerHTML = customItems.map((x, i) => `
    <div
      class="custom-item ${selected.includes(i) ? "selected" : ""}"
      onclick="toggleCustom(${i})"
    >

      <div class="custom-photo">
        ${x[0]}
      </div>

      <b>${x[1]}</b>

      <small>
        Eligible for ₹599 hamper
      </small>

    </div>
  `).join("");

  document.getElementById("selectedText").textContent =
    `${selected.length} / 4 selected`;

  document.getElementById("selectedItems").textContent =
    selected.length
      ? selected.map(i => customItems[i][1]).join(", ")
      : "No items selected";

  document.getElementById("customCart").disabled =
    selected.length !== 4;
}


/* ================= CUSTOM SELECTION ================= */

function toggleCustom(i) {

  if (selected.includes(i)) {

    selected = selected.filter(x => x !== i);

  } else if (selected.length < 4) {

    selected.push(i);

  }

  renderCustom();
}


/* ================= ADD PRODUCT ================= */

function addProduct(i) {

  const product = products[i];

  cart.push({
    name: product.name,
    price: Number(product.price),
    image: product.image
  });

  updateCart();
  openCart();
}


/* ================= CUSTOM HAMPER ================= */

function addCustomToCart() {

  if (selected.length !== 4) {
    alert("Please select exactly 4 items.");
    return;
  }

  cart.push({
    name: "Build Your Own Hamper — Any 4 Items",
    price: 599,
    items: selected.map(i => customItems[i][1])
  });

  selected = [];

  renderCustom();
  updateCart();
  openCart();
}


/* ================= CART ================= */

function updateCart() {

  const count = document.getElementById("cartCount");
  const itemsBox = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartTotal");

  if (count) {
    count.textContent = cart.length;
  }

  if (itemsBox) {

    itemsBox.innerHTML = cart.length
      ? cart.map((x, i) => `
        <div class="cart-row">

          <span>
            ${x.name}

            ${
              x.items
                ? `<small style="display:block;color:#888;margin-top:4px">
                    ${x.items.join(" • ")}
                   </small>`
                : ""
            }
          </span>

          <b>
            ${money(x.price)}
          </b>

        </div>
      `).join("")

      : `<p class="muted">Your cart is empty.</p>`;
  }

  if (totalBox) {

    totalBox.textContent =
      money(cart.reduce((sum, item) => sum + item.price, 0));

  }
}


/* ================= CART MODAL ================= */

function openCart() {

  const modal = document.getElementById("cartModal");

  if (modal) {
    modal.style.display = "block";
  }

  updateCart();
}


function closeCart() {

  const modal = document.getElementById("cartModal");

  if (modal) {
    modal.style.display = "none";
  }
}


/* ================= CHECKOUT ================= */

function checkout() {

  if (!cart.length) {

    alert("Please add a product first.");
    return;

  }

  alert(
    "Checkout foundation is ready.\n\nNext step: Online QR payment + customer address + order management."
  );
}


/* ================= START WEBSITE ================= */

renderProducts();
renderCustom();
updateCart();
