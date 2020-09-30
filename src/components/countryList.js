import React from 'react'
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-amazing-table-sorter';


const _numberWithCommas = (number) => {
  return isNaN(number) ? '' : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const _renderData = (stats) => (
  Object.keys(stats).map(id => (
    <Tr key={stats[id].country}>
      <Td sort={stats[id].country}>
        <Link to={stats[id].country} title={`Cases in ${stats[id].country}`}>
          {stats[id].country}
        </Link>
      </Td>
      <Td sort={stats[id].cases.new} className="new">{stats[id].cases.new}</Td>
      <Td sort={stats[id].cases.total}>{_numberWithCommas(parseInt(stats[id].cases.total))}</Td>
      <Td sort={stats[id].cases['1M_pop']}>{_numberWithCommas(parseInt(stats[id].cases['1M_pop']))}</Td>
      <Td sort={stats[id].deaths.new} className="deaths">{stats[id].deaths.new}</Td>
      <Td sort={stats[id].deaths.total}>{_numberWithCommas(parseInt(stats[id].deaths.total))}</Td>
      <Td sort={stats[id].deaths['1M_pop']}>{_numberWithCommas(parseInt(stats[id].deaths['1M_pop']))}</Td>
      <Td sort={stats[id].cases.active}>{_numberWithCommas(parseInt(stats[id].cases.active))}</Td>
      <Td sort={stats[id].cases.critical}>{_numberWithCommas(parseInt(stats[id].cases.critical))}</Td>
      <Td sort={stats[id].cases.recovered}>{_numberWithCommas(parseInt(stats[id].cases.recovered))}</Td>
    </Tr>
  ))
)

const CountryList = ( props ) => {
  return (
    <React.Fragment>
      <div>
        <h4>Covid cases by country <small>(Updated every 15 minutes).</small></h4>
        <br />
        <Table className="table is-striped is-fullwidth">
          <Thead>
            <Tr>
              <Th sort="text">Country,<br /> other</Th>
              <Th sort="number">New<br /> <small>(24h.)</small></Th>
              <Th sort="number">Total<br /> Cases</Th>
              <Th sort="number">Cases<br /> 1M/pop</Th>
              <Th sort="number">New<br /> Deaths</Th>
              <Th sort="number">Total<br /> Deaths</Th>
              <Th sort="number">Deaths<br /> 1M/pop</Th>
              <Th sort="number">Active<br /> cases</Th>
              <Th sort="number">Crítical<br /> cases</Th>
              <Th sort="number">Total <br />Recovered</Th>
            </Tr>
          </Thead>
          <Tbody>
            {_renderData(props.stats)}
          </Tbody>
        </Table>
      </div>
    </React.Fragment>
  )
}

export default CountryList