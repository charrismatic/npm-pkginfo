// #!/usr/bin/env node

import { debug } from "./lib/util/debug";
import { print_info } from "./lib/render/print_info";
import { encoding } from "./lib/var/encoding";
import { selection_list } from "./lib/var/selection_list";

// =====================================================
// GENERAL HELP AND INFORMATION PACKAGE
//   env     -
//   script  -
//   config  -
//   paths   -
// =====================================================
// ----------------------------------------------------------------------------
function main () {
  const mainpkg = require("../package");
  var line_baselen = 0;
  var window_len = 0;
  var options = {};
  var lswrap = "\n\t";
  var data;
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

export default main;
