import React, { useEffect } from 'react'
import { Link,useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { createUser } from "../../actions/users";
import { useForm } from 'react-hook-form';
import './Registration.css';

const Registration = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

    const navigation = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.userReducer)

    const onSubmit = (datavalue) => {
      const {name, phone, email, password } = datavalue
      const data = {
        name:name,
        phone:phone,
        email:email,
        password:password,
      }
        dispatch(createUser(data))
    }

    useEffect(()=>{
      if(Object.keys(currentUser.user).length === 0){
        console.log("length null")
       }else{
         navigation('/login')
       }
    },[currentUser])

  return (
    <>
    <div className="Auth-form-container">
    <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Registration</h3>
        <div className="form-group mt-3">
          <label>Name</label>
          <input
            type="text"
            name='name'
            className="form-control mt-1"
            placeholder="Enter Name"
            {...register('name', { required: true })}
          />
           {errors.name && <p> Name is required</p>}
        </div>
        <div className="form-group mt-3">
          <label>Phone No</label>
          <input
            type="number"
            name="phone"
            className="form-control mt-1"
            placeholder="Enter Phone No"
            {...register('phone', { required: true, pattern: /^[0-9]+$/ })}
          />
          {errors.phone && <p> Phone number must be a number and is required</p>}
        </div>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control mt-1"
            placeholder="Enter Email"
            {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
          />
          {errors.email && <p> Invalid email and is required</p>}
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control mt-1"
            placeholder="Enter Password"
            {...register('password', { required: true })}
          />
              {errors.password && <p> Password is required</p>}
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type='submit' className="btn btn-primary" 
          >
          Registration
          </button>
        </div>
        <p className="forgot-password text-right mt-2">
        <Link to={'/login'}> Login?</Link>
        </p>
      </div>
    </form>
  </div>
</>
  )
}

export default Registration