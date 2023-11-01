import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';

function EventForm() {
  const navigate = useNavigate();

  // Financial Data State
  const [foodSales, setFoodSales] = useState(0.0);
  const [beverageSales, setBeverageSales] = useState(0.0);
  const [foodCost, setFoodCost] = useState(0.0);
  const [beverageCost, setBeverageCost] = useState(0.0);
  const [fuelCost, setFuelCost] = useState(0.0);
  const [foodTruckId, setFoodTruckId] = useState('');
  const [eventId, setEventId] = useState('');
  const [hourlyWages, setHourlyWages] = useState(0.0);

  // EventInfo State
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const financialData = {
      food_sales: foodSales,
      beverage_sales: beverageSales,
      food_cost: foodCost,
      beverage_cost: beverageCost,
      fuel_cost: fuelCost,
      hourly_wages: hourlyWages,
      food_truck_id: foodTruckId,
      event_id: eventId
    };
  
    const eventInfo = {
      event_name: eventName,
      event_location: eventLocation,
      event_description: eventDescription
    };
  
    try {
      // Send financial data to the server
      const financialResponse = fetch('/api/truckevents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(financialData),
      });
  
      if (financialResponse.ok) {
        print(eventInfo)
        //Send event data to the server
        const eventResponse =fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventInfo),
        });
  
        if (eventResponse.ok) {
          navigate('/Events'); 
        } else {
          console.error('Failed to submit event data.');
        }
      } else {
        console.error('Failed to submit financial data.');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  


  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Food Sales</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.01"
              value={foodSales}
              onChange={(e) => setFoodSales(parseFloat(e.target.value))}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Beverage Sales</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.01"
              value={beverageSales}
              onChange={(e) => setBeverageSales(parseFloat(e.target.value))}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Food Cost</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.01"
              value={foodCost}
              onChange={(e) => setFoodCost(parseFloat(e.target.value))}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Beverage Cost</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.01"
              value={beverageCost}
              onChange={(e) => setBeverageCost(parseFloat(e.target.value))}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fuel Cost</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.01"
              value={fuelCost}
              onChange={(e) => setFuelCost(parseFloat(e.target.value))}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hourly Wages</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.01"
              value={hourlyWages}
              onChange={(e) => setHourlyWages(parseFloat(e.target.value))}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Food Truck ID</Form.Label>
          <Form.Control
            type="number"
            value={foodTruckId}
            onChange={(e) => setFoodTruckId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event ID</Form.Label>
          <Form.Control
            type="number"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Location</Form.Label>
          <Form.Control
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Description</Form.Label>
          <Form.Control
            as="textarea"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EventForm;






