function clickHandler(e) {

    chrome.runtime.sendMessage({ directive: "popup-click" }, function (response) {

        this.close(); // close the popup when the background finishes processing request

    });
}

document.getElementById("button-addon2").onclick = function () {
    var texto = document.getElementById("searchText").value;
    chrome.runtime.sendMessage({  //send a message to the background script
        from: "popup", 
        value: texto
    });
}