const get = require("async-get-file");
const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");
const crypto = require("crypto");
const { MessageAttachment } = require("discord.js");
const icons = require("../utils/icons");
const folder = "./images";
const sharp = require("sharp")

module.exports = //Retunrs a messageAttachment with an enhanced image using arc.tencent API
  async function ArtEnhance(url, interaction) {
    //Generate a random path/name using UUID
    let filePath = folder + "/" + crypto.randomUUID() + ".png";
    let attachment;
    let Response;
    //Downloads the image from the provided url into the specified path
    await get(url, { filename: filePath });
    await sharp(filePath).flatten({ background: { r: 255, g: 255, b: 255 } }).toFile(filePath.replace(".png" , "X.png"))
    fs.unlinkSync(filePath)
    filePath = filePath.replace(".png" , "X.png");
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    form.append("model_select", "anime6B");
    form.append("outscale", "2");
    interaction.editReply({
      content: icons.loading + " **Enhancing image ...**",
    });
    await fetch("https://arc.tencent.com/img_restore", {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((json) => {
        Response = json.data[0];
        //Create a buffer from the base64 encoded image returned by the api
        const buffer = new Buffer.from(
          Response.image_base64.split(",")[1],
          "base64"
        );
        //Create an attachment using the previous buffer
        attachment = new MessageAttachment(buffer, filePath);
      })
      .catch((err) => console.log(err));
    interaction.editReply({ content: icons.loading + " **Uploading to discord ...**" });
    return attachment;
  };
