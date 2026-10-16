import { useState } from "react";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { List } from "./components/List";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phone: newPhone,
    };

    if (isDuplicateName()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewPhone("");
  };

  const isDuplicateName = () =>
    persons.some((person) => person.name === newName);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <Form
        onSubmit={handleOnSubmit}
        name={[newName, setNewName]}
        phone={[newPhone, setNewPhone]}
      />
      <h2>Numbers</h2>
      <List persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
