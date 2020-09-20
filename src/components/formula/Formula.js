import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  static className = 'excel__formula';

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" id="formula" contenteditable spellcheck="false"></div> 
    `;
  }

  init() {
    super.init();

    const $formula = this.$root.find(`#formula`);

    this.subscribe('table:select', $cell => {
      $formula.text($cell.text());
    });

    this.subscribe('table:input', $cell => {
      $formula.text($cell.text());
    });
  }

  onInput(event) {
    this.emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      this.emit('formula:done');
    }
  }
}
