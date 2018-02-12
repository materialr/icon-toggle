import { MDCIconToggleFoundation } from '@material/icon-toggle';

import adapterUtilities from './adapter-utilities';

export default ({
  data,
  element,
  getTabIndex,
  onChange,
  updateAttributes,
  updateClassNames,
  updateTabIndex,
  updateText,
}) => {
  const {
    addClass,
    deregisterInteractionHandler,
    getAttribute,
    notifyChange,
    registerInteractionHandler,
    removeAttribute,
    removeClass,
    setAttribute,
    setText,
  } = adapterUtilities();

  return new MDCIconToggleFoundation({
    addClass: addClass(updateClassNames),
    deregisterInteractionHandler: deregisterInteractionHandler(element),
    getAttr: getAttribute(data),
    getTabIndex,
    notifyChange: notifyChange(onChange),
    removeClass: removeClass(updateClassNames),
    registerInteractionHandler: registerInteractionHandler(element),
    rmAttr: removeAttribute(updateAttributes),
    setAttr: setAttribute(updateAttributes),
    setTabIndex: updateTabIndex,
    setText: setText(updateText),
  });
};
