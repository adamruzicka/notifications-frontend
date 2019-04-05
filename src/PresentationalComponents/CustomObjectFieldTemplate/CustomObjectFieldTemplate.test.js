import toJson from 'enzyme-to-json';

import { CustomObjectFieldTemplate } from './CustomObjectFieldTemplate';

describe('CustomObjectFieldTemplate', () => {
    it('expect to render', () => {
        const testProps = {
            title: 'Test Object',
            description: 'This is a test',
            name: 'test-object',
            properties: [
                { content: 'Test Content' }
            ]
        };
        const wrapper = shallow(
            <CustomObjectFieldTemplate { ...testProps } />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
