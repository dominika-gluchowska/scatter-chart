import React, { Component } from 'react';
import create_data from './createData'
import ScatterChart from './components/ScatterChart.jsx'

import './App.css';

const dataMap =  {
    dataSourceA: create_data(50),
    dataSourceB: create_data(40),
    dataSourceC: create_data(60)
}
class App extends Component {

    state = {
        selectedDataSource: dataMap.dataSourceA,
        selectedValue: 'dataSourceA'
    }

    constructor(props) {
        super(props)
        fetch('http://127.0.0.1:8080/chart-data')
            .then((res) => res.json())
            .then((response)=>{
            console.log(response)
        })
    }

    changeDataSource = (event) => {
        this.setState({
            selectedDataSource: dataMap[event.target.value],
            selectedValue: event.target.value
        })

        console.log(this.state.selectedDataSource[0])
    }


  render() {
      const {selectedValue, selectedDataSource} = this.state;
    return [
      <div className="App" id="chartHere"> </div>,
        <ScatterChart key="chart" data={selectedDataSource} className={selectedValue}/>,
        <select key="select" onChange={this.changeDataSource} value={selectedValue}>
          <option value="dataSourceA">Source 1</option>
          <option value="dataSourceB">Source 2</option>
          <option value="dataSourceC">Source 3</option>
        </select>

    ];
  }
}

export default App;
