import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function FoodTruckEventCard({ foodTruckEvent, onDeleteCard }) {
  const [open, setOpen] = useState(false); // State to control the card's open/closed state

  const totalRevenue =
    foodTruckEvent.food_sales + foodTruckEvent.beverage_sales;
  const totalCost =
    foodTruckEvent.food_cost +
    foodTruckEvent.beverage_cost +
    foodTruckEvent.fuel_cost +
    foodTruckEvent.hourly_wages;
  const profit = totalRevenue - totalCost;

  const handleDeleteClick = () => {
    if (onDeleteCard) {
      onDeleteCard(foodTruckEvent.id);
    }
  };

  return (
    <div className="col-md-10 mb-2">
      <Card style={{ height: '100%' }}> {/* Set a fixed height for the cards */}
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div
            onClick={() => setOpen(!open)}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            {foodTruckEvent.event.name}
          </div>
          <Button
            variant="link"
            onClick={() => setOpen(!open)}
            style={{ textDecoration: 'none' }}
          >
            {open ? '' : ''}
          </Button>
        </Card.Header>
        <Collapse in={open}>
          <div>
            <Card.Body>
              <Card.Text>Food Sales: ${foodTruckEvent.food_sales.toFixed(2)}</Card.Text>
              <Card.Text>
                Beverage Sales: ${foodTruckEvent.beverage_sales.toFixed(2)}
              </Card.Text>
              <Card.Text>Food Cost: ${foodTruckEvent.food_cost.toFixed(2)}</Card.Text>
              <Card.Text>
                Beverage Cost: ${foodTruckEvent.beverage_cost.toFixed(2)}
              </Card.Text>
              <Card.Text>Fuel Cost: ${foodTruckEvent.fuel_cost.toFixed(2)}</Card.Text>
              <Card.Text>
                Hourly Wages: ${foodTruckEvent.hourly_wages?.toFixed(2)}
              </Card.Text>
              <Card.Text>Profit: ${profit.toFixed(2)}</Card.Text>
              <Button variant="danger" onClick={handleDeleteClick}>
                Delete
              </Button>
            </Card.Body>
          </div>
        </Collapse>
      </Card>
    </div>
  );
}

export default FoodTruckEventCard;

