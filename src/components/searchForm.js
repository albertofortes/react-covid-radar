import React, { useState } from 'react'
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import { withRouter } from 'react-router-dom';

const SearchForm = (props) => {
  const [inputCountry, setInputCountry] = useState('Spain');
  
  const _handleSubmit = e => {
    e.preventDefault()
    props.history.push('/');

    const URL = inputCountry.length === 0 
      ? "https://covid-193.p.rapidapi.com/statistics"
      : `https://covid-193.p.rapidapi.com/statistics?country=${inputCountry}`

    fetch(URL, {
      "method": "get",
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "367b7757damshe03e78a8f6294cbp1f52fcjsnab58c2b5a569"
      }
    })
    .then(response => response.json())
    .then(res => {
      const stats = res.response
      props.onResults(stats) // lifting Up states as props!
    })
    .catch(err => {
      console.log(err);
    })
  }

  const _handleTriggerChange = e => {
    setInputCountry(e)
  }

  return (
    <form onSubmit={_handleSubmit}>
      <div className="field has-addons">
        <div className="control">
          {/*<input 
            className="input" 
            type="text" 
            placeholder="Búsqueda por país" 
            onChange={e => setInputCountry(e.target.value)}
          />*/}
          <TextInput 
            onChange={_handleTriggerChange} 
            Component="input" 
            matchAny={true}
            trigger=""
            options={props.countries} 
            className="input" 
            placeholder="Búsqueda por país"
            resize="false"  
          />
        </div>
        <div className="control">
          <button className="button is-primary">
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

export default withRouter(SearchForm)