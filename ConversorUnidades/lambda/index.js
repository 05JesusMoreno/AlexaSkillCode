/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const languageStrings = {
  en: {
    translation: {
     WELCOME_MESSAGE: 'Welcome Jesus, you can say Help or convert 5 kilometers to meters. Which prefer?',
      HELP_MESSAGE: 'You can tell me "How much is 5 meters in centimeters" or "cancel" to exit. What do you want to do?' ,
      GOODBYE_MESSAGE: 'Goodbye Jesus!',
      REFLECTOR_MESSAGE: 'You just activated %s',
      FALLBACK_MESSAGE: 'Sorry, I don t know anything about that. Try again.',
      ERROR_MESSAGE: 'Sorry, there was a problem. Try again.',
      msg: 'The conversion result is: ',
      Get_MSG_Output: '...you can request another conversion...say convert 10000 centimeters to meters or cancel. What can I do for you?',
     MsgError: 'Sorry, I cannot process your data',
     MsgCorreccion: 'Sorry, the amount must be greater than zero'
    }
  },
  es:{
    translation: {
      WELCOME_MESSAGE: 'Bienvenido Jesus, puedes decir Ayuda o convierte 5 kilometros a metros. ¿Cual prefieres?',
      HELP_MESSAGE: 'Puedes decirme "Cuánto es 5 metros a centimetros" o "cancelar" para salir. ¿Que deseas hacer?' ,
      GOODBYE_MESSAGE: 'Adiós Jesus!',
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.',
      msg: 'El resultado de la conversión es ',
      Get_MSG_Output: '...puedes pedir otro conversión...di convierte 10000 centimetros a metros o cancelar.¿Que puedo hacer por ti?',
      MsgError: 'Disculpa, no puedo procesar tus datos',
      MsgCorreccion: 'Disculpa, la cantidad debe ser mayor que cero'
      
    }
  }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ConversorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConversorIntent';
    },
    handle(handlerInput) {
        const Cantidad = handlerInput.requestEnvelope.request.intent.slots.cantidad.value;
        const medidaE = handlerInput.requestEnvelope.request.intent.slots.medidaEntrada.value;
        const medidaS = handlerInput.requestEnvelope.request.intent.slots.medidaSalida.value;
        let res = 0;
        let speakOutput = '';
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const frasesMsg = requestAttributes.t('Get_FRASES_MSG');
        const msgOutput = requestAttributes.t('Get_MSG_Output');
        const msgError = requestAttributes.t('MsgError');
        const msgCorreccion = requestAttributes.t('MsgCorreccion');
        
        if (Cantidad > 0) {
            if (medidaE === 'centimetros' || medidaE === 'centimeters') {
                if (medidaS === 'kilometros' || medidaS === 'kilometers') {
                    res = Cantidad / 100000;
                    speakOutput = requestAttributes.t('msg') +` ${res} kilómetros. ${msgOutput}`;
                } else if (medidaS === 'metros' || medidaS === 'meters') {
                    res = Cantidad / 100;
                    speakOutput =  requestAttributes.t('msg') +` ${res} metros. ${msgOutput}`;
                }
            } else if (medidaE === 'metros' || medidaE === 'meters') {
                if (medidaS === 'centimetros' || medidaS === 'centimeters') {
                    res = Cantidad * 100;
                    speakOutput = requestAttributes.t('msg') +` ${res} centímetros. ${msgOutput}`;
                } else if (medidaS === 'kilometros' || medidaS === 'kilometers') {
                    res = Cantidad / 1000;
                    speakOutput = requestAttributes.t('msg') +` ${res} kilómetros. ${msgOutput}`;
                }
            } else if (medidaE === 'kilometros' || medidaE === 'kilometers') {
                if (medidaS === 'metros' || medidaS === 'meters') {
                    res = Cantidad * 1000;
                    speakOutput = requestAttributes.t('msg') +` ${res} metros. ${msgOutput}`;
                } else if (medidaS === 'centimetros' || medidaS === 'centimeters') {
                    res = Cantidad * 100000;
                    speakOutput = requestAttributes.t('msg') +` ${res} centímetros. ${msgOutput}`;
                }
            } else {
                speakOutput = msgError;
            }
        } else {
            speakOutput = msgCorreccion;
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');


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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ConversorHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();