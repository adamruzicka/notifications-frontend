export const NOTIFICATIONS_API_ROOT = '/api/hooks';

export const API_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

class BackendAPIClient {
    static request(path, apiProps, method, options = {}) {
        return this.authenticate()
        .then(() => this.fetch(path, apiProps, method))
        .then(this.checkForEmptyResponse)
        .then((response) => this.checkForErrors(response, options))
        .then((response) => response.json())
        .catch(() => Promise.reject({ title: 'Error parsing' }));
    }

    static fetch(path, apiProps, method) {
        let params = {
            method: method || 'get',
            headers: API_HEADERS
        };

        if (apiProps) {
            params.body = JSON.stringify(apiProps);
        }

        return fetch(NOTIFICATIONS_API_ROOT.concat(path), params);
    }

    static checkForEmptyResponse(response) {
        return response.status === 204 ? { json: () => ({}) } : response;
    }

    static checkForErrors(response, options = {}) {
        if (response.status === 404 && options.ignore404) {
            return { json: () => ({}) };
        }

        if (response.status === 401) {
            return window.insights.chrome.auth.logout(true);
        }

        const responseCloneJson = response.clone ? response.clone().json() : response;

        if (response.status === 422) {
            return responseCloneJson.then((json) =>
                Promise.reject({ ...json, title: 'Validation error' })
            );
        }

        if (response.status >= 400 && response.status <= 600) {
            return responseCloneJson.then((json) =>
                Promise.reject(json.errors[0])
            );
        }

        return response;
    }

    static authenticate() {
        return window.insights.chrome.auth.getUser();
    }

    static create(path, apiProps) {
        return this.request(path, apiProps, 'post');
    }

    static update(path, apiProps) {
        return this.request(path, apiProps, 'put');
    }

    static get(path, options = {}) {
        return this.request(path, null, 'get', options);
    }

    static destroy(path) {
        return this.request(path, null, 'delete');
    }
}

export default BackendAPIClient;
