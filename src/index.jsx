import rippleFoundation from '@materialr/ripple';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/icon-toggle/mdc-icon-toggle.scss';

import iconToggleFoundation from './icon-toggle-foundation';

class IconToggle extends React.Component {
  constructor(props) {
    super(props);
    this.componentIsMounted = undefined;
    this.iconToggle = undefined;
    this.iconToggleFoundation = undefined;
    this.rippleFoundation = undefined;
    this.state = {
      attributes: {},
      classNames: [],
      cssVariables: {},
      tabIndex: props.tabIndex,
      text: props.iconOff,
    };
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesAsString = this.getClassNamesAsString.bind(this);
    this.getClassNamesFromProps = this.getClassNamesFromProps.bind(this);
    this.getJSONOff = this.getJSONOff.bind(this);
    this.getJSONOn = this.getJSONOn.bind(this);
    this.getTabIndex = this.getTabIndex.bind(this);
    this.iconToggleCreate = this.iconToggleCreate.bind(this);
    this.iconToggleDestroy = this.iconToggleDestroy.bind(this);
    this.rippleCreate = this.rippleCreate.bind(this);
    this.rippleDestroy = this.rippleDestroy.bind(this);
    this.updateAttributes = this.updateAttributes.bind(this);
    this.updateClassNames = this.updateClassNames.bind(this);
    this.updateCssVariables = this.updateCssVariables.bind(this);
    this.updateTabIndex = this.updateTabIndex.bind(this);
    this.updateText = this.updateText.bind(this);
  }
  componentDidMount() {
    this.componentIsMounted = true;
    if (this.props.rippleEnabled) {
      this.rippleCreate();
    }
    this.iconToggleCreate();
  }
  componentDidUpdate({ rippleEnabled: wasRippleEnabled }) {
    const { rippleEnabled } = this.props;
    if (wasRippleEnabled && !rippleEnabled) {
      this.rippleDestroy();
    }
    if (!wasRippleEnabled && rippleEnabled) {
      this.rippleCreate();
    }
  }
  componentWillUnmount() {
    this.componentIsMounted = false;
    if (this.props.rippleEnabled && this.rippleFoundation) {
      this.rippleDestroy();
    }
    this.iconToggleDestroy();
  }
  getClassNames() {
    return this.state.classNames.join(' ');
  }
  getClassNamesAsString() {
    return `${this.getClassNamesFromProps()} ${this.getClassNames()} ${this.props.className}`
      .trim().replace('  ', ' ');
  }
  getClassNamesFromProps() {
    const { accent, disabled, primary } = this.props;
    return classnames({
      'material-icons': true,
      'mdc-icon-toggle': true,
      'mdc-icon-toggle--accent': accent,
      'mdc-icon-toggle--disabled': disabled,
      'mdc-icon-toggle--primary': primary,
    });
  }
  getJSONOff() {
    const { iconOff, labelOff } = this.props;
    return JSON.stringify({ content: iconOff, label: labelOff });
  }
  getJSONOn() {
    const { iconOn, labelOn } = this.props;
    return JSON.stringify({ content: iconOn, label: labelOn });
  }
  getTabIndex() {
    return this.state.tabIndex;
  }
  iconToggleCreate() {
    this.iconToggleFoundation = iconToggleFoundation({
      data: { 'data-toggle-off': this.getJSONOff(), 'data-toggle-on': this.getJSONOn() },
      element: this.iconToggle,
      getTabIndex: this.getTabIndex,
      onChange: this.props.onChange,
      updateAttributes: this.updateAttributes,
      updateClassNames: this.updateClassNames,
      updateText: this.updateText,
    });
    this.iconToggleFoundation.init();
  }
  iconToggleDestroy() {
    this.iconToggleFoundation.destroy();
    this.iconToggleFoundation = undefined;
  }
  rippleCreate() {
    const { disabled } = this.props;
    this.rippleFoundation = rippleFoundation({
      centered: true,
      disabled,
      element: this.iconToggle,
      self: this,
      updateClassNames: this.updateClassNames,
      updateCssVariables: this.updateCssVariables,
      updateTabIndex: this.updateTabIndex,
      updateText: this.updateText,
    });
    this.rippleFoundation.init();
  }
  rippleDestroy() {
    this.rippleFoundation.destroy();
    this.rippleFoundation = undefined;
  }
  updateAttributes(attributes) {
    this.setState({ attributes });
  }
  updateClassNames(classNames) {
    if (this.componentIsMounted) {
      this.setState({ classNames });
    }
  }
  updateCssVariables(cssVariables) {
    if (this.componentIsMounted) {
      this.setState({ cssVariables });
    }
  }
  updateTabIndex(tabIndex) {
    this.setState({ tabIndex });
  }
  updateText(text) {
    this.setState({ text });
  }
  render() {
    const { labelOff } = this.props;
    const { attributes, cssVariables, tabIndex, text } = this.state;
    return (
      <i
        aria-label={labelOff}
        aria-pressed="false"
        className={this.getClassNamesAsString()}
        data-toggle-off={this.getJSONOff()}
        data-toggle-on={this.getJSONOn()}
        ref={(iconToggle) => { this.iconToggle = iconToggle; }}
        role="button"
        style={cssVariables}
        tabIndex={tabIndex}
        {...attributes}
      >
        {text}
      </i>
    );
  }
}

IconToggle.propTypes = {
  accent: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  iconOff: PropTypes.string.isRequired,
  iconOn: PropTypes.string.isRequired,
  labelOff: PropTypes.string.isRequired,
  labelOn: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  primary: PropTypes.bool,
  rippleEnabled: PropTypes.bool,
  tabIndex: PropTypes.number,
};

IconToggle.defaultProps = {
  accent: false,
  className: '',
  disabled: false,
  onChange: () => {},
  primary: false,
  rippleEnabled: false,
  tabIndex: 0,
};

export default IconToggle;
