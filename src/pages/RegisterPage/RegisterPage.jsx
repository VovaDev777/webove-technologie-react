import React, { useState } from 'react';
import styled from 'styled-components';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    yearOfBirth: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    notes: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка совпадения паролей
    if (formData.password !== formData.confirmPassword) {
      console.error('Validation failed: Passwords do not match'); // Лог ошибки
      setError('Passwords do not match');
      return;
    }

    setError('');
    setSuccess('');

    console.log('Sending request to /api/people/add with data:', formData); // Лог отправляемых данных

    try {
      const response = await fetch('http://localhost:5000/api/people/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name,
          YearOfBirth: formData.yearOfBirth,
          Country: formData.country,
          Email: formData.email,
          Password: formData.password,
          Phone: formData.phone,
          Notes: formData.notes,
        }),
      });

      console.log('Response status:', response.status); // Лог статуса ответа

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData); // Лог ошибок с сервера
        setError(errorData.error || 'Something went wrong.');
        return;
      }

      const data = await response.json();
      console.log('Successful response:', data); // Лог успешного ответа

      setSuccess(data.message);
      setFormData({
        name: '',
        yearOfBirth: '',
        country: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        notes: '',
      });
    } catch (error) {
      console.error('Failed to connect to the server:', error); // Лог ошибки подключения
      setError('Failed to connect to the server.');
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Name</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-column">
          <label>Year of Birth</label>
        </div>
        <div className="inputForm">
          <input
            type="number"
            name="yearOfBirth"
            className="input"
            placeholder="Enter your Year of Birth"
            value={formData.yearOfBirth}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div className="flex-column">
          <label>Country</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            name="country"
            className="input"
            placeholder="Enter your Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-column">
          <label>Email</label>
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
          <label>Password</label>
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

        <div className="flex-column">
          <label>Confirm Password</label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            name="confirmPassword"
            className="input"
            placeholder="Confirm your Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-column">
          <label>Phone</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            name="phone"
            className="input"
            placeholder="Enter your Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="flex-column">
          <label>Notes</label>
        </div>
        <div className="inputForm">
          <textarea
            name="notes"
            className="input"
            placeholder="Enter additional notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            style={{ resize: 'none', height: '60px' }}
          />
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button className="button-submit" type="submit">
          Register
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
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
    background-color: #252727;
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

  textarea.input {
    padding: 10px;
    font-size: 14px;
    border-radius: 10px;
  }
`;

export default RegisterPage;
