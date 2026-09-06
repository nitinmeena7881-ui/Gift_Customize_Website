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

        <span class="badge">
          50% OFF
        </span>


        <h3>
          ${p.name}
        </h3>


        <p>
          ${p.category} • Personalized gifting
        </p>


        <div class="price">

          <span class="old">
            ${money(p.original)}
          </span>

          <b class="sale">
            ${money(p.price)}
          </b>

        </div>


        <div class="inside">

          <strong>
            What's Inside
          </strong>

          <p>
            ${p.description}
          </p>

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
   CUSTOMIZE
========================= */

function renderCustom() {

  const box =
    document.getElementById("customGrid");


  box.innerHTML =
    customItems.map((x, i) => `

      <div
        class="custom-item ${
          selected.includes(i)
            ? "selected"
            : ""
        }"
        onclick="toggleCustom(${i})"
      >

        <div class="custom-photo">

          <img
            src="${x[0]}"
            alt="${x[1]}"
            loading="lazy"
          >

        </div>


        <b>
          ${x[1]}
        </b>


        ${
          selected.includes(i)
            ? `<small class="selected-label">
                 ✓ Selected
               </small>`
            : `<small>
                 Tap to select
               </small>`
        }

      </div>

    `).join("");


  document.getElementById(
    "selectedText"
  ).textContent =
    `${selected.length} / 4 selected`;


  document.getElementById(
    "selectedItems"
  ).textContent =
    selected.length
      ? selected
          .map(i => customItems[i][1])
          .join(", ")
      : "No items selected";


  document.getElementById(
    "customCart"
  ).disabled =
    selected.length !== 4;
}


/* =========================
   SELECT CUSTOM ITEM
========================= */

function toggleCustom(i) {

  if (selected.includes(i)) {

    selected =
      selected.filter(
        x => x !== i
      );

  } else if (selected.length < 4) {

    selected.push(i);

  }

  renderCustom();
}


/* =========================
   ADD PRODUCT
========================= */

function addProduct(i) {

  cart.push({

    name: products[i].name,

    price: Number(
      products[i].price
    ),

    image: products[i].image

  });


  updateCart();

  openCart();
}


/* =========================
   ADD CUSTOM HAMPER
========================= */

function addCustomToCart() {

  if (selected.length !== 4) {

    alert(
      "Please select exactly 4 items."
    );

    return;
  }


  cart.push({

    name:
      "Build Your Own Hamper — Any 4 Items",

    price: 599,

    items:
      selected.map(
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

  document.getElementById(
    "cartCount"
  ).textContent =
    cart.length;


  const cartBox =
    document.getElementById(
      "cartItems"
    );


  if (!cart.length) {

    cartBox.innerHTML =
      `<p class="muted">
        Your cart is empty.
      </p>`;

  } else {

    cartBox.innerHTML =
      cart.map((x, i) => `

        <div class="cart-row">

          <span>

            <b>
              ${x.name}
            </b>


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


          <b>
            ${money(x.price)}
          </b>

        </div>

      `).join("");

  }


  document.getElementById(
    "cartTotal"
  ).textContent =

    money(
      cart.reduce(
        (total, item) =>
          total + Number(item.price),
        0
      )
    );
}


/* =========================
   CART MODAL
========================= */

function openCart() {

  document.getElementById(
    "cartModal"
  ).style.display =
    "block";


  updateCart();
}


function closeCart() {

  document.getElementById(
    "cartModal"
  ).style.display =
    "none";
}


/* =========================
   CHECKOUT
========================= */

function checkout() {

  if (!cart.length) {

    alert(
      "Please add a product first."
    );

    return;
  }


  closeCart();


  const total =
    cart.reduce(
      (sum, item) =>
        sum + Number(item.price),
      0
    );


  document.getElementById(
    "checkoutItemsCount"
  ).textContent =
    cart.length;


  document.getElementById(
    "checkoutTotal"
  ).textContent =
    money(total);


  document.getElementById(
    "checkoutModal"
  ).style.display =
    "block";
}


function closeCheckout() {

  document.getElementById(
    "checkoutModal"
  ).style.display =
    "none";
}


/* =========================
   CREATE ORDER
========================= */

async function submitOrder(event) {

  event.preventDefault();


  if (!cart.length) {

    alert(
      "Your cart is empty."
    );

    return;
  }


  const name =
    document.getElementById(
      "customerName"
    ).value.trim();


  const mobile =
    document.getElementById(
      "customerMobile"
    ).value.trim();


  const address =
    document.getElementById(
      "customerAddress"
    ).value.trim();


  const city =
    document.getElementById(
      "customerCity"
    ).value.trim();


  const state =
    document.getElementById(
      "customerState"
    ).value.trim();


  const pincode =
    document.getElementById(
      "customerPincode"
    ).value.trim();


  if (!/^[0-9]{10}$/.test(mobile)) {

    alert(
      "Please enter a valid 10 digit mobile number."
    );

    return;
  }


  if (!/^[0-9]{6}$/.test(pincode)) {

    alert(
      "Please enter a valid 6 digit PIN code."
    );

    return;
  }


  if (name.length < 2) {

    alert(
      "Please enter your full name."
    );

    return;
  }


  if (address.length < 5) {

    alert(
      "Please enter your complete address."
    );

    return;
  }


  const total =
    cart.reduce(
      (sum, item) =>
        sum + Number(item.price),
      0
    );


  const orderId =
    "GC-" +
    Date.now()
      .toString()
      .slice(-8);


  const orderItems =
    cart.map(item => ({

      name: item.name,

      price: Number(item.price),

      image:
        item.image || null,

      items:
        item.items || []

    }));


  const button =
    document.getElementById(
      "placeOrderBtn"
    );


  button.disabled = true;

  button.textContent =
    "Creating Order...";


  try {

    const { error } =
      await supabaseClient
        .from("orders")
        .insert({

          order_id: orderId,

          customer_name: name,

          mobile: mobile,

          address: address,

          city: city,

          state: state,

          pincode: pincode,

          items: orderItems,

          total_amount: total,

          payment_status:
            "Pending",

          order_status:
            "Pending"

        });


    if (error) {

      console.error(
        "Supabase Order Error:",
        error
      );


      alert(
        "Order could not be created.\n\n" +
        error.message
      );


      button.disabled = false;

      button.textContent =
        "Continue to Payment";

      return;
    }


    /* SAVE LAST ORDER */

    localStorage.setItem(
      "lastGiftCustomizeOrder",
      JSON.stringify({

        orderId: orderId,

        name: name,

        mobile: mobile,

        address: address,

        city: city,

        state: state,

        pincode: pincode,

        total: total

      })
    );


    /* SHOW ORDER ID */

    document.getElementById(
      "successOrderId"
    ).textContent =
      orderId;


    document.getElementById(
      "successTotal"
    ).textContent =
      money(total);


    document.getElementById(
      "checkoutModal"
    ).style.display =
      "none";


    document.getElementById(
      "orderSuccessModal"
    ).style.display =
      "block";


    cart = [];

    updateCart();


    document.getElementById(
      "checkoutForm"
    ).reset();


    button.disabled = false;

    button.textContent =
      "Continue to Payment";


  } catch (error) {

    console.error(error);


    alert(
      "Something went wrong. Please try again."
    );


    button.disabled = false;

    button.textContent =
      "Continue to Payment";
  }
}



/* =========================
   SUBMIT PAYMENT / UTR
========================= */

async function submitPayment() {

  const order =
    JSON.parse(
      localStorage.getItem(
        "lastGiftCustomizeOrder"
      ) || "null"
    );


  if (!order || !order.orderId) {

    alert(
      "Order information not found. Please create the order again."
    );

    return;
  }


  const utr =
    document.getElementById(
      "paymentUtr"
    ).value.trim();


  if (utr.length < 6) {

    alert(
      "Please enter a valid UTR / Transaction ID."
    );

    return;
  }


  const button =
    document.querySelector(
      ".payment-section button"
    );


  button.disabled = true;

  button.textContent =
    "Submitting...";


  try {

    const { data, error } =
      await supabaseClient.rpc(
        "submit_payment",
        {
          p_order_id:
            order.orderId,

          p_utr:
            utr
        }
      );


    if (error) {

      console.error(
        "Payment Error:",
        error
      );


      alert(
        "Payment details could not be submitted.\n\n" +
        error.message
      );


      button.disabled = false;

      button.textContent =
        "Submit Payment Details";

      return;
    }


    /* SAVE UTR WITH ORDER DETAILS */

    order.utr = utr;

    order.paymentStatus =
      "Submitted";


    localStorage.setItem(
      "lastGiftCustomizeOrder",
      JSON.stringify(order)
    );


    /* SUCCESS */

    button.textContent =
      "Payment Details Submitted ✓";


    button.disabled = true;


    alert(
      "Payment details submitted successfully!\n\n" +
      "Order ID: " +
      order.orderId +
      "\n\n" +
      "Our team will verify your payment."
    );

  } catch (error) {

    console.error(error);


    alert(
      "Something went wrong. Please try again."
    );


    button.disabled = false;

    button.textContent =
      "Submit Payment Details";
  }
}




/* =========================
   WHATSAPP ORDER DETAILS
========================= */


function sendOrderOnWhatsApp() {

  const order =
    JSON.parse(
      localStorage.getItem(
        "lastGiftCustomizeOrder"
      ) || "null"
    );


  if (!order || !order.orderId) {

    alert(
      "Order information not found. Please create the order again."
    );

    return;
  }


  const message =
    `Hello Gift Customize,

Order ID: ${order.orderId}

Customer: ${order.name}

Mobile: ${order.mobile}

Address: ${order.address}, ${order.city}, ${order.state} - ${order.pincode}

Total Amount: ${money(order.total)}

Payment: Online Payment

UTR / Transaction ID: ${order.utr || "Not submitted"}

Order Status: Payment Submitted

I have placed my order and completed the payment.`;


  const url =
    "https://wa.me/918003163744?text=" +
    encodeURIComponent(message);


  window.open(
    url,
    "_blank"
  );
}


/* =========================
   ORDER SUCCESS
========================= */

function closeOrderSuccess() {

  document.getElementById(
    "orderSuccessModal"
  ).style.display =
    "none";
}


/* =========================
   START
========================= */

renderProducts();

renderCustom();

updateCart();
