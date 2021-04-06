const topgg = require('better-topgg-api')

const Client = new topgg.Client("YOUR_TOPGG_WEBHOOK_TOKEN", client)

Client.getClientInfo({clientID: '803362044048572456'}).then(console.log)
