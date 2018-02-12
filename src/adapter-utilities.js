const PASSIVE_EVENT_LISTENERS = ['touchstart'];

export default () => {
  let attributes = {};
  let classNames = [];

  return {
    addClass: updateClassNames => (className) => {
      classNames = [...classNames, className];
      updateClassNames(classNames);
    },
    deregisterInteractionHandler: element => (type, handler) =>
      element.removeEventListener(type, handler),
    getAttribute: data => name => data[name],
    notifyChange: onChange => ({ isOn }) => onChange(isOn),
    registerInteractionHandler: element => (type, handler) =>
      element.addEventListener(
        type,
        handler,
        PASSIVE_EVENT_LISTENERS.includes(type) ? { passive: true } : null,
      ),
    removeAttribute: updateAttributes => (name) => {
      attributes = Object.keys(attributes).reduce(
        (accumulator, key) =>
          (key === name ? accumulator : { ...accumulator, [key]: attributes[key] }),
        {},
      );
      updateAttributes(attributes);
    },
    removeClass: updateClassNames => (className) => {
      classNames = classNames.filter(currentClassName => currentClassName !== className);
      updateClassNames(classNames);
    },
    setAttribute: updateAttributes => (name, value) => {
      attributes = { ...attributes, [name]: value };
      updateAttributes(attributes);
    },
    setText: updateText => text => updateText(text),
  };
};
