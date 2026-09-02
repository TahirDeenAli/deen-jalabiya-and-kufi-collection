/*=========================================
    INITIALIZE
==========================================*/
document.addEventListener("DOMContentLoaded", () => {

    displayProducts();

    loadProduct();

    renderCart();

    renderCheckout();

    setupCheckout();

    setupOrderConfirmation();

    updateCartCount();

    initWishlistButtons();

    updateWishlistCount();

    renderWishlist();

});

/* =========================================
   WHATSAPP CHAT WIDGET
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const whatsappButton =
        document.getElementById("whatsappButton");

    const whatsappPreview =
        document.getElementById("whatsappPreview");

    const whatsappClose =
        document.getElementById("whatsappClose");


    if (!whatsappButton || !whatsappPreview) {
        return;
    }


    /* =========================================
       OPEN / CLOSE
    ========================================= */

    whatsappButton.addEventListener("click", function () {

        whatsappPreview.classList.toggle("show");

    });


    /* =========================================
       CLOSE BUTTON
    ========================================= */

    if (whatsappClose) {

        whatsappClose.addEventListener("click", function () {

            whatsappPreview.classList.remove("show");

        });

    }


    /* =========================================
       CLOSE WHEN CLICKING OUTSIDE
    ========================================= */

    document.addEventListener("click", function (event) {

        const widget =
            document.querySelector(".whatsapp-widget");

        if (!widget.contains(event.target)) {

            whatsappPreview.classList.remove("show");

        }

    });


    /* =========================================
       DESKTOP HOVER
    ========================================= */

    if (window.matchMedia("(min-width: 601px)").matches) {

        whatsappButton.addEventListener("mouseenter", function () {

            whatsappPreview.classList.add("show");

        });

    }

});
/* =========================================
   NEWSLETTER FORM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const newsletterForm =
        document.getElementById("newsletterForm");

    const newsletterSuccess =
        document.getElementById("newsletterSuccess");


    if (!newsletterForm || !newsletterSuccess) {
        return;
    }


    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        newsletterSuccess.classList.add("show");

        newsletterForm.reset();

    });

});
const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const button = newsletterForm.querySelector("button");

        const originalText = button.textContent;

        button.textContent = "Subscribing...";
        button.disabled = true;

        emailjs.sendForm(
            "service_deenjshop",
            "template_hry8ht3",
            newsletterForm
        )
        .then(function () {

            button.textContent = "Subscribed ✓";

            newsletterForm.reset();

            setTimeout(function () {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);

        })
        .catch(function (error) {

            console.error("EmailJS Error:", error);

            button.textContent = "Try Again";
            button.disabled = false;

            alert(
                "Sorry, we couldn't complete your subscription. Please try again."
            );

        });

    });

}

/* =========================================
   NAVBAR SHOW / HIDE ON SCROLL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector("header");

    if (!header) return;

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {

        const currentScrollY = window.scrollY;

        /* Always show navbar at the top */
        if (currentScrollY <= 10) {

            header.classList.remove("navbar-hidden");
            header.classList.add("navbar-visible");

            lastScrollY = currentScrollY;
            return;
        }

        /* Scrolling down */
        if (currentScrollY > lastScrollY) {

            header.classList.remove("navbar-hidden");
            header.classList.add("navbar-visible");


        }

        /* Scrolling up */
        else if (currentScrollY < lastScrollY) {

            header.classList.remove("navbar-hidden");
            header.classList.add("navbar-visible");

        }

        lastScrollY = currentScrollY;

    });

});

/* =========================================
   HOME HERO IMAGE SLIDER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const heroImage = document.getElementById("hero-slider-image");

    if (!heroImage) return;

    const heroImages = [
        "images/hero.jpg",
        "images/header9.jpeg",
        "images/hero3.jpg",
    ];

    let currentImage = 0;

    setInterval(function () {

        heroImage.style.opacity = "0";

        setTimeout(function () {

            currentImage++;

            if (currentImage >= heroImages.length) {
                currentImage = 0;
            }

            heroImage.src = heroImages[currentImage];

            heroImage.style.opacity = "1";

        }, 600);

    }, 4000);

});