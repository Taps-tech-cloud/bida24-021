// cart.js

// Initialize cart from localStorage or create an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update the cart badge in the navigation bar with the total number of items
function updateCartCount() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
    }
}

// Add an item to the cart and update local storage
function addToCart(productId, name, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
    } else {
        cart.push({
            id: productId,
            name: name,
            price: parseFloat(price),
            image: image,
            quantity: 1
        }); // Add new item to cart
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    // Display specific notification for Monopoly game
    const message = productId === 'monopoly-classic' ? 'Monopoly game added to cart' : `P{name} added to cart!`;
    showNotification(message);
}

// Clear all items from the cart
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    showNotification('Cart cleared');
}

// Calculate the total price of items in the cart
function getCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

// Display a temporary notification at the top right of the page
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: #ffcc00;
        color: #333;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease-out, fadeOut 0.5s ease-in 2.5s forwards;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Set up event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Initialize cart count on page load

    // Add to Cart button functionality
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const name = button.dataset.name;
            const price = button.dataset.price;
            const image = button.dataset.image;
            addToCart(productId, name, price, image);
        });
    });

    // Clear Cart button functionality
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
});