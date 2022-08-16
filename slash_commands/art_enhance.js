const ArtEnhance = require("../functions/ArtEnhance");
const fs = require("fs");
const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");

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
        content: icons.loading + " **Enhancing image . . .**",
        ephemeral: true,
      });
      const start = Date.now()
      //Get a messageAttachment containing a buffer of the result image
      let IBB = await ArtEnhance(
        options.getString("image_url"),
        interaction
      );
      const stop = Date.now()
      //Send the result image
      await interaction.editReply({
        content: icons.success + " **Image enhanced successfully**" + `[\u200b](${IBB.data.display_url}) (***${parseInt((stop - start)/1000)}s***)`,
      });
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Original")
          .setURL(options.getString("image_url"))
          .setStyle("LINK"),
          new MessageButton()
          .setLabel("Enhanced")
          .setURL(IBB.data.url)
          .setStyle("LINK")
      
      );
      await interaction.editReply({components: [row]})
    } catch (err) {
      console.log(err);
      interaction.editReply(icons.failed + " **Task failed !\nPlease use `/compress` or `/resize` and try again**");
    }
  },
};
