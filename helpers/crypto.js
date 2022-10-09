const { secret } = require("../config");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

module.exports = {
  jwtsign: (text) => {
    const result = JWT.sign({email: text}, process.env.JWTSECRET, { expiresIn: "30d" });
    return result
  },
  createHash: (text) => {
    const hash = crypto
      .createHmac("sha256", secret.hash)
      .update(text)
      .digest("hex");

    return hash;
  },
}