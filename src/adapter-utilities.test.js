import {
  addClass,
  deregisterInteractionHandler,
  getAttribute,
  notifyChange,
  registerInteractionHandler,
  removeAttribute,
  removeClass,
  setAttribute,
  setText,
} from './adapter-utilities';

const ATTRIBUTE_ONE_KEY = 'ATTRIBUTE_ONE_KEY';
const ATTRIBUTE_ONE_VALUE = 'ATTRIBUTE_ONE_VALUE';
const ATTRIBUTE_TWO_KEY = 'ATTRIBUTE_TWO_KEY';
const ATTRIBUTE_TWO_VALUE = 'ATTRIBUTE_TWO_VALUE';
const CLASS_NAME_1 = 'CLASS_NAME_1';
const CLASS_NAME_2 = 'CLASS_NAME_2';

test('\'addClass()\' adds a className and sends the list to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [CLASS_NAME_1, CLASS_NAME_2];
  const updateClassNames = jest.fn();

  addClass(updateClassNames)(CLASS_NAME_1);
  addClass(updateClassNames)(CLASS_NAME_2);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'deregisterInteractionHandler()\' removes an event listener from the element', () => {
  const HANDLER = 'HANDLER';
  const REMOVE_EVENT_LISTENER = jest.fn();
  const TYPE = 'TYPE';
  const element = { removeEventListener: REMOVE_EVENT_LISTENER };

  deregisterInteractionHandler(element)(TYPE, HANDLER);

  expect(REMOVE_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER);
});

test('\'getAttribute()\' gets a given attribute if it exists', () => {
  const KEY = 'KEY';
  const VALUE = 'VALUE';
  const DATA = { [KEY]: VALUE };
  const expected = VALUE;

  const actual = getAttribute(DATA)(KEY);

  expect(actual).toBe(expected);
});

test('\'getAttribute()\' returns \'undefined\' when key does not exist', () => {
  const KEY = 'KEY';
  const VALUE = 'VALUE';
  const DATA = { [KEY]: VALUE };
  const expected = undefined;

  const actual = getAttribute(DATA)('NOKEY');

  expect(actual).toBe(expected);
});

test('\'notifyChange()\' calls the change handler', () => {
  const ON_CHANGE = jest.fn();
  const IS_ON = 'IS_ON';
  const DATA = { isOn: IS_ON };
  const expected = IS_ON;

  notifyChange(ON_CHANGE)(DATA);

  expect(ON_CHANGE).toHaveBeenCalledWith(expected);
});

test('\'registerInteractionHandler()\' adds a non-passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'TYPE';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  registerInteractionHandler(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, null);
});

test('\'registerInteractionHandler()\' adds a passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'touchstart';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  registerInteractionHandler(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, { passive: true });
});

test('\'setAttribute()\' adds an attribute to the list', () => {
  const UPDATE_ATTRIBUTES = jest.fn();
  const expectedFirst = { [ATTRIBUTE_ONE_KEY]: ATTRIBUTE_ONE_VALUE };
  const expectedSecond = {
    [ATTRIBUTE_ONE_KEY]: ATTRIBUTE_ONE_VALUE,
    [ATTRIBUTE_TWO_KEY]: ATTRIBUTE_TWO_VALUE,
  };

  setAttribute(UPDATE_ATTRIBUTES)(ATTRIBUTE_ONE_KEY, ATTRIBUTE_ONE_VALUE);
  setAttribute(UPDATE_ATTRIBUTES)(ATTRIBUTE_TWO_KEY, ATTRIBUTE_TWO_VALUE);

  expect(UPDATE_ATTRIBUTES.mock.calls[0][0]).toEqual(expectedFirst);
  expect(UPDATE_ATTRIBUTES.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'removeAttribute()\' remove an attribute from the list', () => {
  const UPDATE_ATTRIBUTES = jest.fn();
  const expected = { [ATTRIBUTE_ONE_KEY]: ATTRIBUTE_ONE_VALUE };

  removeAttribute(UPDATE_ATTRIBUTES)(ATTRIBUTE_TWO_KEY);

  expect(UPDATE_ATTRIBUTES).toHaveBeenCalledWith(expected);
});

test('\'removeClass()\' removes a classNames ands sends the list of classNames to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [];
  const updateClassNames = jest.fn();

  removeClass(updateClassNames)(CLASS_NAME_2);
  removeClass(updateClassNames)(CLASS_NAME_1);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'setText()\' calls the update text handler', () => {
  const TEXT = 'TEXT';
  const UPDATE_TEXT = jest.fn();
  const expected = TEXT;

  setText(UPDATE_TEXT)(TEXT);

  expect(UPDATE_TEXT).toHaveBeenCalledWith(expected);
});
