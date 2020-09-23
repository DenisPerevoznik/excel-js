import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '../../constans';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const content = state.dataState[id] || '';
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
    return `
     <div class="cell" contenteditable 
      style="${styles}; width: ${width}" data-col="${col}"
      data-id="${id}" data-value="${content || ''}" data-type="cell">
        ${parse(content)}</div>
     `;
  };
}

function createCol(char, index, width) {
  return `
    <div class="column" style="width: ${width}" 
      data-type="resizable" data-col="${index}">
      ${char}
      <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(index, content, height) {
  const resizer = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';

  return `
    
    <div class="row" style="height: ${height}" 
      data-row="${index}" data-type="resizable">
        <div class="row-info">
          ${index ? index : ''}
          ${resizer}
        </div>

        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}
function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

export function createTable(rowsCount = 30, state) {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount).fill('')
      .map(toChar)
      .map((char, index) => createCol(char, index,
          getWidth(state.colState, index)))
      .join('');

  const rows = [];

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('')
        .map(toChar)
        .map(createCell(state, i))
        .join('');

    const index = i + 1;
    rows.push(createRow(index, cells, getHeight(state.rowState, index)));
  }

  return rows.join('');
}
