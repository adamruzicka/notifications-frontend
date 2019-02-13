import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../store/actions';
import {
    Main,
    PageHeader,
    PageHeaderTitle,
    Table,
    TableHeader,
    TableBody,
    TableVariant
} from '@red-hat-insights/insights-frontend-components';
import registryDecorator from '@red-hat-insights/insights-frontend-components/Utilities/Registry';

import './notifications-index.scss';

import NotificationActions from '../../PresentationalComponents/NotificationActions/NotificationActions';

@registryDecorator()
class NotificationsIndex extends Component {
    componentDidMount() {
        this.props.fetchFilters();
        this.props.fetchEndpoints();
    };

    filtersInRowsAndCells() {
        return this.props.endpoints.map((endpoint) => {
            return { cells: [
                endpoint.name,
                endpoint.url,
                endpoint.active ? 'true' : 'false',
                endpoint.filtersCount,
                <NotificationActions key={ `notification_actions_${endpoint.id}` } endpointId={ endpoint.id } />
            ]};
        });
    };

    render() {
        const tableColumns = [ 'Name', 'URL', 'Active', 'Filters', 'Actions' ];

        return (
            <Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Notifications'/>
                </PageHeader>
                <Main>
                    <Table aria-label='Notifications list'
                        variant={ TableVariant.medium }
                        rows={ this.filtersInRowsAndCells() }
                        header={ tableColumns }>
                        <TableHeader />
                        <TableBody />
                    </Table>
                </Main>
            </Fragment>
        );
    }
}

NotificationsIndex.propTypes = {
    fetchFilters: PropTypes.func.isRequired,
    fetchEndpoints: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    endpoints: PropTypes.array.isRequired
};

const mapStateToProps = function(state) {
    return {
        filters: state.filters.filters,
        endpoints: state.endpoints.endpoints
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        fetchFilters: actionCreators.fetchFilters,
        fetchEndpoints: actionCreators.fetchEndpoints
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex);
