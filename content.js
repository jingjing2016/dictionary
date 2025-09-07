let popup = null;

document.addEventListener('dblclick', (event) => {
  if (popup) {
    popup.remove();
    popup = null;
    return;
  }

  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    chrome.runtime.sendMessage({ type: 'getDefinition', word: selectedText }, (response) => {
      if (response && response.data) {
        showPopup(response.data, event);
      } else {
        showPopup(null, event);
      }
    });
  }
});

async function showPopup(data, event) {
  if (popup) {
    popup.remove();
  }

  const popupUrl = chrome.runtime.getURL('popup.html');
  const response = await fetch(popupUrl);
  const popupTemplate = await response.text();
  const popupContainer = document.createElement('div');
  popupContainer.innerHTML = popupTemplate;
  popup = popupContainer.firstElementChild;


  const wordEl = popup.querySelector('#word-definer-word');
  const phoneticEl = popup.querySelector('#word-definer-phonetic');
  const definitionsEl = popup.querySelector('#word-definer-definitions');
  const speakButton = popup.querySelector('#word-definer-speak-button');

  if (data && data.length > 0 && !data.title) {
    const wordData = data[0];
    wordEl.textContent = wordData.word;
    phoneticEl.textContent = (wordData.phonetics[0] && wordData.phonetics[0].text) || '';

    wordData.meanings.forEach(meaning => {
      const partOfSpeechEl = document.createElement('div');
      partOfSpeechEl.className = 'word-definer-part-of-speech';
      partOfSpeechEl.textContent = meaning.partOfSpeech;
      definitionsEl.appendChild(partOfSpeechEl);

      meaning.definitions.forEach((definition, index) => {
        const meaningEl = document.createElement('div');
        meaningEl.className = 'word-definer-meaning';
        meaningEl.textContent = `${index + 1}. ${definition.definition}`;
        definitionsEl.appendChild(meaningEl);
      });
    });

    speakButton.onclick = () => {
      chrome.runtime.sendMessage({ type: 'speak', word: wordData.word });
    };

  } else {
    wordEl.textContent = 'No definition found.';
    phoneticEl.textContent = '';
    definitionsEl.innerHTML = '';
  }

  document.body.appendChild(popup);

  const rect = event.target.getBoundingClientRect();
  popup.style.left = `${event.clientX + window.scrollX}px`;
  popup.style.top = `${event.clientY + window.scrollY + 10}px`;

  document.addEventListener('click', (e) => {
    if (popup && !popup.contains(e.target)) {
      popup.remove();
      popup = null;
    }
  }, { once: true });
}
