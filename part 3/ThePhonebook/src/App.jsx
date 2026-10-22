import personService from "./services/persons.service";
import notificationService from "./services/notification.service";
import { useEffect, useState } from "react";
import { Filter } from "./components/Filter/Filter.component";
import { Form } from "./components/Form/Form.component";
import { List } from "./components/List/List.component";
import { Notification } from "./components/notification/Notification.component";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({
    type: "",
    msg: "",
  });

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
    const dup = findDuplicatePerson();
    const confirmDuppUpdate = () =>
      window.confirm(`Do you want to update ${newPerson.name}`);

    if (dup && confirmDuppUpdate()) {
      personService
        .updateNumber(dup.id, newPerson)
        .then((data) => {
          setPersons(
            persons.map((person) => (person.id === dup.id ? data : person)),
          );

          notificationService.showNotification(
            "success",
            "user updated",
            setNotification,
          );
        })
        .catch(() => {
          notificationService.showNotification(
            "error",
            `user ${dup.name}  was already delete`,
            setNotification,
          );

          personService.getAll().then((data) => setPersons(data));
        });
    } else if (!dup) {
      personService.newPerson(newPerson).then((data) => {
        setPersons(persons.concat(data));

        notificationService.showNotification(
          "success",
          "user added",
          setNotification,
        );
      });
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

    notificationService.showNotification(
      "success",
      "user removed",
      setNotification,
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notification.msg} msgType={notification.type} />
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
