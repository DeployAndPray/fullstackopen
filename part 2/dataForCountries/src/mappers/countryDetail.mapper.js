export const countryDetailMapper = (country) => {
  return {
    title: country.name.common,
    capital: country.capital,
    area: country.area,
    languages: Object.values(country.languages ?? {}),
    flag: country.flag,
    cords: {
      lat: country.latlng[0],
      lng: country.latlng[1]
    }
  };
};
