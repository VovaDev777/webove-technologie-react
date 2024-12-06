import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DOMPurify from 'dompurify'; // Для защиты от XSS

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ name: '', country: '', email: '', yearOfBirth: '' });
  const [sort, setSort] = useState({ field: '', order: 'asc' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [filters, sort]);

  const fetchUsers = async () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (isAuthenticated !== 'true') {
      console.error('[CLIENT] User is not authenticated');
      navigate('/login');
      return;
    }

    try {
      const queryParams = new URLSearchParams({
        ...filters,
        sortField: sort.field,
        sortOrder: sort.order,
      });

      const response = await fetch(`http://localhost:5000/api/people/all?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }
      const data = await response.json();

      // Очищаем данные перед их сохранением в состоянии
      const sanitizedData = data.map((user) => ({
        id: DOMPurify.sanitize(user.id),
        name: DOMPurify.sanitize(user.name),
        yearOfBirth: DOMPurify.sanitize(user.yearOfBirth),
        country: DOMPurify.sanitize(user.country),
        email: DOMPurify.sanitize(user.email),
        phone: DOMPurify.sanitize(user.phone),
        notes: DOMPurify.sanitize(user.notes),
      }));

      setUsers(sanitizedData);
    } catch (error) {
      console.error('[CLIENT] Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/people/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user.');
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error('[CLIENT] Error deleting user:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSort = (field) => {
    setSort((prevSort) => ({
      field,
      order: prevSort.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <StyledWrapper>
      <h1>All Users</h1>
      {error && <p className="error">{error}</p>}
      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Filter by country"
          value={filters.country}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="yearOfBirth"
          placeholder="Filter by year of birth"
          value={filters.yearOfBirth}
          onChange={handleFilterChange}
        />
      </div>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(users[0]).map((key) => (
                <th key={key} onClick={() => handleSort(key)}>
                  {key} {sort.field === key ? (sort.order === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {Object.values(user).map((value, idx) => (
                  <td key={idx} dangerouslySetInnerHTML={{ __html: value }} />
                ))}
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;

  h1 {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;

    input {
      padding: 10px 15px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      width: 200px;
      transition: all 0.3s ease;

      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
        outline: none;
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: 0 auto;

    th,
    td {
      padding: 12px 20px;
      text-align: left;
    }

    th {
      background-color: #007bff;
      color: white;
      font-weight: bold;
      cursor: pointer;
      position: relative;
      user-select: none;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }

    td {
      background-color: #f9f9f9;
      color: #333;
    }

    tr:nth-child(even) td {
      background-color: #f1f1f1;
    }

    tr:hover td {
      background-color: #e2f0ff;
    }
  }

  .error {
    color: red;
    text-align: center;
    font-size: 1rem;
    margin-top: 20px;
  }
`;

export default AllUsersPage;
