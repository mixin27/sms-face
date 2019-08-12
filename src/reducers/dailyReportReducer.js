import {
    CREATE_DAILY_REPORT,
    FETCH_DAILY_REPORT,
    EDIT_DAILY_REPORT,
    DELETE_DAILY_REPORT,
    FETCH_DAILY_REPORTS
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    dailyReport:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_DAILY_REPORTS:
        return { ...state, list:action.payload, };
      case FETCH_DAILY_REPORT:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_DAILY_REPORT:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_DAILY_REPORT:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_DAILY_REPORT:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  