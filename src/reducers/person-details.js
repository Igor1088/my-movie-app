import * as types from '../constants/actionTypes';

const initialState = {
    loading: false,
    person: [],
    error: null
};

export default function (state = initialState, action) {
    switch(action.type) {
        case types.FETCH_PERSON_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.FETCH_PERSON_SUCCESS:
            return {
                ...state,
                loading: false,
                person: action.payload,
            }    
        case types.FETCH_PERSON_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }    
        default:
            return state;    
    }
}

export const getPersonDetails= state => state.personDetails.person;
export const getPersonDetailsLoading = state => state.personDetails.loading;
export const getPersonDetailsError = state => state.personDetails.error;