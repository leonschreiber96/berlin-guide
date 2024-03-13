const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/public/index.html");
});

app.get("/data", (req, res) => {
   fs.readFile(__dirname + "/data.json", "utf8", (err, data) => {
      if (err) {
         console.error(err);
         res.status(500).send("Error reading data");
      } else {
         const jsonData = JSON.parse(data);
         res.json(jsonData);
      }
   });
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
