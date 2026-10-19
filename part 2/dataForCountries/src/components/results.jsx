import { CountryDetail } from "./countryDetail.component";
import { List } from "./List.component";
import { countryDetailMapper } from "../mappers/countryDetail.mapper";

const MAX_COUNTRIES = 10;

export function Results({ countries, searchValue, searchUpdate }) {
  const isSearchMatch = (country) => {
    return country.name.common
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  };

  const matches = countries.filter(isSearchMatch);

  if (matches.length === 0) return <p>No results</p>;
  if (matches.length > MAX_COUNTRIES)
    return <p>Too many matches, specify another filter</p>;
  if (matches.length === 1)
    return <CountryDetail country={countryDetailMapper(matches[0])} />;
  return <List list={matches} onClick={(name) => searchUpdate(name)} />;
}
