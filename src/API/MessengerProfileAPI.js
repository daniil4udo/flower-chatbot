'use strict'

const utils = require('../helpers/utils')

const messengerProfileAPIRequestURI = (token) => `https://graph.facebook.com/v3.3/me/messenger_profile?access_token=${token}`
/**
 * 
 * @param {*} token 
 * @param  {...any} args - account_linking_url, persistent_menu, get_started, greeting, whitelisted_domains, target_audience, home_url
 */
const retrieveProperties = (token, ...args) => `https://graph.facebook.com/v3.3/me/messenger_profile?fields=${args.join(',')}&access_token=${token}`

module.exports = {

    /**
     * Set/Update Properties
     * https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/
     * @param { String } account_linking_url - URL opened by the Messenger Platform when a user triggers account linking
     * @param { Array<Object> } persistent_menu 
     * @param { Object } get_started 
     * @param { Array<Object> } greeting 
     * @param { Array<String> } whitelisted_domains 
     * @param { Object } target_audience 
     * @param { Object } home_url 
     */
    setUpdateMessengerProfileData(
        account_linking_url,
        persistent_menu,
        get_started,
        greeting,
        whitelisted_domains,
        target_audience,
        home_url
    ) {
        if (persistent_menu && Array.isArray(persistent_menu) ||
            greeting && Array.isArray(greeting) ||
            whitelisted_domains && Array.isArray(whitelisted_domains)
        )
            throw new TypeError('option has to be an array')
        return Object.assign(
            {},
            account_linking_url && { account_linking_url },
            persistent_menu && { persistent_menu },
            get_started && { get_started },
            greeting && { greeting },
            whitelisted_domains && { whitelisted_domains },
            target_audience && { target_audience },
            home_url && { home_url }
        )
    },

    /**
     * 
     * @param { String } payload Payload sent back to your webhook in a messaging_postbacks event when the 'Get Started' button is tapped. 1000 character limit.
     */
    getStartedProfileProperty(
        payload
    ) {
        return Object.assign(
            {},
            { payload }
        )
    },

    /**
     * 
     * @param { String } locale Locale of the greeting text, shown when the person's locale matches the provided locale.
     * @param { String } text The greeting text for the specific locale. Must be in UTF-8. 160 character limit.
     */
    greetingProfileProperty(
        locale = 'default',
        text
    ) {
        return Object.assign(
            {},
            { locale },
            { text }
        )
    },

    /**
     * 
     * @param { String } url The URL to be invoked from drawer. Must be whitelisted. Must use https.
     * @param { String } webview_share_button Optional. Controls whether the share button in the webview is enabled. Either show or hide, defaults to "hide".
     * @param { Boolean } in_test Controls whether users not assigned a role for your bot or its Facebook page can see the Chat Extension.
     */
    homeUrlProfileProperty(
        url,
        webview_share_button = 'hide',
        in_test,
    ) {
        return utils.isValidURL(url) && Object.assign(
            {},
            { url },
            { webview_height_ratio: 'tall' },
            webview_share_button && { webview_share_button },
            { in_test },
        )
    },

    /**
     * 
     * @param { Array<String> } whitelisted_domains A list of domains being used. All domains must be valid. Up to 50 domains allowed
     */
    whitelistedDomainsProfileProperty(
        whitelisted_domains
    ) {
        if (!Array.isArray(whitelisted_domains))
            throw new TypeError('whitelisted_domains has to be an array of domains')
        return Object.assign(
            {},
            { whitelisted_domains }
        )
    },

    /**
     * https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu
     * @param { String } locale - language of the bot
     * @param { Boolean } composer_input_disabled - disable input for user
     * @param { Array<BUTTONS> } call_to_actions - The property should include an array of objects with a set of up to 3 buttons to include in the menu. Supported Buttons web_url: Specifes the item is a URL button. postback: Specifies the item is a postback button.
     * @param { Array } disabled_surfaces
     */
    createPersistMenu(
        call_to_actions,
        locale = 'default',
        composer_input_disabled = false,
        disabled_surfaces,
    ) {
        if (!Array.isArray(call_to_actions) || call_to_actions.some(button => typeof button !== 'object')) throw new TypeError('call_to_actions has to be an Array of Objects')
        if (call_to_actions.some(button => button.type !== 'web_url' && button.type !== 'postback')) throw new TypeError('call_to_actions supposed to be either web_url or postback')
        if (call_to_actions.length > 3) throw new RangeError('Maximum 3 buttons per menu')
        return Object.assign(
            {},
            { locale },
            { composer_input_disabled },
            { disabled_surfaces },
            { call_to_actions }
        )
    },

}