import React from 'react';
import Card from 'react-bootstrap/Card';

function FoodTruckEventCard({ foodTruckEvent }) {
  // Calculate profit for the specific food truck event
  const totalRevenue = foodTruckEvent.food_sales + foodTruckEvent.beverage_sales;
  const totalCost = foodTruckEvent.food_cost + foodTruckEvent.beverage_cost + foodTruckEvent.fuel_cost + foodTruckEvent.hourly_wages;
  const profit = totalRevenue - totalCost;
  console.log("food truck event")
  

  return (
    <Card>
      <Card.Header>{foodTruckEvent.event.name}</Card.Header> 
      <Card.Body>
       
          <Card.Text>Food Sales: ${foodTruckEvent.food_sales.toFixed(2)}</Card.Text>
          <Card.Text>Beverage Sales: ${foodTruckEvent.beverage_sales.toFixed(2)}</Card.Text>
          <Card.Text>Food Cost: ${foodTruckEvent.food_cost.toFixed(2)}</Card.Text>
          <Card.Text>Beverage Cost: ${foodTruckEvent.beverage_cost.toFixed(2)}</Card.Text>
          <Card.Text>Fuel Cost: ${foodTruckEvent.fuel_cost.toFixed(2)}</Card.Text>
          <Card.Text>Hourly Wages: ${foodTruckEvent.hourly_wages?.toFixed(2)}</Card.Text>
          <Card.Text>Profit: ${profit.toFixed(2)}</Card.Text>
       
      </Card.Body>
    </Card>
  );
}

export default FoodTruckEventCard;
