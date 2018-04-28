import { MDCIconToggle } from '@material/icon-toggle';
import { strings } from '@material/icon-toggle/constants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

class IconToggle extends React.Component {
  constructor(props) {
    super(props);
    this.elementRoot = undefined;
    this.iconToggle = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.getJSONOff = this.getJSONOff.bind(this);
    this.getJSONOn = this.getJSONOn.bind(this);
  }
  componentDidMount() {
    const { elementRoot, props: { onChange } } = this;
    this.iconToggle = new MDCIconToggle(elementRoot);
    this.iconToggle.listen(strings.CHANGE_EVENT, onChange);
  }
  componentWillUnmount() {
    this.iconToggle.unlisten(strings.CHANGE_EVENT, this.props.onChange);
    this.iconToggle.destroy();
  }
  getClassNames() {
    const { className, disabled } = this.props;
    return classnames({
      'material-icons': true,
      'mdc-icon-toggle': true,
      'mdc-icon-toggle--disabled': disabled,
      [className]: !!className,
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
  render() {
    const { getClassNames, getJSONOff, getJSONOn, props: { labelOff } } = this;
    return (
      <i
        aria-label={labelOff}
        aria-pressed="false"
        className={getClassNames()}
        data-toggle-off={getJSONOff()}
        data-toggle-on={getJSONOn()}
        ref={(iconToggle) => { this.iconToggle = iconToggle; }}
        role="button"
      />
    );
  }
}

IconToggle.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  iconOff: PropTypes.string.isRequired,
  iconOn: PropTypes.string.isRequired,
  labelOff: PropTypes.string.isRequired,
  labelOn: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

IconToggle.defaultProps = {
  className: undefined,
  disabled: false,
};

export default IconToggle;
