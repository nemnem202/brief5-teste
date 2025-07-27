import { pagesItems } from "./data/data.js";
export class AppManager {
    constructor() {
        this.openPageOnInit = () => {
            const currentPath = window.location.pathname.split("/")[1];
            const pageItem = pagesItems.find((e) => e.label === currentPath);
            if (pageItem) {
                this.changePage(currentPath);
            }
            else if (currentPath === "") {
                this.changePage("home");
            }
            else {
                this.changePage("not-found");
            }
        };
        console.log("app init");
        this.openPageOnInit();
        window.addEventListener("popstate", () => {
            const path = window.location.pathname.replace("/", "");
            AppManager.getInstance().navigate(path);
        });
        this.addHeaderListeners();
    }
    addHeaderListeners() {
        document.getElementById("header-logo")?.addEventListener("click", () => {
            AppManager.getInstance().changePage("home");
        });
        document.getElementById("book-button-header")?.addEventListener("click", () => {
            AppManager.getInstance().changePage("form");
        });
        document.getElementById("history-button-header")?.addEventListener("click", () => {
            AppManager.getInstance().changePage("history");
        });
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new AppManager();
        }
        return this._instance;
    }
    changePage(label) {
        let page = pagesItems.find((i) => i.label === label);
        if (!page) {
            page = pagesItems.find((i) => i.label === "not-found");
        }
        this.currentPage = page;
        history.pushState({}, "", `/${this.currentPage?.label}`);
        this.displayPage();
    }
    navigate(label) {
        let page = pagesItems.find((i) => i.label === label);
        if (!page) {
            page = pagesItems.find((i) => i.label === "not-found");
        }
        this.currentPage = page;
        this.displayPage();
    }
    displayPage() {
        if (this.currentPage) {
            const component = this.currentPage.pageConstructor();
            if (!component || !component.content)
                return;
            const app = document.getElementById("app");
            if (!app)
                return;
            app.innerHTML = "";
            app.appendChild(component.content);
        }
        else {
            console.log("Erreur du chargement de la page, contenu supposé etre chargé:");
        }
    }
}
