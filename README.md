# @netsells/storybook-vue-generate-arg-types

This package provides a single function to generate your `argType` property on your storybook stories based on the props added to your component.

## Installation

```bash
$ yarn add -D @netsells/storybook-vue-generate-arg-types
```

## Usage

```js
// MyComponent.stories.js
import MyComponent from './MyComponent';
import generateArgTypes from '@netsells/storybook-vue-generate-arg-types';

export default {
    // ...story config
    argTypes: generateArgTypes(MyComponent),
};
```

If for any reason you'd like to override an arg type, you can pass an additional parameter of overrides:

```js
// MyComponent.stories.js
import MyComponent from './MyComponent';
import generateArgTypes from '@netsells/storybook-vue-generate-arg-types';

export default {
    // ...story config
    argTypes: generateArgTypes(MyComponent, {
        myProp: {
            control: 'number',
            default: 5,
        },
    }),
};
```
