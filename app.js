const tg = window.Telegram.WebApp;
const products = [
    { id: 1, name: "Футболка", price: 1000 },
    { id: 2, name: "Джинсы", price: 2500 },
    { id: 3, name: "Кроссовки", price: 3000 },
];

let cart = [];

// Отображаем товары
function renderProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = products
        .map(
            (product) => `
        <div class="product">
            <span>${product.name} - ${product.price} руб.</span>
            <button onclick="addToCart(${product.id})">Добавить в корзину</button>
        </div>
    `
        )
        .join("");
}

// Добавляем товар в корзину
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
        cart.push(product);
        renderCart();
    }
}

// Отображаем корзину
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceContainer = document.getElementById("total-price");

    cartItemsContainer.innerHTML = cart
        .map(
            (item) => `
        <li>
            <span>${item.name} - ${item.price} руб.</span>
        </li>
    `
        )
        .join("");

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceContainer.innerText = totalPrice;
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }

    const orderMessage = `Ваш заказ:\n${cart
        .map((item) => `${item.name} - ${item.price} руб.`)
        .join("\n")}\nИтого: ${cart.reduce((sum, item) => sum + item.price, 0)} руб.`;

    // Отправляем сообщение через бота
    tg.sendData(orderMessage);
    tg.close();
}

// Инициализация
tg.ready();
renderProducts();