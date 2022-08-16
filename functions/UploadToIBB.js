const fetch = require("node-fetch")
const FormData = require("form-data");

module.exports = async function UploadToIBB(url , expiration){
    const form = new FormData();
    form.append("image",url);
    const response = await (await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IBB_API_KEY}&expiration=${expiration}`, {
      method: "POST",
      body: form,
    })).json()
    return response
}