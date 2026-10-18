const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  console.log("req recieved");
  const log = `${Date.now()}: User @ ${req.socket.remoteAddress} requested @ ${req.url}\n`;
  fs.appendFile("./HTTP server/log.txt", log, (err, result) => {
    switch (req.url) {
      case "/":
        res.end("Welcome to homePage!");
        break;
      case "/po*n":
        res.end("You should not consume such type of content!");
        break;
      case "/shop":
        res.end("What would you like to shop!");
        break;
      default:
        res.end("404 Not Found!");
        break;
    }
  });
});

myServer.listen(5000, () => console.log("Server started!"));
