import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const nav =useNavigate()
  const [image, setImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [values, setValues] = useState({
    productName: "",
    productPrice: "",
    productStock: "",
    company: "",
    productCategory: "",
    productDescription: "",
    shippingCharges: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setIsChecked(checked);
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", values.productName);
    formData.append("productImage", image);
    formData.append("price", values.productPrice);
    formData.append("stock", values.productStock);
    formData.append("category", values.productCategory);
    formData.append("description", values.productDescription);
    formData.append("shipping", values.shippingCharges);
    formData.append("featured", isChecked);
    formData.append("company", values.company);


    console.log(formData)

    try {
      // Send data to the server (replace 'http://localhost:5000/api/products' with your server URL and endpoint)
      const response = await axios.post(
        'http://localhost:5000/api/products', // Update the endpoint accordingly
        formData
      );

      console.log(response.data);
      nav('allproducts')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
      
   

};

return (
  <div className="sell__car">
    <div className="sell__car-wrapper">
      <h2>Add Product</h2>
      <form>
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            value={values.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productName">company Name:</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            placeholder="Enter company name"
            value={values.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Product Image:</label>
          <input
            type="file"
            className="form-control"
            id="productImage"
            name="productImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            name="productPrice"
            placeholder="Enter product price"
            value={values.productPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productStock">Product Stock:</label>
          <input
            type="number"
            className="form-control"
            id="productStock"
            name="productStock"
            placeholder="Enter product stock"
            value={values.productStock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productCategory">Product Category:</label>
          <input
            type="text"
            className="form-control"
            id="productCategory"
            name="productCategory"
            placeholder="Enter product category"
            value={values.productCategory}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            className="form-control"
            id="productDescription"
            name="productDescription"
            rows="3"
            placeholder="Enter product description"
            value={values.productDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="shippingCharges">Product Shipping Charges:</label>
          <input
            type="number"
            className="form-control"
            id="shippingCharges"
            name="shippingCharges"
            placeholder="Enter shipping charges"
            value={values.shippingCharges}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="specialFeature"
            name="specialFeature"
            checked={isChecked}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="specialFeature">
            Special Feature
          </label>
        </div>
        <input
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          value="Submit"
        />
      </form>
    </div>
  </div>
);
};

export default Settings;
