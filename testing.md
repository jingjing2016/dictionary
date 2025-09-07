# Manual Testing Instructions

This document provides instructions on how to manually test the Word Definer Chrome extension.

## 1. Loading the Extension

1.  **Open Chrome**: Launch the Google Chrome browser.
2.  **Navigate to Extensions**: Type `chrome://extensions` in the address bar and press Enter.
3.  **Enable Developer Mode**: In the top right corner of the Extensions page, toggle the "Developer mode" switch to the "on" position.
4.  **Load Unpacked**: Click the "Load unpacked" button that appears on the left side of the page.
5.  **Select Extension Directory**: In the file selection dialog, navigate to the directory where you have the extension's source code and select it.
6.  **Verify Installation**: The "Word Definer" extension should now appear in your list of installed extensions.

## 2. Testing the Functionality

Once the extension is loaded, you can test its features by following these steps:

### 2.1. Test Word Lookup

1.  **Navigate to a Webpage**: Open any webpage that contains text (e.g., a news article, a blog post).
2.  **Double-Click a Word**: Find a word you want to define and double-click on it.
3.  **Verify Popup**: A small popup window should appear near the word you double-clicked.
4.  **Verify Content**: The popup should display:
    *   The word you selected.
    *   Its phonetic transcription (if available).
    *   A list of its definitions.

### 2.2. Test Audio Pronunciation

1.  **Click the Speaker Icon**: In the popup window, click the speaker icon (🔊).
2.  **Verify Audio**: You should hear the word being pronounced.

### 2.3. Test Popup Closing

1.  **Click Outside**: Click anywhere on the page outside of the popup window.
2.  **Verify Closing**: The popup should disappear.
3.  **Double-Click Again**: Double-click the same word or another word to ensure the popup can be triggered again.

### 2.4. Test "No Definition Found"

1.  **Select Gibberish**: On a webpage, type some random, non-existent word (e.g., "asdfghjkl").
2.  **Double-Click the Gibberish**: Double-click the random text you typed.
3.  **Verify "No Definition" Message**: The popup should appear with a message indicating that no definition was found.

By following these steps, you can thoroughly test the functionality of the Word Definer extension.
