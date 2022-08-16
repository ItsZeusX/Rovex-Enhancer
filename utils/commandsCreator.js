const fs = require("fs");
const path = require("path");

module.exports = {
  execute(client) {
    let guild = client.guilds.cache.get("993637712894644335")
    let commands = client.application.commands;
    if(guild){
      commands = guild.commands
    }else{
      commands = client.application.commands;
    }
    
    const slashCommandsPath = path.join(__dirname, "../slash_commands");
    const commandFiles = fs
      .readdirSync(slashCommandsPath)
      .filter((file) => file.endsWith(".js"));
    for (file of commandFiles) {
      const filePath = path.join(slashCommandsPath, file);
      let command = require(filePath);
      commands.create({
        name: command.name,
        description: command.description,
        options: command.options,
      });
    }
  },
};
