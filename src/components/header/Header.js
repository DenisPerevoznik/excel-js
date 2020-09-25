import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from './header.template';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {removeStorage} from '@core/utils';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['change', 'click'],
      ...options,
    });
  }

    static className = 'excel__header';

    toHTML() {
      return createHeader(this.store.getState());
    }

    onChange(event) {
      this.$dispatch(actions.changeTitle(event.target.value));
    }

    onClick(event) {
      const target = $(event.target);
      const type = target.data.type;

      if (type === 'exit') {
        ActiveRoute.navigate('');
      } else if (type === 'remove') { // if remove
        if (confirm('Вы действительно хотите удалить таблицу ?')) {
          removeStorage(ActiveRoute.param);
          ActiveRoute.navigate('');
        }
      }
    }
}
