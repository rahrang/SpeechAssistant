	// JavaScript Document
function doSearch() {
	
	"use strict";

	//window.location.reload();
	var x = 0; 

	//	The URL of our Dynamo database on AWS
	var databaseURL = "https://puo6zmuiti.execute-api.us-east-1.amazonaws.com/prod/SpeechUpdate?TableName=SpeechTable";

	var databaseSize = 0;
	$.get(databaseURL, function(data) {
		databaseSize = data.Count;
	});

	function get6Words(str) {
	    return str.split(/\s+/).slice(0,6).join(" ");
	}

	var list_holder = document.getElementById("entire-database");
	var searchText = document.getElementById("searchText").value;
	//	variables to help us update corresponding html tags
	//	var link = "#link-";
	var title = "#title-";
	var author = "#author-";
	var promo = "#promo-";

	//	the function to pull from the database and update the html tags
	$.get(databaseURL, function(data) {
		
		for (var index_1 = 0; index_1 < databaseSize; index_1++) {

			var speech_block = document.createElement("li");
			speech_block.class = "speech-card";

			var speech_link = document.createElement("a");
			speech_link.href="speech.html";
			speech_link.id="link-" + index_1;

			var h3_holder = document.createElement("h3");
			h3_holder.id = "title-" + index_1;
			h3_holder.class = "speech-title";

			var h4_holder = document.createElement("h4");
			h4_holder.id = "author-" + index_1;
			h4_holder.class = "speech-author";

			var hr = document.createElement("hr");

			var paragraph_holder = document.createElement("p");
			paragraph_holder.id = "promo-" + index_1;
			paragraph_holder.class = "speech-promo";

			speech_block.appendChild(speech_link);
			speech_link.appendChild(h3_holder);
			speech_link.appendChild(h4_holder);
			speech_link.appendChild(hr);
			speech_link.appendChild(paragraph_holder);

			list_holder.appendChild(speech_block);

		}

		for (var index_2 = 0; index_2 < databaseSize; index_2++) {

			if (searchText == data.Items[index_2].Title || searchText == data.Items[index_2].Author || searchText == data.Items[index_2].Words) {
				x = 1;
				$(title + index_2).text(data.Items[index_2].Title);
				$(author + index_2).text(data.Items[index_2].Author);
				$(promo + index_2).text(get6Words(data.Items[index_2].Words) + "...");

			} else if (searchText == "") {
				x = 1;
				$(title + index_2).text(data.Items[index_2].Title);
				$(author + index_2).text(data.Items[index_2].Author);
				$(promo + index_2).text(get6Words(data.Items[index_2].Words) + "...");
			}

		}
		if (x == 0) {
			window.location.reload();
		}
	});
}

function resetPage() {
	window.location.reload();
}