
/*=========================================
    MOBILE MENU
==========================================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".menu-btn i");

if(menuBtn && navLinks){

    menuBtn.addEventListener("click", ()=>{

        navLinks.classList.toggle("active");

        if(navLinks.classList.contains("active")){

            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-times");

        }else{

            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");

        }

    });
}

/*=========================================
    TOAST NOTIFICATION
==========================================*/

function showToast(message){

    const toast = document.getElementById("toast");

    const toastMessage = document.getElementById("toast-message");

    if(!toast) return;

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}