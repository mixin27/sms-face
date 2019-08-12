import {
    CREATE_MACHINE,
    FETCH_MACHINE,
    EDIT_MACHINE,
    DELETE_MACHINE,
    FETCH_MACHINES
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    machine:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_MACHINES:
        return { ...state, list:action.payload, };
      case FETCH_MACHINE:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_MACHINE:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_MACHINE:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_MACHINE:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };