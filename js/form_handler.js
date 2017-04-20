// JavaScript Document

$("#submit-button").click(function(){
	
	"use strict";
	
	var databaseURL = "https://hkgtsc7aa8.execute-api.us-east-1.amazonaws.com/prod/SpeechUpdate?TableName=Speech-Assistant";
	
	var name = document.getElementById("speech_name").value;
	var author = document.getElementById("speech_author").value;
	var image = document.getElementById("speech_image").value;
	var words = document.getElementById("speech_words").value;
				
	var to_post = JSON.stringify(
	{
		type: "POST",
		data: {
			TableName: "Speech-Assistant",
			Item: {
				SpeechName: name,
				Author: author,
				ImageSRC: image,
				Words: words
			}
		}
	});

	$.post(databaseURL, to_post);
	
	alert("Are you sure you want to enter this speech?");
	
});