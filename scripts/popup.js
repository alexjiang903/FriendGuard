// Responsible for creating the popup that appears when the user clicks on the extension icon.
import { getActiveTabURL } from "../utils/utils.js";

document.addEventListener('DOMContentLoaded', async () => {
    //trigger when HTML is loaded
    const activeTab = await getActiveTabURL();
    const url = activeTab.url;
    
    if (url.includes("steamcommunity.com/profiles")) {
      //if the url is a steam profile page display main page
      const container = document.getElementsByClassName("container")[0];
      // Add styles dynamically inside the page
      const style = document.createElement("style");
      style.innerHTML = `
        #front-page {
            padding: 50px;
            background-color: #9fd7fc;
        }

        .title {
          font-size: 2em;
          font-weight: bold;
        }

        .disclaimer {
          margin-top: 15px;
          font-size: 0.9em;
          color: gray;
        }`;

      document.head.appendChild(style); // Append the style to head

      container.innerHTML = `
      <section id="front-page" class="p-6 bg-gray-100 rounded-lg shadow-lg">
        <header>
          <h1 class="title text-blue-600">FriendGuard</h1>
          <h3 class="text-xl">Stay safe on Steam!</h3>
        </header>
    
        <section class="disclaimer bg-gray-800 p-4 rounded-md mt-4">
          <p class="text-sm text-gray-500">
            <strong>DISCLAIMER:</strong> This tool should only used as a suggestion. Please err on the side of caution, we cannot guarantee 100% accuracy.
        </section>
        <section id="get-sus-score">
          <button id="sus-button">Check sus level</button>
        </section>
      </section>
      `;

      function handleClick() {
        console.log("clicked!");
        const friendStatus = document.getElementById("search_results_empty"); 

        /*  "search_results_empty" is the ID of element that appears on the page 
        when no pending friend requests are found  */
        
        if (!friendStatus) {
          console.log('no friend requests found!');
          //add text warning to indicate no requests to analyze
          const warningMessage = document.createElement("h2");
          warningMessage.textContent = "No friends found 😭";
          warningMessage.style.color = "red";
          
          container.appendChild(warningMessage);

          setTimeout(() => {
            warningMessage.remove();
          }, 5000);
        }

        else {
          console.log("friends are present")
          //TO IMPLEMENT: list friend(s) in dropdown, allow user to select friend to analyze
        }
        
      }

      const susButton = document.getElementById("sus-button");
      susButton.addEventListener("click", handleClick)
      
    }

    else {
      const container = document.getElementsByClassName("container")[0];
      container.innerHTML = `<div><h1>Steam Profile Not Detected :(</h1></div>`;
    }
})


