
const CODES = {
  A: 65,
  Z: 90,
};

function createCell(row) {
  return function(_, col) {
    return `
     <div class="cell" contenteditable data-col="${col}"
       data-id="${row}:${col}" data-type="cell"></div>
     `;
  };
}

function createCol(char, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${char}
      <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(index, content) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>'
    : '';

  return `
    
    <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 30) {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount).fill('')
      .map(toChar)
      .map(createCol)
      .join('');

  const rows = [];

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('')
        .map(toChar)
        .map(createCell(i))
        .join('');

    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
