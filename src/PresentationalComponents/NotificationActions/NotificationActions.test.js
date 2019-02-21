import { NotificationActions } from './NotificationActions';
import { BrowserRouter as Router } from 'react-router-dom';

describe('NotificationActions', () => {
    const defaultProps = {
        match: {},
        location: {},
        history: {},
        endpointId: null
    };

    it('expect to render a svg', () => {
        const wrapper = shallow(
            <Router>
                <NotificationActions { ...defaultProps } endpointId={ 1 }/>
            </Router>
        );
        expect(wrapper.render().find('svg').length).toBe(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('expect to renders edit & delete', () => {
        const wrapper = shallow(
            <Router>
                <NotificationActions { ...defaultProps } endpointId={ 1 } isOpen={ true }/>
            </Router>
        );
        expect(wrapper.render().find('a[href="/edit/1"]').text()).toBe('Edit');
        expect(wrapper.render().find('a[href="/insights/platform/notifications/destroy/1"]').text()).toBe('Delete');
        expect(wrapper).toMatchSnapshot();
    });
});
