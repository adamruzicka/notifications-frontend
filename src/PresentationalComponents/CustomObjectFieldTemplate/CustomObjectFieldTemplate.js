import React from 'react';
import {
    Title
} from '@patternfly/react-core';
import PropTypes from 'prop-types';

export const CustomObjectFieldTemplate = ({ title, description, properties }) => {
    return (
        <div>
            <Title size='md'>{ title }</Title>
            { description }
            { properties.map(element => (
                element.content
            )) }
        </div>
    );
};

CustomObjectFieldTemplate.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    properties: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
    name: PropTypes.string
};
