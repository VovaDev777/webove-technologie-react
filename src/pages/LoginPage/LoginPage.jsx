import React, {useState} from 'react';
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
  
      // Устанавливаем флаг авторизации
      localStorage.setItem('isAuthenticated', 'true');
  
      // Триггерим событие, чтобы AppBar обновился
      window.dispatchEvent(new Event('storage'));
  
      setSuccess(data.message);
      navigate('/'); // Перенаправляем пользователя после успешного логина
    } catch (error) {
      console.error('[CLIENT] Failed to connect to the server:', error);
      setError('Failed to connect to the server.');
    }
  };
  
  
  return (
    <StyledWrapper>
      <form className="form">
        <div className="flex-column">
          <label>Email </label></div>
        <div className="inputForm">
          <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" /></g></svg>
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
          <label>Password </label></div>
        <div className="inputForm">
          <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" /></svg>        
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg> */}
        </div>
        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me </label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button className="button-submit" onClick={handleSubmit}>Sign In</button>
        <p className="p">Don't have an account? <NavLink to='/register' className="span">Sign Up</NavLink>
        </p>
          {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Centers vertically within the viewport */
  background-color: #f5f5f5; /* Optional: Add a subtle background */

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better visibility */
  }

  ::placeholder {
    font-family: inherit;
    color: #a8a8a8;
    font-size: 14px;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    position: relative;
    border: 1.5px solid #ecedec; /* Default border color */
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }

  .inputForm:focus-within {
    border-color: #2d79f3; /* Highlighted border color */
    box-shadow: 0 0 4px rgba(45, 121, 243, 0.4); /* Subtle blue shadow */
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none; /* Remove default input border */
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 14px;
    font-family: inherit;
    outline: none; /* Prevent focus outline */
    color: #151717;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
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

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: border-color 0.2s ease-in-out;
  }

  .btn:hover {
    border-color: #2d79f3;
  }
`;


export default LoginPage;
