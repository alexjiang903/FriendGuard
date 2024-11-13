// Background script responsible for listening to current tab and determining if it is a valid steam trade page

/* 
    Example of steam trade page format: https://steamcommunity.com/id/celeryiscrunchy/tradeoffers/ 

    Requirements: 
        1. must include https://steamcommunity.com/
        2. must have "id/" followed by some userID name (don't care specifically what that userID name is)
        3. must end the "tradeoffers/"
*/

function isolateSteamUserID(string) {
    // takes in string of form "/XXXX/tradeoffers" where XXXX is the unique steam user ID
    // note: XXXX is not a fixed length (can be any length I think)

    let newString = string.slice(1);
    let idx = newString.length - 1;

    while (newString[idx] !== '/') {
        //Slice off the "/tradeoffers" portion starting from back
        newString.replace(newString[idx], "");
        idx--;
    }
    newString.slice(-1);
    console.log(newString);

    return newString;
}

chrome.tabs.onUpdated.addListener((tabID, tab) => {
    if (tab.url && tab.url.includes("steamcommunity.com/id")) {
        const queryParams = tab.url.split("/id");
        const steamUserIDString = isolateSteamUserID(queryParams[1]);
        
      
      chrome.tabs.sendMessage(tabID, {
        type: "TRADE_PAGE",
        userID: steamUserIDString
      }) 
    }
  })


