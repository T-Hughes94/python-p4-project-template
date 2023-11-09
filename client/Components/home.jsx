import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import '/src/Home.css'; // Import a custom CSS file for additional styling

function Home({ user }) {
  return (
    <Container className="my-5">
      <header className="text-center mb-4">
        <h1>Welcome</h1>
        {user ? (
          <div className="user-profile">
            <Image src={user.profile_img} alt="Profile" fluid />
            <h3 className="user-name">{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ) : (
          <p>User not logged in</p>
        )}
      </header>
    </Container>
  );
}

export default Home;
