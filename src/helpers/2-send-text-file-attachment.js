'use strict'

const { compose } = require('../utils')
const { attachment } = require('./1-sendAPI-body')


// === PAYLOAD TEMPLATE ===

const attachmentPayload = (
        url,
        attachment_id,
        is_reusable,
    ) => {
    return Object.assign(
        {},
        url && { url },
        is_reusable && { is_reusable },
        attachment_id && { attachment_id }
    )
}

module.exports = {

    /**
     * https://developers.facebook.com/docs/messenger-platform/send-messages
     * RETURN OBJECT TO ATTACH FOR MESSAGE OBJECT
     */

    sendTextMessage(message) {
        return message
    },

    /**
     * 
     * @param { String } type - audio, video, image, file
     * @param {*} url 
     * @param {*} isReusable 
     */
    sendAttachment(url, type, isReusable = true) {
        return attachment(
            type,
            attachmentPayload(url, null, isReusable)
        )
    },

    /**
     * 
     * @param {*} attachment_id 
     * @param {*} type 
     */
    sendSavedAttachment(attachment_id, type) {
        return attachment(
            type,
            attachmentPayload(null, attachment_id)
        )
    },
}