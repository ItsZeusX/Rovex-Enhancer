//Files , Requests
const sharp = require("sharp");
const get = require("async-get-file");
const fetch = require("node-fetch"); //npm install node-fetch
const FormData = require("form-data");
const fs = require("fs");
const crypto = require("crypto");
const { MessageAttachment } = require("discord.js");

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



