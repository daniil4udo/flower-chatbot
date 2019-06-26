'use strict'

const { attachment } = require('./1-sendAPI-body')

const templatePayload = attachment.bind(null, 'template')

module.exports = {

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/template/button
     * @param { String } text - UTF-8-encoded text of up to 640 characters. Text will appear above the buttons.
     * @param { Boolean } sharable - Optional. Set to true to enable the native share button in Messenger for the template message. Defaults to false.
     * @param { Array<button>} buttons - Set of 1-3 buttons that appear as call-to-actions
     */
    buttonTemplatePayload(
        text,
        buttons,
        sharable,
    ) {
        return templatePayload(Object.assign(
            {},
            { template_type: 'button' },
            { text },
            sharable && { sharable },   //Optional
            { buttons }
        ))
    },

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/template/generic
     * @param { Array<element> } elements - An array of element objects that describe instances of the generic template to be sent. Specifying multiple elements will send a horizontally scrollable carousel of templates. A maximum of 10 elements is supported.
     * @param { Boolean } sharable - Optional. Set to true to enable the native share button in Messenger for the template message. Defaults to false.
     * @param { String } image_aspect_ratio - Optional. The aspect ratio used to render images specified by element.image_url. Must be horizontal (1.91:1) or square (1:1). Defaults to horizontal
     */
    genericTemplatePayload(
        elements,
        sharable,
        image_aspect_ratio
    ) {
        return templatePayload(Object.assign(
            {},
            { template_type: 'generic' },
            sharable && { sharable },
            image_aspect_ratio && { image_aspect_ratio },
            { elements }
        ))
    },

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/template/list
     * @param { String } top_element_style - Optional. Sets the format of the first list items. Messenger web client currently only renders compact. compact: Renders a plain list item. large: Renders the first list item as a cover item.
     * @param { Boolean } sharable - Optional. Set to true to enable the native share button in Messenger for the template message. Defaults to false.
     * @param { Array<button> } buttons - Optional. Button to display at the bottom of the list. Maximum of 1 button is supported
     * @param { Array<element> } elements - Array of objects that describe items in the list. Minimum of 2 elements required. Maximum of 4 elements is supported
     */
    listTemplatePayload(
        top_element_style = 'compact',
        sharable,
        buttons,
        elements
    ) {
        if (buttons.length > 1) throw new RangeError('Maximum 1 button allowed')
        if (elements.length > 4) throw new RangeError('Maximum 4 elements allowed')
        if (elements.length < 2) throw new RangeError('Minimum 2 elements allowed')
        return templatePayload(Object.assign(
            {},
            { template_type: 'list' },
            top_element_style && { top_element_style },
            sharable && { sharable },
            { elements },
            { buttons },
        ))
    },

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/template/media
     * @param { Boolean } sharable - Optional. Set to true to enable the native share button in Messenger for the template message. Defaults to false.
     * @param { Array<element> } elements - An array containing 1 element object that describe the media in the message. A maximum of 1 element is supported.
     */
    mediaTemplatePayload(
        elements,
        sharable = true,
    ) {
        if (elements.length > 1) throw new Error('Maximum 1 elements are allowed')
        return templatePayload(Object.assign(
            {},
            { template_type: 'media' },
            sharable && { sharable },   //Optional
            { elements: [elements] }
        ))
    },

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/template/open-graph
     * @param { Array<element> } elements - Array of maximum 1 object that describes the open graph object to display
     */
    opengraphTemplatePayload(
        elements
    ) {
        return templatePayload(Object.assign(
            {},
            { template_type: 'open_graph' },
            { elements }
        ))
    },

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
    receiptTemplatePayload(
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
    ) {
        return templatePayload(Object.assign(
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
    },


}