import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [weather, setWeather] = useState(null);
  const url = "https://restcountries.eu/rest/v2/all";
  const weather_url = "https://api.openweathermap.org/data/2.5/weather?q=";
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (countriesToShow.length === 1) {
      getWeather(countriesToShow[0].capital);
    }
  }, [text]);

  const getWeather = (city) => {
    axios
      .get(`${weather_url}${city}&appid=${api_key}&units=metric`)
      .then((res) => {
        setWeather(res);
      });
  };

  const countriesToShow = text
    ? countries.filter(
        (country) =>
          country.name.toLowerCase().indexOf(text.toLowerCase().trim()) > -1
      )
    : [];

  if (countriesToShow.length === 1) {
    const country = countriesToShow[0];
    return (
      <div>
        search country
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <h1>{country.name}</h1>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h2>Languages</h2>
          <ul>
            {country.languages.map((language) => {
              return <li key={language.name}>{language.name}</li>;
            })}
          </ul>
          <img
            style={{ width: "150px" }}
            src={country.flag}
            alt={country.name}
          />
          {weather && (
            <div>
              <h2>Weather in {country.capital}</h2>
              <p>
                <strong>temperature:</strong>
                {weather.data.main.temp}C
              </p>
              <p>{weather.data.weather[0].description}</p>
              <img
                style={{ width: "100px" }}
                src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      search country
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        {countriesToShow.length < 10
          ? countriesToShow.map((country) => {
              return (
                <div key={country.alpha2Code}>
                  <span>{country.name}</span>
                  <button onClick={() => setText(country.name)}>show</button>
                </div>
              );
            })
          : "Too many matches, specify another filter"}
      </div>
    </div>
  );
}

export default App;
