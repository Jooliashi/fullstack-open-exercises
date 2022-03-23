import { useState, useEffect } from 'react'
import axios from 'axios'

const View = ({country}) => {
  if (country) {
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <ul>languages:</ul>
        {Object.keys(country.languages).map(lan =>
          <li>{country.languages[lan]}</li>
        )}
        <p style={{fontSize: 100 + 'px'}}>{country.flag}</p>
      </>
    )
  } else {
    return <></>
  }
}

const Display = ({countries, handleShow}) => {
  if (countries.length > 10) {
    return (
    <>
      <p>Too many searches, specify another filter</p>
    </>)
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map(country =>
        <>
          <li key={country.name.common}>{country.name.common}</li>
          <button onClick={handleShow}>show</button>
        </>
        )}
      </>
    )
  } else if (countries.length === 1) {
    let country = countries[0]
    return (<View country={country} />)
  } else {
    return (<></>)
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])
  const [viewCountry, setViewCountry] = useState(null)

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])
  
  const handleShow = (event) => {
    let country = event.target.previousElementSibling.textContent
    setViewCountry(filterCountries.find(match => match.name.common === country))
  }

  const handleSearch = (event) => {
    setViewCountry(null)
    let keyword = event.target.value
    if (keyword) {
      setFilterCountries(countries.filter(country => country.name.common.toLowerCase().match(keyword.toLowerCase())))
    } else {
      setFilterCountries(countries)
    }
  }
  return (
    <div>
      <p>find countries <input onChange={handleSearch}/></p>
      <ul>
        <Display countries={filterCountries} handleShow={handleShow}/>
        <View country={viewCountry} />
      </ul>
    </div>
  )
}
export default App