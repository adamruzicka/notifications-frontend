import React from 'react';
import PropTypes from 'prop-types';

export const CustomFieldTemplate = ({ help, description, errors, children }) => {
    return (
        <div>
            { children }
            { description }
            { errors }
            { help }
        </div>
    );
};

CustomFieldTemplate.propTypes = {
    help: PropTypes.object,
    description: PropTypes.object,
    errors: PropTypes.object,
    children: PropTypes.array
};
