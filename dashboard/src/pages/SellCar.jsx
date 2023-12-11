import React, { useEffect, useState } from "react";
import "../styles/sell-car.css";


const SellCar = () => {
  // 
// State to store the data from the API
const [apiData, setApiData] = useState([]);
const fetchData = async () => {
  try {
    // Replace 'your-api-endpoint' with the actual endpoint you want to fetch data from
    const response = await fetch('http://localhost:5000/api/users');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data)
    setApiData(data);
    handleDelete();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// deleterecord
const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Update the state to reflect the deletion
    setApiData((prevData) => prevData.filter((item) => item._id !== id));
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};
useEffect(() => {
  fetchData();
}, []); // The empty dependency array means this effect will run once when the component mounts


  // 

  return (
    <div className="sell__car">
      <div className="sell__car-wrapper">
        {/* <h2 className="sell__car-title">All Users</h2> */}
        <h2>All Users</h2>
        <table class="table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Username</th>
              <th>Email</th>
              <th>UserType</th>
              <th>Edit / Delete</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
          {apiData.map((item,index) => (
            <tr>
              <td>{index+1}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.userType}</td>
              <td><button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button></td>
              {/* <td></td> */}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellCar;
