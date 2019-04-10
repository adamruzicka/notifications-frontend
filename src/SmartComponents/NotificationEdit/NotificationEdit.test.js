import { init } from 'Store';
import logger from 'redux-logger';
import { NotificationEdit } from './NotificationEdit';
import toJson from 'enzyme-to-json';

import endpoints from '../../__fixtures__/endpoints';
import filter from '../../__fixtures__/filters';
import apps from '../../__fixtures__/apps';

import { normalizePayload } from 'Store/reducers/reducerHelper';

describe('NotificationEdit', () => {
    const store = init(logger).getStore();
    const fetchEndpoint = jest.fn();
    const createEndpoint = jest.fn();
    const updateEndpoint = jest.fn();
    const fetchFilter = jest.fn();
    const fetchApps = jest.fn();
    const goBack = jest.fn();

    const defaultProps = {
        match: {
            params: {
                endpointId: '1'
            }
        },
        history: {
            goBack
        },
        apps: normalizePayload(apps).app,
        filter: normalizePayload(filter).filter,
        fetchEndpoint,
        createEndpoint,
        updateEndpoint,
        fetchFilter,
        fetchApps,
        store
    };

    it('expect to render a Form', () => {
        const wrapper = shallow(
            <NotificationEdit { ...defaultProps } />
        );
        expect(wrapper.find('Form').length).toBe(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('takes an endpoint', () => {
        const testEndpoint = Object.values(normalizePayload(endpoints).endpoint)[0];
        const wrapper = shallow(
            <NotificationEdit { ...defaultProps } endpoint={ testEndpoint } />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
