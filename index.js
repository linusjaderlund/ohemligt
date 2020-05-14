const fs = require("fs");
const decipher = require("./decipher");
const [, , file, secret] = process.argv;

const init = () => {
  if (!fs.existsSync(file)) {
    return console.log("File path passed to function does not exist");
  }

  if (!secret) {
    return console.log("Must pass secret as second parameter to function");
  }

  decipher(file, secret);
};

init();
