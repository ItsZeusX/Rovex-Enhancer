const fetch = require("node-fetch");
const icons = require("../utils/icons");
const UploadToIBB = require("./UploadToIBB")

module.exports = //Returns a messageAttachment with an image without background using app.simplified API
  async function RemoveBackground(url,interaction) {
	let Response = null;
	let task_id;
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
		interaction.editReply(icons.loading + " **Uploading Image . . .**")
		let IBB = await UploadToIBB(Response.info.data.url , 600)
		return IBB;
	  }
	}
  }