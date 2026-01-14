const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

const fieldError = "This field is required";
const emailError = "Please enter a valid email address";
const consentError = "To submit this form, please consent to being contacted";
const inputNameError = "Please enter a valid value";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;
  const fields = form.querySelectorAll(".field");

  fields.forEach((field) => {
    const input = field.querySelector("input, textarea");
    const error = field.querySelector(".error");

    if (!input) return;

    input.classList.remove("invalid");
    error.textContent = "";

    if (input.type === "email") {
      if (!input.value.trim() || !input.validity.valid) {
        error.textContent = emailError;
        input.classList.add("invalid");
        valid = false;
      }
    }
    else if (input.type !== "radio" && input.type !== "checkbox") {
      const value = input.value.trim();

      if (!value) {
        error.textContent = fieldError;
        input.classList.add("invalid");
        valid = false;
      }

      else if (input.id === "firstName" || input.id === "lastName") {
        const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
        
        if (!nameRegex.test(value)) {
          error.textContent = inputNameError;
          input.classList.add("invalid");
          valid = false;
        }
      }
    }
  });

  // Radio validation
  const queryChecked = form.querySelector('input[name="query"]:checked');
  if (!queryChecked) {
    form.querySelector('input[name="query"]')
      .closest(".field")
      .querySelector(".error").textContent = "Please select a query type";
    valid = false;
  }

  const consent = document.getElementById("consent");
  if (!consent.checked) {
    consent.closest(".field").querySelector(".error").textContent = consentError;
    valid = false;
  }

  if (!valid) return;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);

  form.reset();
});
