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
import {
    Split,
    SplitItem
} from '@patternfly/react-core';

import './notifications-index.scss';

import NotificationActions from '../../PresentationalComponents/NotificationActions/NotificationActions';
import IndexToolbar from '../../PresentationalComponents/IndexToolbar/IndexToolbar';
import EndpointToggle from '../../PresentationalComponents/EndpointToggle/EndpointToggle';

@registryDecorator()
export class NotificationsIndex extends Component {
    componentDidMount() {
        this.props.fetchEndpoints();
    };

    filtersInRowsAndCells() {
        return this.props.endpoints.map((endpoint) => {
            const { id, active, name, url, filtersCount } = endpoint;
            return { cells: [
                name,
                url,
                <EndpointToggle key={ `notification_switch_${id}` }
                    id={ id }
                    active={ active }
                    onChange={ (checked) => { this.props.toggleEndpoint(id, checked); } } />,
                filtersCount,
                <NotificationActions key={ `notification_actions_${id}` }
                    endpointId={ id }
                    onDelete={ (event) => { event.preventDefault(); this.props.deleteEndpoint(id, name); } } />
            ]};
        });
    };

    render() {
        const tableColumns = [ 'Name', 'URL', 'Active', 'Filters', 'Actions' ];

        if (this.props.loading) {
            return 'Loading endpoints ...';
        }

        return (
            <Fragment>
                <PageHeader >
                    <Split>
                        <SplitItem isMain>
                            <PageHeaderTitle title='Notifications'/>
                        </SplitItem>
                        <SplitItem><IndexToolbar onClick={ this.props.newEndpoint }/></SplitItem>
                    </Split>
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
    fetchEndpoints: PropTypes.func.isRequired,
    deleteEndpoint: PropTypes.func.isRequired,
    newEndpoint: PropTypes.func.isRequired,
    toggleEndpoint: PropTypes.func.isRequired,
    endpoints: PropTypes.array.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool
};

const mapStateToProps = function(state) {
    return {
        endpoints: state.endpoints.endpoints,
        loading: state.endpoints.loading,
        error: state.endpoints.error
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        fetchEndpoints: actionCreators.fetchEndpoints,
        deleteEndpoint: actionCreators.deleteEndpoint,
        newEndpoint: actionCreators.newEndpoint,
        toggleEndpoint: actionCreators.toggleEndpoint
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex);
