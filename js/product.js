/*=========================================
    PRODUCT PAGE
==========================================*/

function loadProduct(){

    const image = document.getElementById("product-image");

    if(!image) return;

    const params = new URLSearchParams(window.location.search);

    const productId = Number(params.get("id"));

    const product = products.find(item => item.id === productId);

    if(!product) return;

    /* Main Product Image */

    image.src = product.images[0];

    image.alt = product.name;

    /* Product Information */

    document.getElementById("product-name").textContent = product.name;

    document.getElementById("product-price").textContent =
    `GH₵${product.price}`;

    document.getElementById("product-description").textContent =
    product.description;

    /* Sizes */

    const size = document.getElementById("size");

    size.innerHTML = "";

    product.sizes.forEach(item => {

        size.innerHTML +=
        `<option value="${item}">${item}</option>`;

    });
/* Thumbnail Gallery */

const thumbnailGallery =
    document.getElementById("thumbnail-gallery");

thumbnailGallery.innerHTML = "";

const uniqueImages = [...new Set(product.images)];

uniqueImages.forEach((photo, index) => {

    const thumb = document.createElement("img");

    thumb.src = photo;
    thumb.alt = product.name;

    if (index === 0) {
        thumb.classList.add("active");
    }

    thumb.addEventListener("click", () => {

        image.src = photo;

        document
            .querySelectorAll(".thumbnail-gallery img")
            .forEach(img => img.classList.remove("active"));

        thumb.classList.add("active");

    });

    thumbnailGallery.appendChild(thumb);

});
    /*=========================================
    ADD TO CART
==========================================*/

function setupAddToCart(product){

    const addCartBtn = document.getElementById("addCart");

    if(!addCartBtn) return;

    addCartBtn.onclick = ()=>{

        const selectedSize = document.getElementById("size").value;

        const selectedQty = Number(document.getElementById("qty").value);

        const existingProduct = cart.find(item =>

            item.id === product.id &&
            item.size === selectedSize

        );

        if(existingProduct){

            existingProduct.quantity += selectedQty;

        }else{

            cart.push({

                id:product.id,

                name:product.name,

                price:product.price,

                image:product.images[0],

                size:selectedSize,

                quantity:selectedQty

            });

        }

        saveCart();

        updateCartCount();

        showToast("Product added to cart.");

        document.getElementById("qty").value = 1;

    };

}
    setupQuantityButtons();
    setupAddToCart(product);
    displayRelatedProducts(product);
}
/*=========================================
    QUANTITY BUTTONS
==========================================*/

function setupQuantityButtons(){

    const minus = document.getElementById("minus");

    const plus = document.getElementById("plus");

    const qty = document.getElementById("qty");

    if(!minus || !plus || !qty) return;

    minus.addEventListener("click", ()=>{

        let value = Number(qty.value);

        if(value > 1){

            qty.value = value - 1;

        }

    });

    plus.addEventListener("click", ()=>{

        qty.value = Number(qty.value) + 1;

    });

}
/*=========================================
    RELATED PRODUCTS
==========================================*/
function displayRelatedProducts(currentProduct){

    const relatedGrid = document.getElementById("related-products");

    if(!relatedGrid) return;

    relatedGrid.innerHTML = "";

    const relatedProducts = products
        .filter(product => product.id !== currentProduct.id)
        .slice(0,3);

    relatedProducts.forEach(product=>{

        relatedGrid.innerHTML += `

<div class="shop-product-card">

    <div class="shop-product-image">

        <img src="${product.images[0]}" alt="${product.name}">

        <button class="shop-wishlist-btn" data-id="${product.id}">
            <i class="fa-regular fa-heart"></i>
        </button>

        <div class="shop-product-overlay">

            <button onclick="location.href='product.html?id=${product.id}'">

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

    </div>

</div>

        `;

    });
setupWishlistButtons();
}