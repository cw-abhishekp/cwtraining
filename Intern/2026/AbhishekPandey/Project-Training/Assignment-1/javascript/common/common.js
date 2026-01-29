const toast = document.getElementById("toast");

export function toastMessage(time) {
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, time);
}

export function setError(input, errorEl, message) {
    errorEl.textContent = message;
    input.classList.add("invalid");
}

export function clearError(input, errorEl) {
    errorEl.textContent = "";
    input.classList.remove("invalid");
}