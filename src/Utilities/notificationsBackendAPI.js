export const NOTIFICATIONS_API_ROOT = '/api/hooks';

export const API_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

class BackendAPIClient {
    static request(path, apiProps, method) {
        return window.insights.chrome.auth.getUser()
        .then(() => {
            return fetch(NOTIFICATIONS_API_ROOT.concat(path), {
                method: method || 'get',
                headers: API_HEADERS,
                body: JSON.stringify(apiProps)
            });
        }).then((response) => {
            if (!response.ok && response.status !== 422) {
                throw new Error(response.statusText);
            }

            if (response.status === 422) {
                return response.clone()
                .json()
                .then((json) => Promise.reject(json));
            }

            return (response.status !== 204) ? response.json() : {};
        });
    }

    static create(path, apiProps) {
        return this.request(path, apiProps, 'post');
    }

    static update(path, apiProps) {
        return this.request(path, apiProps, 'put');
    }

    static get(path) {
        return this.request(path);
    }

    static destroy(path) {
        return this.request(path, null, 'delete');
    }
}

export default BackendAPIClient;
