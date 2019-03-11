import React, { Component } from 'react';
import {
    Title,
    Button,
    Bullseye,
    EmptyState,
    EmptyStateIcon,
    EmptyStateBody
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import { CubesIcon } from '@patternfly/react-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from 'Store/actions';
import {
    Table,
    TableHeader,
    TableBody,
    TableVariant,
    Skeleton,
    SkeletonSize
} from '@red-hat-insights/insights-frontend-components';
import registryDecorator from '@red-hat-insights/insights-frontend-components/Utilities/Registry';

import './notifications-index.scss';

import {
    EndpointToggle,
    IndexToolbar,
    LoadingState,
    NotificationActions,
    NotificationsPage
} from 'PresentationalComponents';

@registryDecorator()
export class NotificationsIndex extends Component {
    componentDidMount() {
        this.props.fetchEndpoints();
    }

    filtersInRowsAndCells = () =>
        this.props.endpoints.map(({ id, active, name, url, filtersCount }) => ({
            cells: [
                name,
                url,
                <EndpointToggle key={ `notification_switch_${id}` }
                    id={ id }
                    active={ active }
                    onChange={ (checked) => { this.props.toggleEndpoint(id, checked); } } />,
                filtersCount,
                <NotificationActions key={ `notification_actions_${id}` }
                    endpointId={ id }
                    onDelete={ this.onDelete(id, name) } />
            ]}))

    onDelete = (id, name) =>
        event => {
            event.preventDefault();
            this.props.deleteEndpoint(id, name);
        }

    noResults = () =>
        <Bullseye>
            <EmptyState>
                <p>
                    <EmptyStateIcon icon={ CubesIcon } />
                </p>
                <Title size="lg">No Endpoins found</Title>
                <EmptyStateBody>
                    There are no endpoints configured yet.
                </EmptyStateBody>
                <Button variant="primary" to={ '/new' } component={ Link } onClick={ this.props.newEndpoint }>New endpoint</Button>
            </EmptyState>
        </Bullseye>

    resultsTable = () => {
        const tableColumns = [ 'Name', 'URL', 'Active', 'Filters', 'Actions' ];

        return <Table aria-label='Notifications list'
            variant={ TableVariant.medium }
            rows={ this.filtersInRowsAndCells() }
            header={ tableColumns }>
            <TableHeader />
            <TableBody />
        </Table>;
    }

    render() {
        const placeholder = <Skeleton size={ SkeletonSize.lg } />;
        return (
            <NotificationsPage
                title='Notifications'
                rightBar={ <IndexToolbar onClick={ this.props.newEndpoint }/> }>
                <LoadingState
                    loading={ this.props.loading }
                    placeholder={ placeholder } >
                    { this.props.endpoints.length > 0 ? this.resultsTable() : this.noResults() }
                </LoadingState>
            </NotificationsPage>
        );
    }
}

NotificationsIndex.propTypes = {
    fetchEndpoints: PropTypes.func.isRequired,
    deleteEndpoint: PropTypes.func.isRequired,
    newEndpoint: PropTypes.func.isRequired,
    toggleEndpoint: PropTypes.func.isRequired,
    endpoints: PropTypes.array.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool
};

const mapStateToProps = ({ endpoints: { endpoints, loading, error }}) => ({
    endpoints,
    loading,
    error
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        fetchEndpoints: actionCreators.fetchEndpoints,
        deleteEndpoint: actionCreators.deleteEndpoint,
        newEndpoint: actionCreators.newEndpoint,
        toggleEndpoint: actionCreators.toggleEndpoint
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex);
