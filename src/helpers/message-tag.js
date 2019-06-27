'use strict'

/**
 * https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags
 */
const { options } = require('./utils')

module.exports = {

    tags: {
        BUSINESS_PRODUCTIVITY       : 'BUSINESS_PRODUCTIVITY',
        COMMUNITY_ALERT             : 'COMMUNITY_ALERT',
        CONFIRMED_EVENT_REMINDER    : 'CONFIRMED_EVENT_REMINDER',
        NON_PROMOTIONAL_SUBSCRIPTION: 'NON_PROMOTIONAL_SUBSCRIPTION',
        PAIRING_UPDATE              : 'PAIRING_UPDATE',
        APPLICATION_UPDATE          : 'APPLICATION_UPDATE',
        ACCOUNT_UPDATE              : 'ACCOUNT_UPDATE',
        PAYMENT_UPDATE              : 'PAYMENT_UPDATE',
        PERSONAL_FINANCE_UPDATE     : 'PERSONAL_FINANCE_UPDATE',
        SHIPPING_UPDATE             : 'SHIPPING_UPDATE',
        RESERVATION_UPDATE          : 'RESERVATION_UPDATE',
        ISSUE_RESOLUTION            : 'ISSUE_RESOLUTION',
        APPOINTMENT_UPDATE          : 'APPOINTMENT_UPDATE',
        GAME_EVENT                  : 'GAME_EVENT',
        TRANSPORTATION_UPDATE       : 'TRANSPORTATION_UPDATE',
        FEATURE_FUNCTIONALITY_UPDATE: 'FEATURE_FUNCTIONALITY_UPDATE',
        TICKET_UPDATE               : 'TICKET_UPDATE',
    },
    /**
     * https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags
     * @param { String } tag 
     */
    messagingTagOption(tag) {
        return options('MESSAGE_TAG', tag)
    },

    actions: {
        mark_seen : 'mark_seen',
        typing_on : 'typing_on',
        typing_off: 'typing_off',
    },
    /**
     * https://developers.facebook.com/docs/messenger-platform/send-messages/sender-actions
     */
    senderActionOption(action) {
        return options(null, null, null, action)
    },

    types: {
        REGULAR    : 'REGULAR',
        SILENT_PUSH: 'SILENT_PUSH',
        NO_PUSH    : 'NO_PUSH'
    },

    notificationTypeOption() {
        return options(null, null, type)
    }
}