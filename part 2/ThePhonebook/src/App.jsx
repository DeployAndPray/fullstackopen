import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
    };
    
    if(isDuplicateName()){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson));
    }
      setNewName("");
  };

  const isDuplicateName = () => persons.some((person) => person.name === newName )
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => (
          <li key={person.name.concat("_", i)}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
