import React from 'react';
import { List } from '@patternfly/react-core';
import PropTypes from 'prop-types';

export const BulletlessList = ({ style, children }) =>
    <List style={ { ...style, listStyle: 'none' } }>
        { children }
    </List>;

BulletlessList.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
};

export default BulletlessList;
