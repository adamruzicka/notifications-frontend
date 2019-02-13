import {
    FETCH_FILTERS,
    FETCH_FILTERS_SUCCESS,
    FETCH_FILTERS_FAILURE,
    FETCH_ENDPOINTS,
    FETCH_ENDPOINTS_SUCCESS,
    FETCH_ENDPOINTS_FAILURE,
    FETCH_ENDPOINT_SUCCESS
} from '../actions/index';

const defaultIntialState = {
    loading: false,
    error: null
};

const initialStateFor = function (reducerName) {
    let initState = Object.assign({}, defaultIntialState);
    initState[reducerName] = [];
    return initState;
};

export const endpointReducer = function(state = initialStateFor('endpoints'), action) {
    switch (action.type) {
        case FETCH_ENDPOINTS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_ENDPOINTS_SUCCESS:
            return {
                ...state,
                loading: false,
                endpoints: action.payload.endpoints
            };

        case FETCH_ENDPOINT_SUCCESS:
            return {
                ...state,
                loading: false,
                endpoint: action.payload.endpoint
            };

        case FETCH_ENDPOINTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                endpoints: []
            };

        default:
            return state;
    }
};

export const filterReducer = function(state = initialStateFor('filters'), action) {
    switch (action.type) {
        case FETCH_FILTERS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_FILTERS_SUCCESS:
            return {
                ...state,
                loading: false,
                filters: action.payload.filters
            };

        case FETCH_FILTERS_FAILURE:
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
