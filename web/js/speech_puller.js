// JavaScript Document
$(document).ready( function() {
	
	"use strict";
	
	var databaseURL = "https://puo6zmuiti.execute-api.us-east-1.amazonaws.com/prod/SpeechUpdate?TableName=SpeechTable";
	
	var main_index = sessionStorage.getItem("global_index");	
	
	$.get(databaseURL, function(data) {
			
		$("#speech-title").text(data.Items[main_index].Title);
				
		$("#author-section").text(data.Items[main_index].Author);
				
		$("#words-section").text(data.Items[main_index].Words);

	});	
	
});