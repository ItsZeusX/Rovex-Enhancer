const get = require("async-get-file");
const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");
const crypto = require("crypto");
const UploadToIBB = require("./UploadToIBB")
const icons = require("../utils/icons");
const folder = "./images";
const sharp = require("sharp");

module.exports = //Retunrs a messageAttachment with an enhanced image using arc.tencent API
  async function ArtEnhance(url, interaction) {
    //Generate a random path/name using UUID
    let filePath = folder + "/" + crypto.randomUUID() + ".png";
    let attachment;
    let Response;
    //Downloads the image from the provided url into the specified path
    await get(url, { filename: filePath });
    await sharp(filePath)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .toFile(filePath.replace(".png", "X.jpg"));
    fs.unlinkSync(filePath);
    filePath = filePath.replace(".png", "X.jpg");
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    form.append("model_select", "anime6B");
    form.append("outscale", "2");
    
    let IBB
    await fetch("https://arc.tencent.com/img_restore", {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then(async (json) => {
        let url = json.data[0].image_url
        interaction.editReply({
          content: icons.loading + " **Uploading image . . .**",
        });
        IBB = await UploadToIBB(url,600)
        fs.unlinkSync(filePath);
      })
      
      .catch((err) => {
        try {
          fs.unlinkSync(filePath);
        }
        catch(err){
          //pass
        }
        console.log(err)
      });
    
    return IBB;
  };
