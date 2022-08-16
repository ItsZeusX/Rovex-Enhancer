const RemoveBackground = require("../functions/RemoveBackground");
const fs = require("fs");
const Discord = require("discord.js");
const icons = require("../utils/icons");
const { MessageActionRow, MessageButton } = require("discord.js");

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
      const start = Date.now()
      const { options } = interaction;
      await interaction.reply({
        content: icons.loading + " **Processing Image . . .**",
        ephemeral: true,
      });
      const IBB = await RemoveBackground(
        options.getString("image_url"),
        interaction
      );
      const stop = Date.now()

      await interaction.editReply({
        content: icons.success + " **Background removed successfully**" + `[\u200b](${IBB.data.display_url}) (***${parseInt((stop - start)/1000)}s***)`,
      });
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Original")
          .setURL(options.getString("image_url"))
          .setStyle("LINK"),
          new MessageButton()
          .setLabel("No Background")
          .setURL(IBB.data.url)
          .setStyle("LINK")
      );
      await interaction.editReply({components: [row]})
    } catch (err) {
      console.log(err);
      interaction.editReply(icons.failed + "  **Task failed**")
    }
  },
};
