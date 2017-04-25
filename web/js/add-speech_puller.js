// JavaScript Document

$("#submit-button").click(function(){
	
	"use strict";
	
	alert("called");
	
	var databaseURL = "https://puo6zmuiti.execute-api.us-east-1.amazonaws.com/prod/SpeechUpdate?TableName=SpeechTable";
	
	var title = document.getElementById("speech_name").value;
	alert(title);
	var author = document.getElementById("speech_author").value;
	alert(author);
	var words = document.getElementById("speech_words").value;
	alert(words);
				
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