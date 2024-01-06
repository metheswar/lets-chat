
import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate('/chats');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '350px', padding: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        <Form onSubmit={handleFormSubmit}>
          
          {/* Name Input for Registration */}
          {!isLogin && (
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          )}

          {/* Email Input */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {/* Password Input */}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="w-100">
            {isLogin ? 'Login' : 'Register'}
          </Button>

          {/* Toggle between Login and Register */}
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="mt-2 text-center d-block"
          >
            {isLogin
              ? 'Need to register? Click here.'
              : 'Already have an account? Click here to login.'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
