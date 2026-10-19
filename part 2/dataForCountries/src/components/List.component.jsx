export function List({ list, onClick }) {
  return (
    <>
      <ul>
        {list.map((country) => (
          <li key={country.name.common}>
            <button onClick={() => onClick(country.name.common)}>Show</button>
            &nbsp;
            {country.name.common}
          </li>
        ))}
      </ul>
    </>
  );
}
