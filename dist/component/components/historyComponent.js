import { AppManager } from "../appManager";
import { Component } from "../lib/component";
import createButton from "../utils/button";
import templateHTML from "../componentsTemplates/historyComponent.html?raw";
import { travelCardComponent } from "./travelCardComponent";
export class HistoryComponent extends Component {
    constructor() {
        super(templateHTML);
        const getClient = () => {
            const raw = localStorage.getItem("clients");
            return raw ? JSON.parse(raw) : [];
        };
        const getFlights = () => {
            const raw = localStorage.getItem("flights");
            return raw ? JSON.parse(raw) : [];
        };
        const convertDate = (raw) => ({
            ...raw,
            date: new Date(raw.date),
        });
        const pastClients = getClient();
        const pastFlights = getFlights().map((flightRaw) => convertDate(flightRaw));
        console.log("ICI");
        console.log(pastClients, pastFlights);
        setTimeout(() => {
            const today = new Date();
            for (let i = 0; i < pastClients.length; i++) {
                if (pastFlights[i]) {
                    console.log(pastFlights[i].date, today);
                    if (pastFlights[i].date > today) {
                        new travelCardComponent("upcoming-travel", pastFlights[i], pastClients[i]);
                    }
                    else {
                        new travelCardComponent("past-travels", pastFlights[i], pastClients[i]);
                    }
                }
            }
            const homeButton = document.getElementById("home-button-container");
            homeButton?.appendChild(createButton("Go Back to Home Page", "home-button", () => AppManager.getInstance().changePage("home")));
        }, 0);
    }
}
