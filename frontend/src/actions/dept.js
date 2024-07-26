import {
    INSERT_DEPT,
    UPDATE_DEPT,
    FIND_DEPT,
    UPDATE_CLEAR_DEPT,
    INSERT_CLEAR_DEPT,
    DISPLAY_DEPT
  } from "./types";
  
  import UserService from "../services/DeptService";
  
  export const insertDept = (data) => async (dispatch) => {
    try {
      const res = await UserService.addDept(data);
      dispatch({
        type: INSERT_DEPT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };


  export const displayDept = () => async (dispatch) => {
    try {
      const res = await UserService.display();
  
      dispatch({
        type: DISPLAY_DEPT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const findDept = ({id}) => async (dispatch) => {
    try {
      const res = await UserService.findDept(id);
      dispatch({
        type: FIND_DEPT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const deleteDept = ({data}) => async (dispatch) => {
    try {
      const res = await UserService.deleteDept({data});
      dispatch({
        type: FIND_DEPT,
        payload: res.data,
      });
      dispatch(displayDept());
    } catch (err) {
      console.log(err);
    }
  };

  export const updateDept = ({id,data}) => async (dispatch) => {
    try {
      const res = await UserService.UpdateApi({id,data});
      dispatch({
        type: UPDATE_DEPT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const clear = () => async (dispatch) => {
    dispatch({
      type: INSERT_CLEAR_DEPT,
      payload: {},
    });
};

export const clearUpdate = () => async (dispatch) => {
  dispatch({
    type: UPDATE_CLEAR_DEPT,
    payload: {},
  });
};