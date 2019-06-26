/**
 * Based on the following business hours:
 * (Note : I setup the hours for each day if they carry-over)
 * everyday is open from 09:00 AM - 12:00 AM
 * Sun/Sat open extra from 12:00 AM - 01:00 AM
 */

const openHours = (currentHour) => {
    const today = currentHour || new Date().getHours()

    const status = today >= 15
        ? 'Unfortunately next delivery slot available only for tomorrow. But you can place your order today'
        : 'Yes! You can get you order today!';

    return JSON.stringify(
        {
            message: [
                {
                    text: status
                },
                {
                    text: 'For more information visit Shipping & Delivery support',
                    quick_replies: [
                        {
                            title: "Delivery Methods",
                            url: "https://jsonblob.com/api/1afa7a6a-ce18-11e8-a72c-a9ddeeaaa7a5",
                            type: "json_plugin_url"
                        },
                        {
                            title: "Delivery Policy",
                            url: "https://jsonblob.com/api/ae90c46b-ce18-11e8-a72c-e32a61de67c3",
                            type: "json_plugin_url"
                        },
                        {
                            title: "Yalla Order Gift",
                            block_names: ["Choose how to start"]
                        }
                    ]
                }
            ]
        }
    )
}

module.exports = {
    openHours
}