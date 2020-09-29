import React, { useEffect, useState } from 'react'
import {Bar, Line} from 'react-chartjs-2';
import { APIKey } from '../APIKey';

const Country = (props) => {
  const [stats, setStats] = useState({})
  const [cases, setCases] = useState({})
  const [deaths, setDeaths] = useState({})
  const [tests, setTests] = useState({})
  const [historyData, setHistoryData] = useState([])
  const [historyDeaths, setHistoryDeaths] = useState([])
  const [historyDataTotalCases, setHistoryDataTotalCases] = useState([])
  const [historyDataLabels, setHistoryDataLabels] = useState([])

  const _getData = async () => {
    fetch(`https://covid-193.p.rapidapi.com/statistics?country=${props.match.params.id}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": APIKey
      }
    })
    .then(response => response.json())
    .then(res => {
      //console.log(res)
      const stats = res.response[0]
      setStats( stats )
      setCases( stats.cases )
      setDeaths( stats.deaths )
      setTests( stats.tests )
    })
    .catch(err => {
      console.log(err);
    })
  }

  const _getHistory = async () => {
    fetch(`https://covid-193.p.rapidapi.com/history?country=${props.match.params.id}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": APIKey
      }
    })
    .then(response => response.json())
    .then(res => {
      //console.log(res)
      const history = res.response
      const labelsChart = []
      const dataCharts = []
      const dataChartsDeaths = []
      const dataTotalCharts = []

      Object.keys(history).map( key => (
        labelsChart.push(history[key].day)
      ))

      Object.keys(history).map( key => (
        dataTotalCharts.push(history[key].cases.total)
      ))

      Object.keys(history).map(function(key) {
        let daily = isNaN(parseInt(history[key].cases.new)) ? 0 : parseInt (history[key].cases.new)
        let dailyDeaths = isNaN(parseInt(history[key].deaths.new)) ? 0 : parseInt (history[key].deaths.new)

        dataCharts.push(daily)
        dataChartsDeaths.push(dailyDeaths)
        return null
      })

      setHistoryData (dataCharts.reverse())
      setHistoryDeaths (dataChartsDeaths.reverse())
      setHistoryDataLabels (labelsChart.reverse())
      setHistoryDataTotalCases (dataTotalCharts.reverse())
    })
    .catch(err => {
      console.log(err);
    });
  }

  const _numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const chartData = {  
    //labels: ['January', 'February', 'March', 'April', 'May'],,
    labels:  historyDataLabels,
    datasets: [
      {
        label: 'Daily new cases',
        backgroundColor: 'rgba(255,0,0,0.2)',
        borderColor: 'rgba(220,20,60,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,0,0,0.4)',
        hoverBorderColor: 'rgba(220,20,60,1)',
        data: historyData
      },
      {
        label: 'Daily new deaths',
        backgroundColor: 'rgba(255,223,0,0.2)',
        borderColor: 'rgba(255,223,0,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,223,0,0.4)',
        hoverBorderColor: 'rgba(255,223,0,1)',
        data: historyDeaths
      }
    ]
  }

  const chartDataTotalCases = {
    labels:  historyDataLabels,
    datasets: [
      {
        label: 'Total cases',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: historyDataTotalCases
      }
    ]
  };
  
  /**
   * Functions passed to useEffect are executed on every component rendering—unless you pass a second argument to it.
     If the second argument is an empty array, like the example above, it will behave exactly like the componentDidMount, only executing on the first rendering.
     Alternatively, you can pass one or more values inside the array, which will make useEffect execute every time those value changes.
   */
  useEffect(() => {
    _getData();
    _getHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={`https://www.countries-ofthe-world.com/flags-normal/flag-of-${stats.country}.png`} alt="Flag" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{stats.country}</p>
              <p className="subtitle is-6">{_numberWithCommas(parseInt(stats.population))} habs.</p>
            </div>
          </div>

          <div className="content">
            Up to date stats: <time dateTime={stats.day}>{stats.day}</time>
            <br /><br />

            <Bar data={chartData} />

            <br />

            <Line data={chartDataTotalCases} />
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <div className="card card--small">
            <div className="card-content">
              <div className="content">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      <th colSpan="2">Cases</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>New 24h</strong></td>
                      <td>{cases.new}</td>
                    </tr>
                    <tr>
                      <td><strong>pop/1 Million</strong></td>
                      <td>{_numberWithCommas(parseInt(cases['1M_pop']))}</td>
                    </tr>
                    <tr>
                      <td><strong>Active</strong></td>
                      <td>{_numberWithCommas(parseInt(cases.active))}</td>
                    </tr>
                    <tr>
                      <td><strong>Critical</strong></td>
                      <td>{_numberWithCommas(parseInt(cases.critical))}</td>
                    </tr>
                    <tr>
                      <td><strong>Recovered</strong></td>
                      <td>{_numberWithCommas(parseInt(cases.recovered))}</td>
                    </tr>
                    <tr>
                      <td><strong>Total</strong></td>
                      <td>{_numberWithCommas(parseInt(cases.total))}</td>
                    </tr>
                  </tbody>
                </table>                              
              </div>
            </div>
          </div>      

        </div>
        <div className="column">
          <div className="card card--small">
            <div className="card-content">
              <div className="content">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      <th colSpan="2">Deaths</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>New 24h</strong></td>
                      <td>{deaths.new}</td>
                    </tr>
                    <tr>
                      <td><strong>Pop/1M</strong></td>
                      <td>{_numberWithCommas(parseInt(deaths['1M_pop']))}</td>
                    </tr>
                    <tr>
                      <td><strong>Total</strong></td>
                      <td>{_numberWithCommas(parseInt(deaths.total))}</td>
                    </tr>
                  </tbody>
                </table>  
              </div>
            </div>      
          </div>
        </div>

        <div className="column">
          <div className="card card--small">
            <div className="card-content">
              <div className="content">
              <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      <th colSpan="2">Tests</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>pop/1M</strong></td>
                      <td>{_numberWithCommas(parseInt(tests['1M_pop']))}</td>
                    </tr>
                    <tr>
                      <td><strong>Total</strong></td>
                      <td>{_numberWithCommas(parseInt(tests.total))}</td>
                    </tr>
                  </tbody>
                </table>              
              </div>
            </div>      
          </div>
        </div>
        
      </div>
    </React.Fragment>
  )
}

export default Country