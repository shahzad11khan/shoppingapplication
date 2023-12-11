import React from "react";
import { useNavigate } from "react-router-dom";

import "./bookings.css";
// import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState } from "react";
import axios from "axios";
// import "./LoginPage.css"; // Custom styles


const Register = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      // Send data to the server (replace 'http://localhost:5000/api/products' with your server URL and endpoint)
      const response = await axios.post(
        'http://localhost:5000/api/users', // Update the endpoint accordingly
        formData
      );

      console.log(response.data);
      nav("/login");
        formData('')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
      
  };
  return (
    <div className="bookings">
      <div className="booking__wrapper">
        <h2 className="booking__title">Add User</h2>
        <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="userType" className="form-label">
            User Type
          </label>
          <select
            className="form-select"
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="">Select User Type</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div> */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
        {/* <div className="filter__widget-wrapper">
          <div className="filter__widget-01">
            <select>
              <option value="New">New</option>
              <option value="Popular">Popular</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          <div className="filter__widget-01">
            <select>
              <option value="toyota">Toyota</option>
              <option value="bmw">Bmw</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div> */}

        {/* <div className="booking__car-list">
          {carData?.map((item) => (
            <CarItem item={item} key={item.id} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Register;
