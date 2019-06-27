'use strick'

/**
 * messages Webhook Event Reference
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */

textMessage = ({sender, recipient, timestamp, message}) => {
    console.log(sender, recipient, timestamp, message)
};

blobAttachmentMessage = ({id, time, messaging}) => {
    console.log(id, time, messaging)
}

fallbackAttachmentFromLinkScrapingMessage = ({sender, recipient, timestamp, message}) => {
    console.log(sender, recipient, timestamp, message)
}

/**
 * messaging_postbacks Webhook Event Reference
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_postbacks
 */

//Postbacks occur when a postback button, Get Started button, or persistent menu item is tapped.

postbacksMessaging = ({sender, recipient, timestamp, postback}) => {
    console.log(sender, recipient, timestamp, postback)
}