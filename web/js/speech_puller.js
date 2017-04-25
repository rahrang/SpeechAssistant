// JavaScript Document
$(document).ready( function() {
	
	"use strict";
	
	function countWords(str) {
  		return str.trim().split(/\s+/).length;
	}
	
	var databaseURL = "https://puo6zmuiti.execute-api.us-east-1.amazonaws.com/prod/SpeechUpdate?TableName=SpeechTable";
	
	var main_index = sessionStorage.getItem("global_index");	
	
	$.get(databaseURL, function(data) {
			
		$("#speech-title").text(data.Items[main_index].Title);
				
		$("#author-section").text(data.Items[main_index].Author);
		
		$("#count-section").text(countWords(data.Items[main_index].Words));
				
		$("#words-section").text(data.Items[main_index].Words);

	});
	
	
});