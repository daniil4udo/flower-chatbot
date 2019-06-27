const extname = require('path').extname

const axios = require('axios');
const validator = require('validator')

const { ext } = require('./content-type-extentions')

// requireArguments = (e) => {
//     throw new SyntaxError(`Function parameter is missing - ${e}`)
// }
Object.defineProperty(Object.prototype, 'required', {
    get: () => {
        throw new TypeError(`Missing required argument`)
    }
})

const isOptionValid = (func, regex) => (option) => {
    if (typeof option !== 'string')
        throw new TypeError(`Option '${option}' has to be a string, not a ${typeof option}`)
    if (!regex.test(option))
        throw new TypeError(`Wrong option ${option}. Please check ${func} / documentation`)
    return true
}

const isValidLength = (elementDescriptor, maxAllowed) => (length) => {
    if (length > maxAllowed)
        throw new RangeError(`${maxAllowed} ${elementDescriptor} allowed`)
    return true
}


module.exports = {
    //=============== GETTERS ===============
    getContentType(url) {
        const asyncGetContentType = async (url) => {
            try {
                const res = await axios.get(url);
                res = res.headers['content-type'];

            } catch (e) {
                return 'Bad URL';
            }
        }

        const extension = extname(url)
        const contentType = ext.getContentType(extension)

        return (asyncGetContentType(url))
    },

    //=============== VALIDATORS ===============

    maxCharsAllowed: isValidLength.bind(null, 'chars'),
    maxElementsAllowed: isValidLength.bind(null, 'elements'),

    isValidSenderAction: isOptionValid('SENDER_ACTION', new RegExp(/\b(mark_seen|sender_action|typing_on|typing_off)\b/gi)),
    isValidNotificationType: isOptionValid('NOTIFICATION_TYPE', new RegExp(/\b(REGULAR|SILENT_PUSH|NO_PUSH)\b/gi)),
    isValidAttachmentType: isOptionValid('ATTACHMENT_TYPE', new RegExp(/\b(image|audio|video|file|template)\b/gi)),
    isValidMessagingType: isOptionValid('MESSAGING_TYPE', new RegExp(/\b(RESPONSE|UPDATE|MESSAGE_TAG)\b/gi)),
    isValidQuickReplyType: isOptionValid('QUICK_REPLY_TYPE', new RegExp(/\b(text|user_phone_number|user_email)\b/gi)),

    isValidURL(url) {
        if (!validator.isURL(url, {
            protocols: ['https'],
            require_tld: true,
            require_protocol: true,
            require_host: true,
            require_valid_protocol: true
        }))
            throw TypeError('Not Valid URL')
        return true
    },
    isValidMobilePhone(mobile) {
        if( !validator.isMobilePhone(mobile, 'any', { strictMode: true }))
            throw new TypeError('Wrong Mobile Phone Format')
        return true
    },

    httpBuildQuery(prametrsObject) {
        return Object.entries(prametrsObject).map((param, i) => param.reduce((key, val) => {
            const operator = i === 0 ? '?' : '&'
            return `${operator}${key}=${val}`
        })).join('')
    },

    compose: (...fns) =>
        (...args) =>
            fns.reduceRight((result, fn) =>
                fn(...[result, ...args.slice(1)]), args[0]),

}