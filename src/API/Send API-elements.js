'use strict'
const utils = require('../helpers/utils')

const BUTTON_TITLE_LENGTH = 20
const isAllowedTitleLength = utils.maxCharsAllowed(BUTTON_TITLE_LENGTH)

module.exports = {

    // === QUICK REPLIES

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/send-api/quick-replies
     * @param { String } content_type - Must be one of the following
        text: Sends a text button
        user_phone_number: Sends a button allowing recipient to send the phone number associated with their account.
        user_email: Sends a button allowing recipient to send the email associated with their account.
     * @param { String } title - Required if content_type is 'text'. The text to display on the quick reply button. 20 character limit
     * @param { String || Number } payload - Required if content_type is 'text'. Custom data that will be sent back to you via the messaging_postbacks webhook event. 1000 character limit
     * @param { String } image_url - Optional. URL of image to display on the quick reply button for text quick replies. Image should be a minimum of 24px x 24px. Larger images will be automatically cropped and resized
     */
    quickReplyButton(
        title = required,
        payload = required,
        content_type = 'text',
        image_url
    ) {
        return isAllowedTitleLength(title.length) &&
            utils.isValidQuickReplyType(content_type) &&
            utils.isValidURL(image_url) &&
            Object.assign(
                {},
                { content_type },
                { title },
                { payload },
                image_url && { image_url },
            )
    },

    // === BUTTONS

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/buttons/call
     * @param { String } title - Text on the button
     * @param { String } payload  - Mobile phone with +
     */
    callButton(
        title = required,
        payload = required
    ) {
        return isAllowedTitleLength(title.length) &&
            utils.isValidMobilePhone(payload) &&
            Object.assign(
                {},
                { type: 'phone_number' },
                { title },
                { payload }
            )
    },

    /**
     * 
     * @param { String } title - Button title. null if used for template default
     * @param { String } url - URL to follow
     * @param { String } webview_height_ratio '<compact|tall|full>' Optional. Height of the Webview. Valid values: compact, tall, full. Defaults to full.
     * @param { String } fallback_url The URL to use on clients that don't support Messenger Extensions. If this is not defined, the url will be used as the fallback. It may only be specified if messenger_extensions is true
     * @param { Boolean } messenger_extensions '<true|false>' Optional. Must be true if using Messenger Extensions
     * @param { String } webview_share_button Optional. Set to hide to disable the share button in the Webview (for sensitive info). This does not affect any shares initiated by the developer using Extensions.
     * https://developers.facebook.com/docs/messenger-platform/reference/buttons/url
     * 
     */
    urlButton(
        url = required,
        title,
        webview_height_ratio,
        fallback_url,
        messenger_extensions,
        webview_share_button
    ) {
        return isAllowedTitleLength(title.length) &&
            utils.isValidURL(url) &&
            Object.assign(
                {},
                { type: 'web_url' },
                { url },
                title && { title },
                webview_height_ratio && { webview_height_ratio },
                messenger_extensions && { messenger_extensions },
                fallback_url && { fallback_url },
                webview_share_button && { webview_share_button }
            )
    },

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/buttons/postback
     * @param { String } title - Text on the button
     * @param { String } payload - <DEVELOPER_DEFINED_PAYLOAD>
     */
    postbackButton(
        title = required('Button title'),
        payload = required('<DEVELOPER_DEFINED_PAYLOAD>')
    ) {
        return isAllowedTitleLength(title.length) &&
            utils.maxCharsAllowed(1000)(payload.length) &&
            Object.assign(
                {},
                { type: 'postback' },
                { title },
                { payload },
            )
    },

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/buttons/login
     * @param {*} url 
     */
    loginButton(
        url = required
    ) {
        return utils.isValidURL(url) && {
            type: 'account_link',
            url,
        }
    },

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/buttons/logout
     */
    logoutButton() {
        return {
            type: 'account_unlink'
        }
    },

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/buttons/game-play
     * @param {*} title 
     * @param {*} player_id 
     * @param {*} context_id 
     * @param {*} payload 
     */
    gameButton(
        title = required('Button title'),
        player_id,
        context_id,
        payload
    ) {
        return isAllowedTitleLength(title.length) &&
            Object.assign
                (
                    {},
                    { type: 'game_play' },
                    { title },
                    payload && { payload },
                    {
                        game_metadata: { // Only one of the below
                            ...(player_id && { player_id }),
                            ...(context_id && { context_id })
                        }
                    },
                )
    },

    // === TEMPLATE ELEMENT

    /**
     * RETURN OBJECT TO ATTACH FOR MESSAGE OBJECT
     */

    /**
      * 
      * @param { String } title <TITLE_TEXT>' The title to display in the template. 80 character limit
      * @param { String } image_url - Optional <IMAGE_URL_TO_DISPLAY> Optional. The URL of the image to display in the template
      * @param { String } subtitle - Optional <SUBTITLE_TEXT> Optional. The subtitle to display in the template. 80 character limit
      * @param { Object } default_action - accept a URL button Optional. The default action executed when the template is tapped. Accepts the same properties as URL button, except title.
      * @param  { Array <Object> } buttons - Optional. An array of buttons to append to the template. A maximum of 3 buttons per element is supported 
      */
    createGenericTemplateElement(
        title = required('Element title'),
        image_url,
        subtitle,
        urlButton,
        buttons///...buttons
    ) {
        //if (Array.from(arguments).some(arg => !Array.isArray(arg))) throw TypeError('Some of arguments is not an array')
        return isAllowedElementsCount(buttons.length) &&
            Object.assign(
                {},
                { title },
                image_url && { image_url },
                subtitle && { subtitle },
                urlButton && { default_action: urlButton },
                buttons && { buttons }
            )// Object.assign()
    },

    /**
     * 
     * @param { String } title - String to display as the title of the list item. 80 character limit. May be truncated if the title spans too many lines.
     * @param { String } image_url - Optional. URL of the image to display in the list item
     * @param { String } subtitle - Optional. String to display as the subtitle of the list item. 80 character limit. May be truncated if the subtitle spans too many lines.
     * @param { Object } urlButton - Optional. URL button that specifies the default action to execute when the list item is tapped. Only allowed when messenger_extensions property is set to true
     * @param { Array<button> } buttons - Optional. Button to display on the list item. Maximum of 1 button is supported
     */
    createListTemplateElement(
        title = required,
        image_url,
        subtitle,
        urlButton,
        buttons///...buttons
    ) {
        //if (Array.from(arguments).some(arg => !Array.isArray(arg))) throw TypeError('Some of arguments is not an array')
        if (buttons.length > 1) throw new RangeError('Maximum 1 button allowed')
        return Object.assign(
            {},
            { title },
            image_url && { image_url },
            subtitle && { subtitle },
            urlButton && { default_action: urlButton },
            buttons && { buttons }
        )// Object.assign()
    },

    /**
      * 
      * @param { String } title <TITLE_TEXT>' The title to display in the template. 80 character limit
      * @param { String } image_url - Optional <IMAGE_URL_TO_DISPLAY> Optional. The URL of the image to display in the template
      * @param { String } subtitle - Optional <SUBTITLE_TEXT> Optional. The subtitle to display in the template. 80 character limit
      * @param { Object } default_action - accept a URL button Optional. The default action executed when the template is tapped. Accepts the same properties as URL button, except title.
      * @param  { Array <Object> } buttons - Optional. An array of buttons to append to the template. A maximum of 3 buttons per element is supported 
      */
    createMediaTemplateElement(
        title = required,
        image_url,
        subtitle,
        urlButton,
        buttons///...buttons
    ) {
        //if (Array.from(arguments).some(arg => !Array.isArray(arg))) throw TypeError('Some of arguments is not an array')
        return isAllowedElementsCount(buttons.length) &&
            Object.assign(
                {},
                { title },
                image_url && { image_url },
                subtitle && { subtitle },
                urlButton && { default_action: urlButton },
                buttons && { buttons }
            )// Object.assign()
    },

    // === Receipt Template Reference

    /**
     * 
     * @param { String } title 
     * @param { String } subtitle 
     * @param { Number } quantity 
     * @param { Number } price 
     * @param { String } currency 
     * @param { String } image_url 
     */
    createReceiptTemplateElement(
        title,
        subtitle,
        quantity,
        price,
        currency,
        image_url,
    ) {
        return Object.assign(
            {},
            { title },
            subtitle && { subtitle },
            quantity && { quantity },
            { price },
            currency && { currency },
            image_url && { image_url },
        )
    },

    /**
     * 
     * @param { String } street_1 
     * @param { String } street_2 
     * @param { String } city 
     * @param { String } postal_code 
     * @param { String } state 
     * @param { String } country 
     */
    createReceiptTemplateAddress(
        street_1,
        street_2,
        city,
        postal_code,
        state,
        country,
    ) {
        return Object.assign(
            {},
            { street_1 },
            street_2 && { street_2 },
            { city },
            { postal_code },
            { state },
            { country },
        )
    },

    /**
     * 
     * @param { Number } total_cost 
     * @param { Number } subtotal 
     * @param { Number } shipping_cost 
     * @param { Number } total_tax 
     */
    createReceiptTemplateSummary(
        total_cost,
        subtotal,
        shipping_cost,
        total_tax,
    ) {
        return Object.assign(
            {},
            subtotal && { subtotal },
            shipping_cost && { shipping_cost },
            total_tax && { total_tax },
            { total_cost },
        )
    },

    /**
     * 
     * @param { String } name 
     * @param { Number } amount 
     */
    createReceiptTemplateAdjustments(
        name,
        amount
    ) {
        return Object.assign(
            {},
            { name },
            { amount }
        )
    }
}
