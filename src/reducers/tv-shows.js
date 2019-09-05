import * as types from '../constants/actionTypes';

const initialState = {
    loading: false,
    tvShows: [],
    error: null
};

export default function (state = initialState, action) {
    switch(action.type) {
        case types.FETCH_SHOWS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.FETCH_SHOWS_SUCCESS:
            return {
                ...state,
                loading: false,
                tvShows: action.payload,
            }    
        case types.FETCH_SHOWS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }    
        default:
            return state;    
    }
}

export const getTvShows= state => state.tvShows.tvShows;
export const getTvShowsLoading = state => state.tvShows.loading;
export const getTvShowsError = state => state.tvShows.error;