import React from 'react'
import { Link } from 'react-router-dom';

const _renderData = (stats) => (
  Object.keys(stats).map(id => (
    <tr key={stats[id].country}>
      <td>
        <Link to={stats[id].country} title={`Ver detalles de ${stats[id].country}`}>
          {stats[id].country}
        </Link>
      </td>
      <td>{stats[id].cases.new}</td>
      <td>{stats[id].cases.total}</td>
      <td>{stats[id].deaths.total}</td>
      <td>{stats[id].cases.active}</td>
      <td>{stats[id].cases.critical}</td>
      <td>{stats[id].cases.recovered}</td>
    </tr>
  ))
)

const CountryList = ( props ) => {
  return (
    <React.Fragment>
      <div>
        <h4>Covid cases by country</h4>
        <table className="table is-striped is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>País</th>
              <th>Nuevos 24h.</th>
              <th>Total</th>
              <th>Muertes</th>
              <th>Activos</th>
              <th>Críticos</th>
              <th>Curados</th>
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