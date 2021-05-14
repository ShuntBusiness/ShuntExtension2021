var text = document.getElementsByTagName("span");
var textChange;
function search() {

    var searchText = document.getElementById("searchText").value;
    textChange = text[0].innerHTML.split(" ");

    for (var i = 0; i < textChange.length; i++) {
	
	if (textChange[i].toLowerCase().includes(searchText.toLowerCase()) && !textChange[i - 2].includes("style")) {

	    textChange[i] = '&nbsp;</span> <span style="background-color: black"> ' + searchText + ' </span> <span>&nbsp;';
	
	}

    }

    text[0].innerHTML = textChange.join(' ').toString();

}

function allow() {

    var allowText = document.getElementById("allowText").value;
    textChange = text[0].innerHTML.split(" ");

    for (var i = 0; i < textChange.length; i++) {
	
	if (textChange[i].toLowerCase().includes(allowText.toLowerCase()) && textChange[i - 2].includes("style")) {

	    textChange[i - 1] = "";
	    textChange[i - 2] = "";
	    textChange[i - 3] = "";
	    textChange[i - 4] = "";
	    textChange[i + 1] = "";
	    textChange[i + 2] = "";
	
	}

    }

    text[0].innerHTML = textChange.join(' ').toString();

}