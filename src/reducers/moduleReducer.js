import {
  CREATE_MODULE,
  FETCH_MODULE,
  EDIT_MODULE,
  DELETE_MODULE,
  FETCH_MODULES
} from "../actions/types";
import _ from "lodash";
const INTIAL_STATE = {
  list: [],
  module: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MODULES:
      return { ...state, list: action.payload };
    case FETCH_MODULE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_MODULE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_MODULE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_MODULE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
