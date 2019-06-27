'use strict'
const utils = require('../helpers/utils')

const senderAPIRequestURI = (token) => `https://graph.facebook.com/v3.3/me/messages?access_token=${token}`

/**
 * https://developers.facebook.com/docs/messenger-platform/reference/send-api/error-codes
 * @param { Object } {} - response object
 */
const isHasError = ({ recipient_id, message_id, error }) => {
    if (recipient_id && message_id)
        return false
    else {
        const { message, type, code, error_subcode, fbtrace_id } = error
        return `Send API request fails due to ${message} | ${type} / ${code} `
    }
}
// =========================== MAIN BODY COMPOSER ===========================
// =========================== {recipient: {...}, message: {...}, ...} ===========================

/**
 * 
 * @param { Object } recipient 
 * @param { Object } message 
 * @param { Object } options 
 */
const body = (
    recipient = required,
    message = required,
    options
) => {
    if (!recipient && !message)
        throw new Error('Recipient & Message are missing!')
    return JSON.stringify(Object.assign(
        {},
        { recipient },
        { message },
        options && { ...options }
    ), null, '\t')
}

// =========================== PARTS oF THE BODY REQUEST ===========================

/**
 * 
 * @param { String } id 
 * @param { String } phone_number 
 * @param { String } user_ref 
 * @param { String } first_name, 
 */
function recipient(
    id = required,
    phone_number,
    user_ref,
    first_name, last_name
) {
    if (arguments.length < 1)
        throw new Error('No arguments found! RECIPIENT needs a PSID')
    return Object.assign(
        {},
        { id },
        phone_number && { phone_number },
        user_ref && { user_ref },
        (phone_number && first_name && last_name) && { name: { first_name, last_name } }
    )
}

/**
 * 
 * @param { String } text 
 * @param { Object } attachment 
 * @param { Array<quick_reply>} quick_replies 
 * @param { String } metadata 
 */
function message(
    text,
    attachment,
    quick_replies
) {
    if (!text && !attachment)
        throw new Error('No arguments found! MESSAGE need arguments')
    if (quick_replies && quick_replies.length > 11)
        throw new Error('Only 11 Quick Replies are allowed')
    return Object.assign(
        {},
        text && { text },
        attachment && { attachment },
        quick_replies && { quick_replies }
    )
}

/**
 * 
 * @param { String } notification_type - Optional. <REGULAR | SILENT_PUSH | NO_PUSH> Push notification type: Defaults to REGULAR.
 * @param { String } sender_action - 'mark_seen | typing_on | typing_off'
 * @param { String } messaging_type - https://developers.facebook.com/docs/messenger-platform/send-messages/#messaging_types
 * @param { String } tag - Message Tags - https://developers.facebook.com/docs/messenger-platform/message-tags
 */
function options(
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
}

// =========================== MESSAGE PROPERTY ===========================
// === RETURN ATTACHMENT OBJECT {text: '...'} ===
// === RETURN ATTACHMENT OBJECT {type: '...', payload: {...} } ===

/**
 * https://developers.facebook.com/docs/messenger-platform/send-messages
 * @param { String } message 
 */
function text(message) {
    message = message + ''
    if (arguments.length < 1)
        throw new Error('No arguments found! TEXT needs arguments')
    if (typeof message !== 'string')
        throw new TypeError('Your message should be a string')
    return message
}

/**
 * Can be Either Template or File
 * @param { String } type - Type of attachment, may be image, audio, video, file or template. For assets, max file size is 25MB.
 * @param { Object } payload - Payload of attachment
 */
function attachment(
    type,
    payload
) {
    if (arguments.length < 1)
        throw new Error('No arguments found! ATTACHMENT need arguments')

    return utils.isValidAttachmentType(type) &&
        Object.assign(
            {},
            { type },
            { payload }
        )
}

// =========================== PARTS of ATTACHMENT PROPERTY ===========================
// =========================== FILE-TYPE ATTACHMENT ===========================
// === RETURN ATTACHMENT OBJECT {type: '...', payload: {...}} === -> MESSAGE

const uploadAttachmentURI = (token) => `https://graph.facebook.com/v3.3/me/message_attachments?access_token=${token}`
/**
     * 
     * @param { String } type - audio, video, image, file
     * @param {*} url 
     * @param {*} isReusable 
     */
const fileAttachmentPayload = (
    type = required,
    url = required,
    is_reusable = true
) => {

    return utils.isValidURL(url) && attachment(
        type,
        Object.assign(
            {},
            url && { url },
            is_reusable && { is_reusable },
        )
        //attachmentFilePayload(url, null, isReusable)
    )
}

/**
 * 
 * @param {*} type 
 * @param {*} attachment_id 
 */
const savedAttachmentPayload = (
    type,
    attachment_id
) => {
    return attachment(
        type,
        Object.assign(
            {},
            attachment_id && { attachment_id }
        )
        //attachmentFilePayload(null, attachment_id)
    )
}

// =========================== ATTACHMENT oF THE BODY REQUEST ===========================
// =========================== TEMPLATE-TYPE ATTACHMENT ===========================

// === RETURN ATTACHMENT OBJECT {type: 'template', payload: {...} } === -> MESSAGE

const attachmentTemplate = attachment.bind(null, 'template')

/**
  * https://developers.facebook.com/docs/messenger-platform/reference/template/button
  * @param { String } text - UTF-8-encoded text of up to 640 characters. Text will appear above the buttons.
  * @param { Boolean } sharable - Optional. Set to true to enable the native share button in Messenger for the template message. Defaults to false.
  * @param { Array<button>} buttons - Set of 1-3 buttons that appear as call-to-actions
  */
const buttonTemplatePayload = (
    text,
    buttons,
    sharable,
) => {
    return attachmentTemplate(
        Object.assign(
            {},
            { template_type: 'button' },
            { text },
            sharable && { sharable },   //Optional
            { buttons }
        ))
}

/**
 * https://developers.facebook.com/docs/messenger-platform/reference/template/generic
 * @param { Array<element> } elements - An array of element objects that describe instances of the generic template to be sent. Specifying multiple elements will send a horizontally scrollable carousel of templates. A maximum of 10 elements is supported.
 * @param { Boolean } sharable - Optional. Set to true to enable the native share button in Messenger for the template message. Defaults to false.
 * @param { String } image_aspect_ratio - Optional. The aspect ratio used to render images specified by element.image_url. Must be horizontal (1.91:1) or square (1:1). Defaults to horizontal
 */
const genericTemplatePayload = (
    elements,
    sharable,
    image_aspect_ratio
) => {
    return attachmentTemplate(Object.assign(
        {},
        { template_type: 'generic' },
        sharable && { sharable },
        image_aspect_ratio && { image_aspect_ratio },
        { elements }
    ))
}

/**
 * https://developers.facebook.com/docs/messenger-platform/reference/template/list
 * @param { String } top_element_style - Optional. Sets the format of the first list items. Messenger web client currently only renders compact. compact: Renders a plain list item. large: Renders the first list item as a cover item.
 * @param { Boolean } sharable - Optional. Set to true to enable the native share button in Messenger for the template message. Defaults to false.
 * @param { Array<button> } buttons - Optional. Button to display at the bottom of the list. Maximum of 1 button is supported
 * @param { Array<element> } elements - Array of objects that describe items in the list. Minimum of 2 elements required. Maximum of 4 elements is supported
 */
const listTemplatePayload = (
    elements,
    buttons,
    top_element_style = 'compact',
    sharable
) => {
    if (buttons.length > 1) throw new RangeError('Maximum 1 button allowed')
    if (elements.length > 4) throw new RangeError('Maximum 4 elements allowed')
    if (elements.length < 2) throw new RangeError('Minimum 2 elements allowed')
    return attachmentTemplate(Object.assign(
        {},
        { template_type: 'list' },
        top_element_style && { top_element_style },
        sharable && { sharable },
        { elements },
        { buttons },
    ))
}

/**
 * https://developers.facebook.com/docs/messenger-platform/reference/template/media
 * @param { Boolean } sharable - Optional. Set to true to enable the native share button in Messenger for the template message. Defaults to false.
 * @param { Array<element> } elements - Use mediaTemplateElement method. An array containing 1 element object that describe the media in the message. A maximum of 1 element is supported.
 */
const mediaTemplatePayload = (
    elements,
    sharable = true,
) => {
    if (!elements || elements.length > 1)
        throw new Error('element doesn\t exist or has more then 1 element')
    return attachmentTemplate(Object.assign(
        {},
        { template_type: 'media' },
        sharable && { sharable },   //Optional
        { elements: [elements] }
    ))
}

/**
 * https://developers.facebook.com/docs/messenger-platform/reference/template/open-graph
 * @param { Array<element> } elements - Array of maximum 1 object that describes the open graph object to display
 */
const opengraphTemplatePayload = (
    elements
) => {
    if (!elements || elements.length > 1)
        throw new Error('element doesn\t exist or has more then 1 element')
    return attachmentTemplate(Object.assign(
        {},
        { template_type: 'open_graph' },
        { elements }
    ))
}

/**
 * https://developers.facebook.com/docs/messenger-platform/reference/template/receipt
 * @param { Array<element> } elements 
 * @param { Boolean } sharable 
 * @param { String } recipient_name 
 * @param { String } merchant_name 
 * @param { String } order_number 
 * @param { String } currency 
 * @param { String } payment_method 
 * @param { String } timestamp 
 * @param { address object } address 
 * @param { Object } summary 
 * @param { Array<adjustment> } adjustments 
 */
const receiptTemplatePayload = (
    elements,
    sharable,
    recipient_name,
    merchant_name,
    order_number,
    currency,
    payment_method,
    timestamp,
    address,
    summary,
    adjustments
) => {
    return attachmentTemplate(Object.assign(
        {},
        { template_type: 'receipt' },
        elements && { elements },
        sharable && { sharable },
        { recipient_name },
        merchant_name && { merchant_name },
        { order_number },
        { currency },
        { payment_method },
        timestamp && { timestamp },
        address && { address },
        { summary },
        adjustments && { adjustments }
    ))
}

// =========================== PARTS oF THE BODY REQUEST ===========================
module.exports = {
    //===

    setRecipientData(PSID, phoneNumber, userRef, firstName, lastName) {
        if (Array.from(arguments).some(arg => typeof arg !== 'string'))
            throw new TypeError('RECIPIENT data has to be a sting type')
        return recipient(PSID, phoneNumber, userRef, firstName, lastName)
    },

    setOptionsData(messagingType, tag, notificationType) {
        return options(messagingType, tag, notificationType, senderAction)
    },

    //=== TEXT

    /**
     * 
     * @param { Object } recipient 
     * @param { String } textMessage 
     * @param { Object } options 
     */
    sendText(recipient, textMessage, options) {
        return body(
            recipient,
            message(
                text(
                    textMessage
                )
            ),
            options
        )
    },

    //=== QR

    sendQuickReplies(recipient, text, attachment, quickReplies, options) {
        return body(
            recipient,
            message(
                text,
                attachment,
                quickReplies
            ),
            options
        )
    },

    //=== RICH MESSAGE

    /**
     * 
     * @param { Object } recipient 
     * @param {*} type 
     * @param {*} url 
     * @param {*} isReusable 
     * @param { Object } options 
     */
    sendRichMessage(recipient, type, url, isReusable, options) {
        return utils.isValidURL(url) && body(
            recipient,
            message(
                null,
                fileAttachmentPayload(
                    type,
                    url,
                    isReusable
                )
            ),
            options
        )
    },

    /**
     * 
     * @param { Object } recipient 
     * @param {*} type 
     * @param {*} attachment_id 
     * @param { Object } options 
     */
    sendSavedAttachment(recipient, type, attachment_id, options) {
        return body(
            recipient,
            message(
                null,
                savedAttachmentPayload(
                    type,
                    attachment_id
                )
            ),
            options
        )
    },

    //=== TEMPLATES

    /**
     * 
     * @param { Object } recipient 
     * @param { String } text 
     * @param { Array<buttons> } buttons - uses buttons constructors methods from elements.js 
     * @param { Boolean } sharable 
     * @param { Object } options 
     */
    sendButtonTemplate(recipient, text, buttons, sharable, options) {
        return body(
            recipient,
            message(
                null,
                buttonTemplatePayload(
                    text,
                    buttons,
                    sharable
                )
            ),
            options
        )
    },

    /**
     * 
     * @param { Object } recipient 
     * @param { Array } elements 
     * @param { Boolean } sharable 
     * @param { String } imageAspectRation 
     * @param { Array<element> } options - array of genericTemplateElement - [genericTemplateElement, ...]
     */
    sendGenericTemplate(recipient, elements, sharable, imageAspectRation, options) {
        return body(
            recipient,
            message(
                null,
                genericTemplatePayload(
                    elements,
                    sharable,
                    imageAspectRation
                )
            ),
            options
        )
    },

    /**
     * 
     * @param { Object } recipient 
     * @param {*} elements 
     * @param {*} buttons 
     * @param {*} topElementStyle 
     * @param {*} sharable 
     * @param { Object } options 
     */
    sendListTemplate(recipient, elements, buttons, topElementStyle, sharable, options) {
        return body(
            recipient,
            message(
                null,
                listTemplatePayload(
                    elements,
                    buttons,
                    topElementStyle,
                    sharable
                )
            ),
            options
        )
    },

    /**
     * 
     * @param { Object } recipient 
     * @param {*} elements 
     * @param {*} sharable 
     * @param { Object } options 
     */
    sendMediaTemplate(recipient, elements, sharable, options) {
        return body(
            recipient,
            message(
                null,
                mediaTemplatePayload(
                    elements,
                    sharable
                )
            ),
            options
        )
    },

    /**
     * 
     * @param { Object } recipient 
     * @param {*} elements 
     * @param { Object } options 
     */
    sendOpengraphTemplate(recipient, elements, options) {
        return body(
            recipient,
            message(
                null,
                opengraphTemplatePayload(
                    elements
                )
            ),
            options
        )
    },

    /**
     * 
     * @param { Object } recipient 
     * @param { Array<element> } elements 
     * @param { Boolean } sharable 
     * @param { String } recipientName 
     * @param { String } merchantName 
     * @param { String } orderNumber 
     * @param { String } currency 
     * @param { String } paymentMethod 
     * @param { String } timestamp 
     * @param { address object } address 
     * @param { Object } summary 
     * @param { Array<adjustment> } adjustments 
     * @param { Object } options 
     */
    sendReceiptTemplate(
        recipient,
        elements,
        sharable,
        recipientName,
        merchantName,
        orderNumber,
        currency,
        paymentMethod,
        timestamp,
        address,
        summary,
        adjustments,
        options
    ) {
        return body(
            recipient,
            message(
                null,
                receiptTemplatePayload(
                    elements,
                    sharable,
                    recipientName,
                    merchantName,
                    orderNumber,
                    currency,
                    paymentMethod,
                    timestamp,
                    address,
                    summary,
                    adjustments
                )
            ),
            options
        )
    }

}