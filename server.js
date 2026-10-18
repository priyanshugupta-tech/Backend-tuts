const http = require("http");
const url = require("url");

const PORT = 5000;

const myServer = http.createServer((req, res) => {
  console.log(req.url);
  const info = url.parse(req.url, true);
  console.log(info);
  switch (info.pathname) {
    case "/":
      res.end("Welcome");
      break;

    case "/about":
      if (info.query.user) {
        return res.end(`This is for you ${info.query.user}`);
      } else {
        return res.end(`Hello buddy how can I help you`);
      }
      break;

    case "/search":
      if (info.query.search_q || info.query.myName) {
        return res.end(
          `here is your result ${info.query.myName} for the ${info.query.search_q}`,
        );
      }
      return res.end("Hello User");
      break;

    default:
      //   console.log(req.url);
      return res.end("404 Not Found!");
      break;
  }
});

myServer.listen(PORT, () => console.log(`app is listening at PORT: ${PORT}`));
