function isolateSteamUserID(string) {
  // https://steamcommunity.com/profiles/xxxxxxx/friends/pending

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


