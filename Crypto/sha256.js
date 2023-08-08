const crypto = require("crypto");

const plainText = "plain text";

const hash = crypto.createHash("sha256").update(plainText).digest("base64");

console.log("show hash in base64: ", hash);
