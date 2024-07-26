import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { retrieveLogin,clearUser } from "../../actions/users";
import './Login.css'
const Login = () => {

  const navigation = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const currentUserlogin = useSelector(state => state.userReducer)

  const onSubmit = (data) => {
    dispatch(retrieveLogin(data))
  }

  useEffect(()=>{
    if(Object.keys(currentUserlogin.login).length === 0){
      console.log("length null")
     }else{
      navigation('/userhome')
     }
  },[currentUserlogin])

  const navigate = () => {
    navigation('/registration')
    dispatch(clearUser())
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
            />
            {errors.email && <p>Email is required and must be a valid email address</p>}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              {...register('password', { required: true, minLength: 2, maxLength: 20 })}
            />
            {errors.password && <p>Password is required and must be between 2 and 20 characters</p>}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <span style={{cursor:"pointer",color:"blue",textDecoration:"underline"}} onClick={()=>navigate()}> Registaration?</span>
          </p>
        </div>
      </form>
    </div>
  )
}
export default Login;
