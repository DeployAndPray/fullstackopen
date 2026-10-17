export function Form({ onSubmit, name, number }) {
  const [newName, setNewName] = name;
  const [newNumber, setNewNumber] = number;

  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <br />
        phone:{" "}
        <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
