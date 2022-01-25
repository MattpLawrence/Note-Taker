const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.static("public"));

//Get landing page
// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => console.log("App listening on port " + PORT));
