import React, { Component } from 'react';
import {scaleLinear} from 'd3-scale';
import {axisLeft, axisBottom} from 'd3-axis';
import {select} from 'd3-selection';
import {line as lineD3} from 'd3-shape';
import {extent} from 'd3-array';

import './ScatterChart.css'

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

class ScatterChart extends Component {

    componentDidMount() {
        const { data, className } = this.props;

        var svg = select("#chartHere").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.assignData();

        var line = lineD3()
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
                return y(d.yhat);
            });

        //create axis
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
            .attr("class", () => ("dot " + className))
            .attr("r", 4.5)
            .attr("cx", function(d) {
                return x(d.x);
            })
            .attr("cy", function(d) {
                return y(d.y);
            });

        svg.append("path")
            .datum(data)
            .attr("class", () => ("line " + className))
            .attr("d", line);
    }

    componentDidUpdate(){
        const {className} = this.props;
        this.assignData();

        // Select the section we want to apply our changes to
        var svg = select("#chartHere svg")

        // Make the changes
        svg.selectAll(".dot")
            .attr("class", () => ("dot " + className))
            .attr("cx", function(d) {
                return x(d.x);
            })
            .attr("cy", function(d) {
                return y(d.y);
            });
        svg.select(".x.axis") // change the x axis
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .call(yAxis);

        var line = lineD3()
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
                return y(d.yhat);
            });

        svg.select('.line')
            .attr("d", line)
            .attr("class", () => ("line " + className));
    }

    assignData = () => {
        const {data } = this.props;

        data.forEach(function(d) {
            d.x = +d.x;
            d.y = +d.y;
            d.yhat = +d.yhat;
        });

        // Scale the range of the data again
        x.domain(extent(data, (d) =>  d.x ));
        y.domain(extent(data, (d) => d.y));
}

    render() {
        return (
            <div className="chart" id="chartHere"></div>
    );
    }
}

export default ScatterChart;
