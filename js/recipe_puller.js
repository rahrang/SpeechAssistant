// JavaScript Document
$(document).ready( function() {
	
	"use strict";
	
//	The URL of our Dynamo database on AWS
var databaseURL = "https://hkgtsc7aa8.execute-api.us-east-1.amazonaws.com/prod/SpeechUpdate?TableName=Speech-Assistant";
	
	var main_index = sessionStorage.getItem("global_index");	
	
//	the function to pull from the database and update the html tags
	$.get(databaseURL, function(data) {
			
		// changes the content of the h2 tag with id "dish-name-INDEX" to the corresponding RecipeName in the database
		$("#speech_name").text(data.Items[main_index].SpeechName);
				
		// changes the source of the img tag with id "dish-img-INDEX" to corresponding source URL in the database
		$("#speech_image").attr("src", data.Items[main_index].ImageSRC);  
				
		// changes the content of the p tag with id "ingredients-section" to corresponding recipe ingredients in the database
		$("#speech_author").text(data.Items[main_index].Author);
				
		// changes the content of the p tag with id "directions-section" to corresponding recipe directions in the database
		$("#speech_words").text(data.Items[main_index].Words);

	});	
	
});