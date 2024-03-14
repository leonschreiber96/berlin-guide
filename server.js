const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/public/index.html");
});

app.get("/data", (req, res) => {
   fs.readFile(__dirname + "/public/data.json", "utf8", (err, data) => {
      if (err) {
         console.error(err);
         res.status(500).send("Error reading data");
      } else {
         const jsonData = JSON.parse(data);
         res.json(jsonData);
      }
   });
});

app.post("/poi", async (req, res) => {
   // Assuming the request body contains the new poi data
   let newPoi = req.body;

   try {
      console.log(newPoi.location);
      const addressDetails = await getAddressDetails(newPoi.location)
      newPoi = { ...newPoi, ...addressDetails };
   } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching address details");
      return;
   }
   
   // Read the existing data from the file
   fs.readFile(__dirname + "/public/data.json", "utf8", (err, data) => {
      if (err) {
         console.error(err);
         res.status(500).send("Error reading data");
      } else {
         const jsonData = JSON.parse(data);
         
         // Add the new poi to the existing data
         jsonData.push(newPoi);
         
         // Write the updated data back to the file
         fs.writeFile(__dirname + "/public/data.json", JSON.stringify(jsonData), "utf8", (err) => {
            if (err) {
               console.error(err);
               res.status(500).send("Error writing data");
            } else {
               res.status(200).send("New poi added successfully");
            }
         });
      }
   });
});

function getAddressDetails(address) {
  return new Promise((resolve, reject) => {
    var url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}&limit=1&addressdetails=1`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve({
          lat: data[0].lat,
          lon: data[0].lon,
          address_details: data[0].address,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
