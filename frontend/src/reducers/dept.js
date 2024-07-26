import {
    INSERT_DEPT,
    UPDATE_DEPT,
    FIND_DEPT,
    UPDATE_CLEAR_DEPT,
    INSERT_CLEAR_DEPT,
    DISPLAY_DEPT
  } from "../actions/types";
  
  const initialState = {
    dept: {},
    display:[],
    findDept:{},
    updateDept:{}
  }
  
  function deptReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {

      case INSERT_DEPT:
        let newDept = { ...state };
        newDept.dept = payload;
        return { ...newDept };
  
      case INSERT_CLEAR_DEPT:
        let newdeptClear = { ...state };
        newdeptClear.dept = payload;
        return { ...newdeptClear };
  
        case FIND_DEPT:
          let newFind = { ...state };
          newFind.findDept = payload;
          return { ...newFind };
  
      case DISPLAY_DEPT:
        let newDispaly = { ...state };
        newDispaly.display = payload;
        return { ...newDispaly };
  
        case UPDATE_DEPT:
          let newUpdate = { ...state };
          newUpdate.updateDept = payload;
          return { ...newUpdate };
  
        case UPDATE_CLEAR_DEPT:
          let clear = { ...state };
          clear.updateDept = payload;
          return { ...clear };
  
      default:
        return state;
    }
  };
  
  export default deptReducer;