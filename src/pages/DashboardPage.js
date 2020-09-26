import {Page} from '@core/page/Page';
import {$} from '@core/dom';
import {getAllRecords} from '../shared/dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const date = Date.now().toString();
    return $.create('div', 'db').html(`
        <div class="db__header">
                <h1>Excel Dashboard</h1>
            </div>
            <div class="db__new">
                
                <div class="db__view">
                    <a href="#excel/${date}" class="db__create">
                        Новая <br/> Таблица</a>
                </div>

            </div>

            <div class="db__table db__view">

                <div class="db__list-header">
                    <span>Название</span>
                    <span>Дата открытия</span>
                </div>

                <ul class="db__list">
                    ${getAllRecords()}
                </ul>

            </div>
        `);
  }
}
