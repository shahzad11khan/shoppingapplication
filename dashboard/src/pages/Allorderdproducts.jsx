import React, { useEffect, useState } from 'react'


const Allorderdproducts = () => {
  const [apiData, setApiData] = useState([]);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orderditem/${id}`, {
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
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orderditem');
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setApiData(data);
      // handleDelete();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const Approvehandle = async (itemId) => {
    try {
      // Send a PUT request to update the 'approve' field
      const response = await fetch(`http://localhost:5000/api/orderditem/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If the update is successful, fetch the updated order items
        fetchData();
      } else {
        console.error('Error updating approval status');
      }
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="sell__car">
    <div className="sell__car-wrapper">
      {/* <h2 className="sell__car-title">All Orderd Products</h2> */}
      <h2>Orderd Products</h2>
  <table class="table">
    <thead>
      <tr>
        <th>S.no</th>
        <th>Customer Name</th>
        <th>Product name</th>
        <th>Product Price</th>
        <th>Product Quantity</th>
        <th>Total Price</th>
        <th>Approve / Not Approve </th>
        <th>Approve / Delete</th>
      </tr>
    </thead>
    <tbody>
    {apiData.map((item, index) => (
      <tr>
        <td>{index+1}</td>
        <td>{item.username}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.amount}</td>
        <td>{item.totalprice}</td>
        <td>{item.approve === "0" ? "Not Approve" : "Approve" }</td>
        <td><button class="btn btn-primary" onClick={() => Approvehandle(item._id)}>Approve</button>  <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button></td>
      </tr>
    ))}
      </tbody>
      </table>
    </div>
  </div>
  )
}

export default Allorderdproducts
