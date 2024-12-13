import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../config/database.js';
import xss from 'xss';


const router = Router();


const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const yearRegex = /^\d{4}$/;
const phoneRegex = /^\+?\d{9,15}$/;
const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
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

router.post('/add', async (req, res) => {
  let { name, yearOfBirth, country, email, password, phone, notes } = req.body;
  name = xss(name);
  yearOfBirth = xss(yearOfBirth);
  country = xss(country);
  email = xss(email);
  password = xss(password);
  phone = phone ? xss(phone) : null;
  notes = notes ? xss(notes) : null;

  console.log('Sanitized data:', { name, yearOfBirth, country, email, phone, notes });

  console.log('Received data:', req.body);

  // validation required fields
  if (!name || !yearOfBirth || !country || !email || !password) {
    console.log('Validation failed: Missing required fields');
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  // validation country
  if (!countries.includes(country)) {
    console.log('Validation failed: Country not in the list');
    return res.status(400).json({ error: 'Country must be selected from the predefined list.' });
  }

  // validation name
  if (!nameRegex.test(name)) {
    console.log('Validation failed: Invalid name format');
    return res.status(400).json({ error: 'Name must contain only letters and spaces.' });
  }

  // validation year
  if (!yearRegex.test(yearOfBirth) || yearOfBirth < 1900 || yearOfBirth > new Date().getFullYear()) {
    console.log('Validation failed: Invalid year format');
    return res.status(400).json({
      error: `Year of birth must be a valid year between 1924 and ${new Date().getFullYear()}.`,
    });
  }

  // validation email
  if (!emailRegex.test(email)) {
    console.log('Validation failed: Invalid email format');
    return res.status(400).json({ error: 'Email must be a valid email address.' });
  }

  // validation phone
  if (phone && !phoneRegex.test(phone)) {
    console.log('Validation failed: Invalid phone format');
    return res.status(400).json({
      error: 'Phone number must be valid and contain 9 to 15 digits, optionally starting with +.',
    });
  }

  // validation password
  if (!passwordRegex.test(password)) {
    console.log('Validation failed: Weak password');
    return res.status(400).json({
      error: 'Password must be at least 8 characters long and include at least one special character.',
    });
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);


    const query = `
      INSERT INTO People (name, yearOfBirth, country, email, password, phone, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    console.log('Executing query:', query, [name, yearOfBirth, country, email, hashedPassword, phone || null, notes || null]);

    db.query(query, [name, yearOfBirth, country, email, hashedPassword, phone || null, notes || null], (error, results) => {
      if (error) {
        console.error('Error inserting data into People:', error);
        return res.status(500).json({ error: error.sqlMessage });
      }

      console.log('Insert successful:', results);
      res.status(201).json({ message: 'Person added successfully!', id: results.insertId });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Failed to process password.' });
  }
});
router.get('/all', async (req, res) => {
  const { name, country, email, yearOfBirth, sortField, sortOrder } = req.query;

  let query = 'SELECT Id, name, yearOfBirth, country, email, phone, notes FROM People WHERE 1=1';
  const params = [];

  // filtering
  if (name) {
    query += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }
  if (country) {
    query += ' AND country LIKE ?';
    params.push(`%${country}%`);
  }
  if (email) {
    query += ' AND email LIKE ?';
    params.push(`%${email}%`);
  }
  if (yearOfBirth) {
    query += ' AND yearOfBirth = ?';
    params.push(yearOfBirth);
  }

  // sorting
  if (sortField && sortOrder) {
    query += ` ORDER BY ${sortField} ${sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}`;
  }

  try {
    db.query(query, params, (error, results) => {
      if (error) {
        console.error('[SERVER] Database error during fetching users:', error);
        return res.status(500).json({ error: 'Database error.' });
      }

      // cleaning data before sending to client
      const sanitizedResults = results.map((user) => ({
        id: xss(user.Id),
        name: xss(user.name),
        yearOfBirth: xss(user.yearOfBirth),
        country: xss(user.country),
        email: xss(user.email),
        phone: xss(user.phone),
        notes: xss(user.notes),
      }));

      res.json(sanitizedResults);
    });
  } catch (error) {
    console.error('[SERVER] Error during fetching users:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// deleting users
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM People WHERE Id = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('[SERVER] Database error during deletion:', error);
        return res.status(500).json({ error: 'Database error.' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      res.json({ message: 'User deleted successfully.' });
    });
  } catch (error) {
    console.error('[SERVER] Error during deletion:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});
router.put('/update', async (req, res) => {
  const { id, name, email, phone, notes } = req.body;
  const userId = req.userId;

  console.log('Update request by user:', userId);

  if (id !== userId) {
    return res.status(403).json({ error: 'You can only update your own data.' });
  }

  // validation
  if (name && !nameRegex.test(name)) {
    return res.status(400).json({ error: 'Name must contain only letters and spaces.' });
  }

  if (email && !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email must be a valid email address.' });
  }

  if (phone && !phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Phone number must be valid and contain 9 to 15 digits.' });
  }

  // SQL-request to refreshing data
  try {
    const query = `
      UPDATE People
      SET name = COALESCE(?, name),
          email = COALESCE(?, email),
          phone = COALESCE(?, phone),
          notes = COALESCE(?, notes)
      WHERE id = ?;
    `;
    const params = [name || null, email || null, phone || null, notes || null, userId];
    
    db.query(query, params, (error, results) => {
      if (error) {
        console.error('Error updating user data:', error);
        return res.status(500).json({ error: 'Database error.' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      res.json({ message: 'User updated successfully.' });
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});


export default router;
