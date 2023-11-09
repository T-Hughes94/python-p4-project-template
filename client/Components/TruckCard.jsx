import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';

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
    <Card>
      <Card.Body>
        {isEditing ? (
          <Form>
            <Form.Row>
              <Col>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  name="food_type"
                  value={formData.food_type}
                  onChange={handleChange}
                />
              </Col>
            </Form.Row>
            <Form.Group>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        ) : (
          <div>
            <Card.Title>{foodTruck.name}</Card.Title>
            <Card.Text>Food Type: {foodTruck.food_type}</Card.Text>
            <Card.Text>Description: {foodTruck.description}</Card.Text>
          </div>
        )}

        <Button variant="primary" onClick={handleEditClick}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
        {isEditing && (
          <Button variant="success" onClick={handleSaveClick}>
            Save
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default TruckCard;
