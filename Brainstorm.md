# Brainstorm Doc 
All notes relevant to the project's development go here. 

# Background Script
Background script responsible for listening to current tab and determining if it is a valid steam friend page. 

Example of steam trade page format: https://steamcommunity.com/profiles/76561198205206195/friends/pending

**Requirements:** 
- must include https://steamcommunity.com/
- must have "profiles/" followed by some userID name (don't care specifically what that userID name is)
- must end in "/friends/pending"

- takes in string of form "/XXXX/tradeoffers" where XXXX is the unique steam user ID
- **note:** XXXX is <u>not</u> a fixed length 


# Other 


