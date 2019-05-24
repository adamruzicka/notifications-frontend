import {
    FETCH_FILTER
} from 'Store/actions/index';
import {
    successMessage,
    failureMessage,
    pendingMessage,
    initialStateFor,
    normalizeData
} from './reducerHelper';

export const normalizeFilterData = (payload) => {
    return payload.data !== null && typeof(payload.data) !== 'undefined' ? normalizeData(payload, 'filter')[payload.data.id] : {};
};

export const filterReducer = function(state = initialStateFor('filter', {}), action) {
    switch (action.type) {
        case pendingMessage(FETCH_FILTER):
            return {
                ...state,
                filter: {},
                loading: true,
                error: null
            };

        case successMessage(FETCH_FILTER):
            return {
                ...state,
                loading: false,
                error: null,
                filter: normalizeFilterData(action.payload)
            };

        case failureMessage(FETCH_FILTER):
            return {
                ...state,
                loading: false,
                error: action.payload.errors,
                filter: {}
            };

        default:
            return state;
    }
};
