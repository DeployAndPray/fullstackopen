export function CountryDetail({ country }) {
  const { title, capital, area, languages, flag } = country;
  return (
    <>
      <h1>{title}</h1>
      <p>
        Capital: {capital}
        <br />
        Area: {area}
      </p>
      <h2>Languages</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <i style={{ fontSize: "200px" }}>{flag}</i>
    </>
  );
}
