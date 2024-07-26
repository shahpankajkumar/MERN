import {
  CREATE_USER,
  CLEAR_LOGIN,
  LOGIN_USER,
  FIND_USER,
  DISPLAY,
  FIND,
  UPDATE,
  UPDATE_CLEAR
} from "../actions/types";

const initialState = {
  user: {},
  emp: {},
  login:{},
  find:{},
  display:[],
  findEmp:{},
  update:{}
}

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:
      let newState = { ...state };
      newState.user = payload;
      return { ...newState };

      case CLEAR_LOGIN:
        let clearState = { ...state };
        clearState.login = payload;
        clearState.user = payload;
        clearState.emp = payload;
        clearState.find = payload;
        clearState.findEmp = payload;
        clearState.display = payload;
        return { ...clearState };

    case LOGIN_USER:
      let loginState = { ...state };
      loginState.login = payload;
      return { ...loginState };

    case FIND_USER:
      let newFind = { ...state };
      newFind.find = payload;
      return { ...newFind };

      case FIND:
        let newFindTask = { ...state };
        newFindTask.findEmp = payload;
        return { ...newFindTask };

    case DISPLAY:
      let newDispaly = { ...state };
      newDispaly.display = payload;
      return { ...newDispaly };

      case UPDATE:
        let newUpdateTask = { ...state };
        newUpdateTask.update = payload;
        return { ...newUpdateTask };

      case UPDATE_CLEAR:
        let newTaskClear = { ...state };
        newTaskClear.update = payload;
        return { ...newTaskClear };

    default:
      return state;
  }
};

export default userReducer;