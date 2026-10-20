const express = require("express");
const { genId } = require("./services/keygen.service");
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

app.delete("/api/persons/:id", (req, res) => {
  phonebook = phonebook.filter((p) => p.id !== req.params.id);
  res.sendStatus(204);
});

app.post("/api/persons", (req, res) => {
  const data = req.body;
  data.id = genId();
  phonebook = phonebook.concat(data);
  res.send(data);
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
