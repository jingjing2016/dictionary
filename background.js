chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getDefinition') {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${request.word}`)
      .then(response => response.json())
      .then(data => {
        sendResponse({ data: data });
      })
      .catch(error => {
        console.error('Error fetching definition:', error);
        sendResponse({ data: null });
      });
    return true; // Indicates that the response is sent asynchronously
  } else if (request.type === 'speak') {
    chrome.tts.speak(request.word, { 'rate': 0.7 });
  }
});
