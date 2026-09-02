document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contact-form");
    const contactStatus = document.getElementById("contact-status");
    const submitButton = document.getElementById("contact-submit");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        contactStatus.textContent = "";
        contactStatus.className = "contact-status";

        emailjs.sendForm(
            "service_deenjshop",
            "template_hry8ht3",
            contactForm
        )
        .then(function (response) {

    console.log("EMAILJS SUCCESS:", response);

    alert("EMAILJS SUCCESS");

    contactStatus.textContent =
        "Message sent successfully. We'll get back to you soon.";

    contactStatus.classList.add("success");

    contactForm.reset();

    submitButton.disabled = false;
    submitButton.textContent = "Send Message";

})
        .catch(function (error) {

            console.error("EmailJS Error:", error);

            contactStatus.textContent =
                "Sorry, your message could not be sent. Please try again.";

            contactStatus.classList.add("error");

            submitButton.disabled = false;
            submitButton.textContent = "Send Message";

        });

    });

});