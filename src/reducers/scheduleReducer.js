import {
    CREATE_SCHEDULE,
    FETCH_SCHEDULE,
    EDIT_SCHEDULE,
    DELETE_SCHEDULE,
    FETCH_SCHEDULES
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    schedule:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_SCHEDULES:
        return { ...state, list:action.payload, };
      case FETCH_SCHEDULE:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_SCHEDULE:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_SCHEDULE:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_SCHEDULE:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  