/**
 * https://developers.facebook.com/docs/messenger-platform/send-messages/buttons
 * use 'null' to skip parametrs
 */
'use strict'

const utils = require('../utils')

const BUTTON_TITLE_LENGTH = 20

const isAllowedTitleLength = utils.maxCharsAllowed(BUTTON_TITLE_LENGTH)

module.exports = {
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
    quickReplyElement(
        title = required,
        payload = required,
        image_url,
        content_type = 'text',
    ) {
        return isAllowedTitleLength(title.length) && utils.isValidQuickReplyType(content_type) &&
            Object.assign(
                {},
                { content_type },
                { title },
                { payload },
                image_url && { image_url },
            )
    },
}