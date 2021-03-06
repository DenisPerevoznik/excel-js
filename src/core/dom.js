
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
      return this;
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value;
    }
    return this.$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    this.$el.append(node);
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  get data() {
    return this.$el.dataset;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key];
    });
    return $(this.$el);
  }

  addClass(className) {
    this.$el.classList.add(className);
    return $(this.$el);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return $(this.$el);
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }

    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  getStyles(styles = []) {
    return styles.reduce((res, sKey) => {
      res[sKey] = this.$el.style[sKey];
      return res;
    }, {});
  }

  attr(name, value) {
    if (value !== undefined) {
      this.$el.setAttribute(name, value);
      return this;
    }

    return this.$el.getAttribute(name);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const $el = document.createElement(tagName);
  if (classes) {
    $el.classList.add(classes);
  }

  return $($el);
};
