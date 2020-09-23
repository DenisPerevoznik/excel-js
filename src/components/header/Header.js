import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from './header.template';
import * as actions from '@/redux/actions';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['change'],
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
}
