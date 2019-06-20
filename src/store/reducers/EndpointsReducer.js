import _ from 'lodash';
import {
    FETCH_ENDPOINTS,
    FETCH_ENDPOINT,
    DELETE_ENDPOINT,
    SUBMIT_ENDPOINT,
    TEST_ENDPOINT,
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

const setEndpointStatus = (state, id, status) => {
    const endpointKey = _.findKey(state.endpoints, (item) => item.id === id);
    const endpoint = state.endpoints[endpointKey];
    const timestamp = (new Date(Date.now())).toISOString();
    const updates = { lastDeliveryStatus: status, lastDeliveryTime: timestamp };
    if (status === 'failure' && endpoint.status !== 'failure') {
        updates.firstFailureTime = timestamp;
    }

    return {
        ...state,
        endpoints: Object.assign(state.endpoints, { [endpointKey]: { ...endpoint, ...updates }})
    };
};

const deleteEndpointInCollectionObject = (object, id) => {
    const key = _.findKey(object, (item) => item.id === id);
    const { [key]: removed, ...remaining } = object;
    return { remaining, removed };
};

const handleFetchEndpointsSuccess = (state, action) => {
    const total = action.payload.meta.total ? action.payload.meta.total : action.payload.data.length;
    if (total === 0 && !action.meta.search) {
        return { ...state, loading: false, total };
    }

    let normalizedData = normalizeEndpointData(action.payload, action.meta.endpoint, action.meta.sortBy);
    if (action.meta.partial) {
        const data = Object.values(normalizedData)[0];
        normalizedData = sortData({ ...state.endpoints, new: data }, action.meta.sortBy);
    }

    return {
        ...state,
        loading: false,
        endpoints: normalizedData,
        total,
        search: action.meta.search
    };
};

export const endpointsReducer = function(state = initialStateFor('endpoints', {}), action) {
    switch (action.type) {
        case pendingMessage(FETCH_ENDPOINTS):
            return {
                ...state,
                loading: !action.meta.partial && !action.meta.search,
                error: null
            };

        case successMessage(FETCH_ENDPOINTS):
            return handleFetchEndpointsSuccess(state, action);

        case failureMessage(FETCH_ENDPOINTS):
            return {
                ...state,
                loading: false,
                endpoints: {},
                error: true
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
                error: true
            };

        case failureMessage(DELETE_ENDPOINT):
            return {
                ...state,
                error: true
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
                error: true,
                errors: action.payload.errors
            };

        case NEW_ENDPOINT:
            return {
                ...state,
                endpoint: null
            };

        case failureMessage(TEST_ENDPOINT):
            return setEndpointStatus(state, action.meta.endpointId, 'failure');

        case successMessage(TEST_ENDPOINT):
            return setEndpointStatus(state, action.meta.endpointId, 'success');

        default:
            return state;
    }
};
