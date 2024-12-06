console.log("background script loaded!"); 

function isolateSteamUserID(string) {
    const newString = string.replace("/friends/pending", "");
    let idx = newString.length - 1;
    let steamID = '';

    while (newString[idx] !== '/') {
        steamID += newString[idx];
        idx--;
    }
    return steamID.split("").reverse().join("");
}

function determineValidURL(_tab) {
    return (_tab.status === "complete" 
      && _tab.url 
      && _tab.url.includes("steamcommunity.com/profiles") 
      && _tab.url.includes("pending"));
}



chrome.tabs.onUpdated.addListener((tabID, _changeInfo, tab) => {
  //_changeInfo is placeholder parameter (not used)
  if (determineValidURL(tab)) { 
    console.log("steam user pending friends page detected"); 
    const queryParams = tab.url.split("/profiles");
    const steamUserIDString = isolateSteamUserID(queryParams[1]);

    chrome.tabs.sendMessage(tabID, {
      type: "FRIEND_PAGE",
      userID: steamUserIDString, //steamID of the current user (not of person who sent friend request to user)
    });
  }
});




