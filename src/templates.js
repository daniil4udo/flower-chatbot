'use strict'

const { compose } = require('./utils')

const body              = require('./helpers/1-sendAPI-body')
const templates         = require('./helpers/2-send-template-attachment')
const files             = require('./helpers/2-send-text-file-attachment')
const templateElements  = require('./helpers/3-elements-template')
const quickreplyElement = require('./helpers/4-element-quickreply')
const buttons           = require('./helpers/4-elements-buttons')

module.exports = {

    sendButtonTemplate(PSID, TEXT, BUTTONS, SHARABLE) {
        const ATTACHMENT = templates.buttonTemplatePayload(TEXT, BUTTONS, SHARABLE)
        return body.body(
            body.recipient(PSID,),
            body.message(null, ATTACHMENT),
            //body.options(MESSAGING_TYPE, TAG, NOTIFICATION, SENDER_ACTION)
        )
    }

    // IN PROGRESS

}