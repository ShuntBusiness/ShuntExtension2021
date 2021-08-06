chrome.runtime.sendMessage({ from: "content" }); //first, tell the background page that this is the tab that wants to receive the messages.

var textChange;
var originalText = "";
var searchTag = 'p';
var spoilers = [];
var spoilers_detected = [];
var tmp_tag;


chrome.runtime.onMessage.addListener(function (msg, url, value) {

    if (msg.from == "background") {

        if (value.length == 0) {

            var port = chrome.runtime.connectNative('com.shunt.spoiler_detector');
            port.onDisconnect.addListener(function () {
                console.log("Disconnected");
            });

            chrome.runtime.sendNativeMessage('com.my_company.my_application',
                { url: url },
                function (response) {
                    var body = JSON.parse(response);
                    var entities = body.entities;
                    var sentences = body.sentences;
                    for (var i = 0; i < entities.length; i++) {

                        for (var j = 0; j < sentences.length; j++) {

                            if (sentences[i].words.includes(entities[i].matched_words[0])) {

                                spoilers.push(sentences[i]);

                            }

                        }

                        for (var j = 0; j < spoilers.length; j++) {

                            for (var k = 0; k < spoilers[j].length; k++) {

                                if (spoilers[j][k].partOfSpeech.includes('V')) {

                                    spoilers_detected.push(spoilers[j].join(" "));
                                    break;

                                }

                            }

                        }

                    }
                }
            );

            const urlParams = `extractors=entities,topics,words&url=${url}&entities.filterFreebaseTypes=/fictional_universe/,/cvg/game_character,/film/film_character,/tv/tv_character,/book/book_character,/comic_books/comic_book_character&entities.allowOverlap=false`;
            req.setRequestHeader("x-textrazor-key", "2eb844810272c03a3315f39d645601d637c57543380d0b5dd98bd23e");
            req.send(urlParams);
            req.onreadystatechange = function () { // Call a function when the state changes.

                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

                    var body = req.response.response;
                    var entities = body.entities;
                    var sentences = body.sentences;
                    for (var i = 0; i < entities.length; i++) {

                        for (var j = 0; j < sentences.length; j++) {

                            if (sentences[i].words.includes(entities[i].matched_words[0])) {

                                spoilers.push(sentences[i]);

                            }

                        }

                        for (var j = 0; j < spoilers.length; j++) {

                            for (var k = 0; k < spoilers[j].length; k++) {

                                if (spoilers[j][k].partOfSpeech.includes('V')) {

                                    spoilers_detected.push(spoilers[j].join(" "));
                                    break;

                                }

                            }

                        }

                    }



                }

            }

        }

        if (value.length > 0) {

            spoilers_detected.push(value);

        }

        var tag = document.getElementsByTagName(searchTag);
        var tmp_tag = tag;

        for (var i = 0; i < tag.length; i++) {

            textChange = tag[i].innerHTML;
            originalText = tag[i].innerText;

            if (findCommonElements2(originalText, spoilers_detected) && !textChange.includes("changed")) {

                textChange = '&nbsp;</p> <span style="background-color: black"> ' + originalText + ' </span> <p>&nbsp;';


            }

            tmp_tag[i + 2].innerHTML = textChange;

        }

        tag = tmp_tag;

    }

});

function findCommonElements2(arr1, arr2) {

    arr1 = arr1.toLowerCase();

    for (var i = 0; i < arr1.length; i++) {

        for (var j = 0; j < arr2.length; j++) {

            if (arr1[i].includes(arr2[j].toLowerCase())) {

                return true;

            }

        }

    }

    return false;

}

