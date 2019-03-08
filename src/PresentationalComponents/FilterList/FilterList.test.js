import { FilterList } from './FilterList';

import apps from '../../__fixtures__/apps';
import filters from '../../__fixtures__/filters';

describe('FilterList', () => {
    it('expect to render', () => {
        const selectedAppEventTypes = {
            appIds: [ 1 ],
            eventTypeIds: [ 11 ]
        };
        const wrapper = shallow(
            <FilterList filters={ filters } apps={ apps.data } selectedAppEventTypes={ selectedAppEventTypes } />
        );

        expect(wrapper.render()).toMatchSnapshot();
    });
});
