import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';

function Events() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
  });

  const [events, setEvents] = useState([]);

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
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events data:', error));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUpdateEvent = (updatedEvent) => {
    fetch(`/api/events/${updatedEvent.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Event updated successfully');
          fetchEvents();
        } else {
          console.error('Event update failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDeleteEvent = (eventId) => {
    fetch(`/api/events/${eventId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          console.log('Event deleted successfully');
          fetchEvents();
        } else {
          console.error('Event deletion failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Event Name
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
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
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
          Create Event
        </button>
      </form>
      <h2>Events</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4" key={event.id}>
            <EventCard
              event={event}
              financialData={event.financialData}
              onUpdate={handleUpdateEvent}
              onDelete={handleDeleteEvent}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;


