const path = require("path");
const fs = require("fs");

function handleEvents(client) {
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

function handleSlashCommand(interaction){
  const slashCommandsPath = path.join(__dirname, "slash_commands");
  const commandPath = path.join(slashCommandsPath, interaction.commandName); 
  const command = require(commandPath)

    command.execute(interaction);
}

module.exports = {handleEvents , handleSlashCommand}
