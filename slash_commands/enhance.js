const Enhance = require("../functions/Enhance")
const fs = require("fs")
const Discord = require("discord.js");
const icons = require("../utils/icons");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name : "enhance",
    description : "Enhance",
    options : [
        {
          name: "image_url",
          required: true,
          description: "The url of the image you want to enhance",
          type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
        }
      ],
    async execute(interaction){
        try {
          const {  options } = interaction;
        await interaction.reply({
            content: icons.loading + " **Enhancing image . . .**",
            ephemeral: true,
          });
          const start = Date.now()
          let IBB = await Enhance(options.getString("image_url") , interaction);
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
              .setLabel("Enhanced")
              .setURL(IBB.data.url)
              .setStyle("LINK")
          
          );
          await interaction.editReply({components: [row]})
        }
        catch(err){
          console.log(err);
          interaction.editReply(icons.failed + " **Task failed**")
        }
    }
}