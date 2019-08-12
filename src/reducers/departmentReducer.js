import {
    CREATE_DEPARTMENT,
    FETCH_DEPARTMENT,
    EDIT_DEPARTMENT,
    DELETE_DEPARTMENT,
    FETCH_DEPARTMENTS
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    department:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_DEPARTMENTS:
        return { ...state, list:action.payload, };
      case FETCH_DEPARTMENT:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_DEPARTMENT:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_DEPARTMENT:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_DEPARTMENT:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  