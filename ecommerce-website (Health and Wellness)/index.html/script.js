// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCountElement = document.getElementById("cart-count");
    const totalPriceElement = document.getElementById("total-price");
    const cartModal = document.getElementById("cart-modal");
    const closeCartButton = document.getElementById("close-cart");
    const checkoutButton = document.getElementById("checkout-button");

    let cart = []; // Cart array to store items added to the cart

    // Render the product list
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";

        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        // Add event listener to "Add to Cart" button
        productItem.querySelector(".add-to-cart").addEventListener("click", () => addToCart(product));

        productList.appendChild(productItem);
    });

    // Function to add item to cart
    function addToCart(product) {
        cart.push(product);
        updateCartCount();
        displayCartItems();
    }

    // Update cart count display
    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }

    // Display items in the cart modal
    function displayCartItems() {
        cartItemsContainer.innerHTML = ""; // Clear previous items
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <p>${item.name} - ${item.price}</p>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            total += parseFloat(item.price.replace("$", "")); // Remove $ sign for calculation
            cartItemsContainer.appendChild(cartItem);
        });

        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;

        // Event listeners for "Remove" buttons
        cartItemsContainer.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                cart.splice(index, 1); // Remove item from cart array
                updateCartCount();
                displayCartItems();
            });
        });
    }

    // Event listener to open the cart modal
    document.getElementById("cart-button").addEventListener("click", () => {
        cartModal.style.display = "block";
    });

    // Event listener to close the cart modal
    closeCartButton.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // Event listener for checkout button
    checkoutButton.addEventListener("click", () => {
        alert("Thank you for your purchase!");
        cart = []; // Clear cart
        updateCartCount();
        displayCartItems();
        cartModal.style.display = "none";
    });

    // Close modal if clicked outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = "none";
        }
    });
});

