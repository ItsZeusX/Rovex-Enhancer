const handlers = require("../handlers")

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
		 //Return if interaction isnt a slash command
		 if (!interaction.isCommand()) {
			return;
		  }
		  else{
			handlers.handleSlashCommand(interaction)
		  }
	},
};



