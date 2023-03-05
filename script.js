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

const productsContainer = document.querySelector(".product-container");
products.forEach((product) => {
  const html = `
    <div class="product-card">
      <img src='/assets/img/${product.product_image}' alt="${
    product.product_name
  } product" />
      <h3>${product.product_name}</h3>
      <p class="price">${new Intl.NumberFormat("us-US", {
        style: "currency",
        currency: "USD",
      }).format(product.product_price)}</p>
      <button>Add to Cart</button>
    </div>
  `;
  productsContainer.insertAdjacentHTML("beforeend", html);
});
