//Discord
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
});

const handlers = require("./handlers");
handlers.handleEvents(client);

client.login("OTcwMzU1ODM1Mzc1MDcxMjUy.Ym6wSw.iflrQCUFVV22my0oGsrq4PKdzRA");
