export const NOTIFICATIONS_API_ROOT = '/r/insights/platform/notifications';

export const API_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

export const request = (path, apiProps, method) => {
    return window.insights.chrome.auth.getUser()
    .then(() => {
        return fetch(NOTIFICATIONS_API_ROOT.concat(path), {
            method: method || 'get',
            headers: API_HEADERS,
            body: JSON.stringify(apiProps)
        });
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return (method !== 'delete') ? response.json() : {};
    });
};

export const create = (path, apiProps) => {
    return request(path, apiProps, 'post');
};

export const update = (path, apiProps) => {
    return request(path, apiProps, 'put');
};

export const get = (path) => {
    return request(path);
};

export const destroy = (path) => {
    return request(path, null, 'delete');
};
