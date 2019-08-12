import {
  CREATE_USER_ACCOUNT,
  FETCH_USER_ACCOUNT,
  EDIT_USER_ACCOUNT,
  DELETE_USER_ACCOUNT,
  FETCH_USER_ACCOUNTS
} from "../actions/types";
import _ from "lodash";
const INTIAL_STATE = {
  list: [],
  user: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_ACCOUNTS:
      return { ...state, list: action.payload };
    case FETCH_USER_ACCOUNT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_USER_ACCOUNT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_USER_ACCOUNT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_USER_ACCOUNT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
