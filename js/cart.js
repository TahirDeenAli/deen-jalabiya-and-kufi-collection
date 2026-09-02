
/*=========================================
    SAVE CART
==========================================*/

function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

}
/*=========================================
    CART BADGE
==========================================*/

function updateCartCount(){

    const badge = document.getElementById("cart-count");

    const floatingBadge = document.getElementById("floating-cart-count");

    const totalItems = cart.reduce((total,item)=>{

        return total + item.quantity;

    },0);

    if(badge){

        badge.textContent = totalItems;

    }

    if(floatingBadge){

        floatingBadge.textContent = totalItems;

        // Animate the floating badge
        floatingBadge.classList.remove("animate");

        void floatingBadge.offsetWidth;

        floatingBadge.classList.add("animate");

    }

}

/*=========================================
    FORMAT PRICE
==========================================*/

function formatPrice(price){

    return `GH₵${price.toLocaleString()}`;

}

/*=========================================
    RENDER CART
==========================================*/

function renderCart(){

    const cartContainer=document.getElementById("cart-container");

    const cartTotal=document.getElementById("cart-total");

    if(!cartContainer) return;

    if(cart.length===0){

        cartContainer.innerHTML=`

        <div class="empty-cart">

            <h2>Your cart is empty</h2>

            <p>Browse our premium collection.</p>

            <a href="shop.html" class="primary-btn">

                Continue Shopping

            </a>

        </div>

        `;

        if(cartTotal){

            cartTotal.textContent="GH₵0";

        }

        return;

    }

    cartContainer.innerHTML="";

    let total=0;

    cart.forEach((item,index)=>{

        total+=item.price*item.quantity;

        cartContainer.innerHTML+=`

        <div class="cart-item">

            <div class="cart-image">

                <img src="${item.image}" alt="${item.name}">

            </div>

            <div class="cart-details">

                <h3>${item.name}</h3>

                <p>Size: ${item.size}</p>

                <p>Price: ${formatPrice(item.price)}</p>

                <p>Total: <strong>${formatPrice(item.price * item.quantity)}</strong></p>
            
            </div>
<div class="quantity">

    <button onclick="decreaseQuantity(${index})">−</button>

    <span>${item.quantity}</span>

    <button onclick="increaseQuantity(${index})">+</button>

</div>

            <button
            class="remove-btn"
            onclick="removeItem(${index})">

            <i class="fas fa-trash"></i>

            </button>

        </div>

        `;

    });

    if(cartTotal){

        cartTotal.textContent = formatPrice(total);

    }

}


/*=========================================
    CART FUNCTIONS
==========================================*/

function increaseQuantity(index){

    cart[index].quantity++;

    saveCart();

    renderCart();

    updateCartCount();

}


function decreaseQuantity(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    renderCart();

    updateCartCount();

}


function removeItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

    updateCartCount();

}
