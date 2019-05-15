import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, ListItem } from '@patternfly/react-core';
import { BulletlessList } from 'PresentationalComponents';

export const ALL = 'all';
export const SELECTED = 'selected-only';

export class RadioToggle extends Component {
    static propTypes = {
        children: PropTypes.node,
        subject: PropTypes.string.isRequired,
        scope: PropTypes.string.isRequired,
        initial: PropTypes.oneOf([ ALL, SELECTED ]).isRequired,
        selectable: PropTypes.bool.isRequired,
        onToggle: PropTypes.func
    }

    handleChange = (_, event) => {
        const { value } = event.currentTarget;
        this.props.onToggle && this.props.onToggle(value);
        this.setState({ value });
    }

    constructor(props) {
        super(props);
        this.state = { value: props.initial };
    }

    render() {
        const { children, scope, selectable, subject } = this.props;
        const group = `${ scope }-${ subject.replace(' ', '-') }-radio`;
        return (
            <React.Fragment>
                <BulletlessList>
                    <ListItem>
                        <Radio value={ ALL }
                            defaultChecked={ !selectable || this.state.value === ALL }
                            onChange={ this.handleChange }
                            label={ `All ${ subject }s` }
                            id={ `${ scope }-radio-all` }
                            name={ group } />
                    </ListItem>
                    { selectable &&
                      <ListItem>
                          <Radio value={ SELECTED }
                              defaultChecked={ this.state.value === SELECTED }
                              onChange={ this.handleChange }
                              label={ `Only selected ${ subject }s` }
                              id={ `${ scope }-radio-selected` }
                              name={ group }  />
                      </ListItem> }
                    { selectable && this.state.value === SELECTED && <ListItem>{ children }</ListItem> }
                </BulletlessList>
            </React.Fragment>
        );
    }
}

export default RadioToggle;
