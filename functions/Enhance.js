const get = require("async-get-file");
const fetch = require("node-fetch");
const fs = require("fs");
const crypto = require("crypto");
const { MessageAttachment } = require("discord.js");
const icons = require("../utils/icons");
const folder = "./images";
const UploadToIBB = require("./UploadToIBB")

require("dotenv").config()

//Bearer Token For Remin API
const BearerToken = process.env.BEARER_TOKEN
module.exports = //REMINI enhance
  async function Enhance(url, interaction) { 
    //Download the image from url
    let filePath = folder + "/" + crypto.randomUUID() + ".png";
    await get(url, { filename: filePath });
    //Create the task
    let task = await (
      await fetch("https://app.remini.ai/api/v1/web/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": BearerToken,
        },
        body: JSON.stringify({
          image_content_type: "image/png",
        }),
      })
    ).json();
    let taskId = task.task_id;
    let uploadUrl = task.upload_url;
    let uploadHeaders = task.upload_headers;
    let buffer = fs.createReadStream(filePath);
    
    //Upload image to google storage
    await fetch(uploadUrl, {
      method: "PUT",
      headers: uploadHeaders,
      body: buffer,
    });
    fs.unlinkSync(filePath);
    //Process task
    await fetch(`https://app.remini.ai/api/v1/web/tasks/${taskId}/process`, {
      method: "POST",
      headers: {
        "Host": "app.remini.ai",
        "Authorization": BearerToken,
        "Content-Length": "0",
      },
    });

    while (true) {
      await sleep(1000);
      let result = await (
        await fetch(`https://app.remini.ai/api/v1/web/tasks/${taskId}`, {
          headers: {
            "Authorization": BearerToken,
          },
        })
      ).json();
      if (result.status === "completed") {
		    interaction.editReply(icons.loading + " **Uploading Image . . .**")
        let IBB = await UploadToIBB(result.result.outputs[0].url,600)
        return IBB;
      }
    }
  };

    //Simple sleep
function sleep(ms) {
	return new Promise((resolve) => {
	  setTimeout(resolve, ms);
	});
  }
