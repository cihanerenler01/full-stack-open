import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const url = "https://restcountries.eu/rest/v2/all";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  }, []);

  const countriesToShow = text
    ? countries.filter(
        (country) =>
          country.name.toLowerCase().indexOf(text.toLowerCase().trim()) > -1
      )
    : [];

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
              return <p key={country.alpha2Code}>{country.name}</p>;
            })
          : "Too many matches, specify another filter"}
      </div>
    </div>
  );
}

export default App;
