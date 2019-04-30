import React from 'react';
import { List } from '@patternfly/react-core';
import PropTypes from 'prop-types';

export const BulletlessList = ({ children }) =>
    <List style={ { listStyle: 'none' } }>
        { children }
    </List>;

BulletlessList.propTypes = {
    children: PropTypes.node
};

export default BulletlessList;
