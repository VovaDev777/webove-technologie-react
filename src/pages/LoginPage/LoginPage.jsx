import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../components/AuthContext/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth(); // Доступ к функции login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5001/api/login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: formData.email,
          Password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid email or password.');
        return;
      }

      const data = await response.json();
      console.log('[CLIENT] Login successful:', data);

      localStorage.setItem('isAuthenticated', 'true');

      window.dispatchEvent(new Event('storage'));

      setSuccess(data.message);
      navigate('/'); // Перенаправляем пользователя после успешного логина
    } catch (error) {
      console.error('[CLIENT] Failed to connect to the server:', error);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <PageWrapper>
      <form className="form">
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me </label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button className="button-submit" onClick={handleSubmit}>Sign In</button>
        <p className="p">
          Don't have an account?{' '}
          <NavLink to="/register" className="span">
            Sign Up
          </NavLink>
        </p>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #6a11cb, #2575fc);
  padding: 20px;
  overflow-y: auto;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    position: relative;
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }

  .inputForm:focus-within {
    border-color: #2d79f3;
    box-shadow: 0 0 4px rgba(45, 121, 243, 0.4);
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    color: #151717;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #2575fc;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #1e63d0;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 10px;
  }

  .success {
    color: green;
    font-size: 14px;
    margin-top: 10px;
  }
`;

export default LoginPage;