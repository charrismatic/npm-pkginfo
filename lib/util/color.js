const COLR = {
  rst: "0m",
  bld: "1m",
  rev: "7m",
  und: "4m",
  hid: "8m",
  dim: "2m",
  blk: "30m",
  blu: "34m",
  cyn: "36m",
  grn: "32m",
  mag: "35m",
  red: "31m",
  wht: "37m",
  yel: "33m",
  bgblk: "40m",
  bgblu: "44m",
  bgcya: "46m",
  bggrn: "42m",
  bgmag: "45m",
  bgred: "41m",
  bgwht: "47m",
  bgyel: "43m",
  btblk: "1;30m",
  btblu: "1;34m",
  btcya: "1;36m",
  btgrn: "1;32m",
  btmag: "1;35m",
  btred: "1;31m",
  btwht: "1;37m",
  btyel: "1;33m",
};

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

// ENABLE COLOR PROPERTIES FOR STRINGS PRINTED TO THE CONSOLE
// Example: 'Message'.red
const colorterm = (enabled=true) => {

  if (!process.env.COLORTERM) {
    console.log("NOTICE: 'COLORTERM' environment variable not set");
    console.log("Set NOCOLOR in the environment to remove this message or use --nocolor in the commandline if there are issues");
  }

  if (enabled){
    enabled = !process.env.NOCOLOR && tty.isatty(1) && tty.isatty(2);
  }

  Object.keys(styles).forEach(function(style) {
    Object.defineProperty(String.prototype, style, {
      get: function() {
        return (enabled ? fmt(styles[style], this) : this);
      },
      enumerable: false
    });
  });

  return styles;
};

export { colorterm, COLR, fmt };
