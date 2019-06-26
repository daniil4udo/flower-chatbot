'use strict'

const { attachment } = require('./1-sendAPI-body')

module.exports = {
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
    genericTemplateElement(
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
    listTemplateElement(
        title = required('Element title'),
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
    mediaTemplateElement(
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

}