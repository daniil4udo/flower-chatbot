const axios = require('axios');

const utils = require('./src/helpers/utils')
const sendAPI = require('./src/API/SendAPI')
const sendAPIElements = require('./src/API/Send API-elements')
const messagerProfileAPI = require('./src/API/MessengerProfileAPI')

const lg = console.log
/**
 * Message request
 */

const recipient = sendAPI.setRecipientData('USERS_PSID')

const buttons = [
    sendAPIElements.callButton('Call us', '+380973008777'),
    sendAPIElements.urlButton('https://google.com', 'Google')
]
const defaultAction = sendAPIElements.urlButton('https://facebook.com', 'Facebook')

const message = sendAPI.sendText(recipient, 'Message in Messenger')

const buttonTemplate = sendAPI.sendButtonTemplate(recipient, 'My message Buttons template', buttons)


lg(buttonTemplate)