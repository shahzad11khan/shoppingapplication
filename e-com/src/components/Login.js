import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.css"; // Custom styles

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(()=>{
    const token = localStorage.getItem('token')
    const userid = localStorage.getItem('userId')
    if(token || userid){
     nav('/login')
    }
  },[])
  const handleLogin = async (e) => {
    e.preventDefault();

    // Assuming you have a backend API endpoint for authentication
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
        // console.log(response.json())
        const { status, message } = await response.json();

      if (status === 200) {
        // Access the token and user ID directly from the message
        const { token, userId,userType,username } = message;

        // Display the token and user ID (you might want to store them in state or elsewhere)
        console.log("Token:", token);
        console.log("User ID:", userId);
        console.log("User type:", userType);
        console.log("User usename:", username);



        const localstoragefortoken= localStorage.setItem('token',token)
        const localstorageforusename= localStorage.setItem('username',username)
        const localstorageforuserid= localStorage.setItem('userId',userId)

        // Successfully logged in, you might want to redirect or do something else
        setEmail('')
        setPassword('')
        nav("/");
        // Successfully logged in, you might want to redirect or do something else
        // nav("/dashboard");
        // const { token } = await response.json();
        // console.log(token)

      } else {
        // Handle authentication error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
