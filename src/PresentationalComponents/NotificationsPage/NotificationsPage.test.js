import { NotificationsPage } from './NotificationsPage';

describe('NotificationsPage', () => {
    it('expect to render ', () => {
        const wrapper = shallow(
            <NotificationsPage title="Something" appendix={ <strong>A footer</strong> }>
                content
            </NotificationsPage>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
