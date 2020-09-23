import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {tableResizeHandler} from './table.resize';
import {isCell, shouldResize, matrix, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultStyles} from '../../constans';
import {parse} from '@core/parse';

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
      return createTable(150, this.store.getState());
    }

    prepare() {
      this.selection = new TableSelection();
    }

    init() {
      super.init();

      const $cell = this.$root.find(`[data-id="0:0"]`);
      this.selectCell($cell);

      this.on('formula:input', text => {
        this.selection.current
            .attr('data-value', text);
        this.selection.current.text(parse(text));
        this.updateTextInStore(text);
      });

      this.on('formula:done', () => {
        this.selection.current.focus();
      });

      this.on('toolbar:applyStyle', style => {
        this.selection.applyStyle(style);
        this.$dispatch(actions.applyStyle({
          value: style,
          ids: this.selection.selectedIds,
        }));
      });
    }

    selectCell($cell) {
      this.selection.select($cell);
      this.emit('table:select', $cell);

      const styles = $cell.getStyles(Object.keys(defaultStyles));
      this.$dispatch(actions.changeStyles(styles));
    }

    async tableResize(event) {
      try {
        const data = await tableResizeHandler(this.$root, event);
        this.$dispatch(actions.tableResize(data));
      } catch (error) {
        console.warn('Resize error: ', error.message);
      }
    }

    onMousedown(event) {
      if (shouldResize(event)) {
        this.tableResize(event);
      } else if (isCell(event)) {
        const $target = $(event.target);

        if (event.shiftKey) {
          const cells = matrix($target, this.selection.current)
              .map(id => this.$root.find(`[data-id="${id}"]`));
          this.selection.selectGroup(cells);
        } else {
          this.selectCell($target);
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

    updateTextInStore(text) {
      this.$dispatch(actions.changeText({
        value: text,
        id: this.selection.current.id(),
      }));
    }

    onInput(event) {
      // this.emit('table:input', $(event.target));

      this.updateTextInStore($(event.target).text());
    }
}
