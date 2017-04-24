"use strict";

var SKILL_STATES = {
    START: "_STARTMODE",
    ENUMERATE: "_ENUMERATEMODE"
};

var languageString = {
    "en-US": {
        "translation": {
            "SKILL_NAME": "Speech Assistant",
            "OPEN_PROMPT": "Hi, %s here! What do you want to do today?",
            "STOP_MESSAGE": "Good luck with the speech!",
            "WHAT_CAN_I_SAY": "I can help you memorize a speech, and then provide feedback to help you improve." +
                " Ask me for a list of my speeches, speech authors, or if you’re a returning user, you can specify a speech."
            "SPEECH_LOAD_ERR": "Sorry, it looks like an error occurred while loading the speeches.",
            "DATABASE_EMPTY_ERR": "Hi, %s here! It looks like you haven't uploaded any speeches to the database."
        }
    }
};

const Alexa = require("alexa-sdk");
var APP_ID = undefined;
const rp = require("request-promise");
const database = [];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.resources = languageString;
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, enumerateStateHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    "LaunchRequest": function () {
        this.handler.state = SKILL_STATES.START;
        loadDatabase.call(this);
        this.emitWithState("Start");
    },
    "Unhandled": function () {
        this.handler.state = SKILL_STATES.START;
        loadDatabase.call(this);
        this.emitWithState("Start");
    }
};

function loadDatabase()
{
    // var self = this;
    rp({
        uri: "https://hrw08iio3e.execute-api.us-east-1.amazonaws.com/prod/RecipeUpdate?TableName=RecipeList",
        json: true
    })
    .catch(error => {
        var speechOutput = this.t("SPEECH_LOAD_ERR");
        this.emit(":tell", speechOutput, speechOutput);
    })
    .then(data =>
    {
        data['Items'].forEach(speech => {
            const name = speech['SpeechName'].toLowerCase();
            database[name] = speech;
        });
        if(Object.keys(database).length != 0) {
            this.emitWithState("Start");
        } else {
            var speechOutput = this.t("DATABASE_EMPTY_ERR", this.t("SKILL_NAME"));
            this.emit(":tell", speechOutput, speechOutput);
        }
    });
}

var startStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.START,{
    "Start": function () {
        var speechOutput = this.t("OPEN_PROMPT", this.t("SKILL_NAME"));
        this.emit(":ask", speechOutput, speechOutput);
    },
    "EnumerateIntent": function() {

    },
    "PracticeIntent": function() {

    },
    "AuthorEnumerateIntent": function() {

    },
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Start");
    },
    "AMAZON.RepeatIntent": function() {
        this.emitWithState("Start");
    },
    "AMAZON.HelpIntent": function() {
        var speechOutput = this.t("WHAT_CAN_I_SAY");
        this.emit(":ask", speechOutput, speechOutput);
    },
    "AMAZON.StopIntent": function() {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(":tell", speechOutput, speechOutput);
    },
    "AMAZON.CancelIntent": function() {
        var speechOutput = this.t("STOP_MESSAGE");
        this.emit(":tell", speechOutput, speechOutput);
    },
    "Unhandled": function() {
        var speechOutput = "I couldn't understand that. " + this.t("OPEN_PROMPT", this.t("SKILL_NAME"));
        this.emit(":ask", speechOutput, speechOutput);
    },
    "SessionEndedRequest": function() {
        console.log("Session ended in state: " + this.event.request.reason);
    }
});

var enumerateStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.ENUMERATE, {
    "Start": function() {

    }
});