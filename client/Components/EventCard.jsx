import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

function renderPieChart(financialData) {
  const data = [
    { label: 'Food Sales', value: financialData.food_sales },
    { label: 'Beverage Sales', value: financialData.beverage_sales },
    { label: 'Food Cost', value: financialData.food_cost },
    { label: 'Beverage Cost', value: financialData.beverage_cost },
    { label: 'Fuel Cost', value: financialData.fuel_cost },
    { label: 'Hourly Wages', value: financialData.hourly_wages },
  ];

  const width = 200;
  const height = 200;
  const radius = Math.min(width, height) / 2;

  // Create an SVG container for the pie chart
  const svg = d3.select('#pie-chart-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  // Create a color scale
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(d3.schemeCategory10);

  // Create a pie layout
  const pie = d3.pie()
    .value(d => d.value);

  // Generate the pie slices
  const arcs = pie(data);

  // Create arc generator
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  // Append the pie slices to the SVG
  svg.selectAll('path')
    .data(arcs)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.label))
    .append('title')
    .text(d => `${d.data.label}: ${d.data.value}`);
}
function EventCard({ event, onUpdate, onDelete, financialData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...event });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      onDelete(event.id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        {isEditing ? (
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="food_sales"
              value={formData.food_sales}
              onChange={handleChange}
            />
            <input
              type="number"
              name="beverage_sales"
              value={formData.beverage_sales}
              onChange={handleChange}
            />
            <input
              type="number"
              name="food_cost"
              value={formData.food_cost}
              onChange={handleChange}
            />
            <input
              type="number"
              name="beverage_cost"
              value={formData.beverage_cost}
              onChange={handleChange}
            />
            <input
              type="number"
              name="fuel_cost"
              value={formData.fuel_cost}
              onChange={handleChange}
            />
            <input
              type="number"
              name="hourly_wages"
              value={formData.hourly_wages}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div>
            <h5 className="card-title">{event.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{event.location}</h6>
            <p className="card-text">{event.description}</p>
            <p className="card-text">Food Sales: ${event.food_sales}</p>
            <p className="card-text">Beverage Sales: ${event.beverage_sales}</p>
            <p className="card-text">Food Cost: ${event.food_cost}</p>
            <p className="card-text">Beverage Cost: ${event.beverage_cost}</p>
            <p className="card-text">Fuel Cost: ${event.fuel_cost}</p>
            <p className="card-text">Hourly Wages: ${event.hourly_wages}</p>
          </div>
        )}

        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
        {isEditing && <button onClick={handleSaveClick}>Save</button>}
      </div>
    </div>
  );
}

export default EventCard;


