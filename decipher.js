const crypto = require("crypto");
const fs = require("fs");

module.exports = (file, secret) => {
  const algorithm = "aes-192-cbc";
  const key = crypto.scryptSync(secret, "salt", 24);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const data = fs.readFileSync(file, "hex");

  let decrypted = "";

  decipher.on("readable", () => {
    let chunk;
    while (null !== (chunk = decipher.read())) {
      decrypted += chunk.toString("utf8");
    }
  });

  decipher.on("end", () => {
    fs.writeFileSync(file, decrypted, "utf8");
    console.log(`Your file "${file}" isn't a secret anymore`);
  });

  decipher.write(data, "hex");
  decipher.end();
};
