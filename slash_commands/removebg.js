const RemoveBackground = require("../functions/RemoveBackground");
const fs = require("fs");
const Discord = require("discord.js");
const icons = require("../utils/icons");

module.exports = {
  name: "removebg",
  description: "Remove",
  options: [
    {
      name: "image_url",
      required: true,
      description: "Remove",
      type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  async execute(interaction) {
    try {
      const { options } = interaction;
      await interaction.reply({
        content: icons.loading + " The Image is being processed",
        ephemeral: true,
      });
      let imageAttachment = await RemoveBackground(
        options.getString("image_url")
      );
      await interaction.editReply({
        content: icons.success + " Background removed successfully",
        files: [imageAttachment],
      });
      fs.unlinkSync(imageAttachment.name);
    } catch (err) {
      console.log(err);
      interaction.editReply(icons.failed + "  **Task failed**")
    }
  },
};
