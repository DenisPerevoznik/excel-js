import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom';

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
      if (event.target.dataset.resize) {
        const $resizer = $(event.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const type = $resizer.data.resize;
        const coords = $parent.getCoords();
        const sideProp = type === 'col' ? 'bottom' : 'right';
        let value;

        const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
        $resizer.css({opacity: 1, [sideProp]: '-5000px'});

        document.onmousemove = e => {
          if (type === 'col') {
            const delta = e.pageX - coords.right;
            value = coords.width + delta;
            $resizer.css({right: -delta + 'px'});
          } else {
            const delta = e.pageY - coords.bottom;
            value = coords.height + delta;

            $resizer.css({bottom: -delta + 'px'});
          }
        };

        document.onmouseup = () => {
          if (type === 'col') {
            $parent.css({width: value + 'px'});
            cells.forEach(cell => $(cell).css({width: value + 'px'}));
          } else {
            $parent.css({height: value + 'px'});
          }

          document.onmousemove = null;
          $resizer.css({opacity: 0, bottom: 0, right: 0});
        };
      }
    }
}
