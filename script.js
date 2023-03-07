const products = [
  {
    product_name: "Gold Coin",
    product_price: "112.55",
    product_image: "gold-coin.png",
    added_to_cart: false,
  },
  {
    product_name: "Silver Ring",
    product_price: "45.99",
    product_image: "silver-ring.png",
    added_to_cart: false,
  },
  {
    product_name: "Diamond Necklace",
    product_price: "789.99",
    product_image: "diamond-necklace.png",
    added_to_cart: false,
  },
  {
    product_name: "Platinum Watch",
    product_price: "399.99",
    product_image: "platinum-watch.png",
    added_to_cart: false,
  },
  {
    product_name: "Emerald Earrings",
    product_price: "299.99",
    product_image: "emerald-earrings.png",
    added_to_cart: false,
  },
  {
    product_name: "Ruby Bracelet",
    product_price: "599.99",
    product_image: "ruby-bracelet.png",
    added_to_cart: false,
  },
];

const allProducts = products;
allProducts.forEach((product, index) => {
  product.id = index;
});

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const cartIndicators = document.querySelectorAll(".cart-indicator");

const updateCartIndicator = function () {
  cartItems = products.filter((product) => product.added_to_cart);
  cartIndicators.forEach((cartIndicator) => {
    cartIndicator.innerText = cartItems.length;
    cartIndicator.dataset.indicator = cartItems.length;
  });
};

const addToCart = function (product, id) {
  if (product.added_to_cart) return;
  cartItems.push(product);
  allProducts[id].added_to_cart = true;
  const html = `
    <li class="product li-product-${id}" data-id="${id}">
      <img
        class="item-image"
        src="/assets/img/${product.product_image}"
        alt="${product.product_name} product"
      />
      <span class="item-name">${product.product_name}</span>
      <span class="item-price">${new Intl.NumberFormat("us-US", {
        style: "currency",
        currency: "USD",
      }).format(product.product_price)}</span>
      <img class="item-delete delete-from-cart-icon" src="/assets/svg/remove.svg"/>
    </li>
  `;
  const shoppingCartItems = document.querySelector(".shopping-cart-items");
  shoppingCartItems.insertAdjacentHTML("beforeend", html);
};

const addToCartWithoutCheck = function (product, id) {
  const html = `
    <li class="product li-product-${id}" data-id="${id}">
      <img
        class="item-image"
        src="/assets/img/${product.product_image}"
        alt="${product.product_name} product"
      />
      <span class="item-name">${product.product_name}</span>
      <span class="item-price">${new Intl.NumberFormat("us-US", {
        style: "currency",
        currency: "USD",
      }).format(product.product_price)}</span>
      <img class="item-delete delete-from-cart-icon" src="/assets/svg/remove.svg"/>
    </li>
  `;
  const shoppingCartItems = document.querySelector(".shopping-cart-items");
  shoppingCartItems.insertAdjacentHTML("beforeend", html);
};

const updateTotalPrice = function () {
  const totalPrice = document.querySelector(".shopping-cart-total-price");
  const totalPriceValue = cartItems.reduce((acc, product) => {
    return acc + parseFloat(product.product_price);
  }, 0);
  totalPrice.textContent = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPriceValue);
};

const renderProducts = function () {
  allProducts.forEach((product) => {
    renderProductCard(product, product.id);
  });
};

const renderProductCard = function (product) {
  const html = `
    <div class="product-card product-card-${product.id} product" data-id="${
    product.id
  }">
      <img src='/assets/img/${product.product_image}' alt="${
    product.product_name
  } product" />
      <h3>${product.product_name}</h3>
      <p class="price">${new Intl.NumberFormat("us-US", {
        style: "currency",
        currency: "USD",
      }).format(product.product_price)}</p>
      <div class='card-buttons'>
        <button class='add-to-cart add-to-cart-btn-${
          product.id
        }'>Add to Cart</button>
        <button class='quick-view'>Quick View</button>
      </div>
    </div>
  `;
  const productsContainer = document.querySelector(".product-container");
  productsContainer.insertAdjacentHTML("beforeend", html);
};

const toggleCardBtn = function (btn, newText) {
  btn.classList.toggle("add-to-cart");
  btn.classList.toggle("delete-from-cart");
  btn.classList.toggle("delete-style");
  btn.textContent = newText;
};

window.addEventListener("click", function (e) {
  //add to cart clicked
  if (e.target.classList.contains("add-to-cart")) {
    const id = e.target.closest(".product").dataset.id;
    const btns = document.querySelectorAll(`.add-to-cart-btn-${id}`);
    btns.forEach((btn) => {
      toggleCardBtn(btn, "Remove From Cart");
    });
    addToCart(allProducts[id], id);
    updateCartIndicator();
    updateTotalPrice();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return;
  }

  //delete from cart clicked
  if (e.target.classList.contains("delete-from-cart")) {
    const id = e.target.closest(".product").dataset.id;
    const btns = this.document.querySelectorAll(`.add-to-cart-btn-${id}`);
    cartItems.splice(id, 1);
    btns.forEach((btn) => {
      console.log("gg");
      toggleCardBtn(btn, "Add To Cart");
    });
    allProducts[id].added_to_cart = false;
    document.querySelector(`.li-product-${id}`).remove();
    updateCartIndicator();
    updateTotalPrice();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return;
  }

  //delete from cart icon clicked
  if (e.target.classList.contains("delete-from-cart-icon")) {
    const id = e.target.closest(".product").dataset.id;
    cartItems.splice(id, 1);
    allProducts[id].added_to_cart = false;
    document.querySelector(`.li-product-${id}`).remove();
    const btns = document.querySelectorAll(`.add-to-cart-btn-${id}`);
    btns.forEach((btn) => {
      toggleCardBtn(btn, "Add To Cart");
    });
    updateCartIndicator();
    updateTotalPrice();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return;
  }

  //show cart clicked
  if (e.target.classList.contains("show-cart-btn")) {
    document.querySelector(".shopping-cart").classList.toggle("hidden");
    return;
  }

  //quick view clicked
  if (e.target.classList.contains("quick-view")) {
    const id = e.target.closest(".product").dataset.id;
    const product = allProducts[id];
    const html = `
       <div class="product modal-box" data-id="${product.id}">
        <img class="modal-img" src="/assets/img/${
          product.product_image
        }" alt="" />
        <div>
          <div>
            <h2>${product.product_name}</h2>
            <p class="price">
              <span class="price">${new Intl.NumberFormat("us-US", {
                style: "currency",
                currency: "USD",
              }).format(product.product_price)}</span>
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              sapiente mollitia eaque quaerat.
            </p>
          </div>
          <div class="modal-buttons">
            <button class=" add-to-cart-btn-${product.id} ${
      allProducts[product.id].added_to_cart
        ? "delete-from-cart delete-style"
        : "add-to-cart"
    }">
             ${
               allProducts[product.id].added_to_cart
                 ? "Remove From Cart"
                 : "Add To Cart"
             }
            </button>
          </div>
        </div>
      </div>
    `;
    const modal = document.querySelector(".modal");
    modal.insertAdjacentHTML("beforeend", html);
    modal.classList.remove("hidden");
    return;
  }

  if (e.target.classList.contains("modal")) {
    document.querySelector(".modal").innerHTML = "";
    document.querySelector(".modal").classList.add("hidden");
  }
  //if no element from those have been clicked, hide the cart
  document.querySelector(".shopping-cart").classList.add("hidden");
});

renderProducts();
