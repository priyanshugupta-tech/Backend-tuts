const fs = require("fs");

function logger(fileName) {
  return function (req, res, next) {
    fs.writeFile(fileName, `${Date.now()} ${req.ip} ${req.url}`, (err) => {
      if (err) {
        console.log(err);
      }
      next();
    });
  };
}

module.exports = { logger };
