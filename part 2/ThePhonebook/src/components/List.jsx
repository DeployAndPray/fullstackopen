export function List({ persons, searchTerm }) {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLocaleLowerCase().includes(searchTerm),
        )
        .map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
          </li>
        ))}
    </ul>
  );
}
