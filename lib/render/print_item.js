import { fmt, COLR } from "../util/color";
import { print_line } from "../render/print_line";


const print_item = (key, value, options) => {
  const key_style = options.key_style || "green";
  const val_style = options.val_style || "yellow";
  const line_max = options.line_maxlen || 80;
  const key_long = options.key_long || 0;
  const colspace = options.colspace || " ";
  const padstart =  options.padstart || " ";

  const key_diff = key_long - key.length;
  const padkey = colspace.padEnd(key_diff, " ");
  const colorKey = fmt(key_style, key)
  const line_left =[padstart, colorKey, padkey, colspace].join("");

  const value_len = line_max - line_left.length;
  const cut_val = value.slice(0, value_len + 1);
  const colorVal = fmt(val_style, cut_val)
  const line_right = colorVal;

  print_line(line_left, line_right);
}

export { print_item };
