import React, { useState } from 'react';
import "./Settings.css"
const Settings = () => {
  // State for form fields
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    theme: 'light',
    notifications: false,
  });

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save settings, e.g., send data to a server or local storage
    console.log('Settings saved:', formValues);
  };

  return (
    <div className="settings-container">
      
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>


        <div className="form-group">
          <label htmlFor="notifications">Enable Notifications:</label>
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={formValues.notifications}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
