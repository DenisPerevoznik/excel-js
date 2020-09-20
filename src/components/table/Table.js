import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {tableResizeHandler} from './table.resize';
import {isCell, shouldResize, matrix, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

    static className = 'excel__table';

    toHTML() {
      return createTable(150);
    }

    prepare() {
      this.selection = new TableSelection();
    }

    init() {
      super.init();

      const $cell = this.$root.find(`[data-id="0:0"]`);
      this.selectCell($cell);

      this.subscribe('formula:input', text => {
        this.selection.current.text(text);
      });

      this.subscribe('formula:done', () => {
        this.selection.current.focus();
      });
    }

    selectCell($cell) {
      this.selection.select($cell);
      this.emit('table:select', $cell);
    }

    onMousedown(event) {
      if (shouldResize(event)) {
        tableResizeHandler(this.$root, event);
      } else if (isCell(event)) {
        const $target = $(event.target);

        if (event.shiftKey) {
          const cells = matrix($target, this.selection.current)
              .map(id => this.$root.find(`[data-id="${id}"]`));
          this.selection.selectGroup(cells);
        } else {
          this.selection.select($target);
        }
      }

      this.emit('table:select', this.selection.current);
    }

    onKeydown(event) {
      const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown',
        'ArrowLeft', 'ArrowRight'];

      const {key} = event;

      if (keys.includes(key) && !event.shiftKey) {
        event.preventDefault();
        const id = this.selection.current.id(true);
        const $next = this.$root.find(nextSelector(key, id));

        this.selectCell($next);
      }
    }

    onInput(event) {
      this.emit('table:input', $(event.target));
    }
}
