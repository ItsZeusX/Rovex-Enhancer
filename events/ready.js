const Discord = require("discord.js");
const commandCreator = require("../utils/commandsCreator")

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("Working ....");
    client.channels.cache.get("995496362655371424").send("Ready!");
    commandCreator.execute(client);
  },
};
