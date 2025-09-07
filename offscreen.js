chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'playAudio') {
    const audio = document.getElementById('audio-player');
    audio.src = request.url;
    audio.play();
  }
});
