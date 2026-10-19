import { useEffect, useState } from "react";
import { Search } from "./components/search.component";
import { Results } from "./components/results";
import countryService from "./services/country.service";

function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState([]);


  useEffect(() => {
    countryService.getAllCountries().then((data) => setCountries(data));
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchCountry(searchValue);
  };

  return (
    <>
      <Search value={searchCountry} onChange={handleSearch} />
      <br />
      <Results countries={ countries } searchValue={ searchCountry } />
    </>
  );
}

export default App;
