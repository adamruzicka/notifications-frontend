import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from '@patternfly/react-core';

export const ALL = 'all';
export const SELECTED = 'selected-only';

const radioStyle = {
    marginTop: '.5em',
    marginBottom: '.5em'
};
const lowerRadioStyle = {
    marginBottom: '1em',
    marginTop: '.5em'
};

export class RadioToggle extends Component {
    static propTypes = {
        children: PropTypes.node,
        scope: PropTypes.string.isRequired,
        initial: PropTypes.oneOf([ ALL, SELECTED ]).isRequired,
        selectable: PropTypes.bool.isRequired
    }

    handleChange = (_, event) => {
        const { value } = event.currentTarget;
        this.setState({ value });
    }

    constructor(props) {
        super(props);
        this.state = { value: props.initial };
    }

    render() {
        const { children, scope, selectable } = this.props;
        const group = `${ scope }-event-type-radio`;

        return (
            <React.Fragment>
                <Radio value={ ALL }
                    defaultChecked={ !selectable || this.state.value === ALL }
                    onChange={ this.handleChange }
                    label="All event types"
                    id={ `${ scope }-radio-all` }
                    name={ group } style={ radioStyle } />
                { selectable &&
                  <Radio value={ SELECTED }
                      defaultChecked={ this.state.value === SELECTED }
                      onChange={ this.handleChange }
                      label="Only selected event types"
                      id={ `${ scope }-radio-selected` }
                      name={ group } style={ lowerRadioStyle } /> }
                { selectable && this.state.value === SELECTED && children }
            </React.Fragment>
        );
    }
}

export default RadioToggle;
