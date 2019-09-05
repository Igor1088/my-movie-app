import * as types from '../constants/actionTypes';

const initialState = {
    loading: false,
    movie: [],
    error: null
};

export default function (state = initialState, action) {
    switch(action.type) {
        case types.FETCH_MOVIE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.FETCH_MOVIE_SUCCESS:
            return {
                ...state,
                loading: false,
                movie: action.payload,
            }    
        case types.FETCH_MOVIE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }    
        default:
            return state;    
    }
}

export const getMovieDetails= state => state.movieDetails.movie;
export const getMovieDetailsLoading = state => state.movieDetails.loading;
export const getMovieDetailsError = state => state.movieDetails.error;