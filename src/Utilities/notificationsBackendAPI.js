export const NOTIFICATIONS_API_ROOT = '/api/webhooks';

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
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return (method !== 'delete') ? response.json() : {};
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
