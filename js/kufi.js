/* =========================================
   KUFI COLLECTION
========================================= */

function displayKufiProducts(productsToDisplay = []) {

    const productsGrid = document.getElementById("kufi-products-grid");

    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    productsToDisplay.forEach(product => {

        productsGrid.innerHTML += `

        <div class="shop-product-card">

            <div class="shop-product-image">

                <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                >

                <button
                    class="shop-wishlist-btn"
                    data-id="${product.id}"
                >
                    <i class="fa-regular fa-heart"></i>
                </button>

                <div class="shop-product-overlay">

                    <button
                        onclick="location.href='product.html?id=${product.id}'"
                    >
                        Quick View
                    </button>

                </div>

            </div>

            <div class="shop-product-content">

                <span class="shop-product-category">
                    ${product.category} Kufi
                </span>

                <h3 class="shop-product-title">
                    ${product.name}
                </h3>

                <div class="shop-product-price">

                    <span class="shop-currency">
                        GH₵
                    </span>

                    <span class="shop-amount">
                        ${product.price.toLocaleString()}
                    </span>

                </div>

            </div>

        </div>

        `;

    });

    initWishlistButtons();

}


/* =========================================
   GET KUFI PRODUCTS
========================================= */

const kufiProducts = products.filter(product =>
    product.type === "Kufi"
);


/* =========================================
   SHOP STATE
========================================= */

let currentKufiSearch = "";

let currentKufiCategory = "All";

let currentKufiSort = "default";


/* =========================================
   APPLY KUFI FILTERS
========================================= */

function applyKufiFilters() {

    let filteredProducts = [...kufiProducts];


    /* Search */

    if (currentKufiSearch !== "") {

        filteredProducts = filteredProducts.filter(product =>

            product.name
                .toLowerCase()
                .includes(currentKufiSearch.toLowerCase())

        );

    }


    /* Category */

    if (currentKufiCategory !== "All") {

        filteredProducts = filteredProducts.filter(product =>

            product.category === currentKufiCategory

        );

    }


    /* Sorting */

    switch (currentKufiSort) {

        case "low-high":

            filteredProducts.sort((a, b) =>
                a.price - b.price
            );

            break;


        case "high-low":

            filteredProducts.sort((a, b) =>
                b.price - a.price
            );

            break;


        case "name":

            filteredProducts.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

            break;

    }


    displayKufiProducts(filteredProducts);

}


/* =========================================
   KUFI SEARCH
========================================= */

const kufiSearch =
    document.getElementById("kufiSearch");

if (kufiSearch) {

    kufiSearch.addEventListener("input", () => {

        currentKufiSearch = kufiSearch.value;

        applyKufiFilters();

    });

}


/* =========================================
   KUFI CATEGORY FILTER
========================================= */

const kufiFilterButtons =
    document.querySelectorAll(".kufi-filter-btn");

if (kufiFilterButtons.length > 0) {

    kufiFilterButtons.forEach(button => {

        button.addEventListener("click", () => {

            kufiFilterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentKufiCategory =
                button.dataset.filter;

            applyKufiFilters();

        });

    });

}


/* =========================================
   KUFI SORTING
========================================= */

const kufiSort =
    document.getElementById("kufiSort");

if (kufiSort) {

    kufiSort.addEventListener("change", () => {

        currentKufiSort = kufiSort.value;

        applyKufiFilters();

    });

}


/* =========================================
   INITIAL DISPLAY
========================================= */

if (document.getElementById("kufi-products-grid")) {

    displayKufiProducts(kufiProducts);

}