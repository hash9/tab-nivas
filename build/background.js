/*global chrome*/

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed and background script running!');
  });
  
  // Listen for click events from the React app
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openNewTab') {
      chrome.tabs.create({ url: 'https://www.example.com' });
    }
  });
  
  