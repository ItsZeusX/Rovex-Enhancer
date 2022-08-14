const ArtEnhance = require("../functions/ArtEnhance");
const fs = require("fs");
const Discord = require("discord.js");
const icons = require("../utils/icons");

module.exports = {
  name: "art_enhance",
  description: "Enhance",
  options: [
    {
      name: "image_url",
      required: true,
      description: "The url of the image you want to enhance",
      type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  async execute(interaction) {
    try {
      const { options } = interaction;
      await interaction.reply({
        content: icons.loading + " **The Image is being processed ...**",
        ephemeral: true,
      });

      //Get a messageAttachment containing a buffer of the result image
      let imageAttachment = await ArtEnhance(
        options.getString("image_url"),
        interaction
      );
      //Send the result image
      await interaction.editReply({
        content: icons.success + " **Image enhanced successfully**",
        files: [imageAttachment],
      });
      //Remove the image from storage (We stored the image path in the attachment's name)
      fs.unlinkSync(imageAttachment.name);
    } catch (err) {
      console.log(err);
      interaction.editReply(icons.failed + " **Task failed**");
    }
  },
};
