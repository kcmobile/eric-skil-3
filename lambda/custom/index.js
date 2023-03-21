/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, Hey User Now You Can Setup Your ERIC App. First Verify Your ERIC OTP. Now Open The ERIC App Then Read Your OTP.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ConfigureOtpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'configureOtp';
    },
    handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        const myServerOtp = '1234';
        const otp = Alexa.getSlotValue(requestEnvelope, 'otp');
        var msg='';
        if(myServerOtp===otp)
        {
            msg=' And this is a valid OTP Do You Want to Save';
        }else{
            msg=' And this is not a valid OTP';
        }
        const speakOutput = 'You Have To Say : ' + otp + msg;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // we use intent chaining to trigger the birthday registration multi-turn
            // .addDelegateDirective({
            //     name: 'RegisterBirthdayIntent',
            //     confirmationStatus: 'NONE',
            //     slots: {}
            // })
            .getResponse();
    }
};
const RegisterBirthdayIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RegisterBirthdayIntent';
    },
    handle(handlerInput) {
        // const {attributesManager, requestEnvelope} = handlerInput;
        // // the attributes manager allows us to access session attributes
        // const sessionAttributes = attributesManager.getSessionAttributes();
        // const {intent} = requestEnvelope.request;

        // if (intent.confirmationStatus === 'CONFIRMED') {
        //     const day = Alexa.getSlotValue(requestEnvelope, 'day');
        //     const year = Alexa.getSlotValue(requestEnvelope, 'year');
        //     // we get the slot instead of the value directly as we also want to fetch the id
        //     const monthSlot = Alexa.getSlot(requestEnvelope, 'month');
        //     const monthName = monthSlot.value;
        //     const month = monthSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id; //MM

        //     sessionAttributes['day'] = day;
        //     sessionAttributes['month'] = month; //MM
        //     sessionAttributes['monthName'] = monthName;
        //     sessionAttributes['year'] = year;
        //     // we can't use intent chaining because the target intent is not dialog based
        //     return SayBirthdayIntentHandler.handle(handlerInput);
        // }

        return handlerInput.responseBuilder
            .speak("ok")
            // .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

const ConfirmationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'confirmOtpStatus';
    },
    handle(handlerInput) {
        const {attributesManager, requestEnvelope} = handlerInput;
        // the attributes manager allows us to access session attributes
        const {intent} = requestEnvelope.request;

        // if (intent.confirmationStatus === 'CONFIRMED') {
            const speakOutput = 'You OTP is Saved Now';

            return handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
            
        // }else{
        //     const speakOutput = 'You Not Say any thing.';

        //     return handlerInput.responseBuilder
        //         .speak(speakOutput)
        //         //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        //         .getResponse();
        // }
        
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ConfigureOtpIntentHandler,
        ConfirmationIntentHandler,
        RegisterBirthdayIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();