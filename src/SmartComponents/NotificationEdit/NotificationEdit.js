import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';
import { fetchEndpoint } from '../../store/actions';
import { connect } from 'react-redux';
import {
    Main,
    PageHeader,
    PageHeaderTitle
} from '@red-hat-insights/insights-frontend-components';
import registryDecorator from '@red-hat-insights/insights-frontend-components/Utilities/Registry';

const schema = {
    title: 'Edit Notifications',
    type: 'object',
    required: [ 'title' ],
    properties: {
        name: { type: 'string', title: 'Name', default: 'New notification endpoint name' },
        active: { type: 'boolean', title: 'Active', default: true },
        url: { type: 'string', title: 'URL', default: 'https://...' }
    }
};

function CustomFieldTemplate(props) {
    const { id, classNames, label, help, required, description, errors, children } = props;
    let allClassNames = classNames.concat([ ' pf-c-form__group' ]);

    return (
        <div className={ allClassNames }>
            <label htmlFor={ id }>{ label } { required ? '*' : null }</label>
            { description }
            { children }
            { errors }
            { help }
        </div>
    );
}

CustomFieldTemplate.propTypes = {
    id: PropTypes.string,
    classNames: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.object,
    required: PropTypes.bool,
    description: PropTypes.object,
    errors: PropTypes.object,
    children: PropTypes.array
};

@registryDecorator()
export class NotificationEdit extends Component {
    componentDidMount() {
        this.props.fetchEndpoint(this.props.match.params.endpointId);
    }

    formChange = () => {}

    initialFormData = () => {
        return this.props.endpoint ? {
            name: this.props.endpoint.name,
            url: this.props.endpoint.url,
            active: this.props.endpoint.active
        } : {};
    }

    render() {
        return (
            <Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Edit Notification'/>
                </PageHeader>
                <Main>
                    <Form schema={ schema } className="pf-c-form"
                        formData={ this.initialFormData() }
                        onChange={ this.formChange }
                        FieldTemplate={ CustomFieldTemplate } />
                </Main>
            </Fragment>
        );
    }
}

NotificationEdit.propTypes = {
    endpointId: PropTypes.number,
    endpoint: PropTypes.object,
    fetchEndpoint: PropTypes.func.isRequired,
    match: PropTypes.object
};

const mapStateToProps = function(state) {
    return {
        endpoint: state.endpoints.endpoint
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        fetchEndpoint
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationEdit));
