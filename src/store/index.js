import ReducerRegistry from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';
import promiseMiddleware from 'redux-promise-middleware';
import { filterReducer, endpointsReducer } from './reducers';
import { appsReducer } from './reducers/AppsReducer';
import { notifications, notificationsMiddleware } from '@redhat-cloud-services/frontend-components-notifications';

let registry;

export function init (...middleware) {
    if (registry) {
        throw new Error('store already initialized');
    }

    registry = new ReducerRegistry({}, [
        promiseMiddleware(),
        notificationsMiddleware({
            errorTitleKey: 'title',
            errorDescriptionKey: 'detail',
            autoDismiss: true
        }),
        ...middleware
    ]);

    registry.register({
        filter: filterReducer,
        endpoints: endpointsReducer,
        apps: appsReducer,
        notifications
    });

    return registry;
}

export function getStore () {
    return registry.getStore();
}

export function register (...args) {
    return registry.register(...args);
}
