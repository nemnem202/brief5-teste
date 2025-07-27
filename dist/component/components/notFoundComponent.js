import { Component } from "../lib/component";
import templateHTML from "../componentsTemplates/notFoundComponent.html?raw";
import "../componentsStyleSheets/formComponent.css";
import { AppManager } from "../appManager";
export class NotFoundComponent extends Component {
    constructor() {
        super(templateHTML);
        setTimeout(this.addListener, 0);
    }
    addListener() {
        const returnBtn = document.getElementById("returnHome");
        if (returnBtn) {
            returnBtn.addEventListener("click", () => {
                AppManager.getInstance().changePage("home");
            });
        }
    }
}
