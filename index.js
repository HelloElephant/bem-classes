/*
 Copyright (c) 2017 Thomas Peduto.
 Licensed under the MIT License (MIT)
 */

(function bemHelperWrapper() {
  function BemHelper(blockName = '', userConfig = {}) {
    // Private members
    const bh = this;
    const block = setDefaultBlock(blockName);
    const conf = setDefaultConfig(userConfig);

    // Public members
    this.prefix = conf.prefix;
    this.elementDelimiter = conf.elementDelimiter;
    this.modifierDelimiter = conf.modifierDelimiter;
    this.block = block;
    this.element = '';
    this.modifiers = [];
    this.nonBem = [];

    // Private methods
    const createClassBase = unboundCreateClassBase.bind(this);
    const createModifierClass = unboundCreateModifierClass.bind(this);

    // Public methods
    this.e = e;
    this.m = m;
    this.and = and;
    this.classes = classes;

    /**
     * Returns new instance of BemHelper class after updating the component
     * property and deleting the e method to prevent element chaining.
     *
     * @param el
     * @returns {BemHelper} b - A clone of this BemHelper where the component property has been
     * updated to reflect block-element name and the 'e' method has been deleted.
     */
    function e(el = '') {
      const b = clone(bh);

      if (typeof el === 'string' && el.length) {
        b.element = el;
      } else if (typeof el !== 'string') {
        console.error('Element name must be of type String');
        return null;
      } else {
        console.error('Element name cannot be empty String');
        return null;
      }

      delete b.e;
      return b;
    }

    /**
     * For each key, the value will be evaluated.  Truthy values cause the matching key to be
     * stored in the modifiers array, allowing that modifier to be printed as part of the string
     * of class names.
     *
     * @param {Object} conf - A configuration object where keys are modifier names with
     * conditionals as values.
     * @returns {BemHelper} b - A clone of this BemHelper where the component property has
     * been updated to reflect block-element name and the 'e' and 'm' methods have been deleted.
     */
    function m(c = {}) {
      const b = clone(bh);
      const modifiers = []

      for (const key of Object.keys(c)) {
        if (c[key]) {
          modifiers.push(key);
        }
      }

      if (b.e) {
        delete b.e;
      }

      delete b.m;
      b.modifiers = modifiers;
      return b;
    }

    /**
     * Allows helper to append non-bem classes if necessary.
     *
     * @param {String} args - Any number of strings as args, these are non-bem classes
     * that should be appended.
     * @returns {BemHelper} b - A clone of this BemHelper where the component property
     * has been updated to reflect block-element name and the 'e', 'm', and 'add' methods
     * have been deleted.
     */
    function and(...args) {
      const b = clone(bh);

      for (const a of args) {
        if (typeof a === 'string' && a.length) {
          b.nonBem.push(a);
        }
      }

      if (b.e) {
        delete b.e;
      }

      if (b.m) {
        delete b.m;
      }

      delete b.and;
      return b;
    }

    /**
     * This method serializes the BemHelper into a class list for use in markup.
     *
     * @returns {string} c - A formatted string containing all classes requested.
     */
    function classes() {
      let classString = createClassBase();

      for (const mod of bh.modifiers) {
        classString += ` ${createModifierClass(mod)}`;
      }

      if (bh.nonBem.length) {
        classString += ` ${bh.nonBem.join(' ')}`;
      }

      return classString;
    }

    /**
     * Creates class base from prefix, block, and element names.
     * @returns {string|*}
     */
    function unboundCreateClassBase() {
      let className = this.prefix ? `${this.prefix}-${this.block}` : this.block;
      className += this.element ? `${this.elementDelimiter}${this.element}` : '';

      return className;
    }

    /**
     * Creates fully qualified className out of modifier.
     * @param {String} mod - Modifier from modifiers array.
     * @returns {String} - BEMified modifier class
     */
    function unboundCreateModifierClass(mod) {
      return `${createClassBase()}${this.modifierDelimiter}${mod}`;
    }
  }

  /**
   * Returns block name or empty string
   *
   * @param {String} b - Block name
   * @returns {string} block - new Block name
   */
  function setDefaultBlock(b = '') {
    let block = '';

    if (typeof b === 'string' && b.length) {
      block = b;
    }

    return block;
  }

  /**
   * Returns config object based on defaults and user input
   *
   * @param {Object} c - User provided configuration object
   * @returns {Object} config - A configuration object built from default values and user input
   */
  function setDefaultConfig(c = {}) {
    const defaults = {
      prefix: false,
      elementDelimiter: '__',
      modifierDelimiter: '--',
    };

    let config = defaults;

    if (
      typeof c === 'object' &&
      c !== null &&
      Object.keys(c).length
    ) {
      config = Object.assign(config, c);
    }

    return config;
  }

  /**
   * Creates a copy of a BemHelper
   *
   * @param {BemHelper} b - Instance of BemHelper to be copied
   */
  function clone(b) {
    const newHelper = new BemHelper(b.block, {
      prefix: b.prefix,
      elementDelimiter: b.elementDelimiter,
      modifierDelimiter: b.modifierDelimiter,
    });

    newHelper.block = b.block;
    newHelper.element = b.element;
    newHelper.modifiers = b.modifiers;
    newHelper.nonBem = b.nonBem;
    
    return newHelper;
  }

  module.exports = function createBemHelper(b, c) {
    return new BemHelper(b, c);
  };
}());
