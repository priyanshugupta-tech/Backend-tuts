const mongoose = require("mongoose");

async function DBConnect(url) {
  return mongoose.connect(url);
}

module.exports = { DBConnect };
