// Responsible for creating the popup that appears when the user clicks on the extension icon.
import { getActiveTabURL } from "../utils/utils.js";
// test change to publish branch

document.addEventListener( 'DOMContentLoaded', async () => {
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
    
        <section class="disclaimer bg-gray-200 p-4 rounded-md mt-4">
          <p class="text-sm text-gray-500">
            <strong>DISCLAIMER:</strong> This tool should only used as a suggestion. Please err on the side of caution, we cannot guarantee 100% accuracy.
        </section>
        <section id="sus-button" class="">
          <button>Check Sus level</button>
        </section>
      </section>
      `;

      function handleClick() {
        console.log("clicked!");
      
        const friendStatus = document.getElementById("search_results_empty");
        console.log("friend status:", friendStatus)

        if (friendStatus && friendStatus.textContent.includes("Sorry, there are no pending friend invites to show.")) {
          const warning = document.createElement("div");
          warning.innerHTML = "<p>No friend requests detected!</p>";
          const container = document.getElementsByClassName("container")[0];
          container.appendChild(warning);
        }

        else {
          console.log("friends present?")
        }
      }


      document.addEventListener("DOMContentLoaded", function() {
        const susButton = document.getElementById("sus-button");
        if (susButton) {
          susButton.addEventListener("click", handleClick)

        }
        else {
          console.error("sus button not found");
        }
  
      })


    }

    else {
      const container = document.getElementsByClassName("container")[0];
      container.innerHTML = `<div><h1>Steam Profile Not Detected :(</h1></div>`;
    }
})


