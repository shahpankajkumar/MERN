import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./component/Login/Login";
import Registration from './component/Registration/Registration';
import Userhomepage from "./component/UserHomePage/Userhomepage";
import AddDept from "./component/AddDept/AddDept";
import EmployeeDetails from "./component/EmployeeDetails/EmployeeDetails";
import Department from "./component/Department/Department";
import Employee from "./component/EmployeeDetails/Employee";

function PrivateRoute({ children }) {
  const location = useLocation();
  const role = localStorage.getItem('role');

  if (role !== 'manager') {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

function App() {
  return (
    <div className="App">
     <Routes>
      <Route exact path="/" element={<Userhomepage/>} />
      <Route exact path="/userhome" element={<Userhomepage/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/registration" element={<Registration/>} />
      <Route exact path="/dept" element={<PrivateRoute><AddDept/></PrivateRoute>} />
      <Route exact path="/dept/:id" element={<PrivateRoute><AddDept/></PrivateRoute>} />
      <Route exact path="/employeeDetails" element={<PrivateRoute><EmployeeDetails/></PrivateRoute>} />
      <Route exact path="/department" element={<PrivateRoute><Department/></PrivateRoute>} />
      <Route exact path="/employee" element={<PrivateRoute><Employee/></PrivateRoute>} />
      <Route exact path="/employee/:id" element={<PrivateRoute><Employee/></PrivateRoute>} />
     </Routes>
    </div>
  );
}

export default App;

