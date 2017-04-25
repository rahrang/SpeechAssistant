// JavaScript Document
$(document).ready( function() {
	
	"use strict";
		
//	The URL of our Dynamo database on AWS
	var databaseURL = "https://puo6zmuiti.execute-api.us-east-1.amazonaws.com/prod/SpeechUpdate?TableName=SpeechTable";
	
	var databaseSize = 0;
	$.get(databaseURL, function(data) {
		databaseSize = data.Count;
	});
	
	//	variables to help us update corresponding html tags
	var link = "#link-";
	var title = "#title-";
	var author = "#author-";
	var promo = "#promo-";
	
//	var list_holder = document.getElementById("database-container");
	
	function get5Words(str) {
		return str.split(/\s+/).slice(0,5).join(" ");
	}
	
	//	the function to pull from the database and update the html tags
	$.get(databaseURL, function(data) {
		
//		for (var index_1 = 0; index_1 < databaseSize; index_1++) {
//
//			var speech_block = document.createElement("li");
//			speech_block.class = "speech-card";
//
//			var speech_link = document.createElement("a");
//			speech_link.href="speech.html";
//			speech_link.id="link-" + index_1;
//
//			var h3_holder = document.createElement("h3");
//			h3_holder.id = "title-" + index_1;
//			h3_holder.class = "speech-title";
//
//			var h4_holder = document.createElement("h4");
//			h4_holder.id = "author-" + index_1;
//			h4_holder.class = "speech-author";
//
//			var hr = document.createElement("hr");
//
//			var paragraph_holder = document.createElement("p");
//			paragraph_holder.id = "promo-" + index_1;
//			paragraph_holder.class = "speech-promo";
//
//			speech_block.appendChild(speech_link);
//			speech_link.appendChild(h3_holder);
//			speech_link.appendChild(h4_holder);
//			speech_link.appendChild(hr);
//			speech_link.appendChild(paragraph_holder);
//
//			list_holder.appendChild(speech_block);
//		}
		
		for (var index = 0; index < databaseSize; index++) {
			
			$(link + index).attr("href", "speech.html");
			
			$(title + index).text(data.Items[index].Title);
			
			$(author + index).text(data.Items[index].Author);
			
			$(promo + index).text(get5Words(data.Items[index].Words) + "...");

		}

	});
			
	$(link+"0").click(function(){
		sessionStorage.setItem("global_index", 0);
	});
	
	$(link+"1").click(function(){
		sessionStorage.setItem("global_index", 1);
	});
	
	$(link+"2").click(function(){
		sessionStorage.setItem("global_index", 2);
	});
	
	$(link+"3").click(function(){
		sessionStorage.setItem("global_index", 3);
	});
	
	$(link+"4").click(function(){
		sessionStorage.setItem("global_index", 4);
	});	
	
	$(link+"5").click(function(){
		sessionStorage.setItem("global_index", 5);
	});
		
});