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

const addToCart = function (product) {
  if (product.added_to_cart) return;
  cartItems.push(product);
  product.added_to_cart = true;
  const html = `
    <li>
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
    </li>
  `;
  const shoppingCartItems = document.querySelector(".shopping-cart-items");
  shoppingCartItems.insertAdjacentHTML("beforeend", html);
  updateCartIndicator();
  updateTotalPrice();
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

var addToCartBtn;
const renderProducts = function () {
  products.forEach((product, index) => {
    renderProductCard(product, index);
  });
  addToCartBtn = document.querySelectorAll(".add-to-cart");
};

const renderProductCard = function (product, index) {
  const html = `
    <div class="product-card" data-id="${index}">
      <img src='/assets/img/${product.product_image}' alt="${
    product.product_name
  } product" />
      <h3>${product.product_name}</h3>
      <p class="price">${new Intl.NumberFormat("us-US", {
        style: "currency",
        currency: "USD",
      }).format(product.product_price)}</p>
      <div class='card-buttons'>
        <button class='add-to-cart'>Add to Cart</button>
        <button class='quick-view'>Quick View</button>
      </div>
    </div>
  `;
  const productsContainer = document.querySelector(".product-container");
  productsContainer.insertAdjacentHTML("beforeend", html);
};

const listenForAddToCartBtn = function () {
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.target.closest(".add-to-cart").innerText = "Remove From Cart";
      e.target.closest(".add-to-cart").classList.add("remove-from-cart");
      const id = e.target.closest(".product-card").dataset.id;
      addToCart(products[id]);
    });
  });
};

renderProducts();
listenForAddToCartBtn();
