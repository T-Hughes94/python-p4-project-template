import React, { useState } from 'react';

function EventCard({ event, onUpdate, onDelete }) {
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

