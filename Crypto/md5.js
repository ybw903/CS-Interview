const crypto = require("crypto");

const plainText = "plain text";

const md5_base64 = crypto.createHash("md5").update(plainText).digest("base64");
const md5_hex = crypto.createHash("md5").update(plainText).digest("hex");

console.log("md5_base64: ", md5_base64);
console.log("md5_hex: ", md5_hex);
