console.log("background script loaded!"); //also not being logged, seems to be no connection with content script.

function isolateSteamUserID(string) {
    let newString = string.replace("/friends/pending", "");
    let idx = newString.length - 1;
    let steamID = '';

    while (newString[idx] !== '/') {
        //Slice off the "" portion starting from back
        steamID += newString[idx];
        idx--;
    }
    console.log(steamID);
    steamID = steamID.split("").reverse().join("");
    return steamID;
}

chrome.tabs.onUpdated.addListener((tabID, tab) => {
    if (tab.url && tab.url.includes("steamcommunity.com/profiles")) {
      const queryParams = tab.url.split("/profiles");
      const steamUserIDString = isolateSteamUserID(queryParams[1]);
  
      chrome.tabs.sendMessage(tabID, {
        type: "FRIEND_PAGE",
        userID: steamUserIDString
      }) 
    }
  })


