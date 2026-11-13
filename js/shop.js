/*=========================================
    DISPLAY PRODUCTS
==========================================*/

function displayProducts(
    productsToDisplay = products.filter(
        product => product.type === "Jalabiya"
    )
){

    const productsGrid = document.getElementById("products-grid");

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
                    ${product.category} Collection
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


/*=========================================
    SHOP STATE
==========================================*/

let currentSearch = "";

let currentCategory = "All";

let currentSort = "default";


/*=========================================
    GET JALABIYAS ONLY
==========================================*/

function getJalabiyas() {

    return products.filter(product =>
        product.type === "Jalabiya"
    );

}


/*=========================================
    APPLY SHOP FILTERS
==========================================*/
function applyFilters() {

    let filteredProducts = products.filter(
        product => product.type === "Jalabiya"
    );

    if (currentSearch !== "") {

        filteredProducts = filteredProducts.filter(product =>
            product.name
                .toLowerCase()
                .includes(currentSearch.toLowerCase())
        );

    }

    if (currentCategory !== "All") {

        filteredProducts = filteredProducts.filter(product =>
            product.category === currentCategory
        );

    }

    switch (currentSort) {

        case "low-high":

            filteredProducts.sort(
                (a, b) => a.price - b.price
            );

            break;

        case "high-low":

            filteredProducts.sort(
                (a, b) => b.price - a.price
            );

            break;

        case "name":

            filteredProducts.sort(
                (a, b) => a.name.localeCompare(b.name)
            );

            break;
    }

    displayProducts(filteredProducts);
}

/*=========================================
    LIVE PRODUCT SEARCH
==========================================*/

const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        currentSearch = searchInput.value;

        applyFilters();

    });

}


/*=========================================
    PRODUCT FILTER
==========================================*/

const filterButtons =
    document.querySelectorAll(".filter-btn");

if (filterButtons.length > 0) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentCategory =
                button.dataset.filter;

            applyFilters();

        });

    });

}


/*=========================================
    PRODUCT SORTING
==========================================*/

const sortProducts =
    document.getElementById("sortProducts");

if (sortProducts) {

    sortProducts.addEventListener("change", () => {

        currentSort =
            sortProducts.value;

        applyFilters();

    });

}


/*=========================================
    LOAD JALABIYAS
==========================================*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            document.getElementById("products-grid")
        ) {

            applyFilters();

        }

    }
);

console.log("All products:", products);

console.log(
    "Jalabiyas:",
    products.filter(product => product.type === "Jalabiya")
);