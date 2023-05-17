/**
 * Asynchronously gets chat ID from Telegram API using provided HTTP API Token.
 */
async function getChatID() {
    // Get API token from HTML input field
    const apiToken = document.getElementById("http_api_token").value;
    
    // Regular expression to validate the API token format
    const re = /[0-9]{9}:[a-zA-Z0-9_-]{35}/;
    
    // Check if the API token is in the correct format
    if (!re.exec(apiToken)) {
      updateResponse("Error, check your BOT HTTP API Token");
      return;
    }
  
    try {
      // Send API request to get updates from Telegram
      const response = await fetch(`https://api.telegram.org/bot${apiToken}/getUpdates`);
      
      // Check if response is OK; otherwise throw an error
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      
      // Parse the response data as JSON
      const data = await response.json();
      
      // Loop through the result array and find the chat ID 
      // of the first private or group chat message
      data.result.forEach((m) => {
        if (
          m.message &&
          m.message.chat &&
          m.message.chat.type &&
          (m.message.chat.type === "group" ||
            m.message.chat.type === "private")
        ) {
          document.getElementById("chatid").value = m.message.chat.id;
        }
      });
      
      // Update the HTML element to display the response data as a string
      updateResponse(JSON.stringify(data, undefined, 2));
    } catch (e) {
      // Handle errors by updating the HTML element with the error message
      updateResponse(`Error: ${e.message}`);
    }
  }
  
  /**
   * Updates the HTML element to display the provided text
   * and adds an animation effect.
   * @param {string} text - The text to display in the HTML element.
   */
  function updateResponse(text) {
    const responseEl = document.getElementById("jsonresponse");
    
    // Set the innerHTML of the HTML element to the provided text
    responseEl.innerHTML = text;
    
    // Add a CSS animation effect to highlight the HTML element
    responseEl.style.animation = "highlight-pre 1s";
    
    // Reset the animation effect after 1 second
    setTimeout(() => {
      responseEl.style.animation = "none";
    }, 1000);
  }
  