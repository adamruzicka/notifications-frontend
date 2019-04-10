import ApiClient from 'Utilities/notificationsBackendAPI';

export const FETCH_FILTER    = 'FETCH_FILTER';
export const FETCH_ENDPOINTS = 'FETCH_ENDPOINTS';
export const FETCH_ENDPOINT  = 'FETCH_ENDPOINT';
export const SUBMIT_ENDPOINT = 'SUBMIT_ENDPOINT';
export const DELETE_ENDPOINT = 'DELETE_ENDPOINT';
export const NEW_ENDPOINT    = 'NEW_ENDPOINT';
export const TEST_ENDPOINT   = 'TEST_ENDPOINT';
export const FETCH_APPS      = 'FETCH_APPS';

export const fetchEndpoints = (page, perPage) => {
    let query = [];
    if (page) {
        query.push(`page=${ page }`);
    }

    if (perPage) {
        query.push(`per_page=${ perPage }`);
    }

    return {
        type: FETCH_ENDPOINTS,
        payload: ApiClient.get(`/endpoints?${ query.join('&') }`),
        meta: {
            notifications: {
                rejected: {
                    variant: 'danger',
                    title: 'Failed to load endpoints'
                }
            }
        }
    };
};

export const fetchEndpoint = (id) => ({
    type: FETCH_ENDPOINT,
    payload: ApiClient.get(`/endpoints/${ id }`),
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
        payload: ApiClient.create('/endpoints', { endpoint: data }),
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
        payload: ApiClient.update(`/endpoints/${ id }`, { endpoint: data }),
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
        payload: ApiClient.update(`/endpoints/${ id }`, { endpoint: { active: on }}),
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
    payload: ApiClient.destroy(`/endpoints/${ id }`).then(() => ({ id })),
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

export const testEndpoint = (endpointId) => ({
    type: TEST_ENDPOINT,
    payload: ApiClient.create(`/endpoints/${ endpointId }/test`, {}),
    meta: {
        notifications: {
            rejected: {
                variant: 'warning',
                title: 'Test event delivery failed'
            },
            fulfilled: {
                variant: 'success',
                title: 'Test event delivery successful'
            }
        }
    }
});

export const fetchFilter = (endpointId) => ({
    type: FETCH_FILTER,
    payload: ApiClient.get(`/endpoints/${ endpointId }/filter`),
    meta: {
        notifications: {
            rejected: {
                variant: 'danger',
                title: 'Failed to load filter'
            }
        }
    }
});

export const fetchApps = () => ({
    type: FETCH_APPS,
    payload: ApiClient.get('/apps'),
    meta: {
        notifications: {
            rejected: {
                variant: 'danger',
                title: 'Failed to load apps'
            }
        }
    }
});
