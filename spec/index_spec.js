var bem = require('../index.js');

describe("BemHelper Factory", function(){
  it("creates an instance of BemHelper", function(){
    var b = bem('article');
    expect(b.constructor.name).toBe('BemHelper');
  });
});

describe("BemHelper Class", function(){
  var b;

  beforeEach(function() {
    b = bem('Foo');
  });

  it("sets default values correctly", function(){
    expect(b.prefix).toBe(false);
    expect(b.block).toBe('Foo');
    expect(b.elementDelimiter).toBe('__');
    expect(b.modifierDelimiter).toBe('--');
    expect(b.element).toBe('');
    expect(b.modifiers).toEqual([]);
    expect(b.nonBem).toEqual([]);
    expect(typeof b.e).toBe('function');
    expect(typeof b.m).toBe('function');
    expect(typeof b.and).toBe('function');
    expect(typeof b.classes).toBe('function');
  });

  it("prints the block level class correctly", function(){
    expect(b.classes()).toBe('Foo');
  });

  it("can add a non-BEM class to a BEM block", function(){
    expect(b.and('bar').classes()).toBe('Foo bar');
  });

  it("can add more than one non-BEM class to a BEM block", function(){
    expect(b.and('bar', 'baz', 'boom').classes()).toBe('Foo bar baz boom');
  });

  it("accepts an element and creates a new instance", function(){
    expect(b.e('baz')).not.toBe(b);
    expect(b.e('baz')).not.toBe(b.e('baz'));
    expect(b.e('baz').classes()).toBe(b.e('baz').classes());
  });

  it("prints the element level class correctly", function(){
    expect(b.e('bar').classes()).toBe('Foo__bar');
  });

  it("can add a non-BEM class to a BEM element", function(){
    expect(b.e('bar').and('baz').classes()).toBe('Foo__bar baz');
  });

  it("can add more than one non-BEM class to a BEM element", function(){
    expect(b.e('bar').and('baz', 'boom').classes()).toBe('Foo__bar baz boom');
  });

  it("accepts a modifier and creates a new instance", function(){
    expect(b.m({baz: true})).not.toBe(b);
    expect(b.m({baz: true})).not.toBe(b.m({baz: true}));
    expect(b.m({baz: true}).classes()).toBe(b.m({baz: true}).classes());
  });

  it("prints the modifier class correctly after the block class", function(){
    expect(b.m({bar: true}).classes()).toBe('Foo Foo--bar');
  });

  it("prints the modifier class correctly after the element class", function(){
    expect(b.e('button').m({bar: true}).classes()).toBe('Foo__button Foo__button--bar');
  });

  it("does not print a modifier class with a falsey value", function(){
    expect(b.m({bar: false}).classes()).toBe('Foo');
  });

  it("prints true modifier classes while ignoring false modifier classes", function(){
    expect(b.m({bar: false, baz: true}).classes()).toBe('Foo Foo--baz');
  });

  it("appends non-bem classes after modifiers", function(){
    expect(b.m({bar: false, baz: true}).and('hi', 'hello').classes()).toBe('Foo Foo--baz hi hello');
  });
});
