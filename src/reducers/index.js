import { combineReducers } from "redux";
// import { reducer as formReducer } from 'redux-form';
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";
import locale from "./localeReducer";
import positionReducer from "./postionReducer";
import loadingReducer from "./loadingReducer";
import employeeReducer from "./employeeReducer";
import departmentReducer from "./departmentReducer";
import machineReducer from "./machineReducer";
import complainReducer from "./complainReducer";
import modelReducer from "./modelReducer";
import scheduleReducer from "./scheduleReducer";
import serviceManReducer from "./serviceManReducer";
import dailyReportReducer from "./dailyReportReducer";
import userReducer from "./userReducer";
import moduleReducer from "./moduleReducer";
import roleReducer from "./roleReducer";

export default combineReducers({
  auth: authReducer,
  streams: streamReducer,
  employee: employeeReducer,
  position: positionReducer,
  department: departmentReducer,
  model: modelReducer,
  machine: machineReducer,
  complain: complainReducer,
  schedule: scheduleReducer,
  serviceMen: serviceManReducer,
  dailyReport: dailyReportReducer,
  user: userReducer,
  module: moduleReducer,
  role: roleReducer,
  locale,
  loading: loadingReducer
});
