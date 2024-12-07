import { useState } from 'react';
import styled from 'styled-components';
import Popup from '../../components/Popup';
import { useNavigate } from 'react-router-dom';
import css from './RegisterPage.module.css'
const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
  'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad',
  'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica', 'Croatia', 'Cuba',
  'Cyprus', 'Czechia (Czech Republic)', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
  'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini (fmr. Swaziland)', 'Ethiopia',
  'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
  'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland', 'India',
  'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kiribati', 'Korea (North)', 'Korea (South)', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
  'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
  'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
  'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)', 'Namibia', 'Nauru',
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman',
  'Pakistan', 'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
  'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
  'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
  'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America',
  'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];
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
  const [popup, setPopup] = useState({ message: '', type: '' });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/people/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');
      setPopup({ message: 'Registration successful!', type: 'success' });
      setTimeout(() => {
        navigate('/login'); // Переход на страницу логина
      }, 3000); // Задержка в 3 секунды перед редиректом
    } catch (error) {
      setPopup({ message: error.message, type: 'error' });
    }
  };

  return (
    <StyledWrapper>
      {popup.message && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ message: '', type: '' })}
        />
      )}
      
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
    list="countries"
    name="country"
    className="input"
    placeholder="Start typing or select a country"
    value={formData.country}
    onChange={handleChange}
    required
  />
  <datalist id="countries">
    {countries.map((country) => (
      <option key={country} value={country} />
    ))}
  </datalist>
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
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

  .input::placeholder {
    color: #a8a8a8; /* Placeholder color */
    font-size: 14px;
  }

  .input:focus {
    outline: none; /* Prevent double outline */
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
    font-size: 14px;
    border-radius: 10px;
    resize: none;
  }
`;



export default RegisterPage;
