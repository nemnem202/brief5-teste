import { Component } from "../lib/component";
import template from "../componentsTemplates/formComponent.html?raw";
import "../componentsStyleSheets/formComponent.css";
import { destinations } from "../data/data";
import { AppManager } from "../appManager";
import { Validator } from "../utils/validator";
import { TravelClass } from "../utils/travelClass";
export class FormComponent extends Component {
    constructor() {
        super(template);
        this.selectedClass = null;
        this.finalPriceElem = null;
        if (!this.content)
            return;
        const today = new Date().toISOString().split("T")[0];
        this.content.querySelector("#startDate").min = today;
        this.form = this.content.querySelector("#reservation-form");
        this.finalPriceElem = this.content.querySelector("#finalPrice");
        this.destinationSelect = this.content.querySelector("#to");
        this.populateDestinations();
        this.setDefaultValues();
        this.attachListeners();
    }
    setDefaultValues() {
        setTimeout(() => {
            const flightInformation = AppManager.getInstance().flightInformation;
            if (flightInformation) {
                const dateInput = document.getElementById("startDate");
                const hourInput = document.getElementById("startTime");
                if (!dateInput || !hourInput)
                    return;
                for (const option of this.destinationSelect.options) {
                    if (option.value === flightInformation.destinationCity) {
                        option.selected = true;
                        break;
                    }
                }
                const year = flightInformation.date.getFullYear();
                const month = String(flightInformation.date.getMonth() + 1).padStart(2, "0");
                const day = String(flightInformation.date.getDate()).padStart(2, "0");
                dateInput.type = "date";
                dateInput.value = `${year}-${month}-${day}`;
                const hour = flightInformation.date.getHours();
                const minutes = flightInformation.date.getMinutes();
                hourInput.value = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
            }
        }, 0);
    }
    populateDestinations() {
        destinations.forEach((dest) => {
            if (dest.value !== "paris") {
                const option = document.createElement("option");
                option.value = dest.value;
                option.textContent = dest.label;
                this.destinationSelect.appendChild(option);
            }
        });
    }
    attachListeners() {
        if (!this.form)
            return;
        const classButtons = this.content.querySelectorAll(".class-btn");
        classButtons.forEach((btn) => {
            const handler = () => {
                const className = btn.textContent?.trim().toLowerCase();
                const value = className === "economy"
                    ? "economy"
                    : className === "business"
                        ? "buisness"
                        : className === "first class"
                            ? "first"
                            : null;
                if (value) {
                    this.selectedClass = value;
                    this.updatePrice();
                }
            };
            btn.addEventListener("click", handler);
        });
        const inputs = this.content.querySelectorAll("input, select");
        inputs.forEach((input) => {
            const handler = () => this.updatePrice();
            input.addEventListener("input", handler);
        });
        const submitHandler = (e) => {
            e.preventDefault();
            this.handleSubmit();
        };
        this.form.addEventListener("submit", submitHandler);
    }
    updatePrice() {
        if (!this.selectedClass || !this.finalPriceElem)
            return;
        const selectedCity = this.destinationSelect.value;
        const destination = destinations.find((d) => d.value === selectedCity);
        if (!destination)
            return;
        const travelClass = TravelClass.createInstance(this.selectedClass);
        const price = travelClass.getPrice(destination.distanceFromParis);
        this.finalPriceElem.textContent = `${price.toFixed(2)}€`;
    }
    handleSubmit() {
        if (!this.form)
            return;
        const errorsDiv = this.content?.querySelector("#errors");
        if (errorsDiv)
            errorsDiv.innerHTML = "";
        const formData = new FormData(this.form);
        const client = {
            name: formData.get("firstName")?.toString().trim() || "",
            lastName: formData.get("lastName")?.toString().trim() || "",
            email: formData.get("email")?.toString().trim() || "",
            phoneNumber: formData.get("contact")?.toString().trim() || "",
        };
        const from = "paris";
        const to = this.destinationSelect.value;
        const startDate = formData.get("startDate")?.toString() || "";
        const fields = [
            ["firstName", client.name, Validator.isValidName],
            ["lastName", client.lastName, Validator.isValidName],
            ["email", client.email, Validator.isValidEmail],
            ["contact", client.phoneNumber, Validator.isValidPhone],
        ];
        let hasError = false;
        this.form.querySelectorAll("input").forEach((i) => i.classList.remove("error"));
        for (const [id, value, validator] of fields) {
            const input = this.form.querySelector(`#${id}`);
            if (!validator(value)) {
                input.classList.add("error");
                hasError = true;
            }
        }
        if (!this.selectedClass && errorsDiv) {
            errorsDiv.innerHTML += `<p>Please select a travel class.</p>`;
            hasError = true;
        }
        if (!to && errorsDiv) {
            errorsDiv.innerHTML += `<p>Please select a destination.</p>`;
            hasError = true;
        }
        if (hasError)
            return;
        const destination = destinations.find((d) => d.value === to);
        const travelClass = TravelClass.createInstance(this.selectedClass);
        const flightInformation = {
            originCity: from,
            destinationCity: to,
            date: new Date(startDate),
            standing: travelClass.value,
            price: travelClass.getPrice(destination.distanceFromParis),
        };
        const app = AppManager.getInstance();
        app.clientInformations = client;
        app.flightInformation = flightInformation;
        AppManager.getInstance().changePage("payment");
    }
}
