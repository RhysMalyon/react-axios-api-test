import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Form
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const api = axios.create({
  baseURL: `https://covid-api.mmediagroup.fr/v1`,
});

function App() {
  const [country, setCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    async function getCountry() {
      let data = await api
        .get(`/cases?country=${capitalizeFirstLetters(searchQuery)}`)
        .then(({ data }) => data);
      setCovidData(data);
    }

    getCountry();
  }, [searchQuery]);

  function capitalizeFirstLetters(string) {
    return string.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase());
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchQuery(country);
  };

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  let percentageAffected = 0;

  if (covidData.All) {
    percentageAffected = (
      (covidData.All.confirmed / covidData.All.population) *
      100
    ).toFixed(2);
  }

  return (
    <div className="App">
      <div className="container d-flex flex-column align-items-center">
        <Form
          className="d-flex m-5 align-items-end"
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <FormLabel>Find a country</FormLabel>
            <FormControl
              type="text"
              name="country"
              value={country}
              placeholder="Search for your country"
              onChange={handleChange}
            />
          </FormGroup>
          <Button variant="primary" type="submit" className="h-50">Submit</Button>
        </Form>
        {covidData.All ? (
          <div className="text-left">
            <h2 className="mb-4">Covid statistics for {covidData.All.country}</h2>
            <p>Total cases: {covidData.All.confirmed}</p>
            <p>Total deaths: {covidData.All.deaths}</p>
            <p>Percentage of population affected: {percentageAffected}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
