import {
    CREATE_POSITION,
    FETCH_POSITION,
    EDIT_POSITION,
    DELETE_POSITION,
    FETCH_POSITIONS
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    position:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_POSITIONS:
        return { ...state, list:action.payload, };
      case FETCH_POSITION:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_POSITION:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_POSITION:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_POSITION:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  