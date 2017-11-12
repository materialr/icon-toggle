const PASSIVE_EVENT_LISTENERS = ['touchstart'];
let attributes = {};
let classNames = [];

export const addClass = updateClassNames => (className) => {
  classNames = [...classNames, className];
  updateClassNames(classNames);
};

export const deregisterInteractionHandler = element => (type, handler) =>
  element.removeEventListener(type, handler);

export const getAttribute = data => name => data[name];

export const notifyChange = onChange => ({ isOn }) => onChange(isOn);

export const registerInteractionHandler = element => (type, handler) =>
  element.addEventListener(
    type,
    handler,
    PASSIVE_EVENT_LISTENERS.includes(type) ? { passive: true } : null,
  );

export const removeAttribute = updateAttributes => (name) => {
  attributes = Object.keys(attributes).reduce(
    (accumulator, key) => (key === name ? accumulator : { ...accumulator, [key]: attributes[key] }),
    {},
  );
  updateAttributes(attributes);
};

export const removeClass = updateClassNames => (className) => {
  classNames = classNames.filter(currentClassName => currentClassName !== className);
  updateClassNames(classNames);
};

export const setAttribute = updateAttributes => (name, value) => {
  attributes = { ...attributes, [name]: value };
  updateAttributes(attributes);
};

export const setText = updateText => text => updateText(text);
