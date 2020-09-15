
const CODES = {
  A: 65,
  Z: 90,
};

function createCell() {
  return `
    <div class="cell" contenteditable></div>
    `;
}

function createCol(char) {
  return `
    <div class="column">${char}</div>
    `;
}

function createRow(content, num) {
  return `
    
    <div class="row">
        <div class="row-info">${num || ''}</div>

        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 30) {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount).fill('')
      .map(toChar)
      .map(createCol)
      .join('');

  const cells = new Array(colsCount).fill('')
      .map(createCell).join('');

  const rows = [];

  rows.push(createRow(cols));

  for (let i = 1; i <= rowsCount; i++) {
    rows.push(createRow(cells, i));
  }

  return rows.join('');
}
