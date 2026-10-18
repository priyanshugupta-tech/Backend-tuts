const express = require("express");
const data = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("stream/consumers");

const app = express();

const PORT = 5000;

app.get("/api/users", (req, res) => {
  return res.json(data);
});

// "/api/users/:id" => Dynamic Path Parameters
// :id => Dynamic | Variable

// Browser by default GET request bhejta hai
// Ek hi api endpoint url pe ham alag alag tarah ke request bhej sakta hai

/*
app.get("/api/users/:id", (req, res) => {
  data.map((item) => {
    if (item.id === Number(req.params.id)) {
      return res.json(item);
    }
  });
});

app.post("/api/users", (req, res) => {
  //
});
app.patch("/api/users/:id", (req, res) => {
  //
});
app.delete("/api/users/:id", (req, res) => {
  //
});
*/

// Right now aap dekh sakte ho ki kitni redundency hai hamme baar baar same route likh kar unpe request bhejna pad raha hai
// Iska bhi solution hai...solution yah hai ki aap ek given route par methods ko chain kar sakte ho

// Using "/api" in the route makes your server a Hybrid server means you can return HTML when makes a GET request at "/users" but if let's suppose a mobile developer tries to make a get request at your server then you would not return HTML so for that the developer can make request at "api/users" where you are returning JSON data

app.get("/users", (req, res) => {
  return res.send(
    `<ul key={item.id}>
          ${data
            .map((item) => {
              return `<li>${item.first_name}</li>`;
            })
            .join("")}
    </ul>`,
  );
});

// If you are posting some data via x-www-form-urlencoded then you need to use a middleware to read that data and convert it into json object

app.use(express.urlencoded({ extended: false }));

app.post("/api/users", (req, res) => {
  if (req.body.first_name) {
    data.push({ ...req.body, id: data.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err) => {
      if (err) {
        console.log("error in wrting to files: ", err);
        return res.status(500).json({ status: "error", message: err });
      }
      return res.json({ status: "sucess", id: data.length });
    });
  }
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const item = data.find((item) => item.id === id);
    if (item) {
      return res.json(item);
    }
    return res.status(404).json({ message: "Item not found!" });
  })
  .patch((req, res) => {
    if (req.body.first_name) {
      const id = Number(req.params.id);
      const index = data.indexOf(data.find((item) => item.id === id));
      data[index] = { id: id, ...req.body };
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err) => {
        if (err) {
          console.log("Writing in files error message: ", err);
          return res.status(500).json({ status: "error", message: err });
        }
        return res.json({ status: "succes", id: id });
      });
    }
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const newData = data.filter((item) => item.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(newData), (err) => {
      if (err) {
        console.log("Writing in files error message: ", err);
        return res.status(500).json({ status: "error", message: err });
      }
      return res.json({ status: "succes", id: id });
    });
  });

app.listen(PORT, () => console.log(`This app is listening at PORT: ${PORT}`));
