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
    Pagination,
    Skeleton,
    SkeletonSize
} from '@red-hat-insights/insights-frontend-components';
import registryDecorator from '@red-hat-insights/insights-frontend-components/Utilities/Registry';
import debounce from 'lodash/debounce';

import './notifications-index.scss';

import {
    EndpointToggle,
    IndexToolbar,
    LoadingState,
    NotificationActions,
    NotificationsPage,
    StatusIcon
} from 'PresentationalComponents';

@registryDecorator()
export class NotificationsIndex extends Component {
    componentDidMount() {
        this.refreshData();
    }

    changePage = debounce(() => { this.refreshData(false); }, 800);

    state = {
        page: 1,
        perPage: 10
    }

    onSetPage = (page, shouldDebounce) => {
        this.setState({ page });
        if (shouldDebounce) {
            this.changePage();
        } else {
            this.refreshData(page);
        }
    }

    refreshData = (page = this.state.page, perPage = this.state.perPage) => {
        this.props.fetchEndpoints(page, perPage);
    }

    onPerPageSelect = (perPage) => {
        this.setState({ perPage });
        this.refreshData(null, perPage);
    }

    filtersInRowsAndCells = (endpoints) =>
        endpoints.map(({ id, attributes: { active, name, url }}) => ({
            cells: [
                name,
                'HTTP',
                url,
                <StatusIcon key={ `notification_status_${id}` } status={ true } />,
                <EndpointToggle key={ `notification_switch_${id}` }
                    id={ parseInt(id) }
                    active={ active }
                    onChange={ (checked) => {
                        this.props.toggleEndpoint(id, checked).then(() => this.forceUpdate());
                    } } />,
                <NotificationActions key={ `notification_actions_${id}` }
                    endpointId={ parseInt(id) }
                    onDelete={ this.onDelete(id, name) } />
            ]}));

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

    resultsTable = (endpoints) => {
        const tableColumns = [ 'Name', 'Type', 'Path', 'Status', 'Active',  '' ];
        const { perPage, page } = this.state;
        return <div>
            <Table aria-label='Notifications list'
                variant={ TableVariant.medium }
                rows={ this.filtersInRowsAndCells(Object.values(endpoints)) }
                header={ tableColumns }>
                <TableHeader />
                <TableBody />
            </Table>
            <Pagination
                numberOfItems={ this.props.total }
                itemsPerPage={ perPage }
                page={ page }
                onSetPage={ this.onSetPage }
                onPerPageSelect={ this.onPerPageSelect }
                useNext={ true } />
        </div>;
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
                    { Object.values(this.props.endpoints).length > 0 ? this.resultsTable(this.props.endpoints) : this.noResults() }
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
    endpoints: PropTypes.object.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
    total: PropTypes.number
};

const mapStateToProps = ({ endpoints: { endpoints, loading, error, total }}) => ({
    endpoints,
    loading,
    error,
    total
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        fetchEndpoints: actionCreators.fetchEndpoints,
        deleteEndpoint: actionCreators.deleteEndpoint,
        newEndpoint: actionCreators.newEndpoint,
        toggleEndpoint: actionCreators.toggleEndpoint
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex);
