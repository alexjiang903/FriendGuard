//Goal: grab any tab from user chrome page

export async function getActiveTabURL() {
    let queryOptions = {active: true, currentWindow: true}; //active is any tab that is currently open on Chrome
    let [tab] = await chrome.tabs.query(queryOptions); //gets the first tab that results in the query
    return tab; 
}