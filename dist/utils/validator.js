export class Validator {
    static matchRegEx(value, regEx) {
        return regEx.test(value);
    }
    static isValidEmail(email) {
        return Validator.emailRegEx.test(email);
    }
    static isValidPhone(phone) {
        return Validator.phoneRegEx.test(phone);
    }
    static isStringType(value) {
        return typeof value == "string";
    }
    static isShortLength(value, minLength) {
        return value.length < minLength;
    }
    static isLongLength(value, maxLength) {
        return value.length > maxLength;
    }
    static isValidName(name) {
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        return nameRegex.test(name);
    }
    static isValidDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return start >= today && end > start;
    }
}
Validator.emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
Validator.phoneRegEx = /^\+?[1-9]\d{1,14}$/;
