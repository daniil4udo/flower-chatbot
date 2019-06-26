'use strict'

/*

BUSINESS_PRODUCTIVITY

Send non-promotional messages to help people manage the productivity of their businesses or related activities.

Notifications on services or products that a business has subscribed to or purchased from a service provider
Reminders or alerts on upcoming invoices or service maintenance
Reports on performance, metrics, or recommended actions for the business
COMMUNITY_ALERT

Notify the message recipient of emergency or utility alerts, or issue a safety check in your community.

Request a safety check
Notify of an emergency or utility alerts
CONFIRMED_EVENT_REMINDER

Send the message recipient reminders of a scheduled event which a person is going to attend.

Upcoming classes or events that a person has signed up for
Confirmation of attendance to an accepted event or appointment
NON_PROMOTIONAL_SUBSCRIPTION

Send non-promotional messages under the News, Productivity, and Personal Trackers categories described in the Messenger Platform's subscription messaging policy. You can apply for access to use this tag under the Page Settings > Messenger Platform.

See Platform Policy Overview - Subscription Messaging

PAIRING_UPDATE

Notify the message recipient that a pairing has been identified based on a prior request.

Match identified in dating app
Parking spot available
APPLICATION_UPDATE

Notify the message recipient of an update on the status of their application.

Application is being reviewed
Application has been approved
Job application status
ACCOUNT_UPDATE

Notify the message recipient of a change to their account settings.

Profile has changed
Preferences are updated
Settings have changed
Membership has expired
Password has changed
PAYMENT_UPDATE

Notify the message recipient of a payment update for an existing transaction.

Send a receipt
Send an out-of-stock notification
Notify an auction has ended
Status on a payment transaction has changed
PERSONAL_FINANCE_UPDATE

Confirm a message recipient's financial activity.

Bill-pay reminders
Scheduled payment reminder
Payment receipt notification
Funds transfer confirmation or update
Other transactional activities in financial services
SHIPPING_UPDATE

Notify the message recipient of a change in shipping status for a product that has already been purchased.

Product is shipped
Status changes to in-transit
Product is delivered
Shipment is delayed
RESERVATION_UPDATE

Notify the message recipient of updates to an existing reservation.

Itinerary changes
Location changes
Cancellation is confirmed
Hotel booking is cancelled
Car rental pick-up time changes
Room upgrade is confirmed
ISSUE_RESOLUTION

Notify the message recipient of an update to a customer service issue that was initiated in a Messenger conversation.

Issue is resolved
Issue status is updated
Issue requires a request for additional information
Follow up on a customer inquiry or support ticket
APPOINTMENT_UPDATE

Notify the message recipient of a change to an existing appointment.

Appointment time changes
Appointment location changes
Appointment is cancelled
GAME_EVENT

Notify the message recipient of a change in in-game user progression, global events, or a live sporting event.

Player's in-game crops are ready to be collected
Player's daily tournament is about to start
Person's favorite soccer team is about to begin a match
TRANSPORTATION_UPDATE

Notify the message recipient of updates to an existing transportation reservation.

Flight status changes
Ride is canceled
Trip is started
Ferry has arrived
FEATURE_FUNCTIONALITY_UPDATE

Notify the message recipient of new features or functionality that become available in your bot.

Chat with a live agent is added to your bot
A new skill is added to your bot
TICKET_UPDATE

Send the message recipient updates or reminders for an event for which a person already has a ticket.

Concert start time changes
Event location changes
Show is cancelled
A refund opportunity is made available


*/

/**
 * https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags
 */
const utils = require('../utils')
const { options } = require('./sendAPI')

module.exports = {
    appendMessageTag(tag) {
        return options('MESSAGE_TAG', tag)
    }
}