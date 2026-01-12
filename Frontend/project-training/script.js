const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

function showError(field, message) {
    const error = field.parentElement.querySelector(".error");
    error.textContent = message;
    field.classList.add("invalid");
}

function clearError(field) {
    const error = field.parentElement.querySelector(".error");
    error.textContent = "";
    field.classList.remove("invalid");
}

function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
    let valid = true;

    const firstName = form.firstName;
    const lastName = form.lastName;
    const email = form.email;
    const message = form.message;
    const consent = document.getElementById("consent");
    const query = form.query;

    if (!firstName.value.trim()) {
        showError(firstName, "This field is required");
        valid = false;
    } else clearError(firstName);

    if (!lastName.value.trim()) {
        showError(lastName, "This field is required");
        valid = false;
    } else clearError(lastName);

    if (!email.value.trim()) {
        showError(email, "This field is required");
        valid = false;
    } else if (!isEmailValid(email.value)) {
        showError(email, "Please enter a valid email address");
        valid = false;
    } else clearError(email);

    if (!query.value) {
        form.query
            .closest("fieldset")
            .querySelector(".error").textContent =
            "Please select a query type";
        valid = false;
    } else {
        form.query
            .closest("fieldset")
            .querySelector(".error").textContent = "";
    }

    if (!message.value.trim()) {
        showError(message, "This field is required");
        valid = false;
    } else clearError(message);

    if (!consent.checked) {
        consent.parentElement
            .querySelector(".error").textContent =
            "Please provide consent";
        valid = false;
    } else {
        consent.parentElement.querySelector(".error").textContent = "";
    }

    return valid;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    showToast();
    form.reset();
});


function showToast() {
    toast.style.display = "block";
    toast.setAttribute("aria-hidden", "false");

    setTimeout(() => {
        toast.style.display = "none";
        toast.setAttribute("aria-hidden", "true");
    }, 3000);
}
