import { standing } from "../data/data.js";
export class TravelClass {
    getPrice(distance) {
        return this.pricePerKm * distance;
    }
    static createInstance(value) {
        switch (value) {
            case "economy":
                return new EconomyClass();
            case "buisness":
                return new BusinessClass();
            case "first":
                return new FirstClass();
            default:
                throw new Error("Unknown travel class");
        }
    }
}
export class EconomyClass extends TravelClass {
    constructor() {
        super(...arguments);
        this.value = "economy";
        this.label = "Économie";
        this.pricePerKm = standing.find((deepPockets) => deepPockets.value === "economy").pricePerKm;
    }
}
export class BusinessClass extends TravelClass {
    constructor() {
        super(...arguments);
        this.value = "buisness";
        this.label = "Affaires";
        this.pricePerKm = standing.find((deepPockets) => deepPockets.value === "buisness").pricePerKm;
    }
}
export class FirstClass extends TravelClass {
    constructor() {
        super(...arguments);
        this.value = "first";
        this.label = "Première classe";
        this.pricePerKm = standing.find((deepPockets) => deepPockets.value === "first").pricePerKm;
    }
}
