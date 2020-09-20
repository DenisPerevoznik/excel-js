import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscibers = [];
    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  subscribe(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscibers.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscibers.forEach(unsubFn => unsubFn());
  }
}
