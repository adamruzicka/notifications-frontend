import React, { Component } from 'react';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarItem
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class IndexToolbar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarItem><Link to={ '/new' } onClick={ this.props.onClick }>New endpoint</Link></ToolbarItem>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

IndexToolbar.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default IndexToolbar;
