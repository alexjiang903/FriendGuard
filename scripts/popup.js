// Responsible for creating the popup that appears when the user clicks on the extension icon.
import { getActiveTabURL } from "../utils/utils.js";


document.addEventListener( 'DOMContentLoaded', async () => {
    //trigger when HTML is loaded
    const activeTab = await getActiveTabURL();
    const url = activeTab.url;
    
    if (url.includes("steamcommunity.com/profiles")) {
      //if the url is a steam profile page display main page
      const container = document.getElementsByClassName("container")[0];
      container.innerHTML = `<div id="title" class="container">
            <div>
                <div class="title">FriendGuard</div>
                <h3>Stay safe on Steam!</h3>
                <p>DISCLAIMER: This tool is only used as a suggestion. Please err on the side of caution, it is not 100% accurate.</p>

            </div>
        </div>`; 
    }

    else {
      const container = document.getElementsByClassName("container")[0];
      container.innerHTML = `<div><h1>Steam Profile Not Detected :(</h1></div>`;
    }
})


