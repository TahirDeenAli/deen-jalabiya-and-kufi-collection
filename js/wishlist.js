/*=========================================
    WISHLIST.JS
==========================================*/

// Load wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/*=========================================
    SAVE WISHLIST
==========================================*/
function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
}

/*=========================================
    UPDATE WISHLIST BADGE
==========================================*/
function updateWishlistCount() {

    const badges = document.querySelectorAll("#wishlist-count");

    badges.forEach(badge => {
        badge.textContent = wishlist.length;
    });

}

/*=========================================
    ADD / REMOVE WISHLIST
==========================================*/
function toggleWishlist(id) {

    id = Number(id);

    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(item => item !== id);

    } else {

        wishlist.push(id);

    }

    saveWishlist();

    refreshWishlistButtons();

    renderWishlist();

}

/*=========================================
    UPDATE HEART ICONS
==========================================*/
function refreshWishlistButtons() {

    document.querySelectorAll(".shop-wishlist-btn").forEach(button => {

        const id = Number(button.dataset.id);

        if (wishlist.includes(id)) {

            button.classList.add("active");

            button.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

        } else {

            button.classList.remove("active");

            button.innerHTML =
            '<i class="fa-regular fa-heart"></i>';

        }

    });

}

/*=========================================
    INITIALIZE HEART BUTTONS
==========================================*/
function initWishlistButtons() {

    const buttons =
    document.querySelectorAll(".shop-wishlist-btn");

    buttons.forEach(button => {

        button.onclick = () => {

            toggleWishlist(button.dataset.id);

        };

    });

    refreshWishlistButtons();

}

/*=========================================
    REMOVE FROM WISHLIST
==========================================*/
function removeWishlist(id) {

    wishlist = wishlist.filter(item => item !== Number(id));

    saveWishlist();

    renderWishlist();

}

/*=========================================
    MOVE TO CART
==========================================*/
function moveToCart(id) {

    const product =
    products.find(p => p.id === Number(id));

    if (!product) return;

    if (!cart.some(item => item.id === product.id)) {

        cart.push({
            ...product,
            image: product.images[0],
            quantity: 1,
            size: "M"
        });

        saveCart();

        updateCartCount();

    }

    removeWishlist(id);

}

/*=========================================
    RENDER WISHLIST PAGE
==========================================*/
function renderWishlist() {

    const container =
    document.getElementById("wishlist-container");

    if (!container) return;

    container.innerHTML = "";

    if (wishlist.length === 0) {

        container.innerHTML = `

<div class="empty-cart">

<h2>Your Wishlist is Empty</h2>

<p>Save your favourite Jalabiyas.</p>

<a href="shop.html"
class="primary-btn">

Continue Shopping

</a>

</div>

`;

        return;

    }

    wishlist.forEach(id => {

        const product =
        products.find(p => p.id === Number(id));

        if (!product) return;

        container.innerHTML += `

<div class="shop-product-card">

<div class="shop-product-image">

<img src="${product.images[0]}"
alt="${product.name}">

<button
class="shop-wishlist-btn active"
onclick="removeWishlist(${product.id})">

<i class="fa-solid fa-heart"></i>

</button>

<div class="shop-product-overlay">

<button
onclick="location.href='product.html?id=${product.id}'">

Quick View

</button>

</div>

</div>

<div class="shop-product-content">

<span class="shop-product-category">

${product.category} Collection

</span>

<h3 class="shop-product-title">

${product.name}

</h3>

<div class="shop-product-price">

<span class="shop-currency">GH₵</span>

<span class="shop-amount">

${product.price.toLocaleString()}

</span>

</div>

<button
class="primary-btn"
onclick="moveToCart(${product.id})">

Move To Cart

</button>

</div>

</div>

`;

    });

}

/*=========================================
    INITIALIZE
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    updateWishlistCount();

    renderWishlist();

});