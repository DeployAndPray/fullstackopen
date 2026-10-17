import axios from 'axios';
import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { List } from "./components/List";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  

  useEffect(()=>{
    const path = 'http://localhost:3001/persons'
    axios
      .get(path)
      .then((resp) => setPersons( resp.data ))
  },[])


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
