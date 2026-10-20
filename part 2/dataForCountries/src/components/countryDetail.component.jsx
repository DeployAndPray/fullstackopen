import { useEffect, useState } from "react";
import weatherService from "../services/weather.service";

export function CountryDetail({ country }) {
  const { title, capital, area, languages, flag, cords } = country;
  const [forecast, setForecast] = useState(null);

  const getWeather = (lat, lng) => {
    return weatherService
      .getCurrentWeatherByCords(lat, lng)
  };

  useEffect(() => {
    getWeather(cords.lat, cords.lng).then((d) => setForecast(d));
  }, [cords.lat, cords.lng]);

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
      <h2>Weather in {title}</h2>
      { forecast && <p>temperature {forecast?.main?.temp} celsius </p>}
      {forecast && (
        <img
          src={weatherService.getIcon(forecast?.weather?.[0]?.icon)}
        />
      )}
      { forecast && <p>wind {forecast?.wind?.speed} m/s</p> }
    </>
  );
}
