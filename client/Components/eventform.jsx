import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FoodTruckEventCard from './FoodTruckEventCard';
import IncomeChart from './IncomeChart';
import { useNavigate } from 'react-router-dom';

function EventForm() {
  const navigate = useNavigate();

  const [foodSales, setFoodSales] = useState(0.0);
  const [beverageSales, setBeverageSales] = useState(0.0);
  const [foodCost, setFoodCost] = useState(0.0);
  const [beverageCost, setBeverageCost] = useState(0.0);
  const [fuelCost, setFuelCost] = useState(0.0);
  const [hourlyWages, setHourlyWages] = useState(0.0);
  const [selectedFoodTruck, setSelectedFoodTruck] = useState('');

  // State variables for your data
  const [foodTruckId, setFoodTruckId] = useState('');
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState([]);
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [truckEventData, setTruckEventData] = useState([]);
  const [profit, setProfit] = useState(0.0);

  // Fetch the list of events, food trucks, and truck events
  useEffect(() => {
    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events data:', error));

    fetch('/api/foodtrucks')
      .then((response) => response.json())
      .then((data) => setFoodTrucks(data))
      .catch((error) => console.error('Error fetching food trucks data:', error));

    fetch('/api/truckevents')
      .then((response) => response.json())
      .then((data) => setTruckEventData(data))
      .catch((error) => console.error('Error fetching truck events data:', error));
  }, []);

  // Calculate profit whenever financial data changes
  useEffect(() => {
    const totalRevenue = foodSales + beverageSales;
    const totalCost = foodCost + beverageCost + fuelCost + hourlyWages;
    const profitValue = totalRevenue - totalCost;
    setProfit(profitValue);
  }, [foodSales, beverageSales, foodCost, beverageCost, fuelCost, hourlyWages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to hold the financial data
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

  const handleDeleteCard = (id) => {
    fetch(`/api/truckevents/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          // The card was successfully deleted on the server
          console.log(`Card with ID ${id} deleted successfully.`);
          // Now, you can update your frontend state to remove the deleted card
          const updatedTruckEventData = truckEventData.filter((event) => event.id !== id);
          setTruckEventData(updatedTruckEventData);
        } else {
          // Handle the case where the card deletion on the server failed
          console.error('Card deletion failed.');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Food Truck</Form.Label>
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
              <Form.Label>Event</Form.Label>
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
        </div>
        <div className="col-md-6">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {truckEventData.map((event) => (
              <div className="col" key={event.id}>
                <FoodTruckEventCard
                  foodTruckEvent={event}
                  event={event.event}
                  foodTruck={event.foodTruck}
                  onDeleteCard={handleDeleteCard}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventForm;



