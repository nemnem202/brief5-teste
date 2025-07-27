import { Component } from "../lib/component.js";
import { AppManager } from "../appManager.js";
import notFoundTemplate from "../componentsTemplates/notFoundComponent.js";
export class NotFoundComponent extends Component {
    constructor() {
        super(notFoundTemplate);
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
