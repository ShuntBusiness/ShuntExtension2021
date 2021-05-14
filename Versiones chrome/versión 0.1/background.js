let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      switch (request.directive) {
      case "popup-click":
          // execute the content script
          chrome.tabs.executeScript(null, { // defaults to the current tab
              file: "jsShunt", // script to inject into page and run in sandbox
              allFrames: true // This injects script into iframes in the page and doesn't work before 4.0.266.0.
          });
          sendResponse({}); // sending back empty response to sender
          break;
      default:
          // helps debug when request directive doesn't match
          alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
      }
  }
);