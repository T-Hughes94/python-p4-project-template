import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function IncomeChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    // Sample profit data, replace this with your actual data
    const profitData = [
      { event: 'Event 1', profit: 1000 },
      { event: 'Event 2', profit: 1500 },
      { event: 'Event 3', profit: 800 },
      // Add more data here
    ];

    // Set up the SVG dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create a linear scale for profit values
    const xScale = d3
      .scaleBand()
      .domain(profitData.map((d) => d.event))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(profitData, (d) => d.profit)])
      .nice()
      .range([height, 0]);

    // Create and append the bars to the chart
    svg
      .selectAll('.bar')
      .data(profitData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.event))
      .attr('y', (d) => yScale(d.profit))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.profit));

    // Create and append x and y axes
    const xAxis = d3.axisBottom(xScale);
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append('g').attr('class', 'y-axis').call(yAxis);
  }, []);

  return (
    <div>
      <h2>Food Truck Event Profit</h2>
      <div ref={chartRef}></div>
    </div>
  );
}

export default IncomeChart;
