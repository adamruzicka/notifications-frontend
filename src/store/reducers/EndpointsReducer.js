import {
    FETCH_ENDPOINTS,
    FETCH_ENDPOINT,
    DELETE_ENDPOINT,
    SUBMIT_ENDPOINT,
    NEW_ENDPOINT
} from 'Store/actions/index';
import {
    successMessage,
    failureMessage,
    pendingMessage,
    initialStateFor,
    normalizePayload
} from './reducerHelper';

export const normalizeEndpointData = (payload) =>
    normalizePayload(payload).endpoint;

const updateEndpointInEndpoints = (state, endpoint) => {
    const normalizedEndpoint = Object.values(endpoint.endpoint)[0];
    let updatedEndpoint = {};
    updatedEndpoint[normalizedEndpoint.id] = normalizedEndpoint;
    return {
        ...state,
        endpoint: normalizedEndpoint,
        endpoints: Object.assign(state.endpoints, updatedEndpoint)
    };
};

export const endpointsReducer = function(state = initialStateFor('endpoints', {}), action) {
    switch (action.type) {
        case pendingMessage(FETCH_ENDPOINTS):
            return {
                ...state,
                loading: true,
                error: null
            };

        case successMessage(FETCH_ENDPOINTS):
            return {
                ...state,
                loading: false,
                endpoints: normalizeEndpointData(action.payload),
                total: action.payload.meta.total
            };

        case failureMessage(FETCH_ENDPOINTS):
            return {
                ...state,
                loading: false,
                error: action.payload.message,
                endpoints: {}
            };

        case pendingMessage(FETCH_ENDPOINT):
            return {
                ...state,
                loading: true,
                error: null
            };

        case successMessage(FETCH_ENDPOINT):
            return {
                ...state,
                error: null,
                loading: false,
                endpoint: normalizeEndpointData(action.payload)
            };

        case failureMessage(FETCH_ENDPOINT):
            return {
                ...state,
                loading: false,
                error: action.payload.message
            };

        case failureMessage(DELETE_ENDPOINT):
            return {
                ...state,
                error: action.payload.message
            };

        case successMessage(DELETE_ENDPOINT):
            return {
                ...state,
                endpoints: state.endpoints.filter((item) => item.id !== action.payload.id)
            };

        case pendingMessage(SUBMIT_ENDPOINT):
            return {
                ...state,
                submitting: true
            };

        case successMessage(SUBMIT_ENDPOINT):
            return {
                ...state,
                ...updateEndpointInEndpoints(state, normalizePayload(action.payload)),
                submitting: false,
                message: 'Endpoint saved'
            };

        case failureMessage(SUBMIT_ENDPOINT):
            return {
                ...state,
                submitting: false,
                endpoint: action.meta.data,
                error: action.payload.message
            };

        case NEW_ENDPOINT:
            return {
                ...state,
                endpoint: null
            };

        default:
            return state;
    }
};
