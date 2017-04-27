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
		
	function get6Words(str) {
		return str.split(/\s+/).slice(0,6).join(" ");
	}
	
	//	the function to pull from the database and update the html tags
	$.get(databaseURL, function(data) {
				
		for (var index = 0; index < databaseSize; index++) {
			
			$(link + index).attr("href", "speech.html");
			
			$(title + index).text(data.Items[index].Title);
			
			$(author + index).text(data.Items[index].Author);
			
			$(promo + index).text(get6Words(data.Items[index].Words) + "...");

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