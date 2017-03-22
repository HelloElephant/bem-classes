Bem Classes
===========

A chainable helper for generating BEM-style classes in JS.

## Usage

The `bem` function exported from this module creates an instance of BemHelper, a chainable helper that is geared towards generating BEM-style class names.  To get started using basic functionality, try this to create a Block:

```js
// the exposed function returns an instance of BemHelper.
// this represents your basic block.
var bem = require('bem-classes');
var b = bem('foo-bar');
b.classes(); // => 'foo-bar'
```

Elements within a Block can be represented using the e() method, which takes a string as an arguement.

```js
// the exposed function returns an instance of BemHelper.
// this represents your basic block.
var bem = require('bem-classes');
var b = bem('foo-bar');
b.classes(); // => 'foo-bar'
b.e('el').classes(); // => 'foo-bar__el'
```

Conditional modifiers can be applied via the m() method, which takes an object as an argument.  The keys of that object are class names and the values will be evaluated down to a boolean.  Truthy values will result in the class being added, while falsy value classes will be ignored:


# WORKING ON IT...

### Usage with React


## License

[MIT](LICENSE). Copyright (c) 2017 Thomas Peduto.
