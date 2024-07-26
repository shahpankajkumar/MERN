import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import "./Userhomepage.css";
import { useNavigate } from "react-router-dom";
import { findUserData } from "../../actions/users";
import { useSelector, useDispatch } from "react-redux";

const Userhomepage = () => {
  const navigation = useNavigate();
  const [data, setData] = useState({});

  const email = localStorage.getItem("email");
  const username = localStorage.getItem("uname");

  const dispatch = useDispatch();

  const finduser = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (email) {
      dispatch(findUserData(email));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigation("/");
    }
    setData(finduser?.find);
  }, [finduser]);

  console.log("finduser", finduser);

  return (
    <>
      <Home username={username} />
      <div className="main">
        <div className="col-md-12 mt-5">
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Name:- {data?.name}</h5>
                <p className="card-text">Email:- {data?.email}</p>
                <p className="card-text">Phone:- {data?.phone}</p>
                <p className="card-text">Role:- {data?.role}</p>
                {data?.role === "employee" && (
                <p className="card-text">Department:- {data?.department}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userhomepage;
