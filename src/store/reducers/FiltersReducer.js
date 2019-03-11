import {
    FETCH_FILTERS
} from 'Store/actions/index';
import {
    successMessage,
    failureMessage,
    initialStateFor
} from './reducerHelper';

export const filtersReducer = function(state = initialStateFor('filters'), action) {
    switch (action.type) {
        case FETCH_FILTERS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case successMessage(FETCH_FILTERS):
            return {
                ...state,
                loading: false,
                error: null,
                filters: action.payload.data
            };

        case failureMessage(FETCH_FILTERS):
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                filters: []
            };

        default:
            return state;
    }
};
