
import {
  EDIT_STREAM
} from '../actions/types';
export default (state = {}, action) => {
    switch (action.type) {
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};