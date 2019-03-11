import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import {
    Dropdown,
    KebabToggle,
    DropdownItem
} from '@patternfly/react-core';

export class NotificationActions extends React.Component {
    state = {
        isOpen: this.props.isOpen
    }
    static propTypes = {
        isOpen: PropTypes.bool,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        endpointId: PropTypes.number.isRequired,
        onDelete: PropTypes.func
    }

    onToggle = isOpen => {
        this.setState({
            isOpen
        });
    }

    dropdownItems = () => ([
        <DropdownItem key="edit" component={ Link } to={ `/edit/${ this.props.endpointId }` }>
            Edit
        </DropdownItem>,
        <DropdownItem key="delete" href="#delete" onClick={ this.props.onDelete }>
            Delete
        </DropdownItem>
    ])

    render() {
        return <Dropdown
            toggle={ <KebabToggle onToggle={ this.onToggle }/> }
            isPlain
            onSelect={ this.onSelect }
            isOpen={ this.state.isOpen }
            dropdownItems={ this.dropdownItems() } />;
    }
};

export default withRouter(NotificationActions);
