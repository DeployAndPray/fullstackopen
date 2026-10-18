export function List({ persons, searchTerm, onClick }) {
  const handleClick = (person) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${person.name}`,
    );
    isConfirmed ? onClick(person.id) : null;
  };

  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLocaleLowerCase().includes(searchTerm),
        )
        .map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}{" "}
            <button onClick={() => handleClick(person)}>delete</button>
          </li>
        ))}
    </ul>
  );
}
