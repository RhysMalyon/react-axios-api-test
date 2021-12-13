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
        .get(`/cases?country=${searchQuery}`)
        .then(({ data }) => data);
      setCovidData(data);
    }

    getCountry();
  }, [searchQuery]);

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
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="country"
          value={country}
          placeholder="Search for your country"
          onChange={handleChange}
        />
        <button>Search</button>
      </form> */}
      {covidData.All ? (
        <>
          <h2>Covid statistics for {covidData.All.country}</h2>
          <p>Total cases: {covidData.All.confirmed}</p>
          <p>Total deaths: {covidData.All.deaths}</p>
          <p>Percentage of population affected: {percentageAffected}</p>
        </>
      ) : null}
    </div>
  );
}

export default App;
