
export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  // cell === DOM
  select(cell) {
    this.clear();
    cell.focus().addClass(TableSelection.className);
    this.group.push(cell);
    this.current = cell;
  }

  clear() {
    this.group.forEach(cell => cell.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup(cells = []) {
    this.clear();
    cells.forEach(cell => {
      cell.addClass(TableSelection.className);
      this.group.push(cell);
    });
  }
}
