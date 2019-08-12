import {
    CREATE_MODEL,
    FETCH_MODEL,
    EDIT_MODEL,
    DELETE_MODEL,
    FETCH_EMPLOYEES,
    FETCH_MODELS
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    model:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_MODELS:
        return { ...state, list:action.payload, };
      case FETCH_MODEL:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_MODEL:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_MODEL:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_MODEL:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  