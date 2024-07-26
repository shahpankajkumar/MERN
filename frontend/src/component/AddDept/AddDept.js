import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import './AddDept.css';
import Home from '../Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import {
  insertDept,
  findDept,
  clear,
  updateDept,
  clearUpdate,
} from "../../actions/dept";

function AddDept() {

  const navigation = useNavigate();
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('uname');
  const uid = localStorage.getItem('userid');
  const { id } = useParams()

  const dispatch = useDispatch();
  const dept = useSelector(state => state.deptReducer)

  const handleSubmit = () => {
    const data = {
      id: uid,
      name: name
    };
    dispatch(insertDept(data))
  }
  useEffect(() => {
    if (!token) {
      navigation('/')
    }
    if (Object.keys(dept.dept).length === 0) {
      console.log("length null")
    } else {
      navigation('/department')
      dispatch(clear())
    }
    if (Object.keys(dept.updateDept).length === 0) {
      console.log("length null")
    } else {
      navigation('/department')
      dispatch(clearUpdate())
    }
    if(dept.findDept){
      setName(dept?.findDept?.name)
    }
  }, [dept])


  useEffect(() => {
    if(id){
      dispatch(findDept({ id }))
    }
  }, []);


  const handleUpdate = () => {
    const data = {
      id: uid,
      uid: id,
      name: name,
    };
    dispatch(updateDept({ data }))
  }

  return (
    <>
      <Home username={username} />
      <div>
        <div className="Auth-form-container-user">
          <form className="Auth-form-user data">
            <div className="Auth-form-content-user">
              <h3 className="Auth-form-title-user">{!id ? "Insert Department" : "Update Department"} </h3>
              <div className="form-group mt-3">
                <label>Department: </label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter Department Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {!id ? <><div className="d-grid gap-2 mt-3">
                <button type='button' className="btn btn-primary"
                  onClick={() => handleSubmit()}
                >
                  Insert
                </button>
              </div></> : <><div className="d-grid gap-2 mt-3">
                <button type='button' className="btn btn-primary"
                  onClick={() => handleUpdate()}
                >
                  update
                </button>
              </div></>}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddDept