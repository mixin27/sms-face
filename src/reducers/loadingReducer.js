import { LOADING } from '../actions/types';

const INTIAL_STATE = {
    isloaded: false,
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case LOADING:
            return { 
                ...state, 
                isloaded: action.isloaded   
            };

        default:
            return state;
    }
};