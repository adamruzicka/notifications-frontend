import { FilterList } from './FilterList';

import apps from '../../__fixtures__/apps';
import filters from '../../__fixtures__/filters';
import { normalizePayload } from 'Store/reducers/reducerHelper';

describe('FilterList', () => {
    it('expect to render', () => {
        const wrapper = shallow(
            <FilterList filters={ normalizePayload(filters).filter }
                apps={ normalizePayload(apps).app } />
        );

        expect(wrapper.render()).toMatchSnapshot();
    });
});
