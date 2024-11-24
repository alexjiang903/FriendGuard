(() => {
    let currentPage = "";

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === "FRIEND_PAGE") {
            currentPage = request.userID;
            console.log("friend page reiceved")
        }
    });





})