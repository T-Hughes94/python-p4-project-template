import React, { useState } from 'react';

function TruckCard({ foodTruck, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...foodTruck });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this food truck?');
    if (confirmDelete) {
      onDelete(foodTruck.id);
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
              name="food_type"
              value={formData.food_type}
              onChange={handleChange}
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div>
            <h5 className="card-title">{foodTruck.name}</h5>
            <p className="card-text">Food Type: {foodTruck.food_type}</p>
            <p className="card-text">Description: {foodTruck.description}</p>
          </div>
        )}

        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
        {isEditing && <button onClick={handleSaveClick}>Save</button>}
      </div>
    </div>
  );
}

export default TruckCard;




