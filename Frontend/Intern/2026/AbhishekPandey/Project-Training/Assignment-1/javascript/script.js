import { toastMessage, setError, clearError } from "./common/common.js"
import { isValidName } from "./common/validation.js"

const form = document.getElementById("contactForm");

const fieldErrorValue = "This field is required";
const emailErrorValue = "Please enter a valid email address";
const consentErrorValue = "To submit this form, please consent to being contacted";
const inputNameErrorValue = "Please enter a valid value";
const queryTypeErrorValue = "Please select a query type";


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    // firstName
    const firstName = document.getElementById("firstName");
    const firstNameError = document.getElementById("firstNameError");
    clearError(firstName, firstNameError);

    if (!firstName.value.trim()) {
        setError(firstName, firstNameError, fieldErrorValue);
        valid = false;
    } else if (!isValidName(firstName.value.trim())) {
        setError(firstName, firstNameError, inputNameErrorValue);
        valid = false;
    }

    // lastName
    const lastName = document.getElementById("lastName");
    const lastNameError = document.getElementById("lastNameError");
    clearError(lastName, lastNameError);

    if (!lastName.value.trim()) {
        setError(lastName, lastNameError, fieldErrorValue);
        valid = false;
    } else if (!isValidName(lastName.value.trim())) {
        setError(lastName, lastNameError, inputNameErrorValue);
        valid = false;
    }

    // email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    clearError(email, emailError);

    if (!email.value.trim() || !email.validity.valid) {
        setError(email, emailError, emailErrorValue);
        valid = false;
    }

    // queryType
    const queryGeneral = document.getElementById("queryGeneral");
    const querySupport = document.getElementById("querySupport");
    const queryError = document.getElementById("queryTypeError");
    queryError.textContent = "";

    if (!queryGeneral.checked && !querySupport.checked) {
        queryError.textContent = queryTypeErrorValue;
        valid = false;
    }

    // message
    const message = document.getElementById("message");
    const messageError = document.getElementById("messageError");
    clearError(message, messageError);

    if (!message.value.trim()) {
        setError(message, messageError, fieldErrorValue);
        valid = false;
    }

    // consent
    const consent = document.getElementById("consent");
    const consentError = document.getElementById("consentError");
    clearError(consent, consentError)

    if (!consent.checked) {
        setError(consent, consentError, consentErrorValue);
        valid = false;
    }

    if (!valid) return;
    toastMessage(3000);
    form.reset();
});
