import React, { useState, useEffect } from 'react';
import TruckCard from './TruckCard';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Trucks() {
  const [formData, setFormData] = useState({
    name: '',
    food_type: '',
    description: '',
  });

  const [foodTrucks, setFoodTrucks] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/foodtrucks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Truck created successfully');
          setFormData({
            name: '',
            food_type: '',
            description: '',
          });
          fetchFoodTrucks();
        } else {
          console.error('Truck creation failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchFoodTrucks = () => {
    fetch('/api/foodtrucks')
      .then((response) => {
        if (response.status === 401) {
          setError('Unauthorized access. Please log in.');
        } else if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to fetch food trucks');
        }
      })
      .then((data) => {
        setFoodTrucks(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching food trucks data:', error);
        setError('Failed to fetch food trucks data. Please try again later.');
      });
  };

  const handleDelete = (foodTruckId) => {
    fetch(`/api/foodtrucks/${foodTruckId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        // Handle delete success or failure if needed
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchFoodTrucks();
  }, []);

  return (
    <div className="container">
      <h2>Create a New Food Truck</h2>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text>Truck Name</InputGroup.Text>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Food Type</InputGroup.Text>
          <Form.Control
            type="text"
            name="food_type"
            value={formData.food_type}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Description</InputGroup.Text>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <Button type="submit" variant="primary">
          Create Truck
        </Button>
      </Form>
      {error && <p className="text-danger">{error}</p>}
      <h2>Food Trucks</h2>
      <div className="row">
        {foodTrucks.map((foodTruck) => (
          <div className="col-md-4" key={foodTruck.id}>
            <TruckCard foodTruck={foodTruck} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trucks;
