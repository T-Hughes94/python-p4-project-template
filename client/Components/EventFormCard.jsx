import React from 'react';

import Card from 'react-bootstrap/Card';

function EventFormCard({ event, foodTruck, financialData}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{foodTruck.name}</Card.Subtitle>
        <Card.Text>
          Event Name: {event.name}
          <br />
          Food Sales: ${financialData.food_sales}
          <br />
          Beverage Sales: ${financialData.beverage_sales}
          <br />
          Food Cost: ${financialData.food_cost}
          <br />
          Beverage Cost: ${financialData.beverage_cost}
          <br />
          Fuel Cost: ${financialData.fuel_cost}
          <br />
          Hourly Wages: ${financialData.hourly_wages}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EventFormCard;
