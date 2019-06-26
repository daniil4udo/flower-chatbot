
const httpBuildQuery = (prametrsObject) => {
    return Object.entries(prametrsObject).map((param, i) => param.reduce((key, val) => {
        const operator = i === 0 ? '?' : '&'
        return `${operator}${key}=${val}`
    })).join('')
}

const typeBlocks = {
    template: 'template',
    jsonUrl: 'json_plugin_url',
    show: 'show_block',
    share: 'element_share',
    url: 'web_url',
    phone_number: 'phone_number'
}

const flowers = [
    {
        category: ['Lux', 'Birthday'],
        title: 'Secret Garden',
        subtitle: 'Contains: Oriental Lily, Protea / Hydrangea, Roses, Eucalyptus, Thistles',
        url: 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599650/bouquet_8_main_2_rp9bsl.jpg',
        price: '459'
    },
    {
        category: ['Lux', 'Anniversary'],
        title: 'Perfect Mix',
        subtitle: 'Contains: Roses, Mokara Orchid, Cymbidium Orchids, Succulent, Chrysanthemum, Eucalyptus',
        url: 'https://res.cloudinary.com/upscale-and-posh/image/upload/v1509599735/bouquet_13_main_2_jwcvcu.jpg',
        price: '459'
    },
]

/**
 * 
 * @param {Object} messages -
 *    {text: "Welcome to the Chatfuel Rockets!"},
 *    {text: "What are you up to?"} 
 */
const composeMessage = (...messages) => { //messages -> Object
    return JSON.stringify({
        "messages": messages
    }, null, '\t')
}

const redirectToBlock = (...blocksName) => {
    const redirect = {
        redirect_to_blocks: [blocksName]
    }
    return JSON.stringify(redirect, null, '\t')
}

const setAttribute = (attr) => {
    return {
        set_attributes: attr
    }
}
//console.log(setAttribute({hello: 'hello'}))

const showURL = (title, url) => {
    if (!title || !url) {
        console.error(`Title & url are mandatory`)
        return null
    }
    const regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
    if (!url.match(regex)) {
        console.error(`You URL ${url} has wrong format`)
        return null
    }
    const callBlock = {
        title: title,
        url: url,                //url that will return JSON for next batch
        type: typeBlocks.url
    }
    return JSON.stringify(callBlock, null, '\t')
}

const showCallShare = (type, phoneTitle, phoneNum) => {
    if (type != typeBlocks.share && type != typeBlocks.phone_number) {
        console.error(`${type} Wrong type`)
        return null
    }
    if (type === typeBlocks.phone_number && (!phoneTitle || !phoneNum)) {
        console.error('Provide Phone info')
        return null
    }
    const callShare = {
        type: type,
        [type === 'phone_number' && 'phone_number']: phoneNum,
        [type === 'phone_number' && 'title']: phoneTitle
    }
    return JSON.stringify(callShare, null, '\t')
}

/**
 * 
 * @param {String} title - button name
 * @param {String}  url - url to get next JSON response 
 * @param {Object} attributes - if applicable, set value to a attribute as { attrName: val}, 
 */
const callJSON = (title, url, attributes) => {
    if (!title || !url) {
        console.error(`Title & url are mandatory`)
        return null
    }
    if (typeof attributes !== 'object') {
        console.error('Wrong type of attributes. Have to be Object as: { attrName: val}')
        return null
    }
    const callBlock = {
        title: title,
        url: url,                //url that will return JSON for next batch
        type: typeBlocks.jsonUrl
    }
    Object.assign(callBlock, setAttribute(attributes))

    return JSON.stringify(callBlock, null, '\t')
}

/**
 * 
 * @param {String} title - button name
 * @param {Array}  blocksName - block(s) name where to redirect
 * @param {Object} attributes - if applicable, set value to a attribute as { attrName: val}, 
 * Quick replies are limited to 11 items per message.
 * 
 */
const showBlock = (title, blocksName, attributes) => { //accept array
    if (!title || blocksName.length === 0) {
        console.error(`Title & Block Name(s) are mandatory`)
        return null
    }
    let block = {
        title: title,
        type: typeBlocks.show,
        block_names: blocksName
    }
    Object.assign(block, setAttribute(attributes))
    
    return JSON.stringify(block, null, '\t')
}
console.log(showBlock('tit', ['q', 's'],))

const galleryElements = (elementsArray) => {
    if (!elementsArray || !Array.isArray(elementsArray)) {
        console.error('Fucked up')
        return null
    }
    const payload = {
        template_type: "generic",
        image_aspect_ratio: "square",
        elements: []
    }
}
