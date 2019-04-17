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
        <ScatterChart data={selectedDataSource} className={selectedValue}/>,
        <select onChange={this.changeDataSource} value={selectedValue}>
          <option value="dataSourceA">Source 1</option>
          <option value="dataSourceB">Source 2</option>
          <option value="dataSourceC">Source 3</option>
        </select>
    ];
  }
}

export default App;
