import React, { useState } from 'react';

function TruckForm() {
  const [formData, setFormData] = useState({
    name: '',
    food_type: '',
    description: '',
  });

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
          // Truck creation was successful
          console.log('Truck created successfully');
          // Optionally, you can redirect the user to a different page
          // window.location.href = '/some-other-page';
        } else {
          // Handle errors, e.g., display an error message to the user
          console.error('Truck creation failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Reset form fields
    setFormData({
      name: '',
      food_type: '',
      description: '',
    });
    
  };

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
    </div>
  );
}

export default TruckForm;

