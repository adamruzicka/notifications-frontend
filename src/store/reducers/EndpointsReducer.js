import _ from 'lodash';
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
    normalizePayload,
    normalizeData,
    sortData
} from './reducerHelper';

export const normalizeEndpointData = (payload, endpoint, sortBy) =>
    normalizeData(payload, 'endpoint', endpoint, sortBy);

const updateEndpointInEndpoints = (state, endpoint) => {
    const normalizedEndpoint = Object.values(endpoint.endpoint)[0];
    const endpointKey = _.findKey(state.endpoints, (item) => item.id === normalizedEndpoint.id);
    let updatedEndpoint = { [endpointKey]: normalizedEndpoint };
    return {
        ...state,
        endpoint: normalizedEndpoint,
        endpoints: Object.assign(state.endpoints, updatedEndpoint)
    };
};

const deleteEndpointInCollectionObject = (object, id) => {
    const key = _.findKey(object, (item) => item.id === id);
    const { [key]: removed, ...remaining } = object;
    return { remaining, removed };
};

const handleFetchEndpointsSuccess = (state, action) => {
    let normalizedData = normalizeEndpointData(action.payload, action.meta.endpoint, action.meta.sortBy);
    if (action.meta.partial) {
        const data = Object.values(normalizedData)[0];
        normalizedData = sortData({ ...state.endpoints, new: data }, action.meta.sortBy);
    }

    return {
        ...state,
        loading: false,
        endpoints: normalizedData,
        total: action.payload.meta.total
    };
};

export const endpointsReducer = function(state = initialStateFor('endpoints', {}), action) {
    switch (action.type) {
        case pendingMessage(FETCH_ENDPOINTS):
            return {
                ...state,
                loading: !action.meta.partial,
                error: null
            };

        case successMessage(FETCH_ENDPOINTS):
            return handleFetchEndpointsSuccess(state, action);

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
                endpoints: deleteEndpointInCollectionObject(state.endpoints, action.payload.id).remaining,
                total: state.total - 1
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
                errors: action.payload,
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
