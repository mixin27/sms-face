import {
    CREATE_COMPLAIN,
    FETCH_COMPLAIN,
    EDIT_COMPLAIN,
    DELETE_COMPLAIN,
    FETCH_COMPLAINS
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    complain:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_COMPLAINS:
        return { ...state, list:action.payload, };
      case FETCH_COMPLAIN:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_COMPLAIN:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_COMPLAIN:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_COMPLAIN:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  