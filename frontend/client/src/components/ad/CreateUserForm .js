// CreateUserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm = ({ onCreateUser }) => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password:'',
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/create_user/', userData);
      onCreateUser(response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <label>
        First Name:
        <input type="text" name="first_name" value={userData.first_name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="last_name" value={userData.last_name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
      </label>
      <br />
      <label>
          Password:
          <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
        </label>
        <br />
      <button type="button" onClick={handleCreateUser}>
        Create User
      </button>
    </div>
  );
};

export default CreateUserForm;
