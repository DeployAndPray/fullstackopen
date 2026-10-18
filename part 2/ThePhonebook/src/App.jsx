import personService from "./services/persons.service";
import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { List } from "./components/List";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const createNewPersonObj = () => ({
    name: newName,
    number: newPhone,
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newPerson = createNewPersonObj();
    const dupp = findDuplicatePerson();
    const confirmDuppUpdate = () =>
      window.confirm(`Do you want to update ${newPerson.name}`);

    if (dupp && confirmDuppUpdate()) {
      personService
        .updateNumber(dupp.id, newPerson)
        .then((data) =>
          setPersons(
            persons.map((person) => (person.id === dupp.id ? data : person)),
          ),
        );
    } else if (!dupp) {
      personService
        .newPerson(newPerson)
        .then((data) => setPersons(persons.concat(data)));
    }

    setNewName("");
    setNewPhone("");
  };

  const findDuplicatePerson = () =>
    persons.filter((person) => person.name === newName)[0];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const removePerson = (id) => {
    personService.deletePerson(id).then((data) => {
      const remaining = persons.filter((person) => person.id !== data.id);
      setPersons(remaining);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <Form
        onSubmit={handleOnSubmit}
        name={[newName, setNewName]}
        number={[newPhone, setNewPhone]}
      />
      <h2>Numbers</h2>
      <List persons={persons} searchTerm={searchTerm} onClick={removePerson} />
    </div>
  );
};

export default App;
