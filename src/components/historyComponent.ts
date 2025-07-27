import { AppManager } from "../appManager.js";
import { Component } from "../lib/component.js";
import createButton from "../utils/button.js";
import type { ClientInformations, FlightInformation, FlightInformationRaw } from "../data/Types.js";
import { travelCardComponent } from "./travelCardComponent.js";
import historyTemplate from "../componentsTemplates/historyComponent.js";

export class HistoryComponent extends Component {
  flightInformation: FlightInformation | undefined;
  clientInformation: ClientInformations | undefined;

  constructor() {
    super(historyTemplate);

    const getClient = (): ClientInformations[] => {
      const raw = localStorage.getItem("clients");
      return raw ? (JSON.parse(raw) as ClientInformations[]) : [];
    };

    const getFlights = (): FlightInformationRaw[] => {
      const raw = localStorage.getItem("flights");
      return raw ? (JSON.parse(raw) as FlightInformationRaw[]) : [];
    };

    const convertDate = (raw: FlightInformationRaw): FlightInformation => ({
      ...raw,
      date: new Date(raw.date),
    });

    const pastClients: ClientInformations[] = getClient();

    const pastFlights: FlightInformation[] = getFlights().map((flightRaw) =>
      convertDate(flightRaw)
    );

    console.log("ICI");

    console.log(pastClients, pastFlights);

    setTimeout(() => {
      const today: Date = new Date();

      for (let i = 0; i < pastClients.length; i++) {
        if (pastFlights[i]) {
          console.log(pastFlights[i].date, today);

          if (pastFlights[i].date > today) {
            new travelCardComponent("upcoming-travel", pastFlights[i], pastClients[i]);
          } else {
            new travelCardComponent("past-travels", pastFlights[i], pastClients[i]);
          }
        }
      }

      const homeButton = document.getElementById("home-button-container");
      homeButton?.appendChild(
        createButton("Go Back to Home Page", "home-button", () =>
          AppManager.getInstance().changePage("home")
        )
      );
    }, 0);
  }
}
