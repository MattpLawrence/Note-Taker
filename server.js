const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));
//lets me accept JSON
app.use(express.json());

//Get landing page******************why?
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  res.json(db);
});
app.post("/api/notes", (req, res) => {
  console.log(req.body);
  db.push(req.body);
  console.log(db);
  //write to the db file
  fs.writeFile(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(db),
    (err) => {
      console.log(err);
    }
  );
  //update front end must have status
  res.json(db).status("200");
});

app.listen(PORT, () => console.log("App listening on port " + PORT));
