const express = require("express");
let phonebook = require("./data/phonebook").phonebook;

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
  const found = phonebook.find((p) => p.id === req.params.id);
  if (!found) {
    res.sendStatus(404);
    return;
  }

  res.json(found);
});

app.get("/api/info", (req, res) => {
  const entries = phonebook.length;
  const template = `Phonebook has info for ${entries} people.</br>${new Date()}`;
  res.contentType("text/html");
  res.send(template);
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
