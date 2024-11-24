// Responsible for creating the popup that appears when the user clicks on the extension icon.
import { getActiveTabURL } from "../utils/utils";

document.addEventListener( 'DOMContentLoaded', async () => {
    //trigger when HTML is loaded

    const activeTab = await getActiveTabURL();
    const url = activeTab.url;

    if (url.includes("steamcommunity.com/profiles")) {
        //if the url is a steam profile page
        const container = document.getElementById("container")[0];
        container.innerHTML = `<div>Steam Profile Detected</div>`;
    }

    else {
        const container = document.getElementById("container")[0];
        container.innerHTML = `<div>Steam Profile Not Detected</div>`;
    }
})