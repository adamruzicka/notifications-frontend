import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import fetch from 'cross-fetch';

configure({ adapter: new Adapter() });

global.fetch = fetch;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;
