"use strict";

var SKILL_STATES = {
    START: "_STARTMODE",
    AENUMERATE: "_AENUMERATEMODE",
    PRACTICE: "_PRACTICEMODE"
};

var languageString = {
    "en-US": {
        "translation": {
            "SKILL_NAME": "Speech Assistant",
            "OPEN_PROMPT": "Hi, %s here! What do you want to do today?",
            "STOP_MESSAGE": "Good luck with the speech!",
            "UNFOUND_SPEECH": "Sorry, I couldn't find %s, is there another speech you would like to practice?",
            "LOOK_UP": "Let me pull up %s by %s.", 
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
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, aenumerateStateHandlers, practiceStateHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    "LaunchRequest": function () {
        this.handler.state = SKILL_STATES.START;
        loadDatabase.call(this);
    },
    "Unhandled": function () {
        this.handler.state = SKILL_STATES.START;
        loadDatabase.call(this);
    }
};

function loadDatabase()
{
    // var self = this;
    rp({
        uri: "https://puo6zmuiti.execute-api.us-east-1.amazonaws.com/prod/SpeechUpdate?TableName=SpeechTable",
        json: true
    })
    .catch(error => {
        var speechOutput = this.t("SPEECH_LOAD_ERR");
        this.emit(":tell", speechOutput, speechOutput);
    })
    .then(data =>
    {
        data['Items'].forEach(speech => {
            const name = speech['Title'].toLowerCase();
            database[name] = speech;
        });
        // if(Object.keys(database).length != 0) {
        if(database.length != 0) {
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
        enumerateSpeeches.call(this);
    },
    "PracticeIntent": function() {
        transitionPracticeState.call(this);
    },
    "AuthorEnumerateIntent": function() {
        this.handler.state = SKILL_STATES.AENUMERATE;

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

function enumerateSpeeches() {
    var speechOutput = "I have the speeches ";
    var total = Math.min(10, database.length);
    var count = 1;
    for(var key in database) {
        if(count > total) {
            break;
        }
        if(count == total) {
            speechOutput += "and " + database[key]['Title'] + ".";
        } else {
            speechOutput += database[key]['Title'] + ", ";
        }
        count += 1;
    }
    this.emit(":ask", speechOutput, speechOutput);
}

function transitionPracticeState() {
    var speechTitle = String(this.event.request.intent.slots.speechName.value).toLowerCase;
    if(speechTitle in database) {
        var speech = database[speechTitle];
        Object.assign(this.attributes, {
            "linePos": 0,
            "lines": speech['Words'].toLowerCase().split(/([^(\?|\.|\!)])+/g).filter(function(e1) {return e1.length!=0;}),
            "author": speech['Author'],
            "title": speechTitle
        });
        this.handler.state = SKILL_STATES.PRACTICE;
        this.emitWithState("Start");
    } else {
        var speechOutput = this.t("UNFOUND_SPEECH", speechTitle);
        this.emit(":ask", speechOutput, speechOutput);
    }
}

var practiceStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.PRACTICE, {
    "Start": function() {
        var speechOutput = this.t("LOOK_UP", this.attributes['title'], this.attributes['author']);
        speechOutput += " The first sentence is " + this.attributes['lines'][0];
        this.emit(":ask", speechOutput, speechOutput);
    },
    "SpeakIntent": function() {
        processSpeechInput.call(this);
    }
});

function processSpeechInput() {
    var user = String(this.event.request.intent.slots.freeFormSpeech.value);
    var userWords = user.split(" ").filter(function(e1) {return e1.length!=0;});
    var userLength = userWords.length;

    var pos = this.attributes['linePos'];
    var systemWords = this.attributes['lines'][pos].split(/([^(\ |\,|\;)])+/g).filter(function(e1) {return e1.length!=0;});
    var systemLength = systemWords.length;

}

var aenumerateStateHandlers = Alexa.CreateStateHandler(SKILL_STATES.AENUMERATE, {
    "Start": function() {

    }
});