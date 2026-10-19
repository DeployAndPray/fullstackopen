import { useEffect, useState } from "react";
import { Search } from "./components/search.component";
import { List } from "./components/List.component";
import countryService from "./services/country.service";
import { CountryDetail } from "./components/countryDetail.component";
import { countryDetailMapper } from "./mappers/countryDetail.mapper";

function App() {
  const [searchCountry, setSearchCountry] = useState("belgium");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(null);

  const MAX_RESULTS = 10;

  useEffect(() => {
    countryService.getAllCountries().then((data) => setCountries(data));
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchCountry(searchValue);
    const filtered = countries.filter((c) =>
      c.name.common.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredCountries(filtered);
    setShowCountry(
      filtered.length === 1 ? countryDetailMapper(filtered[0]) : null,
    );
  };

  return (
    <>
      <Search value={searchCountry} onChange={handleSearch} />
      <br />
      {filteredCountries.length < MAX_RESULTS &&
      filteredCountries.length > 1 ? (
        <List list={filteredCountries} />
      ) : filteredCountries.length === 1 ? (
        <CountryDetail country={showCountry} />
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </>
  );
}

export default App;
