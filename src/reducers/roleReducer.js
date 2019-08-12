import {
  CREATE_ROLE,
  FETCH_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  FETCH_ROLES
} from "../actions/types";
import _ from "lodash";
const INTIAL_STATE = {
  list: [],
  role: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ROLES:
      return { ...state, list: action.payload };
    case FETCH_ROLE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ROLE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ROLE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ROLE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
