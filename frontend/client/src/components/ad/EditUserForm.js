import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const EditUserForm = ({ editUserId, setEditUserId }) => {
  const [editedUser, setEditedUser] = useState({
    id: null,
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (editUserId) {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/edit_user/${editUserId}/`);
        setEditedUser(response.data);
      }
    };

    fetchUserData();
  }, [editUserId]);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    // Assuming you have a Django endpoint for updating user details
    try {
      await axios.post(`http://127.0.0.1:8000/api/users/edit_user/${editUserId}/`, editedUser);
      console.log('User updated successfully');
      // Optionally, you can reset the editUserId state to exit the edit mode
      setEditUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  useEffect(() => {
    const fetchUpdatedUserData = async () => {
      if (editUserId) {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/edit_user/${editUserId}/`);
        setEditedUser(response.data);
      }
    };
    fetchUpdatedUserData();
  }, [editUserId, setEditUserId]);

  return (
    <div>
      <h2>Edit User</h2>
      <form>
        <label>
          First Name:
          <input type="text" name="first_name" value={editedUser.first_name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" value={editedUser.last_name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} />
        </label>
        <br />
        <button type="button" onClick={handleUpdateUser}>
          Update User
        </button>
        <button type="button" onClick={() => setEditUserId(null)}>
          Cancel
        </button>
      </form>
    </div>
  );
};


