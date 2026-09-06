let cart = [];
let selected = [];

function money(n) {
  return "₹" + Number(n).toFixed(2);
}

/* =========================
   50% OFF HAMPERS
========================= */

function renderProducts() {
  const box = document.getElementById("products");

  box.innerHTML = products.map((p, i) => `
    <article class="product">

      <div class="product-img">
        <img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
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

        <div class="inside">
          <strong>What's Inside</strong>
          <p>${p.description}</p>
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


/* =========================
   CUSTOMIZE — ANY 4 ₹599
========================= */

function renderCustom() {
  const box = document.getElementById("customGrid");

  box.innerHTML = customItems.map((x, i) => `
    <div
      class="custom-item ${selected.includes(i) ? "selected" : ""}"
      onclick="toggleCustom(${i})"
    >

      <div class="custom-photo">
        <img
          src="${x[0]}"
          alt="${x[1]}"
          loading="lazy"
        >
      </div>

      <b>${x[1]}</b>

      ${
        selected.includes(i)
          ? `<small class="selected-label">✓ Selected</small>`
          : `<small>Tap to select</small>`
      }

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


/* =========================
   SELECT CUSTOM ITEM
========================= */

function toggleCustom(i) {

  if (selected.includes(i)) {

    selected = selected.filter(x => x !== i);

  } else if (selected.length < 4) {

    selected.push(i);

  }

  renderCustom();
}


/* =========================
   ADD HAMPER TO CART
========================= */

function addProduct(i) {

  cart.push({
    name: products[i].name,
    price: products[i].price,
    image: products[i].image
  });

  updateCart();
  openCart();
}


/* =========================
   ADD CUSTOM HAMPer
========================= */

function addCustomToCart() {

  if (selected.length !== 4) {

    alert("Please select exactly 4 items.");

    return;
  }

  cart.push({

    name: "Build Your Own Hamper — Any 4 Items",

    price: 599,

    items: selected.map(
      i => customItems[i][1]
    )

  });

  selected = [];

  renderCustom();

  updateCart();

  openCart();
}


/* =========================
   CART
========================= */

function updateCart() {

  document.getElementById("cartCount").textContent =
    cart.length;

  const cartBox =
    document.getElementById("cartItems");

  if (!cart.length) {

    cartBox.innerHTML =
      `<p class="muted">Your cart is empty.</p>`;

  } else {

    cartBox.innerHTML = cart.map((x, i) => `

      <div class="cart-row">

        <span>

          <b>${x.name}</b>

          ${
            x.items
              ? `<small style="
                    display:block;
                    color:#888;
                    margin-top:5px;
                  ">
                  ${x.items.join(" • ")}
                 </small>`
              : ""
          }

        </span>

        <b>${money(x.price)}</b>

      </div>

    `).join("");
  }

  document.getElementById("cartTotal").textContent =
    money(
      cart.reduce(
        (total, item) => total + item.price,
        0
      )
    );
}


/* =========================
   CART MODAL
========================= */

function openCart() {

  document.getElementById("cartModal").style.display =
    "block";

  updateCart();
}


function closeCart() {

  document.getElementById("cartModal").style.display =
    "none";
}


/* =========================
   CHECKOUT
========================= */

function checkout() {

  if (!cart.length) {

    alert("Please add a product first.");

    return;
  }

  alert(
    "Checkout foundation is ready. Online payment only. COD is not available."
  );
}


/* =========================
   START WEBSITE
========================= */

renderProducts();

renderCustom();

updateCart();
