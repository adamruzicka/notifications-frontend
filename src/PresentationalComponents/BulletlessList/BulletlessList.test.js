import toJson from 'enzyme-to-json';

import { ListItem } from '@patternfly/react-core';
import { BulletlessList } from './BulletlessList';

describe('FilterList', () => {
    it('expect to render', () => {
        const wrapper = shallow(
            <BulletlessList>
                <ListItem>Something</ListItem>
                <ListItem>Something else</ListItem>
            </BulletlessList>
        );

        expect(toJson(wrapper.render())).toMatchSnapshot();
    });
});
