const express = require("express");
const path = require("path");
let db = require("./db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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
  //set new id
  let newNote = { id: uuidv4(), title: req.body.title, text: req.body.text };
  db.push(newNote);
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

app.delete(`/api/notes/:id`, (req, res) => {
  console.log(req.params.id);
  let filteredDb = db.filter((note) => {
    return note.id !== req.params.id;
  });
  db = filteredDb;
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
