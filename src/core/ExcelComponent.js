import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscibers = [];
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Сюда приходят изменения только на те поля, на которые мы подписались
  storeChanged() {}

  on(event, fn) {
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
