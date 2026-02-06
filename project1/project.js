// PRODUCTS ARRAY
const products = [
  { id: 1, name: "Laptop", price: 800, stock: 5, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSM1F3qN04dbDYxawOxP4ty6gRa7DOfFZ2jESGgo-1jc8aYRilxdWeUjziozhfUSxI3TB19ztBcGajmH617vSZnFYNvNZMAGvoGwh9pXdjABqhKfVczViydafXSBzEfIq7i1g&usqp=CAc" },
  { id: 2, name: "Phone", price: 500, stock: 10, image: "https://exstatic-in.vivo.com/Oz84QB3Wo0uns8j1/in/1761549628594/c70de10dd55375a00dfe79272b8f39ab.png.webp" },
  { id: 3, name: "Headphones", price: 150, stock: 15, image: "https://www.boat-lifestyle.com/cdn/shop/files/mainimage_458147a3-eabc-4816-a1c0-429c950422ad_700x.png?v=1741067646" },
  { id: 4, name: "Smart Watch", price: 250, stock: 8, image: "https://m.media-amazon.com/images/I/41g06cAmgkL._SY300_SX300_QL70_FMwebp_.jpg" }
];

let cart = [];

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const priceSlider = document.getElementById("price-slider");
const priceValue = document.getElementById("price-value");

// RENDER PRODUCTS
function renderProducts(productList) {
  productGrid.innerHTML = "";

  productList.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button ${product.stock === 0 ? "disabled" : ""}>
        Add to Cart
      </button>
    `;

    const button = div.querySelector("button");
    button.addEventListener("click", () => addToCart(product.id));

    productGrid.appendChild(div);
  });
}

// ADD TO CART
function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  if (product.stock > 0) {
    cart.push(product);
    product.stock--;
    updateCart();
    filterProducts();
  }
}

// UPDATE CART UI
function updateCart() {
  cartCount.textContent = cart.length;

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total;
}

// FILTER BY PRICE
function filterProducts() {
  const maxPrice = priceSlider.value;
  priceValue.textContent = maxPrice;

  const filteredProducts = products.filter(
    product => product.price <= maxPrice
  );

  renderProducts(filteredProducts);
}

// EVENT LISTENER
priceSlider.addEventListener("input", filterProducts);

// INITIAL LOAD
renderProducts(products);
