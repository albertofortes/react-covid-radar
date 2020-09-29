import React from 'react'
import { Link } from 'react-router-dom';

const _numberWithCommas = (number) => {
  return isNaN(number) ? '' : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const _renderData = (stats) => (
  Object.keys(stats).map(id => (
    <tr key={stats[id].country}>
      <td>
        <Link to={stats[id].country} title={`Cases in ${stats[id].country}`}>
          {stats[id].country}
        </Link>
      </td>
      <td className="new">{stats[id].cases.new}</td>
      <td>{_numberWithCommas(parseInt(stats[id].cases.total))}</td>
      <td>{_numberWithCommas(parseInt(stats[id].cases['1M_pop']))}</td>
      <td className="deaths">{stats[id].deaths.new}</td>
      <td>{_numberWithCommas(parseInt(stats[id].deaths.total))}</td>
      <td>{_numberWithCommas(parseInt(stats[id].deaths['1M_pop']))}</td>
      <td>{_numberWithCommas(parseInt(stats[id].cases.active))}</td>
      <td>{_numberWithCommas(parseInt(stats[id].cases.critical))}</td>
      <td>{_numberWithCommas(parseInt(stats[id].cases.recovered))}</td>
    </tr>
  ))
)

const CountryList = ( props ) => {
  return (
    <React.Fragment>
      <div>
        <h4>Covid cases by country <small>(Updated every 15 minutes).</small></h4>
        <br />
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Country,<br /> other</th>
              <th>New<br /> <small>(24h.)</small></th>
              <th>Total<br /> Cases</th>
              <th>Cases<br /> 1M/pop</th>
              <th>New<br /> Deaths</th>
              <th>Total<br /> Deaths</th>
              <th>Deaths<br /> 1M/pop</th>
              <th>Active<br /> cases</th>
              <th>Crítical<br /> cases</th>
              <th>Total <br />Recovered</th>
            </tr>
          </thead>
          <tbody>
            {_renderData(props.stats)}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default CountryList