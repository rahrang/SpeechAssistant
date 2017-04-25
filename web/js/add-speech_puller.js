// JavaScript Document

$("#submit-button").click(function(){
	
	"use strict";
	
	var databaseURL = "https://puo6zmuiti.execute-api.us-east-1.amazonaws.com/prod/SpeechUpdate?TableName=SpeechTable";	
	var title = document.getElementById("speech_name").value;
	var author = document.getElementById("speech_author").value;
	var words = document.getElementById("speech_words").value;				
	
	var to_post = JSON.stringify(
	{
		TableName: "SpeechTable",
		Item: {
			Title: title,
			Author: author,
			Words: words
		}
	});

	$.post(databaseURL, to_post);
	
	alert("Are you sure you want to enter this speech?");
	
});