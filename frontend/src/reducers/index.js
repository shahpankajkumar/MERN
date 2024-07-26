import {combineReducers} from 'redux'
import userReducer from './user'
import deptReducer from './dept'

export default combineReducers({
    userReducer,
    deptReducer,
})