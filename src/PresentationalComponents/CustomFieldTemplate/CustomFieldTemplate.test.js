import toJson from 'enzyme-to-json';

import { CustomFieldTemplate } from './CustomFieldTemplate';

describe('CustomFieldTemplate', () => {
    it('expect to render', () => {
        const testProps = {
            children: [ <div key="test-div"></div> ],
            description: <span/>,
            errors: <div key="error-test-div"></div>
        };

        const wrapper = shallow(
            <CustomFieldTemplate { ...testProps } />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
