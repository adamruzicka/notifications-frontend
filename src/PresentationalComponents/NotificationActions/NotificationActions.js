import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import {
    Dropdown,
    KebabToggle,
    DropdownItem
} from '@patternfly/react-core';

class NotificationActions extends React.Component {
    state = {
        isOpen: this.props.isOpen
    }
    static propTypes = {
        isOpen: PropTypes.bool,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        endpointId: PropTypes.number.isRequired
    }

    componentDidMount() {
        this.setState({
            isOpen: false
        });
    }

    onToggle = isOpen => {
        this.setState({
            isOpen
        });
    }

    dropdownItems = () => ([
        <DropdownItem key="edit" component="div">
            <Link to={ `/edit/${ this.props.endpointId }` }>Edit</Link>
        </DropdownItem>,
        <DropdownItem key="delete" href={ `/insights/platform/notifications/destroy/${ this.props.endpointId }` }>
            Delete
        </DropdownItem>
    ])

    render() {
        const { isOpen } = this.state;
        return (
            <Dropdown
                toggle={ <KebabToggle onToggle={ this.onToggle }/> }
                isPlain
                onSelect={ this.onSelect }
                isOpen={ isOpen }
                dropdownItems={ this.dropdownItems() } />
        );
    }
};

export default withRouter(NotificationActions);
