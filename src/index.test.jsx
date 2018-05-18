import * as iconToggle from '@material/icon-toggle';
import { strings } from '@material/icon-toggle/constants';
import { mount, shallow } from 'enzyme';
import React from 'react';

import IconToggle from './index';

const ICON_OFF = 'ICON_OFF';
const ICON_ON = 'ICON_ON';
const LABEL_OFF = 'LABEL_OFF';
const LABEL_ON = 'LABEL_ON';
const ON_CHANGE = () => 'ON_CHANGE';

test('Renders the default classNames', () => {
  const wrapper = shallow(
    <IconToggle
      iconOff={ICON_OFF}
      iconOn={ICON_ON}
      labelOff={LABEL_OFF}
      labelOn={LABEL_ON}
      onChange={ON_CHANGE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = 'material-icons mdc-icon-toggle';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders additional classNames from the \'className\' prop', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <IconToggle
      className={CLASS_NAME}
      iconOff={ICON_OFF}
      iconOn={ICON_ON}
      labelOff={LABEL_OFF}
      labelOn={LABEL_ON}
      onChange={ON_CHANGE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = `material-icons mdc-icon-toggle ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders a disabled icon-toggle', () => {
  const wrapper = shallow(
    <IconToggle
      disabled
      iconOff={ICON_OFF}
      iconOn={ICON_ON}
      labelOff={LABEL_OFF}
      labelOn={LABEL_ON}
      onChange={ON_CHANGE}
    />,
    { disableLifecycleMethods: true },
  );
  const expectedClassName = 'material-icons mdc-icon-toggle mdc-icon-toggle--disabled';
  const expectedDisabled = true;

  const wrapperProps = wrapper.props();
  const actualClassName = wrapperProps.className;
  const actualDisabled = wrapperProps['aria-disabled'];

  expect(actualClassName).toBe(expectedClassName);
  expect(actualDisabled).toBe(expectedDisabled);
});

test('Renders the necessary data attributes', () => {
  const wrapper = shallow(
    <IconToggle
      iconOff={ICON_OFF}
      iconOn={ICON_ON}
      labelOff={LABEL_OFF}
      labelOn={LABEL_ON}
      onChange={ON_CHANGE}
    />,
    { disableLifecycleMethods: true },
  );
  const expectedDataToggleOff = JSON.stringify({ content: ICON_OFF, label: LABEL_OFF });
  const expectedDataToggleOn = JSON.stringify({ content: ICON_ON, label: LABEL_ON });

  const wrapperProps = wrapper.props();
  const actualDataToggleOff = wrapperProps['data-toggle-off'];
  const actualDataToggleOn = wrapperProps['data-toggle-on'];

  expect(actualDataToggleOff).toBe(expectedDataToggleOff);
  expect(actualDataToggleOn).toBe(expectedDataToggleOn);
});

test('Passes through the correct props', () => {
  const wrapper = shallow(
    <IconToggle
      iconOff={ICON_OFF}
      iconOn={ICON_ON}
      labelOff={LABEL_OFF}
      labelOn={LABEL_ON}
      onChange={ON_CHANGE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = LABEL_OFF;

  const actual = wrapper.props()['aria-label'];

  expect(actual).toBe(expected);
});

test('Creates the MDCIconToggle component on mount', () => {
  const listen = jest.fn();
  const MDCIconToggle = jest.fn();
  MDCIconToggle.mockImplementation(() => ({ listen }));
  iconToggle.MDCIconToggle = MDCIconToggle;
  const wrapper = mount(
    <IconToggle
      iconOff={ICON_OFF}
      iconOn={ICON_ON}
      labelOff={LABEL_OFF}
      labelOn={LABEL_ON}
      onChange={ON_CHANGE}
    />,
  );
  const instance = wrapper.instance();
  const expectedListenOne = strings.CHANGE_EVENT;
  const expectedListenTwo = ON_CHANGE;
  const expectedMDCIconToggle = instance.elementRoot;

  const listenMockCall = listen.mock.calls[0];
  const actualListenOne = listenMockCall[0];
  const actualListenTwo = listenMockCall[1];
  const actualMDCIconToggle = MDCIconToggle.mock.calls[0][0];

  expect(actualListenOne).toBe(expectedListenOne);
  expect(actualListenTwo).toBe(expectedListenTwo);
  expect(actualMDCIconToggle).toBe(expectedMDCIconToggle);
});

test('Destroys the MDCIconToggle component on unmount', () => {
  const destroy = jest.fn();
  const unlisten = jest.fn();
  const wrapper = mount(
    <IconToggle
      iconOff={ICON_OFF}
      iconOn={ICON_ON}
      labelOff={LABEL_OFF}
      labelOn={LABEL_ON}
      onChange={ON_CHANGE}
    />,
  );
  const instance = wrapper.instance();
  const expectedDestroy = 1;
  const expectedUnlistenOne = strings.CHANGE_EVENT;
  const expectedUnlistenTwo = ON_CHANGE;
  instance.iconToggle = { destroy, unlisten };

  wrapper.unmount();
  const unlistenMockCall = unlisten.mock.calls[0];
  const actualDestroy = destroy.mock.calls.length;
  const actualUnlistenOne = unlistenMockCall[0];
  const actualUnlistenTwo = unlistenMockCall[1];

  expect(actualDestroy).toBe(expectedDestroy);
  expect(actualUnlistenOne).toBe(expectedUnlistenOne);
  expect(actualUnlistenTwo).toBe(expectedUnlistenTwo);
});

test('Adds extra properties that are passed in', () => {
  const DATA_QA = 'DATA_QA';
  const wrapper = shallow(
    <IconToggle
      data-qa={DATA_QA}
      iconOff={ICON_OFF}
      iconOn={ICON_ON}
      labelOff={LABEL_OFF}
      labelOn={LABEL_ON}
      onChange={ON_CHANGE}
    />,
    { disableLifecycleMethods: true },
  );
  const expected = DATA_QA;

  const actual = wrapper.props()['data-qa'];

  expect(actual).toBe(expected);
});
