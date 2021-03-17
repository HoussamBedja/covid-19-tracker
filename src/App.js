import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  },[]);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
          setCountries(countries);
        })
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    });

  };

  console.log(countryInfo);

  return (
    <div className="app">
      <Card className="app__left">
        <CardContent>
          <h3>Live cases by Country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>

      <div className="app__right">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__droopdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}></InfoBox>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></InfoBox>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></InfoBox>
        </div>

        <Map></Map>
      </div>
      

    </div>
  );
}

export default App;
