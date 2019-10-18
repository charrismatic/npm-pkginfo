import { print_loop } from "./print_loop";
import { _title } from "./print_title";

const print_info = (name, data, options) => {
  if (!options) {
    options = Object.assign({}, options);
  }
  
  _title(name);
  print_loop(data, options);
};

export { print_info };
