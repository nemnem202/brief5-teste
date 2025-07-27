import { Component } from "../lib/component.js";
import { AppManager } from "../appManager.js";
import paymentTemplate from "../componentsTemplates/paymentComponent.js";
export class PaymentComponent extends Component {
    constructor() {
        super(paymentTemplate);
        this.inputedNumberChecker = (event) => {
            if (event.target instanceof HTMLInputElement) {
                this.numberChecker(event.target.value);
            }
        };
        this.inputedNameChecker = (event) => {
            if (event.target instanceof HTMLInputElement) {
                this.nameChecker(event.target.value);
            }
        };
        this.inputedCVVChecker = (event) => {
            if (event.target instanceof HTMLInputElement) {
                this.cvvChecker(event.target.value);
            }
        };
        this.inputedExpiryChecker = (event) => {
            if (event.target instanceof HTMLInputElement) {
                this.expiryChecker(event.target.value);
            }
        };
        this.expiryValue = "";
        setTimeout(() => this.init(), 0);
    }
    init() {
        this.clientData = AppManager.getInstance().clientInformations;
        this.travelData = AppManager.getInstance().flightInformation;
        if (!this.travelData || !this.clientData) {
            AppManager.getInstance().changePage("not-found");
        }
        this.fillTravelInfos();
        this.addListeners();
    }
    fillTravelInfos() {
        if (this.content && this.clientData && this.travelData) {
            const divClientInfos = document.getElementById("clientInfos");
            if (divClientInfos) {
                this.addTextToHTMLElement(divClientInfos, `${this.clientData.name} ${this.clientData.lastName}`);
                this.addTextToHTMLElement(divClientInfos, this.clientData.email);
                this.addTextToHTMLElement(divClientInfos, this.clientData.phoneNumber);
            }
            const divTravelInfos = document.getElementById("travelInfos");
            if (divTravelInfos) {
                this.addTextToHTMLElement(divTravelInfos, `Location: ${this.travelData.originCity} - ${this.travelData.destinationCity}`);
                this.addTextToHTMLElement(divTravelInfos, `Date: ${this.travelData.date.toDateString()}`);
                this.addTextToHTMLElement(divTravelInfos, `Class: ${this.travelData.standing} class`);
            }
            const divPrice = document.getElementById("price");
            if (divPrice) {
                this.addTextToHTMLElement(divPrice, `Price: ${this.travelData.price.toString()} €`);
            }
        }
    }
    addTextToHTMLElement(htmlElement, text) {
        const p = document.createElement("p");
        p.innerText = text;
        htmlElement.appendChild(p);
    }
    addListeners() {
        const backToFormBtn = document.getElementById("returnToForm");
        if (backToFormBtn) {
            backToFormBtn.addEventListener("click", this.back);
        }
        const cardName = document.getElementById("cardName");
        if (cardName) {
            cardName.addEventListener("blur", this.inputedNameChecker);
        }
        const cardNumber = document.getElementById("cardNumber");
        if (cardNumber) {
            cardNumber.addEventListener("blur", this.inputedNumberChecker);
            cardNumber.addEventListener("input", this.cardNumberInput);
        }
        const cardCVV = document.getElementById("cardCvv");
        if (cardCVV) {
            cardCVV.addEventListener("blur", this.inputedCVVChecker);
            cardCVV.addEventListener("input", this.cardCVVInput);
        }
        const cardExpiry = document.getElementById("cardExpiry");
        if (cardExpiry) {
            cardExpiry.addEventListener("blur", this.inputedExpiryChecker);
            cardExpiry.addEventListener("input", this.cardExpiryInput);
        }
        const form = document.getElementById("paymentForm");
        if (form) {
            form.addEventListener("submit", (event) => this.pay(event));
        }
    }
    back() {
        AppManager.getInstance().changePage("form");
    }
    numberChecker(num) {
        const numberRegex = /^[0-9]{12,19}$/;
        const errorPar = document.getElementById("cardNumberError");
        if (errorPar) {
            num = num.replaceAll("-", "");
            num = num.replaceAll(" ", "");
            if (!numberRegex.test(num) || !this.checkLuhnAlgorithm(num)) {
                errorPar.innerText = "The card number is invalid";
                return false;
            }
            else {
                errorPar.innerText = "";
                return true;
            }
        }
        return false;
    }
    checkLuhnAlgorithm(numberToCheck) {
        let sum = 0;
        let digit = 0;
        let isEven = false;
        for (let i = numberToCheck.length - 1; i >= 0; i--) {
            digit = parseInt(numberToCheck.charAt(i), 10);
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit = (digit % 10) + Math.floor(digit / 10);
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 == 0;
    }
    cardNumberInput(event) {
        if (event.target instanceof HTMLInputElement) {
            const lastCharNum = event.target.value.length - 1;
            const lastInput = event.target.value.charAt(lastCharNum);
            if (!/[0-9\- ]/.test(lastInput)) {
                event.target.value = event.target.value.slice(0, lastCharNum);
            }
        }
    }
    nameChecker(name) {
        // The regex accept all letters, all accentuated letters, spaces, hyphens and apostrophes
        const nameRegex = /^[a-zà-öø-ÿñ'\- ]{1,}( [a-zà-öø-ÿñ'\- ]{1,})+$/;
        const errorPar = document.getElementById("cardNameError");
        if (errorPar) {
            if (!nameRegex.test(name.toLowerCase())) {
                errorPar.innerText = "The name is invalid.";
                return false;
            }
            else {
                errorPar.innerText = "";
                return true;
            }
        }
        return false;
    }
    cvvChecker(cvv) {
        const cvvRegex = /^[0-9]{3,4}$/;
        const errorPar = document.getElementById("cardCvvError");
        if (errorPar) {
            if (!cvvRegex.test(cvv)) {
                errorPar.innerText = "The CVV is invalid";
                return false;
            }
            else {
                errorPar.innerText = "";
                return true;
            }
        }
        return false;
    }
    cardCVVInput(event) {
        if (event.target instanceof HTMLInputElement) {
            const lastCharNum = event.target.value.length - 1;
            const lastInput = event.target.value.charAt(lastCharNum);
            if (!/[0-9]/.test(lastInput) || event.target.value.length === 5) {
                event.target.value = event.target.value.slice(0, lastCharNum);
            }
        }
    }
    expiryChecker(expiry) {
        const curDate = new Date();
        const curMonth = curDate.getMonth();
        const curYear = curDate.getFullYear();
        const errorPar = document.getElementById("cardExpiryError");
        if (errorPar) {
            const cardMonth = parseInt(expiry.slice(0, 2));
            let year = expiry.slice(3);
            if (year.length === 2) {
                year = "20" + year;
            }
            const cardYear = parseInt(year);
            if (year.length != 4 || cardMonth > 12 || cardMonth < 1) {
                errorPar.innerText = "The date format is invalid";
                return false;
            }
            else if (cardYear < curYear || (cardYear === curYear && cardMonth - 1 < curMonth)) {
                errorPar.innerText = "The card is expired";
                return false;
            }
            else {
                errorPar.innerText = "";
                return true;
            }
        }
        return false;
    }
    cardExpiryInput(event) {
        if (event.target instanceof HTMLInputElement) {
            if (!this.expiryValue) {
                this.expiryValue = "";
            }
            let currentValue = event.target.value;
            const lastCharNum = currentValue.length - 1;
            const lastInput = currentValue.charAt(lastCharNum);
            if (!/[0-9/]/.test(lastInput)) {
                currentValue = currentValue.slice(0, lastCharNum);
            }
            const isAdding = currentValue.length > this.expiryValue.length;
            if (currentValue.length === 2) {
                if (isAdding) {
                    currentValue = currentValue + "/";
                }
                else {
                    currentValue = currentValue.slice(0, lastCharNum);
                }
            }
            else if (currentValue.length === 8) {
                currentValue = currentValue.slice(0, lastCharNum);
            }
            this.expiryValue = currentValue;
            event.target.value = currentValue;
        }
    }
    isConsentChecked() {
        const consentCheckbox = document.getElementById("consent");
        const errorPar = document.getElementById("consentError");
        if (consentCheckbox instanceof HTMLInputElement && errorPar) {
            if (consentCheckbox.checked) {
                errorPar.innerText = "";
                return true;
            }
            else {
                errorPar.innerText = "You must agree to the terms and conditions";
                return false;
            }
        }
        return false;
    }
    pay(event) {
        event.preventDefault();
        let isFormValid = true;
        if (event.target instanceof HTMLFormElement) {
            const formData = new FormData(event.target);
            const paymentData = {
                cardNumber: formData.get("cardNumber"),
                cvv: formData.get("cardCvv"),
                dateOfExpiry: {
                    year: formData.get("cardExpiry")?.slice(3),
                    month: formData.get("cardExpiry")?.slice(0, 2),
                },
                fullName: formData.get("cardName"),
            };
            if (typeof paymentData.cardNumber === "string" &&
                !this.numberChecker(paymentData.cardNumber)) {
                isFormValid = false;
            }
            if (typeof paymentData.fullName === "string" && !this.nameChecker(paymentData.fullName)) {
                isFormValid = false;
            }
            if (typeof paymentData.cvv === "string" && !this.cvvChecker(paymentData.cvv)) {
                isFormValid = false;
            }
            if (typeof paymentData.dateOfExpiry.month === "string" &&
                typeof paymentData.dateOfExpiry.year === "string" &&
                !this.expiryChecker(paymentData.dateOfExpiry.month + "/" + paymentData.dateOfExpiry.year)) {
                isFormValid = false;
            }
            if (!this.isConsentChecked()) {
                isFormValid = false;
            }
            if (isFormValid) {
                this.fillLocalStorage();
                if (paymentData.cardNumber &&
                    paymentData.cvv &&
                    paymentData.fullName &&
                    paymentData.dateOfExpiry.month &&
                    paymentData.dateOfExpiry.year) {
                    const payment = {
                        cardNumber: paymentData.cardNumber.toString(),
                        cvv: paymentData.cvv.toString(),
                        dateOfExpiry: {
                            year: paymentData.dateOfExpiry.year.toString(),
                            month: paymentData.dateOfExpiry.month.toString(),
                        },
                        fullName: paymentData.fullName.toString(),
                    };
                    AppManager.getInstance().paymentInformations = payment;
                }
                AppManager.getInstance().changePage("history");
            }
        }
    }
    fillLocalStorage() {
        const flightData = localStorage.getItem("flights");
        let flights = [];
        if (flightData) {
            flights = JSON.parse(flightData);
        }
        if (this.travelData) {
            flights.push(this.travelData);
        }
        localStorage.setItem("flights", JSON.stringify(flights));
        const clientData = localStorage.getItem("clients");
        let clients = [];
        if (clientData) {
            clients = JSON.parse(clientData);
        }
        if (this.clientData) {
            clients.push(this.clientData);
        }
        localStorage.setItem("clients", JSON.stringify(clients));
    }
}
