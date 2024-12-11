document.addEventListener("DOMContentLoaded", function () {
    // Retrieve cart data and total price from localStorage
    const savedTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

    // Update the subtotal hidden field
    const subtotalInput = document.querySelector("#subtotal");
    subtotalInput.value = savedTotalPrice.toFixed(2); // Set the subtotal value
    console.log("Subtotal set to:", subtotalInput.value);

    // Optionally, update order summary
    const orderSummary = document.querySelector("#ordersummary");
    orderSummary.innerHTML = `
        <p><strong>Subtotal:</strong> $${savedTotalPrice.toFixed(2)}</p>
        <p><strong>Shipping:</strong> $0.00</p>
        <p><strong>Total:</strong> $${savedTotalPrice.toFixed(2)}</p>
    `;
});


function renderCartItems(cart, totalPrice) {
    const cartContainer = document.querySelector("#cartItems");
    const orderSummary = document.querySelector("#ordersummary");
    const subtotalInput = document.querySelector("#subtotal");
    let shippingCost = 0;

    // Clear existing content
    cartContainer.innerHTML = "";
    orderSummary.innerHTML = "";

    // Check if the cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        subtotalInput.value = "0.00";
        return;
    }

    // Display each cart item
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p><strong>Total:</strong> $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update subtotal input field
    subtotalInput.value = totalPrice.toFixed(2);

    // Display initial order summary
    orderSummary.innerHTML = `
        <p><strong>Subtotal:</strong> $${totalPrice.toFixed(2)}</p>
        <p><strong>Shipping:</strong> $${shippingCost.toFixed(2)}</p>
        <p><strong>Total:</strong> $${(totalPrice + shippingCost).toFixed(2)}</p>
    `;

    // Add event listener to shipping method selection
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener("change", function () {
            // Update shipping cost based on selection
            shippingCost = option.value === "Shipping" ? 5 : 0;

            // Update order summary dynamically
            orderSummary.innerHTML = `
                <p><strong>Subtotal:</strong> $${totalPrice.toFixed(2)}</p>
                <p><strong>Shipping:</strong> $${shippingCost.toFixed(2)}</p>
                <p><strong>Total:</strong> $${(totalPrice + shippingCost).toFixed(2)}</p>
            `;
        });
    });
}
