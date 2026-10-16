export function Form({ onSubmit, name, phone }) {
  const [newName, setNewName] = name;
  const [newPhone, setNewPhone] = phone;

  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <br />
        phone:{" "}
        <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
