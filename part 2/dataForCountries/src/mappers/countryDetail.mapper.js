export const countryDetailMapper = (country) => {
  return {
    title: country.name.common,
    capital: country.capital,
    area: country.area,
    languages: Object.values(country.languages ?? {}),
    flag: country.flag,
  };
};
