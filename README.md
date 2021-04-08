An NPM package on better-interacting with the Top.gg API

This package can be used for:
Getting bot and user stats

Checking for individual user votes

Posting bot stats to top.gg

Example:
```js
const Discord = require('YOUR_DISCORD_LIBRARY')
const client = new Discord.Client()
const topgg = require("better-topgg-api")

const Client = new topgg.Client("YOUR_TOPGG_WEBHOOK_TOKEN", client)

Client.getClientInfo({clientID: "803362044048572456"}).then(console.log)
```
Returns: Promise< Object >

Output:
```js
{
  avatar: "dd4dbc0016779df1378e7812eabaa04d",
  invite: "https://discord.com/api/oauth2/authorize?client_id=803362044048572456&permissions=36793424&scope=bot",
  shortdesc: "An Amazing discord bot for almost anything a server needs!",
  description: "This bot has every feature a server would want! It has: Music, Economy, Fun, Roleplay, Search(Youtube, anime, movie, etc), Utilities, and even a giveaway system. This bot is fully customizable, You can set channels where no commands can be used, change the prefix, and much more! The bot also has an Advanced confession system and full suggestions system with an Accepting and Denying system. So what you waiting for? Add Chrollo to your server now!\t"
}
```
