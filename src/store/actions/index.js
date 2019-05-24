import ApiClient from 'Utilities/notificationsBackendAPI';

export const FETCH_FILTER    = 'FETCH_FILTER';
export const FETCH_ENDPOINTS = 'FETCH_ENDPOINTS';
export const FETCH_ENDPOINT  = 'FETCH_ENDPOINT';
export const SUBMIT_ENDPOINT = 'SUBMIT_ENDPOINT';
export const DELETE_ENDPOINT = 'DELETE_ENDPOINT';
export const NEW_ENDPOINT    = 'NEW_ENDPOINT';
export const TEST_ENDPOINT   = 'TEST_ENDPOINT';
export const FETCH_APPS      = 'FETCH_APPS';

export const fetchEndpoints = (page, perPage, sortBy = 'name asc', partial = false) => {
    const offset = (page - 1) * perPage;
    const params = { offset, limit: perPage, sort_by: sortBy };
    let query = [];

    Object.keys(params).map(function(key) {
        const value = params[key];
        if (value !== undefined) {
            query.push(`${ key }=${ value }`);
        }
    });

    const url = `/endpoints?${ query.join('&') }`;

    return {
        type: FETCH_ENDPOINTS,
        payload: ApiClient.get(url),
        meta: {
            endpoint: url,
            sortBy,
            partial
        }
    };
};

export const fetchEndpoint = (id) => ({
    type: FETCH_ENDPOINT,
    payload: ApiClient.get(`/endpoints/${ id }`)
});

export const createEndpoint = (data) => {
    return {
        type: SUBMIT_ENDPOINT,
        payload: ApiClient.create('/endpoints', { endpoint: data }),
        meta: {
            data,
            notifications: {
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
        payload: ApiClient.update(`/endpoints/${ id }`, { endpoint: { active: on }})
    };
};

export const deleteEndpoint = (id, name) => ({
    type: DELETE_ENDPOINT,
    payload: ApiClient.destroy(`/endpoints/${ id }`).then(() => ({ id })),
    meta: {
        notifications: {
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
        endpointId,
        notifications: {
            fulfilled: {
                variant: 'success',
                title: 'Test event delivery successful'
            }
        }
    }
});

export const fetchFilter = (endpointId) => ({
    type: FETCH_FILTER,
    payload: ApiClient.get(`/endpoints/${ endpointId }/filter`, { ignore404: true })
});

export const fetchApps = () => ({
    type: FETCH_APPS,
    payload: ApiClient.get('/apps')
});
