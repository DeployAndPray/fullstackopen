require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Contact = require("./models/contact");
let phonebook = require("./data/phonebook").phonebook;

const app = express();
const PORT = process.env.PORT || 3001;

morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data"),
);

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((data) => res.json(data));
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
  const { name, number } = data ?? {};

  if (!name || !number) {
    return res.status(400).json({ error: "The name or number is missing" });
  }

  const newContact = new Contact({
    name,
    number,
  });

  newContact.save().then((savedContact) => {
    res.status(201).json(savedContact);
  });
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
