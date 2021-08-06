var contentTabId;
let url;

chrome.runtime.onMessage.addListener(function (msg, sender, value) {

  if (msg.from == "content") {  //get content scripts tab id
    contentTabId = sender.tab.id;
  }
  if (msg.from == "popup" && contentTabId) {  //got message from popup
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      url = tabs[0].url;
      // use `url` here inside the callback because it's asynchronous!
    });
    chrome.tabs.sendMessage(contentTabId, {  //send it to content script
      from: "background"
    }, url, value);
  }
});