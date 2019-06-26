const axios = require('axios');

const t = require('./src/templates')
const btn = require('./src/helpers/4-elements-buttons')
const utils = require('./src/utils')
// const { body, recipient, message, options, attachment } = require('./src/sendAPI')

const URL = 'https://res.cloudinary.com/https-dubaifloral-com/image/upload/v1539079964/Singing_Birthday_Bears__06813_zoom_nvpxy2.jpg'
const asyncGetContentType = async (URL) => {
    var http = require('https');
    //var options = {method: 'HEAD', host: 'https://res.cloudinary.com/https-dubaifloral-com/image/upload/v1539079964/Singing_Birthday_Bears__06813_zoom_nvpxy2.jpg',};
    var req = http.request(URL, (res) => {
        console.log(JSON.stringify(res.headers));
    }
    );
    req.end();
}

const defaul_action = btn.urlButton('htt//', 'My URL')
const buttons = [
    btn.callButton('call Us', "+2342"),
    btn.postbackButton('Post that', '<PAYLOAD>'),
    defaul_action
]
//const buttonTmpl = tmpl.buttonTemplatePayload('Button Template', buttons)

console.log(
    asyncGetContentType(URL)
)

console.log(
    '\n',
    JSON.stringify(
        t.sendButtonTemplate('1111231', 'Button template', buttons, true)
        , null, '\t')
)
