
import { print_item } from "./print_item";
import { print_line } from "./print_line";
import { sort_keys } from "../main/sort_keys";
import { COLR } from "../util/color";
import { encoding } from "../var/encoding";


const print_loop = (iterable, options) => {
  if (! iterable) { return }

  var KEY_STYLE = options.key_style || "brightgreen";
  var VAL_STYLE = options.val_style || "white";
  var COLSPACE = " ";
  var PADSTART =  "  ";
  var LINE_MAXLEN = process.stdout.columns || 80;

  var formatted=[];
  var key_maxlen = 0;
  var item_lenmin = 50;

  const items = sort_keys(Object.entries(iterable));
  var key_diff = items.long - items.short;


  if (items.sorted.length === 0 ) { return }
  var item_options = {
    line_maxlen: LINE_MAXLEN,
    key_maxlen:  LINE_MAXLEN / 2,
    padstart: PADSTART,
    key_long: items.long,
    colspace: COLSPACE,
    key_style: KEY_STYLE,
    val_style: VAL_STYLE,
  };

  for (var item of items.sorted){
    print_item(item[0], item[1], item_options)
  }
  return;
};

export { print_loop };
