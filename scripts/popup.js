// Manages the popup that appears when the user clicks on the extension icon.
import { getActiveTabURL } from "../utils/utils.js";

function handleClick(container) {
  //called if #search_results is found
  console.log("clicked!");
  console.log("friends are present");

  container.innerHTML = 'yipeeee';
}

function waitForFriends(selector, callback, container, timeout=1000) {
  //Waits for selector (#search_results) to appear before calling handleClick
  //if timeout is reached, alert users that no friend reqs were found. 
  const observer = new MutationObserver((mutations, observer) => {
    // Check if #search_results exists
    if (document.querySelector(selector)) {
      console.log("found!");
      observer.disconnect(); // #search_results found, done observing
      callback(); // Call handleClick 
    }
  });

  observer.observe(document.body, { childList: true, subtree: true }); //observe entire DOM for changes

  setTimeout(() => {
    observer.disconnect();
    console.log(`Element '${selector}' not found within ${timeout}ms`);
    
    const warningMessage = document.createElement("h1"); // warning if no friend requests found
    warningMessage.classList.add("no-friends-msg");
    warningMessage.textContent = "No friends to analyze! 😎";
    
    container.append(warningMessage);
    setTimeout(() => warningMessage.remove(), 4000);
  }, timeout);
}

document.addEventListener('DOMContentLoaded', async () => {
    //trigger when HTML is loaded
    const activeTab = await getActiveTabURL();
    const url = activeTab.url;
    const container = document.getElementsByClassName("container")[0];

    if (!container) {
      console.error("no container found!");
      return;
    }

    if (url.includes("steamcommunity.com/profiles")) {
      //if the url is a steam profile page display main page
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
          <button id="sus-button">Vibe check your friends</button>
        </section>
      </section>
      `;

      const susButton = document.getElementById("sus-button");
      susButton.addEventListener("click", () => {
        waitForFriends("#search_results", () => handleClick(container), container); 
      });
      
    }

    else {
      container.innerHTML = `<div><h1>Steam Profile Not Detected :(</h1></div>`;
    }
})