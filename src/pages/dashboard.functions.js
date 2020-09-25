import {storage} from '@core/utils';

export function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  const date = new Date(model.lastOpenedDate).toLocaleDateString();
  const time = new Date(model.lastOpenedDate).toLocaleTimeString();
  return `
    <li class="db__record">
        <a href="#excel/${id}">${model.title}</a>
        <strong>${date} ${time}</strong>
    </li>
    `;
}

function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }

    keys.push(key);
  }

  return keys;
}

export function getAllRecords() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>Список таблиц пуст</p>`;
  }

  return keys.map(toHTML).join('');
}
