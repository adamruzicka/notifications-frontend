import React, { Component } from 'react';
import { Button } from '@patternfly/react-core';

import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    fetchEndpoint,
    createEndpoint,
    updateEndpoint,
    newEndpoint,
    fetchFilters,
    fetchApps
} from 'Store/actions';
import {
    Skeleton,
    SkeletonSize
} from '@red-hat-insights/insights-frontend-components';
import registryDecorator from '@red-hat-insights/insights-frontend-components/Utilities/Registry';
import {
    LoadingState,
    NotificationsPage,
    CustomFieldTemplate,
    FilterList
} from 'PresentationalComponents';

const schema = {
    title: 'Edit Notifications',
    type: 'object',
    required: [ 'name', 'url' ],
    properties: {
        name: { type: 'string', title: 'Name' },
        active: { type: 'boolean', title: 'Active', default: true },
        url: { type: 'string', title: 'URL' }
    }
};

const uiSchema = {
    name: {
        'ui:placeholder': 'New notification endpoint name'
    },
    url: {
        'ui:placeholder': 'https://...'
    }
};

@registryDecorator()
export class NotificationEdit extends Component {
    static propTypes = {
        endpointId: PropTypes.number,
        endpoint: PropTypes.object,
        filters: PropTypes.array.isRequired,
        apps: PropTypes.array.isRequired,
        fetchEndpoint: PropTypes.func.isRequired,
        createEndpoint: PropTypes.func.isRequired,
        updateEndpoint: PropTypes.func.isRequired,
        fetchFilters: PropTypes.func.isRequired,
        fetchApps: PropTypes.func.isRequired,
        match: PropTypes.object,
        history: PropTypes.object,
        loading: PropTypes.bool,
        submitting: PropTypes.bool
    }

    componentDidMount() {
        this.filterList = React.createRef();
        this.fetchData();
    }

    formSubmit = (data) => {
        let { active, name, url } = data.formData;
        let filters = [{
            app_ids: this.filterList.current.props.selectedAppEventTypes.appIds,
            event_type_ids: this.filterList.current.props.selectedAppEventTypes.eventTypeIds,
            severity_filters: []
        }];
        let payload = {
            active,
            name,
            url,
            filters
        };

        if (this.props.endpoint) {
            this.props.updateEndpoint(this.props.endpoint.id, payload).then(this.toIndex);
        } else {
            this.props.createEndpoint(payload).then(this.toIndex);
        }
    }

    fetchData = () => {
        let id = this.props.match.params.endpointId;

        if (id) {
            this.props.fetchEndpoint(id);
            this.props.fetchFilters(id);
        }

        this.props.fetchApps();
    }

    selectedAppEventTypes = () =>
        this.props.filters && this.props.filters.length > 0 ? {
            appIds: this.props.filters.map((filter) =>
                filter.relationships.apps.data.map((app) => parseInt(app.id))).flat(),
            eventTypeIds: this.props.filters.map((filter) =>
                filter.relationships.event_types.data.map((eventType) => parseInt(eventType.id))).flat()
        } : {
            appIds: [],
            eventTypeIds: []
        }

    initialFormData = () =>
        this.props.endpoint ? {
            name: this.props.endpoint.name,
            url: this.props.endpoint.url,
            active: this.props.endpoint.active
        } : {}

    toIndex = () =>
        this.props.history.push('/list')

    render() {
        const action = this.props.match.params.endpointId ? 'Edit' : 'New';

        if (this.props.endpoint && !this.props.match.params.endpointId) {
            return <Redirect to={ `/edit/${ this.props.endpoint.id }` } />;
        }

        return (
            <NotificationsPage title={ `${ action } Notification` }>
                <LoadingState
                    loading={ this.props.loading }
                    placeholder={ <Skeleton size={ SkeletonSize.sm } /> }>
                    <Form schema={ schema } className="pf-c-form"
                        uiSchema={ uiSchema }
                        formData={ this.initialFormData() }
                        onSubmit={ this.formSubmit }
                        FieldTemplate={ CustomFieldTemplate }>

                        <FilterList ref={ this.filterList }
                            apps={ this.props.apps }
                            selectedAppEventTypes={ this.selectedAppEventTypes() } />

                        <div>
                            <Button type='submit' variant="primary">Submit</Button>
                            <Button onClick={ this.toIndex } variant="secondary">Cancel</Button>
                        </div>
                    </Form>
                </LoadingState>
            </NotificationsPage>
        );
    }
}

const mapStateToProps = (state)  => {
    let { endpoint, loading, submitting } = state.endpoints;
    let { apps, loading: appsLoading } = state.apps;
    let { filters, loading: filtersLoading } = state.filters;

    return {
        endpoint,
        apps,
        filters,
        loading,
        submitting,
        appsLoading,
        filtersLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchEndpoint,
        createEndpoint,
        updateEndpoint,
        newEndpoint,
        fetchFilters,
        fetchApps
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationEdit));
