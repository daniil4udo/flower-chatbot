'use strict'

const utils = require('../utils')

module.exports = {

    requestURI(PAGE_ACCESS_TOKEN) {
        return `https://graph.facebook.com/v3.3/me/messages?access_token=${PAGE_ACCESS_TOKEN}`
    },

    /**
     * 
     * @param { Object } recipient 
     * @param { Object } message 
     * @param { Object } options 
     */
    body(
        recipient = required,
        message = required,
        options
    ) {
        if(!recipient && !message)
            throw new Error('Recipient & Message is missing!')
        return Object.assign(
            {},
            { recipient },
            { message },
            options && { ...options }
        )
    },

    // === PARTS oF THE BODY REQUEST

    /**
     * 
     * @param { String } id 
     * @param { String } phone_number 
     * @param { String } user_ref 
     * @param { Object } name 
     */
    recipient(
        id = required,
        phone_number,
        user_ref,
        name
    ) {
        if (arguments.length < 1) throw new Error('No arguments found! RECIPIENT need arguments')
        return Object.assign(
            {},
            { id },
            phone_number && { phone_number },
            user_ref && { user_ref },
            name && { name }
        )
    },

    /**
     * 
     * @param { String } text 
     * @param { Object } attachment 
     * @param { Array<quick_reply>} quick_replies 
     * @param { String } metadata 
     */
    message(
        text,
        attachment,
        quick_replies
    ) {
        if (!text && !attachment) throw new Error('No arguments found! MESSAGE need arguments')
        return Object.assign(
            {},
            text && { text },
            attachment && { attachment },
            quick_replies && { quick_replies }
        )
    },

    /**
     * 
     * @param { String } notification_type - Optional. <REGULAR | SILENT_PUSH | NO_PUSH> Push notification type: Defaults to REGULAR.
     * @param { String } sender_action - 'mark_seen | typing_on | typing_off'
     * @param { String } messaging_type - https://developers.facebook.com/docs/messenger-platform/send-messages/#messaging_types
     * @param { String } tag - Message Tags - https://developers.facebook.com/docs/messenger-platform/message-tags
     */
    options(
        messaging_type = 'RESPONSE',
        tag,
        notification_type,
        sender_action
    ) {
        notification_type && utils.isValidNotificationType(notification_type)
        sender_action && utils.isValidSenderAction(sender_action)
        messaging_type && utils.isValidMessagingType(messaging_type)

        return Object.assign(
            {},
            notification_type && { notification_type },
            sender_action && { sender_action },
            messaging_type && { messaging_type },
            tag && { tag },
        )
    },

    //======================================= ATTACHMENTS || TEST
    // TEXt || ATTACHMENT > MESSAGE

    /**
     * 
     * @param { String } type - Type of attachment, may be image, audio, video, file or template. For assets, max file size is 25MB.
     * @param { Object } payload - Payload of attachment
     */
    attachment(
        type,
        payload
    ) {
        if (arguments.length < 1)
            throw new Error('No arguments found! ATTACHMENT need arguments')
        if (typeof type !== 'string')
            throw new TypeError('Wrong type of atachment\'s type property')
        return Object.assign(
            {},
            { type },
            { payload }
        )
    },

}