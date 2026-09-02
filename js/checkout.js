
/*=========================================
    RENDER CHECKOUT
==========================================*/

function renderCheckout(){

    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");

    if(!checkoutItems) return;

    checkoutItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        if(checkoutTotal){
            checkoutTotal.textContent = "GH₵0";
        }

        return;
    }

    cart.forEach(item=>{

        const subtotal = item.price * item.quantity;

        total += subtotal;

        checkoutItems.innerHTML += `

        <div class="checkout-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="checkout-details">

                <h4>${item.name}</h4>

                <p>Size: ${item.size}</p>

                <p>Quantity: ${item.quantity}</p>

                <strong>GH₵${subtotal.toLocaleString()}</strong>

            </div>

        </div>

        `;

    });

    if(checkoutTotal){
        checkoutTotal.textContent = `GH₵${total.toLocaleString()}`;
    }

}
/*=========================================
    WHATSAPP CHECKOUT
==========================================*/

function setupCheckout(){

    const placeOrderBtn = document.getElementById("placeOrder");

    if(!placeOrderBtn) return;

    placeOrderBtn.addEventListener("click",(e)=>{

    e.preventDefault();

        const name =
        document.getElementById("customerName").value.trim();

        const phone =
        document.getElementById("customerPhone").value.trim();

        const email =
        document.getElementById("customerEmail").value.trim();

        const address =
        document.getElementById("customerAddress").value.trim();

        const region =
        document.getElementById("customerRegion").value;

        const payment =
        document.getElementById("paymentMethod").value;

        if(
            !name ||
            !phone ||
            !address ||
            !region ||
            !payment
        ){

            alert("Please complete all required fields.");

            return;

        }

        if(cart.length === 0){

            alert("Your cart is empty.");

            return;

        }

const now = new Date();

const orderDate = now.toLocaleDateString("en-GB",{

    day:"numeric",

    month:"long",

    year:"numeric"

});

const orderTime = now.toLocaleTimeString([],{

    hour:"2-digit",

    minute:"2-digit"

});

const orderId = `DJC-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}-${Date.now().toString().slice(-4)}`;

let message = `🛍️ *NEW ORDER*\n\n`;

message += `🧾 Order No: ${orderId}\n\n`;

message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

message += `🗓️ Date: ${orderDate}\n`;

message += `🕒 Time: ${orderTime}\n\n`;

message += `👤 *Customer Details*\n\n`;

message += `Name: ${name}\n`;

message += `Phone: ${phone}\n`;

if(email){

    message += `Email: ${email}\n`;

}

message += `\n📍 *Delivery Address*\n\n`;

message += `${address}\n`;

message += `${region}\n\n`;

message += `💳 *Payment Method*\n\n`;

message += `${payment}\n\n`;

message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

message += `📦 *Items Ordered*\n\n`;

        let total = 0;

cart.forEach((item,index)=>{

    const subtotal = item.price * item.quantity;

    total += subtotal;

    message += `${index+1}️⃣ *${item.name}*\n\n`;

    message += `• Size: ${item.size}\n`;

    message += `• Quantity: ${item.quantity}\n`;

    message += `• Subtotal: GH₵${subtotal.toLocaleString()}\n\n`;

    message += `━━━━━━━━━━\n\n`;

});

message += `💰 *TOTAL*\n`;

message += `GH₵${total.toLocaleString()}\n\n`;

message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

message += `Thank you for shopping with\n`;

message += `*Deen Jalabiya Collection* 🤍`;
const businessNumber = "233241949756";

window.open(

    `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`,

    "_blank"

);

/* Show Confirmation Modal */

document.getElementById("orderModal").classList.add("active");

    });

}
/*=========================================
    ORDER CONFIRMATION
==========================================*/

function setupOrderConfirmation(){

    const orderSentBtn = document.getElementById("orderSent");

    if(!orderSentBtn) return;
orderSentBtn.addEventListener("click", () => {

    alert("Button clicked!");

    cart = [];

    saveCart();

    updateCartCount();

    window.location.href = "thank-you.html";

});

}