// JavaScript Document

$("#submit-button").click(function(){
	
	"use strict";
	
	var databaseURL = "https://hkgtsc7aa8.execute-api.us-east-1.amazonaws.com/prod/SpeechUpdate?TableName=Speech-Assistant";
	
	var speech_name = document.getElementById("speech_name").value;
	var speech_author = document.getElementById("speech_author").value;
	var speech_image = document.getElementById("speech_image").value;
	var speech_words = document.getElementById("speech_words").value;
				
	var to_post = JSON.stringify(
	{
		type: "POST",
		data: {
			TableName: "Speech-Assistant",
			Item: {
				SpeechName: speech_name,
				Author: speech_author,
				ImageSRC: speech_image,
				Words: speech_words
			}
		}
	});

	$.post(databaseURL, to_post);
	
	alert("Are you sure you want to enter this speech?");
	
});