import ViewScaffold from "./ViewScaffold.js";

export default class extends ViewScaffold {
    constructor() {
        super();
        this.setTitle("Home")
    }

    async getHtml() {
        return `
            <h1>Welcome back!</h1>
            <p>
                See all the daily video game news from various sources right here!
            </p>
            <p>
                <a href="/daily" data-link>View daily video game news</a>
            </p>
        `;
    }
}