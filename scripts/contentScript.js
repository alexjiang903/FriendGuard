console.log("content script loaded!"); 
let usrID = "";

chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    console.log("request:", obj);
    if (obj.type === "FRIEND_PAGE") {
        usrID = obj.userID;
        console.log(usrID);
        console.log("friend page recieved");
    }
});
