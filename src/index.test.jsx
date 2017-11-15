import rippleFoundation from '@materialr/ripple';
import { mount, shallow } from 'enzyme';
import React from 'react';

import iconToggleFoundation from './foundation';
import IconToggle from './index';

const ICON_OFF = 'ICON_OFF';
const ICON_ON = 'ICON_ON';
const LABEL_OFF = 'LABEL_OFF';
const LABEL_ON = 'LABEL_ON';
const ON_CHANGE = () => 'ON_CHANGE';
const defaultProps = {
  iconOff: ICON_OFF,
  iconOn: ICON_ON,
  labelOff: LABEL_OFF,
  labelOn: LABEL_ON,
  onChange: ON_CHANGE,
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
  const wrapper = mount(<IconToggle {...defaultProps} />);
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
  const expected = iconToggleFoundation({
    data: { 'data-toggle-off': getJSONOff(), 'data-toggle-on': getJSONOn() },
    element: iconToggle,
    getTabIndex,
    onChange,
    updateAttributes,
    updateClassNames,
    updateText,
  });
  expected.init();

  const actual = instance.iconToggleFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Destroys the ripple when the component unmounts', () => {
  const wrapper = mount(<IconToggle {...defaultProps} rippleEnabled />);
  const instance = wrapper.instance();
  instance.rippleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.rippleDestroy).toHaveBeenCalledTimes(1);
});

test('Does not detroy the ripple when the component unmounts without a ripple', () => {
  const wrapper = mount(<IconToggle {...defaultProps} />);
  const instance = wrapper.instance();
  instance.rippleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.rippleDestroy).toHaveBeenCalledTimes(0);
});

test('Destorys the iconToggleFoundation when the component unmounts', () => {
  const wrapper = mount(<IconToggle {...defaultProps} rippleEnabled />);
  const instance = wrapper.instance();
  instance.iconToggleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.iconToggleDestroy).toHaveBeenCalledTimes(1);
});

test('\'getTabIndex()\' returns the tab index in state', () => {
  const TAB_INDEX = 2;
  const wrapper = shallow(
    <IconToggle {...defaultProps} tabIndex={TAB_INDEX} />,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const expected = TAB_INDEX;

  const actual = instance.getTabIndex();

  expect(actual).toBe(expected);
});

test('\'updateAttributes()\' updates the list of attributes in state', () => {
  const ATTRIBUTES = { ATTRIBUTE: 'ATTRIBUTE' };
  const wrapper = shallow(<IconToggle {...defaultProps} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = ATTRIBUTES;
  instance.updateAttributes(ATTRIBUTES);

  const actual = instance.state.attributes;

  expect(actual).toEqual(expected);
});

test('Updates classNames in state when \'updateClassNames()\' is called', () => {
  const CLASS_NAMES = ['CLASS_NAME'];
  const wrapper = mount(<IconToggle {...defaultProps} />);
  const instance = wrapper.instance();
  const expected = CLASS_NAMES;

  instance.updateClassNames(CLASS_NAMES);
  const actual = instance.state.classNames;

  expect(actual).toEqual(expected);
});

test('Does not update classNames in state when \'updateClassNames()\' is called on an unmounted component', () => {
  const CLASS_NAMES = ['CLASS_NAME'];
  const wrapper = mount(<IconToggle {...defaultProps} />);
  const instance = wrapper.instance();
  instance.setState = jest.fn();

  instance.componentIsMounted = false;
  instance.updateClassNames(CLASS_NAMES);

  expect(instance.setState).toHaveBeenCalledTimes(0);
});

test('Updates cssVariables in state when \'updateCssVariables()\' is called', () => {
  const CSS_VARIABLES = ['CSS_VARIABLE'];
  const wrapper = mount(<IconToggle {...defaultProps} />);
  const instance = wrapper.instance();
  const expected = CSS_VARIABLES;

  instance.updateCssVariables(CSS_VARIABLES);
  const actual = instance.state.cssVariables;

  expect(actual).toEqual(expected);
});

test('Does not update cssVariables in state when \'updateCssVariables()\' is called on an unmounted component', () => {
  const CSS_VARIABLES = ['CSS_VARIABLE'];
  const wrapper = mount(<IconToggle {...defaultProps} />);
  const instance = wrapper.instance();
  instance.setState = jest.fn();

  instance.componentIsMounted = false;
  instance.updateCssVariables(CSS_VARIABLES);

  expect(instance.setState).toHaveBeenCalledTimes(0);
});

test('\'updateTabIndex()\' updates the tab index in state', () => {
  const TAB_INDEX = 2;
  const wrapper = shallow(<IconToggle {...defaultProps} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = TAB_INDEX;
  instance.updateTabIndex(TAB_INDEX);

  const actual = instance.state.tabIndex;

  expect(actual).toEqual(expected);
});

test('\'updateText()\' updates the tab index in state', () => {
  const TEXT = 'TEXT';
  const wrapper = shallow(<IconToggle {...defaultProps} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  const expected = TEXT;
  instance.updateText(TEXT);

  const actual = instance.state.text;

  expect(actual).toEqual(expected);
});
