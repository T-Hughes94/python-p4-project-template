import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';

function EventCard({ event, financialData, onUpdate, onDelete }) {
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
    <Card>
      <Card.Body>
        {isEditing ? (
          <Form>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Form.Group>
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
            <Card.Title>{event.name}</Card.Title>
            <Card.Text>Location: {event.location}</Card.Text>
            <Card.Text>Description: {event.description}</Card.Text>
            <Card.Text>Financial Data: {financialData}</Card.Text>
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

export default EventCard;
