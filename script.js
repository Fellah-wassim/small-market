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

const cartIndicators = document.querySelectorAll(".cart-indicator");
let cartItems = [];

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
  products[id].added_to_cart = true;
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
  products.forEach((product, index) => {
    renderProductCard(product, index);
  });
};

const renderProductCard = function (product, index) {
  const html = `
    <div class="product-card product-card-${index} product" data-id="${index}">
      <img src='/assets/img/${product.product_image}' alt="${
    product.product_name
  } product" />
      <h3>${product.product_name}</h3>
      <p class="price">${new Intl.NumberFormat("us-US", {
        style: "currency",
        currency: "USD",
      }).format(product.product_price)}</p>
      <div class='card-buttons'>
        <button class='add-to-cart add-to-cart-btn-${index}'>Add to Cart</button>
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

const updateInfo = function () {
  updateCartIndicator();
  updateTotalPrice();
};

renderProducts();
window.addEventListener("click", function (e) {
  //add to cart clicked
  if (e.target.classList.contains("add-to-cart")) {
    const btn = e.target;
    const id = e.target.closest(".product").dataset.id;
    toggleCardBtn(btn, "Remove From Cart");
    addToCart(products[id], id);
    updateInfo();
    return;
  }

  //delete from cart clicked
  if (e.target.classList.contains("delete-from-cart")) {
    const id = e.target.closest(".product").dataset.id;
    const btn = e.target;
    toggleCardBtn(btn, "Add To Cart");
    products[id].added_to_cart = false;
    document.querySelector(`.li-product-${id}`).remove();
    updateInfo();
    return;
  }

  //delete from cart icon clicked
  if (e.target.classList.contains("delete-from-cart-icon")) {
    const id = e.target.closest(".product").dataset.id;
    products[id].added_to_cart = false;
    document.querySelector(`.li-product-${id}`).remove();
    const btn = document.querySelector(`.add-to-cart-btn-${id}`);
    toggleCardBtn(btn, "Add To Cart");
    updateInfo();
    return;
  }
});
