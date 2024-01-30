import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

function Events() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
  });

  const [events, setEvents] = useState([]);
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

    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Event created successfully');
          setFormData({
            name: '',
            location: '',
            description: '',
          });
          fetchEvents();
        } else {
          console.error('Event creation failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchEvents = () => {
    fetch('/api/events')
      .then((response) => {
        if (response.status === 401) {
          setError('Unauthorized access. Please log in.');
        } else if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to fetch events');
        }
      })
      .then((data) => {
        setEvents(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching events data:', error);
        setError('Failed to fetch events data. Please try again later.');
      });
  };

  const handleDeleteEvent = (eventId) => {
    fetch(`/api/events/${eventId}`, {
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
    fetchEvents();
  }, []);

  return (
    <Container className="my-5">
      <h2>Create a New Event</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Create Event
        </Button>
      </Form>
      {error && <p className="text-danger">{error}</p>}
      <h2></h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4" key={event.id}>
            <EventCard event={event} onDelete={handleDeleteEvent} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Events;


