#!/usr/bin/env node
const __DEBUG__ = process.env.NODE_DEBUG_LOGGING ? true : false;

var tty = require("tty");

var styles = {
  "reset":     ["0m", "0m"],
  "bold":      ["1m", "22m"],
  "dim":       ["2m", "22m"],
  "italic":    ["3m", "23m"],
  "underline": ["4m", "24m"],
  "inverse":   ["7m", "27m"],

  "black":     ["30m", "39m"],
  "red":       ["31m", "39m"],
  "green":     ["32m", "39m"],
  "yellow":    ["33m", "39m"],
  "blue":      ["34m", "39m"],
  "magenta":   ["35m", "39m"],
  "cyan":      ["36m", "39m"],
  "white":     ["37m", "39m"],
  "default":   ["39m", "39m"],
  "grey":      ["90m", "39m"],

  "brightblack":     ["01;30m", "00;39m"],
  "brightred":       ["01;31m", "00;39m"],
  "brightgreen":     ["01;32m", "00;39m"],
  "brightyellow":    ["01;33m", "00;39m"],
  "brightblue":      ["01;34m", "00;39m"],
  "brightmagenta":   ["01;35m", "00;39m"],
  "brightcyan":      ["01;36m", "00;39m"],
  "brightwhite":     ["01;37m", "00;39m"],
  "brightdefault":   ["01;39m", "00;39m"],
  "brightgrey":      ["01;90m", "00;39m"],

  "bgBlack":   ["40m", "49m"],
  "bgRed":     ["41m", "49m"],
  "bgGreen":   ["42m", "49m"],
  "bgYellow":  ["43m", "49m"],
  "bgBlue":    ["44m", "49m"],
  "bgMagenta": ["45m", "49m"],
  "bgCyan":    ["46m", "49m"],
  "bgWhite":   ["47m", "49m"],
  "bgDefault": ["49m", "49m"]
};

const _c = (styl) => {
  return ["\x1b[", styl].join("");
};

const fmt = (style, text) => {
  if (!styles[style]) { return text; }
  return [ _c(styles[style][0]), text, _c(styles[style][1])].join("");
};

const print_line = (key, value) => {
  console.log([key, value].join("\t"));
};

const print_item = (key, value, options) => {
  const key_style = options.key_style || "green";
  const val_style = options.val_style || "yellow";
  const line_max = options.line_maxlen || 80;
  const key_long = options.key_long || 0;
  const colspace = options.colspace || " ";
  const padstart =  options.padstart || " ";

  const key_diff = key_long - key.length;
  const padkey = colspace.padEnd(key_diff, " ");
  const colorKey = fmt(key_style, key);
  const line_left =[padstart, colorKey, padkey, colspace].join("");

  const value_len = line_max - line_left.length;
  const cut_val = value.slice(0, value_len + 1);
  const colorVal = fmt(val_style, cut_val);
  const line_right = colorVal;

  print_line(line_left, line_right);
};

const sort_keys = (data) => {
  var shortest_key = 999;
  var longest_key = 0;
  var _sorted = data.sort(function(a, b){
    if(a[0].length > longest_key) { longest_key =  a[0].length; }
    if(b[0].length > longest_key) { longest_key =  b[0].length; }
    if(a[0].length < shortest_key) { shortest_key =  a[0].length; }
    if(b[0].length < shortest_key) { shortest_key =  b[0].length; }
    return a[0].localeCompare( b[0], { caseFirst: false, numeric: true })
  });

  return {
    sorted:_sorted,
    long: longest_key,
    short: shortest_key,
  };
};

const encoding = "utf-8";

const print_loop = (iterable, options) => {
  if (! iterable) { return }

  var KEY_STYLE = options.key_style || "brightgreen";
  var VAL_STYLE = options.val_style || "white";
  var COLSPACE = " ";
  var PADSTART =  "  ";
  var LINE_MAXLEN = process.stdout.columns || 80;

  const items = sort_keys(Object.entries(iterable));

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
    print_item(item[0], item[1], item_options);
  }
  return;
};

const get_titleline = (title) => {
  return `--- ${title.toUpperCase()} --- \n`
};

const print_titleline = (titleline) => {
  console.log([fmt("cyan", titleline)].join(""));
};

const _title = (title) => {
  print_titleline(get_titleline(title));
};

const print_info = (name, data, options) => {
  if (!options) {
    options = Object.assign({}, options);
  }

  _title(name);
  print_loop(data, options);
};

const selection_list = [
  "config",
  "dependencies",
  "env",
  "paths",
  "scripts",
];

function main () {
  const mainpkg = require("../package");
  var lswrap = "\n\t";
  var noselection = "Nothing selected. Choose a category to view.";

  if (process.stdin.isTTY) {
    process.stdin.setEncoding(encoding);
    var buf = Buffer.from(process.argv[2] || "").toString(encoding);
    var select = process.argv[2];
    if ((select) && (selection_list.indexOf(select)>=0)) {
      switch (select) {
      case "app":     print_info(select, appconfig.expo);   break;
      case "config":  print_info(select, mainpkg.config);   break;
      case "env":     print_info(select, process.env);      break;
      case "scripts": print_info(select, mainpkg.scripts);  break;
      case "dependencies":
        print_info(select, mainpkg.dependencies);
        console.log("");
        print_info("DevDependencies", mainpkg.devDependencies);
        break;
      case "paths":   print_info(select, mainpkg.dirs);     break;
      default:
        console.log([noselection, "", selection_list.join(lswrap), ""].join(lswrap));
      }
    } else {
      console.log([noselection, "", selection_list.join(lswrap), ""].join(lswrap));
    }
  }
}

main();

module.exports = main;
