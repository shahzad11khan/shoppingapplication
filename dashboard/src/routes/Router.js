import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import SellCar from "../pages/SellCar";
import Settings from "../pages/Settings";
import Allproducts from "../pages/Allproducts";
import Allorderdproducts from "../pages/Allorderdproducts";
import Updateproduct from "../pages/updateproduct";
import Login from "../pages/login";
import Userinfo from "../pages/userinfo";





const Router = () => {
  return (
    <Routes>
       
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adduser" element={<Bookings />} />
      <Route path="/allusers" element={<SellCar />} />
      <Route path="/addproduct" element={<Settings />} />
      <Route path="/allproducts" element={<Allproducts />} />
      <Route path="/orderdproducts" element={<Allorderdproducts />} />
      <Route path="/updateproduct/:id" element={<Updateproduct />} />
      <Route path="/userinfo" element={<Userinfo />} />




    </Routes>
  );
};

export default Router;
