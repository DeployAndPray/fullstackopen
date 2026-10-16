export function List({ persons, searchTerm }) {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLocaleLowerCase().includes(searchTerm),
        )
        .map((person, i) => (
          <li key={person.name.concat("_", i)}>
            {person.name} - {person.phone}
          </li>
        ))}
    </ul>
  );
}
