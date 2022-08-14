//Discord
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
});
require("dotenv").config()


const handlers = require("./handlers");
handlers.handleEvents(client);

client.login(process.env.BOT_TOKEN);
