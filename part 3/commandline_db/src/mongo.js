const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.error("password missing");
  process.exit();
}

const db_password = process.argv[2];
const db_name = "phonebook_db";
const db_url = `mongodb+srv://grovile_db_user:${db_password}@fullstackopen-cluster0.kcqohqy.mongodb.net/${db_name}`;

mongoose.set("strictQuery", false);
mongoose.connect(db_url, { family: 4 });

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Contact = mongoose.model("Contact", contactSchema);

const name = process.argv[3];
const number = process.argv[4];

if (name && number) {
  const contact = new Contact({
    name,
    number,
  });

  contact.save().then((res) => {
    console.log(`added ${name} - ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Contact.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((c, i) => console.log(`${i + 1}: ${c.name}\t${c.number}`));
    mongoose.connection.close();
  });
}