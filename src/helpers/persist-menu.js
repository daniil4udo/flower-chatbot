/**
 * 
 */
'use strict'

module.exports = {

    /**
     * 
     * @param { Array<persistMenuElement> } persistent_menu - Array of persistMenuElement 
     */
    persistMenu(
        persistent_menu
    ) {
        return JSON.stringify(
            Object.assign(
                {},
                { persistent_menu }
            ), null, '\t')
    },

    /**
     * 
     * @param { String } locale - language of the bot
     * @param { Boolean } composer_input_disabled - disable input for user
     * @param { Array<BUTTONS> } call_to_actions - The property should include an array of objects with a set of up to 3 buttons to include in the menu. Supported Buttons web_url: Specifes the item is a URL button. postback: Specifies the item is a postback button.
     */
    persistMenuElement(
        call_to_actions,
        locale = 'default',
        composer_input_disabled = false,
    ) {
        if (!Array.isArray(call_to_actions) || call_to_actions.some(button => typeof button !== 'object')) throw new TypeError('call_to_actions has to be an Array of Objects')
        if (call_to_actions.some(button => button.type !== 'web_url' && button.type !== 'postback')) throw new TypeError('call_to_actions supposed to be either web_url or postback')
        if (call_to_actions.length > 3) throw new RangeError('Maximum 3 buttons per menu')
        return Object.assign(
            {},
            { locale },
            { composer_input_disabled },
            { call_to_actions }
        )
    }

}