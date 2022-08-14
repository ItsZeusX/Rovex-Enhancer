const get = require("async-get-file");
const fetch = require("node-fetch");
const fs = require("fs");
const crypto = require("crypto");
const { MessageAttachment } = require("discord.js");

const folder = "./images";

module.exports = //Returns a messageAttachment with an image without background using app.simplified API
  async function RemoveBackground(url) {
	let Response = null;
	let task_id;
	let attachment;
	await fetch("https://api.simplified.com/api/v1/growth-tools", {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		action: "REMOVE_BACKGROUND",
		image_url: url,
		image_type: "image/jpg",
	  }),
	})
	  .then((res) => res.json())
	  .then(async (json) => {
		task_id = json.task_id;
	  })
	  .catch((err) => console.log(err));
  
	while (true) {
	  Response = await (
		await fetch("https://api.simplified.com/api/v1/tasks/" + task_id, {
		  method: "GET",
		  hostname: "api.simplified.com",
		})
	  ).json();
	  if (Response.info != "") {
		let filePath = folder + "/" + crypto.randomUUID() + ".png";
		await get(Response.info.data.url, { filename: filePath });
		let buffer = fs.createReadStream(filePath);
		attachment = new MessageAttachment(buffer, filePath);
		return attachment;
	  }
	}
  }