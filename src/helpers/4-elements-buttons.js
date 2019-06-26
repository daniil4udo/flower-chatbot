/**
 * https://developers.facebook.com/docs/messenger-platform/send-messages/buttons
 * use 'null' to skip parametrs
 */
'use strict'

const utils = require('../utils')
var validator = require('validator');

const BUTTON_TITLE_LENGTH = 20
const isAllowedTitleLength = utils.maxCharsAllowed(BUTTON_TITLE_LENGTH)

module.exports = {

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
        url = required('URL'),
        title,
        webview_height_ratio,
        fallback_url,
        messenger_extensions,
        webview_share_button
    ) {
        validator.isURL(url, { protocols: ['http','https'], require_protocol: true})
        return isAllowedTitleLength(title.length) && Object.assign(
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
    loginButton(url = required('URL')) {
        return {
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
    }
}