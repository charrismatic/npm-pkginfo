import { help } from "../help";
import { pkgver } from "../var/pkgver";
import { debug } from "../util/debug";
import { parse_options } from "./parse_options";
// =====================================================
// HANDLE STDIN AND PROCESS
// =====================================================
const parse_args = (args) => {
  debug("[parse_args] args", typeof(args), {args});

  var options = {};

  if (!args || args.length === 0){
    return false;
  } else if (!Array.isArray(args)) {

    if (typeof(args) === "object" && Object.entries(args).length > 0) {
      parse_options(args);
    }

    return false;

  } else {
    var arg = args.shift();
    do {
      debug("[parse_args] start loop", arg);
      switch (arg) {
      case __filename:
        debug("found this file, skipping", arg);
        debug("next arg", arg);
        break;

      case "--help":
        help();
        debug("[parse_args] set help", arg);
        debug("[parse_args] print help exit");
        process.exit(0);
        break;

      case "--version":
        debug("[parse_args] print version exit");
        pkgver();
        process.exit(0);
        break;

      case "--verbose":
        options.verbose = true;
        debug("[parse_args] set verbose", arg);
        break;

      case "--nocolor":
        process.env.NOCOLOR = true;
        options.color = false;
        debug("[parse_args] set color", arg);
        break;

      case "--file":
        arg = args.shift() || false;
        options.file = arg;
        debug("[parse_args] set file", arg);
        break;

      default:
        if (arg.match(/^--/)){
          var arg_status = [];
          arg_status.push("unknown");
        } else if (typeof(arg) === "undefined") {
          debug("[parse_args] is undefined", arg);
          arg_status.push("undefined");
        } else if ( arg.length > 0) {
          options.query = arg;
          arg_status = "query";
          debug("[parse_args] is query", arg);
        } else {
          debug("[parse_args] didnt match passing..", arg_status, arg);
          console.log(["Notice: Argument", arg, "is unknown"].join(" "));
        }
        debug("----end loop----\n");
      }

      arg = args.shift();
    } while (arg);
    debug("stopping", args, arg);
  }
  debug("[parse_args] end loop", JSON.stringify({options}));
  return options;
};

export { parse_args };
