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
    FilterList,
    CustomInputFieldTemplate,
    CustomObjectFieldTemplate,
    CustomBooleanFieldTemplate,
    CustomFieldTemplate
} from 'PresentationalComponents';

const schema = {
    title: 'Edit Notification',
    type: 'object',
    required: [ 'name', 'url' ],
    properties: {
        name: { type: 'string', title: 'Name' },
        url: { type: 'string', title: 'URL' },
        active: { type: 'boolean', title: 'Active', default: true }
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

const fields = {
    StringField: CustomInputFieldTemplate,
    BooleanField: CustomBooleanFieldTemplate
};

const getTrueKeys = (obj) => {
    let keys = Object.keys(obj);
    return keys.filter((key) => obj[key]);
};

@registryDecorator()
export class NotificationEdit extends Component {
    static propTypes = {
        endpointId: PropTypes.number,
        endpoint: PropTypes.object,
        filters: PropTypes.object.isRequired,
        apps: PropTypes.object.isRequired,
        fetchEndpoint: PropTypes.func.isRequired,
        createEndpoint: PropTypes.func.isRequired,
        updateEndpoint: PropTypes.func.isRequired,
        fetchFilters: PropTypes.func.isRequired,
        fetchApps: PropTypes.func.isRequired,
        match: PropTypes.object,
        history: PropTypes.object,
        loading: PropTypes.bool,
        filtersLoading: PropTypes.bool,
        submitting: PropTypes.bool
    }

    componentDidMount() {
        this.filterList = React.createRef();
        this.fetchData();
    }

    formSubmit = (data) => {
        let { active, name, url } = data.formData;
        let filter = {
            app_ids: getTrueKeys(this.filterList.current.state.selected.appIds),
            event_type_ids: getTrueKeys(this.filterList.current.state.selected.eventTypeIds),
            level_ids: getTrueKeys(this.filterList.current.state.selected.levelIds)
        };

        if (this.firstFilter()) {
            filter.id = this.firstFilter().id;
        }

        let filters = [ filter ];
        let payload = {
            active,
            name,
            url,
            filters
        };

        const endpoint = this.singleEndpoint();
        if (endpoint) {
            this.props.updateEndpoint(endpoint.id, payload).then(this.toIndex);
        } else {
            this.props.createEndpoint(payload).then(this.toIndex);
        }
    }

    fetchData = () => {
        let id = this.props.match.params.endpointId;
        this.props.fetchApps();

        if (id) {
            this.props.fetchEndpoint(id);
            this.props.fetchFilters(id);
        }
    }

    singleEndpoint = () =>
        this.props.endpoint ? this.props.endpoint[this.props.match.params.endpointId] : null;

    initialFormData = () => {
        const endpoint = this.singleEndpoint();
        return endpoint ? {
            name: endpoint.attributes.name,
            url: endpoint.attributes.url,
            active: endpoint.attributes.active
        } : {};
    }

    toIndex = () =>
        this.props.history.push('/list')

    firstFilter = () =>
        Object.values(this.props.filters)[0]

    render() {
        const endpoint = this.singleEndpoint();
        let action = this.props.match.params.endpointId && endpoint ? endpoint.attributes.name : 'New Notification';
        const filter = this.props.match.params.endpointId ? this.firstFilter() : {};

        if (endpoint && !this.props.match.params.endpointId) {
            return <Redirect to={ `/edit/${ endpoint.id }` } />;
        }

        return <NotificationsPage title={ `${ action }` }>
            <LoadingState
                loading={ this.props.loading }
                placeholder={ <Skeleton size={ SkeletonSize.sm } /> }>
                <Form schema={ schema } className="pf-c-form"
                    uiSchema={ uiSchema }
                    fields={ fields }
                    ObjectFieldTemplate={ CustomObjectFieldTemplate }
                    FieldTemplate={ CustomFieldTemplate }
                    formData={ this.initialFormData() }
                    onSubmit={ this.formSubmit } >

                    <FilterList ref={ this.filterList }
                        apps={ this.props.apps }
                        filter={ filter } />

                    <div>
                        <Button type='submit' variant="primary">Submit</Button>
                        <Button onClick={ this.toIndex } variant="secondary">Cancel</Button>
                    </div>
                </Form>
            </LoadingState>
        </NotificationsPage>;
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
