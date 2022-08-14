const Enhance = require("../functions/Enhance")
const fs = require("fs")
const Discord = require("discord.js");
const icons = require("../utils/icons");

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
            content: "The Image is being processed",
            ephemeral: true,
          });
          let imageAttachment = await Enhance(options.getString("image_url") , interaction);
          await interaction.editReply({ content : icons.success + " **Image enhanced successfully**",files: [imageAttachment] })
          fs.unlinkSync(imageAttachment.name)
        }
        catch(err){
          console.log(err);
          interaction.editReply(icons.failed + " **Task failed**")
        }
    }
}