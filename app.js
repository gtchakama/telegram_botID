async function getChatID() {
    const apiToken = document.getElementById("http_api_token").value;
    const re = /[0-9]{9}:[a-zA-Z0-9_-]{35}/;
    if (!re.exec(apiToken)) {
      updateResponse("Error, check your BOT HTTP API Token");
      return;
    }
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${apiToken}/getUpdates`
      );
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      const data = await response.json();
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
      updateResponse(JSON.stringify(data, undefined, 2));
    } catch (e) {
      updateResponse(`Error: ${e.message}`);
    }
  }

  function updateResponse(text) {
    const responseEl = document.getElementById("jsonresponse");
    responseEl.innerHTML = text;
    responseEl.style.animation = "highlight-pre 1s";
    setTimeout(() => {
      responseEl.style.animation = "none";
    }, 1000);
  }