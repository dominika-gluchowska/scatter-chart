import React, { Component } from 'react';
import {scaleLinear} from 'd3-scale';
import {axisLeft, axisBottom} from 'd3-axis';
import {select} from 'd3-selection';
import {line as lineD3} from 'd3-shape';
import {extent} from 'd3-array';

import './App.css';
import create_data from './createData'

class App extends Component {

  componentDidMount(){
    var margin = {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = scaleLinear()
        .range([0, width]);

    var y = scaleLinear()
        .range([height, 0]);

    var xAxis = axisBottom()
        .scale(x)

    var yAxis = axisLeft()
        .scale(y)

    var svg = select("#chartHere").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = create_data(50);

    data.forEach(function(d) {
      d.x = +d.x;
      d.y = +d.y;
      d.yhat = +d.yhat;
    });

    var line = lineD3()
        .x(function(d) {
          return x(d.x);
        })
        .y(function(d) {
          return y(d.yhat);
        });

    x.domain(extent(data, function(d) {
      return d.x;
    }));
    y.domain(extent(data, function(d) {
      return d.y;
    }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("X-Value");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Y-Value")

    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) {
          return x(d.x);
        })
        .attr("cy", function(d) {
          return y(d.y);
        });

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
  }

  render() {
    return (
      <div className="App" id="chartHere">

      </div>
    );
  }
}

export default App;
