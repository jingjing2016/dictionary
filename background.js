let offscreenDocument;

async function ensureOffscreenDocument() {
  if (await chrome.offscreen.hasDocument()) {
    return;
  }
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'To play pronunciation audio from an external source.',
  });
}

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
    (async () => {
      await ensureOffscreenDocument();
      const audioUrl = `https://dict.youdao.com/dictvoice?audio=${request.word}&type=0`;
      chrome.runtime.sendMessage({ type: 'playAudio', url: audioUrl });
    })();
    return true;
  }
});
