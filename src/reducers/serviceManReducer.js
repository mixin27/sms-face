import {
    CREATE_SERVICE_MAN,
    FETCH_SERVICE_MAN,
    EDIT_SERVICE_MAN,
    DELETE_SERCICE_MAN,
    FETCH_SERVICE_MEN
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    serviceMen:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_SERVICE_MEN:
        return { ...state, list:action.payload, };
      case FETCH_SERVICE_MAN:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_SERVICE_MAN:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_SERVICE_MAN:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_SERCICE_MAN:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  