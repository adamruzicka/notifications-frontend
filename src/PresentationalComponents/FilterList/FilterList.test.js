import toJson from 'enzyme-to-json';

import { FilterList } from './FilterList';

import apps from '../../__fixtures__/apps';
import filters from '../../__fixtures__/filters';
import { normalizePayload } from 'Store/reducers/reducerHelper';

describe('FilterList', () => {
    it('expect to render', () => {
        const filter = Object.values(normalizePayload(filters).filter)[0];
        const wrapper = shallow(
            <FilterList filter={ filter }
                apps={ normalizePayload(apps).app } />
        );

        expect(toJson(wrapper.render())).toMatchSnapshot();
    });
});
