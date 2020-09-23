import {$} from '@core/dom';

export function tableResizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const type = $resizer.data.resize;
    const coords = $parent.getCoords();
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
    $resizer.css({opacity: 1, [sideProp]: '-5000px'});

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: -delta + 'px'});
      } else { // type row
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

      resolve({
        value,
        type,
        id: $parent.data[type],
      });

      document.onmousemove = null;
      $resizer.css({opacity: 0, bottom: 0, right: 0});
    };
  });
}
