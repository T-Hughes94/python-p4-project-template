import React, { useState, useEffect } from 'react';
import TruckCard from './TruckCard';

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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Truck Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="food_type" className="form-label">
            Food Type
          </label>
          <input
            type="text"
            className="form-control"
            id="food_type"
            name="food_type"
            value={formData.food_type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Truck
        </button>
      </form>
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
