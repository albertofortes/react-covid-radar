import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import BitCoinPrice from './presentational';
import CountryList from './components/countryList';
import SearchForm from './components/searchForm';
import Country from './pages/country'

import './css/bulmaswatch.min.css' // Darky
import './css/App.css'

function CovidStats () {
  //state = { bpi: {}}
  const [stats, setStats] = useState({})
  const [storedCountries, setStoredCountries] = useState( [] );
  

  /*componentDidMount () {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const { bpi } = data
        this.setState({ bpi })
      })
  }*/

  const _getCountries = async () => {
    fetch("https://covid-193.p.rapidapi.com/countries", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "367b7757damshe03e78a8f6294cbp1f52fcjsnab58c2b5a569"
      }
    })
    .then(response => response.json())
    .then(res => {
      const countries = res.response
      setStoredCountries ( countries )
    })
    .catch(err => {
      console.log(err)
    });
  }

  const _getStats = async () => {
    fetch("https://covid-193.p.rapidapi.com/statistics", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "367b7757damshe03e78a8f6294cbp1f52fcjsnab58c2b5a569"
      }
    })
    .then(response => response.json())
    .then(res => {
      const stats = res.response
      setStats( stats )
    })
    .catch(err => {
      console.log(err)
    });
  }

  const _handleResults = results => {
    setStats( results )
  }

  useEffect(() => {
    _getCountries()
    _getStats()
  }, [])

  return (
    <Router>
      <div className="container">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <h1>
                <Link to="/">
                  Covid radar
                </Link>
              </h1>
            </div>
          </div>

          <div className="level-right">
            <div className="level-item">
              <div className="searchForm--wrapper">
                <SearchForm countries={storedCountries} onResults={_handleResults}  />
              </div>
            </div>
          </div>
        </div>
        
        <Route
          exact path='/'
          component={() => <CountryList stats={stats} />}
        />
        <Route exact path="/:id" component={Country} />

      </div> 
    </Router>   
  )
}

export default CovidStats