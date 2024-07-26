import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../AddDept/AddDept.css";
import Home from "../Home/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  findEmp,
  updateEmp,
  clearUpdate,
} from "../../actions/users";
import { displayDept } from "../../actions/dept";

function Employee() {
  const navigation = useNavigate();
  const [name, setName] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [dept, setDept] = useState("");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("uname");
  const uid = localStorage.getItem("userid");
  const { id } = useParams();

  const dispatch = useDispatch();
  const emp = useSelector((state) => state.userReducer);
  const department = useSelector((state) => state.deptReducer);

  useEffect(() => {
    if (!token) {
      navigation("/");
    }
    if (Object.keys(emp.emp).length === 0) {
      console.log("length null");
    } else {
      navigation("/employeeDetails");
    }
    if (Object.keys(emp.update).length === 0) {
      console.log("length null");
    } else {
      navigation("/employeeDetails");
      dispatch(clearUpdate());
    }
    if (emp.findEmp) {
      setName(emp?.findEmp?.name);
      setPhone(emp?.findEmp?.phone);
      setEmail(emp?.findEmp?.email);
      setDept(emp?.findEmp?.department);
    }
  }, [emp]);

  useEffect(() => {
    if (id) {
      dispatch(findEmp({ id }));
    }
      dispatch(displayDept());
  }, []);

  const handleUpdate = () => {
    const data = {
      id: uid,
      uid: id,
      name: name,
      phone:phone,
      email:email,
      department:dept
    };
    dispatch(updateEmp({ data }));
  };
  return (
    <>
      <Home username={username} />
      <div>
        <div className="Auth-form-container-user">
          <form className="Auth-form-user data">
            <div className="Auth-form-content-user">
              <h3 className="Auth-form-title-user">Update Employee</h3>
              <div className="form-group mt-3">
                <label>Department: </label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Phone No</label>
                <input
                  type="number"
                  name="phone"
                  value={phone}
                  className="form-control mt-1"
                  placeholder="Enter Phone No"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="form-control mt-1"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Department Name</label>
                <select
                  className="form-control mt-1"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                >
                  <option value="">Select Department</option>
                  {department?.display?.map((dept) => (
                    <option key={dept._id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
                  <div className="d-grid gap-2 mt-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleUpdate()}
                    >
                      update
                    </button>
                  </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Employee;

