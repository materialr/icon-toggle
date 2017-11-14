import rippleFoundation from '@materialr/ripple';
import { mount, shallow } from 'enzyme';
import React from 'react';

import iconToggleFoundation from './foundation';
import IconToggle from './index';

const ICON_OFF = 'ICON_OFF';
const ICON_ON = 'ICON_ON';
const LABEL_OFF = 'LABEL_OFF';
const LABEL_ON = 'LABEL_ON';
const defaultProps = {
  iconOff: ICON_OFF,
  iconOn: ICON_ON,
  labelOff: LABEL_OFF,
  labelOn: LABEL_ON,
};

test('Adds the default classNames with no props', () => {
  const wrapper = shallow(<IconToggle {...defaultProps} />, { disableLifecycleMethods: true });
  const expected = 'material-icons mdc-icon-toggle';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Adds all necessary classNames with props', () => {
  const wrapper = shallow(
    <IconToggle {...defaultProps} accent disabled primary />,
    { disableLifecycleMethods: true },
  );
  const expected = 'material-icons mdc-icon-toggle mdc-icon-toggle--accent ' +
    'mdc-icon-toggle--disabled mdc-icon-toggle--primary';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Does not add a ripple when it is disabled', () => {
  const wrapper = mount(<IconToggle {...defaultProps} />);
  const expected = undefined;

  const actual = wrapper.instance().rippleFoundation;

  expect(actual).toBe(expected);
});

test('Adds a ripple when it is enabled', () => {
  const wrapper = mount(<IconToggle {...defaultProps} rippleEnabled />);
  const { disabled, rippleCentered } = wrapper.props();
  const instance = wrapper.instance();
  const { button, updateClassNames, updateCssVariables } = instance;
  const expected = rippleFoundation({
    centered: rippleCentered,
    disabled,
    element: button,
    self: instance,
    updateClassNames,
    updateCssVariables,
  });

  const actual = instance.rippleFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Adds the ripple if the prop changes', () => {
  const wrapper = mount(<IconToggle {...defaultProps} />);
  const instance = wrapper.instance();
  instance.rippleCreate = jest.fn();

  wrapper.setProps({ rippleEnabled: true });

  expect(instance.rippleCreate).toHaveBeenCalledTimes(1);
});

test('Removes the ripple if the prop changes', () => {
  const wrapper = mount(<IconToggle {...defaultProps} rippleEnabled />);
  const instance = wrapper.instance();
  const expected = undefined;

  wrapper.setProps({ rippleEnabled: false });
  const actual = instance.rippleFoundation;

  expect(actual).toBe(expected);
});

test('Adds an icon toggle foundation', () => {
  const ON_CHANGE = () => 'ON_CHANGE';
  const wrapper = mount(<IconToggle {...defaultProps} onChange={ON_CHANGE} />);
  const instance = wrapper.instance();
  const { onChange } = wrapper.props();
  const {
    iconToggle,
    getJSONOff,
    getJSONOn,
    getTabIndex,
    updateAttributes,
    updateClassNames,
    updateText,
  } = instance;
  console.log('HENDRIK', { 'data-toggle-off': getJSONOff(), 'data-toggle-on': getJSONOn() });
  const expected = iconToggleFoundation({
    data: { 'data-toggle-off': getJSONOff(), 'data-toggle-on': getJSONOn() },
    element: iconToggle,
    getTabIndex,
    onChange,
    updateAttributes,
    updateClassNames,
    updateText,
  });

  const actual = instance.iconToggleFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});
