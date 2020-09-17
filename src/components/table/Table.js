import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {tableResizeHandler} from './table.resize';
import {shouldResize} from './table.functions';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

    static className = 'excel__table';

    toHTML() {
      return createTable(150);
    }

    onMousedown(event) {
      if (shouldResize(event)) {
        tableResizeHandler(this.$root, event);
      }
    }
}
