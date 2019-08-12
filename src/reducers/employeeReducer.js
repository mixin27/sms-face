import {
    CREATE_EMPLOYEE,
    FETCH_EMPLOYEE,
    EDIT_EMPLOYEE,
    DELETE_EMPLOYEE,
    FETCH_EMPLOYEES
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    employee:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_EMPLOYEES:
        return { ...state, list:action.payload, };
      case FETCH_EMPLOYEE:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_EMPLOYEE:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_EMPLOYEE:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_EMPLOYEE:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  