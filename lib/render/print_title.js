import { fmt, COLR } from "../util/color";

const get_titleline = (title) => {
  return `--- ${title.toUpperCase()} --- \n`
};

const print_titleline = (titleline) => {
  console.log([fmt("cyan", titleline)].join(""))
};


const _title = (title) => {
  print_titleline(get_titleline(title));
};

export { _title };
