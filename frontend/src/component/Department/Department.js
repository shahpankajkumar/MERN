import React,{useState,useEffect} from 'react'
import Home from '../Home/Home'
import '../UserHomePage/Userhomepage.css'
import { Link, useNavigate } from 'react-router-dom'
import { deleteDept, displayDept } from "../../actions/dept";
import { useSelector,useDispatch } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const Userhomepage = () => {
  
    const navigation = useNavigate();
    const [data,setData] = useState([]);

    const username = localStorage.getItem('uname');
    const uid = localStorage.getItem('userid');

    const dispatch = useDispatch();

    const dept = useSelector(state => state.deptReducer)

    useEffect(() => {
      const token = localStorage.getItem('token');
      if(!token){
        navigation('/')
      }
       setData(dept?.display)
    },[dept]);

    useEffect(()=> {
        dispatch(displayDept());
    },[])


    const handleDelete = (id) => {
        let data = {
            id:uid,
            uid:id
        }
      dispatch(deleteDept({data}))
    }

  const userPage = () => {
    navigation('/dept')
  }

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
      field: "actions",
      headerName: "Actions",
      width: 180,
      style: { textAlign: "center" },
      renderCell: (params) => (
        <>
          <Link to={`/dept/${params.row._id}`} style={{ textDecoration: "none" }}>
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
          style={{ height: "400px", width: "800px" }}
          rows={data && data.map(row => ({ ...row, id: row._id }))} 
          columns={columns}
          pageSize={5}
        />
      </div>
    </>
  )
}

export default Userhomepage