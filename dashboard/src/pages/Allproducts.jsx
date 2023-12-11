import React, { useEffect, useState } from 'react';

const Allproducts = () => {
  // State to store the data from the API
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.products);
      setApiData(data);
      handleDelete();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
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
        <h2>All Products</h2>
        <table className="table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Product Price</th>
              <th>Product Stock</th>
              <th>Product Description</th>
              <th>Product Feature</th>
              <th>Product Category</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                {/* Fix the property name for the product image  */}
                <td><img src={`http://localhost:5000/images/${item.image}`} alt={item.image} style={{ height: '50px', width: '50px' }} /></td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>{item.description}</td>
                <td>{item.featured ? "true" : "false"}</td>
                <td>{item.category}</td>
                <td>
                  <a href={`/updateproduct/${item._id}`} className="btn btn-primary">Edit</a>{' '}
                  {/* <button className="btn btn-danger">Delete</button> */}
                  <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allproducts;
