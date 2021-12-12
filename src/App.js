import React, { useEffect, useState } from 'react';
import axios from 'axios'

const api = axios.create({
  baseURL: `https://covid-api.mmediagroup.fr/v1`
})

function App() {
  const [japanCovidData, setJapanCovidData] = useState([])
  
  useEffect(() => {
    async function getCases() {
      let data = await api.get('/cases').then(({ data }) => data)
      setJapanCovidData(data.Japan)
    }
    getCases()
  }, [])

  const handleClick = () => {
    console.log(japanCovidData)
  }

  const populationAffected = (japanCovidData.All.confirmed / japanCovidData.All.population) * 100

  return (
    <div className="App">
      <p>Total cases: {japanCovidData.All.confirmed}</p>
      <p>Percentage of population affected: {(populationAffected).toFixed(2)}%</p>
      <button onClick={handleClick}>Log data</button>
    </div>
  );
}

export default App;
