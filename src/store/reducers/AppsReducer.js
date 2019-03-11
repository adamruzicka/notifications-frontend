import {
    FETCH_APPS
} from 'Store/actions/index';
import {
    successMessage,
    failureMessage,
    initialStateFor
} from './reducerHelper';

const filterIncluded = (payload, id, type) =>
    payload.included.find(item => (item.id === id && item.type === type));

const normalizeAppData = (app) => ({
    ...app.attributes,
    id: parseInt(app.id)
});

export const normalizeAppsData = (payload) =>
    payload.data.map((app) => {
        let eventTypes = app.relationships.event_types.data.map((eventType) => {
            let additionalInfo = filterIncluded(payload, eventType.id, 'event_type');
            return additionalInfo ? { ...eventType, ...additionalInfo.attributes } : eventType;
        });
        return { ...normalizeAppData(app), event_types: eventTypes };
    });

export const appsReducer = function(state = initialStateFor('apps'), action) {
    switch (action.type) {
        case FETCH_APPS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case successMessage(FETCH_APPS):
            return {
                ...state,
                loading: false,
                error: null,
                apps: normalizeAppsData(action.payload)
            };

        case failureMessage(FETCH_APPS):
            return {
                ...state,
                loading: false,
                error: action.payload.message,
                apps: []
            };

        default:
            return state;
    }
};
