import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import "../UserHomePage/Userhomepage.css";
import { Link, useNavigate } from "react-router-dom";
import { displayEmp, deleteEmp } from "../../actions/users";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const EmployeeDetails = () => {
  const navigation = useNavigate();
  const [data, setData] = useState([]);

  const username = localStorage.getItem("uname");
  const uid = localStorage.getItem("userid");
  const finduser = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigation("/");
    }
    setData(finduser?.display);
  }, [finduser, navigation]);

  useEffect(() => {
    dispatch(displayEmp());
  }, [dispatch]);

  const handleDelete = (id) => {
    let data = {
      id: uid,
      uid: id,
    };
    dispatch(deleteEmp({ data }));
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 300,
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 210,
      editable: true,
    },
    {
      field: "department",
      headerName: "Department",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      style: { textAlign: "center" },
      renderCell: (params) => (
        <>
          <Link to={`/employee/${params.row._id}`} style={{ textDecoration: "none" }}>
            <EditIcon /> 
          </Link>
          <DeleteIcon
            style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Home username={username} />
      <div className="container main">
        <DataGrid
          style={{ height: "400px", width: "100%" }}
          rows={data && data.map(row => ({ ...row, id: row._id }))} 
          columns={columns}
          pageSize={5}
        />
      </div>
    </>
  );
};

export default EmployeeDetails;

