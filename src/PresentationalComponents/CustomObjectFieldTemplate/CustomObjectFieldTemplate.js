import React from 'react';
import PropTypes from 'prop-types';

export const CustomObjectFieldTemplate = ({ title, description, properties }) => {
    return (
        <div>
            { title }
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
