import React, { useEffect, useState } from 'react';

const UserInfo = () => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/userorderitem');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setApiData(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/userorderitem/${id}`, {
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
  }, []);

  return (
    <div className="sell__car">
      <div className="sell__car-wrapper">
        <h2>Customers</h2>
        <table className="table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Customer Phone</th>
              <th>Customer Address</th>
              <th>Customer CradedCard Name</th>
              <th>Customer CradedCard Number</th>
              <th>Customer County</th>
              <th>Customer City</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((item, index) => (
             <tr>
                <td>{index+1}</td>
                <td>{item.firstName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.ccName}</td>
                <td>{item.ccNumber}</td>
                <td>{item.country}</td>
                <td>{item.city}</td>

                <td> <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfo;
