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
      WELCOME_MESSAGE: 'Welcome Jesus, you can say Help or Tell me something interesting about the Nissan Skyline. Which prefer?',
      HELP_MESSAGE: 'You can tell me "tell me a fun fact about the Nissan Skyline" or "cancel" to exit. What do you want to do?',
      GOODBYE_MESSAGE: 'Goodbye Jesus!',
      REFLECTOR_MESSAGE: 'You just triggered %s',
      FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
      ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
      Get_FRASES_MSG:"A curious fact is ... ",
       Get_MSG_Salida: " ...you can ask for another curious fact...tell me a curious fact about the Nissan Skyline or cancel. What can I do for you?",
     
      DATA : [
       'The R34 is equipped with the famous RB26DETT engine, a 2.6-liter twin-turbocharged inline six-cylinder engine.',
       'The Skyline is capable of producing around 276 horsepower from the factory. However, many owners have managed to increase the power considerably with modifications,',
       'The Nissan Skyline R34 comes with an advanced multi-function instrument panel that provides detailed information on engine performance, including turbo pressure, oil temperature and water temperature.',
       'The Skyline R34 has had great success in GT racing, especially in the Super GT series in Japan, where it has won multiple championships.',
       'The R34 is famous for its appearances in popular culture, including movies like "The Fast and the Furious" and video games like "Gran Turismo" and "Need for Speed."',
       'Production of the R34 was limited, which has contributed to its cult status. Only around 11,000 units of the GT-R variants were produced between 1999 and 2002.',
       'The Bayside Blue color is one of the most iconic colors associated with the R34. This color is not only popular for its aesthetics, but it is also one of the most sought after by collectors.',
       'The Nissan Skyline GT-R is nicknamed "Godzilla" due to its absolute dominance on the track and its impressive road performance, compared to the legendary Japanese monster.'
        ]
    }
  },
  es:{
    translation: {
      WELCOME_MESSAGE: 'Bienvenido Jesus, puedes decir Ayuda o Cuéntame algo interesante sobre el Nissan Skyline. ¿Cual prefieres?',
      HELP_MESSAGE: 'Puedes decirme "dime un dato curioso sobre el Nissan Skyline" o "cancelar" para salir. ¿Que deseas hacer?' ,
      GOODBYE_MESSAGE: 'Adiós Jesus!',
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.',
      Get_FRASES_MSG:"Un dato curioso es ... ",
      Get_MSG_Salida: "...puedes pedir otro dato curioso...di dime un dato curioso del Nissan Skyline o cancelar.¿Que puedo hacer por ti?",
      DATA : [
        'El R34 está equipado con el famoso motor RB26DETT, un motor de 2.6 litros de seis cilindros en línea con doble turbocompresor.',
        'El Skyline es capaz de producir alrededor de 276 caballos de fuerza de fábrica. Sin embargo, muchos propietarios han logrado aumentar esta potencia considerablemente con modificaciones',
        'El Nissan Skyline R34 viene con un avanzado panel de instrumentos multifunción que proporciona información detallada sobre el rendimiento del motor, incluyendo la presión del turbo, la temperatura del aceite y la temperatura del agua.',
        'El Skyline R34 ha tenido un gran éxito en las carreras de GT, especialmente en la serie Super GT en Japón, donde ha ganado múltiples campeonatos.',
        'El R34 es famoso por sus apariciones en la cultura popular, incluyendo películas como "The Fast and the Furious" y videojuegos como "Gran Turismo" y "Need for Speed".',
        'La producción del R34 fue limitada, lo que ha contribuido a su estatus de culto. Solo se produjeron alrededor de 11,000 unidades de las variantes GT-R entre 1999 y 2002.',
        'El color Bayside Blue es uno de los más icónicos asociados con el R34. Este color no solo es popular por su estética, sino que también es uno de los más buscados por los coleccionistas.',
        'El Nissan Skyline GT-R es apodado "Godzilla" debido a su dominio absoluto en las pistas y su impactante desempeño en carretera, comparado con el legendario monstruo japonés.'
        ]
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

const curiosidadesIntentHandler ={
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) ===  'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CuriosidadIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const FrasesArray = requestAttributes.t('DATA');
        let response;
        const FrasesIndice = Math.floor(Math.random() * FrasesArray.length);
        const ramdomFrase = FrasesArray[FrasesIndice];
        const speakOutput = requestAttributes.t('Get_FRASES_MSG') + ramdomFrase + requestAttributes.t('Get_MSG_Salida')
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}

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
        curiosidadesIntentHandler,
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