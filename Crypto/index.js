// aes-256-cbc example

const IV_LENGTH = 16;

const crypto = require("crypto");
const key = "Qsz23mibsdaxX2BjyskV6bs#adada6ds";
const iv = crypto.randomBytes(IV_LENGTH);

const plainText = "암호화할 평문";

console.log("평문: ", plainText);

const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
let encryptedText = cipher.update(plainText, "utf8", "base64");
encryptedText += cipher.final("base64");

console.log("암호문: ", encryptedText);

const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
let decryptedText = decipher.update(encryptedText, "base64", "utf8");
decryptedText += decipher.final("utf8");

console.log("복호화 결과: ", decryptedText);
