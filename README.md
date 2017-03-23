Bem Classes
===========

A chainable helper for generating BEM-style class names with Javascript.

# Usage

## Blocks

The `bem` function exported from this module returns an instance of BemHelper.  To get started using your BemHelper, create a Block:

```js
// the exposed function returns an instance of BemHelper.
// this represents your basic block.
var bem = require('bem-classes');
var b = bem('foo-bar');
b.classes(); // => 'foo-bar'
```

## Elements

Elements within a Block are represented using the e() method, which takes a string as an argument.

```js
var b = bem('foo-bar');
b.e('el').classes(); // => 'foo-bar__el'
b.classes(); // => 'foo-bar'
```

## Modifiers

Conditional modifiers can be applied via the m() method, which takes an object as an argument.  The keys of that object are class names and the values will be evaluated down to a boolean.  Truthy values will result in the class being added, while falsy value classes will be ignored.

```js
var b = bem('foo-bar');
b.m({
  active: true,
  loading: false
}).classes(); // => 'foo-bar foo-bar--active'
b.e('el').m({ loading: true }).classes(); // => 'foo-bar__el foo-bar__el--loading'

```

## Additional classes

Additional classes can be added to a BemHelper using the and() method, which takes any number of strings as arguments.

```js
var b = require('bem-classes');

b('foo-bar')
.e('button')
.m({ blue: someTruthyValue })
.and('bootstrap-style', 'another')
.classes(); // => 'foo-bar__button foo-bar__button--blue bootstrap-style another'
```


# Usage with React

#### Header.jsx

```js
import bem from 'bem-classes';

// ...
// Just mocking this loading prop
this.props = {
  loading: false
};

this.state = {
  disabled: true
};
// ...

render() {
  const b = bem('header');
  const { props, state } = this;
  const buttonClasses = b.e('button').m({
    loading: props.loading,
    disabled: state.disabled
  }).classes();

  return (
    <header className={b.classes()}>
      <a className={b.e('logo-link').classes()} href="#">
        <img className={b.e('logo').classes()} src="img.png" />
      </a>
      <button type="button"
        className={buttonClasses}
        onClick={this.handleClick}
      >Log in</button>
    </header>
  );
};
```

#### Renders

```html
<header class="header">
  <a class="header__logo-link" href="#">
    <img class="header__logo" src="img.png" />
  </a>

  <button type="button" class="header__button header__button--disabled">Log in</button
</header>

```

## License

[MIT](LICENSE). Copyright (c) 2017 Thomas Peduto.
