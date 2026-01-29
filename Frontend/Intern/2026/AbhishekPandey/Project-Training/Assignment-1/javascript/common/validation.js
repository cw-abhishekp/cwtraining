export function isValidName(value) {
    const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
    return nameRegex.test(value);
}