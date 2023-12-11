import React, { useEffect, useState } from "react";
import { useCartContext } from "./context/cart_context";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
const nav=useNavigate();
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  const username = localStorage.getItem('username');
  if(!username){
    alert("login first please")
    nav('/')
  }

  const [formData, setFormData] = useState({
    firstName: username,
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: "",
    ccName: "",
    ccNumber: "",
    ccExpiration: "",
    ccCvv: "",
    city: "",
    phone: "",
  });
// 



// 
  const [CartItem] = useState([]); // Ensure CartItem is defined
  const status = '0'
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const cardata = cart.map((currentItem) => ({
    name: currentItem.name,
    amount: currentItem.amount,
    price: currentItem.price,
    total_price: total_price, // Assuming total_price is a variable you have defined
  }));

  const handlePayment = (e) => {
    e.preventDefault();

    const status = "0"; // You need to define or retrieve the status value

    const cartdata = { cardata, status, username };
    console.log(formData)
    if (formData.firstName === ""  || formData.email === "" || formData.address === "" ||
    formData.country === "" || formData.state === "" || formData.zip === "" || formData.ccName === "") {
  // If any of the required fields is empty, return
  console.log("fill all the fields")
  return
  // 
}
else{
// Send data to the server using fetch
fetch(`http://localhost:5000/api/orderditem`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // You may need to include additional headers (e.g., authentication token) based on your API requirements
  },
  body: JSON.stringify(cartdata),
})
  .then((response) => response.json())
  .then((responseData) => {
    // Handle the response from the server
    console.log('Response from server:', responseData);
  })
  .catch((error) => {
    // Handle errors during the API request
    console.error('Error during API request:', error);
  });


fetch(`http://localhost:5000/api/userorderitem`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // You may need to include additional headers (e.g., authentication token) based on your API requirements
  },
  body: JSON.stringify(formData),
})
  .then((response) => response.json())
  .then((responseData) => {
    // Handle the response from the server
    console.log('Response from server:', responseData);
  })
  .catch((error) => {
    // Handle errors during the API request
    console.error('Error during API request:', error);
  });

}
    
  };





  return (
    <div className="container py-5">
      <div className="row my-4">
        <div className="col-md-5 col-lg-4 order-md-last">
          <div className="card mb-4">
            <div className="card-header py-3 bg-light">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {cart.map((currentItem) => (
                  <li
                    key={currentItem.id}
                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                  >
                    <div>
                      <strong>{currentItem.name}</strong>
                      <br />
                      <span>Amount: {currentItem.amount}</span>
                      <br />
                      <span>single item Price: ${currentItem.price}</span>
                      <br />
                      <span>total price: ${total_price}</span>
                    </div>
                  </li>
                ))}

                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                  </div>
                  <span>
                    <strong></strong>
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>
        <div className="col-md-7 col-lg-8">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h4 className="mb-0">Billing address</h4>
            </div>
            <div className="card-body">
              <form className="needs-validation" noValidate>
                <div className="row g-3">
                  <div className="col-sm-6 my-1">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.firstName}
                      required
                      readOnly
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  {/* <div className="col-sm-6 my-1">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.lastName}
                      required
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div> */}

                  <div className="col-12 my-1">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      onChange={handleInputChange}
                      value={formData.email}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="col-12 my-1">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="1234 Main St"
                      onChange={handleInputChange}
                      value={formData.address}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address2" className="form-label">
                      Address 2{" "}
                      <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      name="address2"
                      placeholder="Apartment or suite"
                      onChange={handleInputChange}
                      value={formData.address2}
                    />
                  </div>

                  <div className="col-md-6 my-1">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.city}
                      required
                    />
                    <div className="invalid-feedback">
                      City is required.
                    </div>
                  </div>

                  <div className="col-md-6 my-1">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.phone}
                      required
                    />
                    <div className="invalid-feedback">
                      Phone is required.
                    </div>
                  </div>

                  <div className="col-md-5 my-1">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <br />
                    <select
                      className="form-select"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose country</option>
                      <option>Afghanistan</option>
                      <option>Albania</option>
                      <option>Algeria</option>
                      <option>Andorra</option>
                      <option>Angola</option>
                      <option>Antigua and Barbuda</option>
                      <option>Argentina</option>
                      <option>Armenia</option>
                      <option>Australia</option>
                      <option>Austria</option>
                      <option>Azerbaijan</option>
                      <option>Bahamas</option>
                      <option>Bahrain</option>
                      <option>Bangladesh</option>
                      <option>Barbados</option>
                      <option>Belarus</option>
                      <option>Belgium</option>

                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>

                  <div className="col-md-4 my-1">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <br />
                    <select className="form-select" id="state" name="state"   value={formData.city}
                      onChange={handleInputChange} required>
                      <option value="">Choose city</option>
                      <option>Karachi</option>
                      <option>Lahore</option>
                      <option>Islamabad</option>
                      <option>Faisalabad</option>
                      <option>Rawalpindi</option>
                      <option>Multan</option>
                      <option>Peshawar</option>
                      <option>Quetta</option>
                      <option>Sialkot</option>
                      <option>Gujranwala</option>
                      <option>Abbottabad</option>
                      <option>Sargodha</option>
                      <option>Bahawalpur</option>
                      <option>Mirpur (AJK)</option>
                      <option>Rawalakot (AJK)</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>

                  <div className="col-md-3 my-1">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name="zip"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.zip}
                      required
                    />
                    <div className="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Payment</h4>

                <div className="row gy-3">
                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                      Name on card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      name="ccName"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.ccName}
                      required
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                      Credit card number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      name="ccNumber"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.ccNumber}
                      required
                    />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">
                      Expiration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-expiration"
                      name="ccExpiration"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.ccExpiration}
                      required
                    />
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-cvv"
                      name="ccCvv"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.ccCvv}
                      required
                    />
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <button
                  className="w-100 btn btn-primary "
                  type="submit"
                  onClick={handlePayment}
                >
                  Continue to checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

