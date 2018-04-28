# MaterialR IconToggle

**@materialr/icon-toggle**

[![Build Status](https://travis-ci.org/materialr/icon-toggle.svg?branch=master)](https://travis-ci.org/materialr/icon-toggle)
[![Coverage Status](https://coveralls.io/repos/github/materialr/icon-toggle/badge.svg?branch=master)](https://coveralls.io/github/materialr/icon-toggle?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/materialr/projects/9b8a5549-43c4-4bc7-a810-ad08aa4dc88c/badge)](https://nodesecurity.io/orgs/materialr/projects/9b8a5549-43c4-4bc7-a810-ad08aa4dc88c)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

React Material icon-toggle implementation

## Installation

```sh
$ npm install --save @materialr/icon-toggle
```

## Demo

A full demo is available on the
[MaterialR website](https://materialr.github.io/components/icon-toggle) showcasing all variants.

## Components

### Default export

```js
import IconToggle from '@materialr/icon-toggle';
```

**Props**

| Prop        | Type   | Required | Default   | Description                                            |
| ----------- | ------ | -------- | --------- | ------------------------------------------------------ |
| `className` | string | No       | undefined | Additional classNames to add                           |
| `disabled`  | bool   | No       | false     | Whether the icon-toggle is disabled                    |
| `iconOff`   | string | Yes      | N/A       | The material icon to render for the _off_ state        |
| `iconOn`    | string | Yes      | N/A       | The material icon to render for the _on_ state         |
| `labelOff`  | string | Yes      | N/A       | The title to add to the icon-toggle in the _off_ state |
| `labelOn`   | string | Yes      | N/A       | The title to add to the icon-toggle in the _on_ state  |
| `onChange`  | func   | Yes      | N/A       | The change handler method                              |
