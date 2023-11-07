import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FoodTruckEventCard from './FoodTruckEventCard'; // Import the updated card component
import { useNavigate } from 'react-router-dom';

function EventForm() {
  const navigate = useNavigate();

  // Default values for your state variables
  const [foodSales, setFoodSales] = useState(0.0);
  const [beverageSales, setBeverageSales] = useState(0.0);
  const [foodCost, setFoodCost] = useState(0.0);
  const [beverageCost, setBeverageCost] = useState(0.0);
  const [fuelCost, setFuelCost] = useState(0.0);
  const [hourlyWages, setHourlyWages] = useState(0.0);

  // Placeholder for selectedFoodTruck - make sure to define and set it as needed
  const selectedFoodTruck = 'Your selected food truck'; // Example placeholder value

  // EventInfo State
  const [foodTruckId, setFoodTruckId] = useState('');
  const [eventId, setEventId] = useState('');

  const [events, setEvents] = useState([]);
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [truckEventData, setTruckEventData] = useState([]); // State variable for truckevents
  const [profit, setProfit] = useState(0.0); // State for profit

  useEffect(() => {
    // Fetch the list of events and food trucks
    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events data:', error));

    fetch('/api/foodtrucks')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFoodTrucks(data);
      })
      .catch((error) => console.error('Error fetching food trucks data:', error));

    // Fetch the list of truckevents
    fetch('/api/truckevents')
      .then((response) => response.json())
      .then((data) => setTruckEventData(data))
      .catch((error) => console.error('Error fetching truckevents data:', error));
  }, []);

  useEffect(() => {
    // Calculate profit whenever financial data changes
    const totalRevenue = foodSales + beverageSales;
    const totalCost = foodCost + beverageCost + fuelCost + hourlyWages;
    const profitValue = totalRevenue - totalCost;
    setProfit(profitValue);
  }, [foodSales, beverageSales, foodCost, beverageCost, fuelCost, hourlyWages]);

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
      event_id: eventId,
    };

    try {
      // Send financial data to the server
      const financialResponse = await fetch('/api/truckevents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(financialData),
      });
      const data = await financialResponse.json();
      console.log(data);

      // After posting the financial data, fetch truck event data
      const truckEventDataResponse = await fetch(`/api/truckevents/${eventId}`);
      const truckEventData = await truckEventDataResponse.json();
      setTruckEventData(truckEventData);
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Food Truck ID</Form.Label>
        <Form.Control
          as="select"
          value={foodTruckId}
          onChange={(e) => setFoodTruckId(e.target.value)}
        >
          <option value="">Select a Food Truck</option>
          {foodTrucks.map((truck) => (
            <option key={truck.id} value={truck.id}>
              {truck.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Event ID</Form.Label>
        <Form.Control
          as="select"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        >
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/* Map through truckEventData to render FoodTruckEventCard components */}
      {truckEventData.map((event) => (
        <FoodTruckEventCard
          key={event.id}
          foodTruckEvent={event}
          event={truckEventData.event}
          foodTruck={truckEventData.foodTruck}
        />
      ))}

      {/* <p>Profit: ${profit.toFixed(2)}</p> */}
    </div>
  );
}

export default EventForm;
