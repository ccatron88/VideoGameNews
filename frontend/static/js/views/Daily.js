import ViewScaffold from "./ViewScaffold.js";
import websiteJson from '../../data/news_sites.json' assert {type: 'json'}

export default class extends ViewScaffold {
    constructor() {
        super();
        this.setTitle("Daily News")
    }

    async getHtml() {
        return `
            <h1>Daily Video Game News</h1>
            <p>
                Currently a placeholder for 
                posts provided by service of
                some sort.
            </p>

            <div class="card">
                <div>
                    <img src="${websiteJson.websiteOne.image}" />
                    <img src="images/overwatch2.webp" />
                </div>
            </div>
        `;
    }
}

