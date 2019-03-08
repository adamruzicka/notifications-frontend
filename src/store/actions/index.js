import { create, destroy, get, update } from '../../Utilities/notificationsBackendAPI';

export const FETCH_FILTERS   = 'FETCH_FILTERS';
export const FETCH_ENDPOINTS = 'FETCH_ENDPOINTS';
export const FETCH_ENDPOINT  = 'FETCH_ENDPOINT';
export const SUBMIT_ENDPOINT = 'SUBMIT_ENDPOINT';
export const DELETE_ENDPOINT = 'DELETE_ENDPOINT';
export const NEW_ENDPOINT    = 'NEW_ENDPOINT';
export const FETCH_APPS      = 'FETCH_APPS';

export const fetchEndpoints = () => ({
    type: FETCH_ENDPOINTS,
    payload: get('/endpoints'),
    meta: {
        notifications: {
            rejected: {
                variant: 'danger',
                title: 'Failed to load endpoints'
            }
        }
    }
});

export const fetchEndpoint = (id) => ({
    type: FETCH_ENDPOINT,
    payload: get(`/endpoints/${ id }`),
    meta: {
        notifications: {
            rejected: {
                variant: 'danger',
                title: `Failed to load endpoint ${ id }`
            }
        }
    }
});

export const createEndpoint = (data) => {
    return {
        type: SUBMIT_ENDPOINT,
        payload: create('/endpoints', { endpoint: data }),
        meta: {
            data,
            notifications: {
                rejected: {
                    variant: 'danger',
                    title: `Failed to create endpoint ${ data.name }`
                },
                fulfilled: {
                    variant: 'success',
                    title: `Endpoint ${ data.name } created`
                }
            }
        }
    };
};

export const updateEndpoint = (id, data) => {
    return {
        type: SUBMIT_ENDPOINT,
        payload: update(`/endpoints/${ id }`, { endpoint: data }),
        meta: {
            data,
            notifications: {
                rejected: {
                    variant: 'danger',
                    title: `Failed to update endpoint ${ data.name }`
                },
                fulfilled: {
                    variant: 'success',
                    title: `Endpoint ${ data.name } updated`
                }
            }
        }
    };
};

export const toggleEndpoint = (id, on) => {
    return {
        type: SUBMIT_ENDPOINT,
        payload: update(`/endpoints/${ id }`, { endpoint: { active: on }}),
        meta: {
            notifications: {
                rejected: {
                    variant: 'danger',
                    title: `Failed to toggle endpoint ${ id }`
                }
            }
        }
    };
};

export const deleteEndpoint = (id, name) => ({
    type: DELETE_ENDPOINT,
    payload: destroy(`/endpoints/${ id }`).then(() => ({ id })),
    meta: {
        notifications: {
            rejected: {
                variant: 'danger',
                title: `Failed to delete endpoint ${ name }`
            },
            fulfilled: {
                variant: 'success',
                title: `Endpoint ${ name } deleted`
            }
        }
    }
});

export const newEndpoint = () => ({
    type: NEW_ENDPOINT
});

export const fetchFilters = (endpointId) => ({
    type: FETCH_FILTERS,
    payload: get(`/endpoints/${ endpointId }/filters`),
    meta: {
        notifications: {
            rejected: {
                variant: 'danger',
                title: 'Failed to load filters'
            }
        }
    }
});

export const fetchApps = () => ({
    type: FETCH_APPS,
    payload: get('/apps'),
    meta: {
        notifications: {
            rejected: {
                variant: 'danger',
                title: 'Failed to load apps'
            }
        }
    }
});
