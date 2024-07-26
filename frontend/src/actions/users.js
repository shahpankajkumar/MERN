import {
    CREATE_USER,
    CLEAR_LOGIN,
    LOGIN_USER,
    FIND_USER,
    DISPLAY,
    FIND,
    UPDATE,
    UPDATE_CLEAR
  } from "./types";
  
  import UserService from "../services/UserService";
  
  export const createUser = (data) => async (dispatch) => {
    try {
      const res = await UserService.create(data);
  
      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const retrieveLogin = (data) => async (dispatch) => {
    console.log("retrieveLogin",data)
    try {
      const res = await UserService.login(data);
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };


  export const findUserData = (email) => async (dispatch) => {
    try {
      const res = await UserService.findUser(email);
      localStorage.setItem("userid",res.data?._id)
      localStorage.setItem("uname",res.data?.name)
      localStorage.setItem('role',res.data?.role);
      dispatch({
        type: FIND_USER,
        payload: res.data,
      });
      dispatch(displayEmp());
    } catch (err) {
      console.log(err);
    }
  };


  export const displayEmp = () => async (dispatch) => {
    try {
      const res = await UserService.displayEmpApi();
  
      dispatch({
        type: DISPLAY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const deleteEmp = (id) => async (dispatch) => {
    try {
      const res = await UserService.deleteApi(id);
      dispatch({
        type: FIND,
        payload: res.data,
      });
      dispatch(displayEmp());
    } catch (err) {
      console.log(err);
    }
  };

  export const updateEmp = ({data}) => async (dispatch) => {
    try {
      const res = await UserService.updateApi({data});
      dispatch({
        type: UPDATE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const findEmp = ({id}) => async (dispatch) => {
    try {
      const res = await UserService.findEmp(id);
      dispatch({
        type: FIND,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const clearUser = () => async (dispatch) => {
      dispatch({
        type: CLEAR_LOGIN,
        payload: {},
      });
   
  };


export const clearUpdate = () => async (dispatch) => {
  dispatch({
    type: UPDATE_CLEAR,
    payload: {},
  });
};