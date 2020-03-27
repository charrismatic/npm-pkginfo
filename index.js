// #!/usr/bin/env node

import { debug } from "./lib/util/debug";
import { print_info } from "./lib/render/print_info";
import { encoding } from "./lib/var/encoding";
import { selection_list } from "./lib/var/selection_list";
import { getPkg } from "./lib/get-pkg";


/// GLOBAL CONFIG SETTINGS
var line_baselen = 0;
var window_len = 0;
var options = {};
var ln = "\n\t";
var data;



// =====================================================
// GENERAL HELP AND INFORMATION PACKAGE
//   env     -
//   script  -
//   config  -
//   paths   -
// =====================================================
// ----------------------------------------------------------------------------
function pkgInfo(pkgpath, select) {

  const selection_list = [
    "config",
    "depends",
    "env",
    "paths",
    "scripts",
  ];

  const ln= "\n\t";
  const noselection = "Nothing selected. Choose a category to view.";
  const pkg = require(`${pkgpath}`);

  if ((select) && (selection_list.indexOf(select)>=0)) {
    switch (select) {
    case "app":     print_info(select, pkg.expo);         break;

    case "config":  print_info(select, pkg.config);      break;

    case "env":     print_info(select, process.env);    break;

    case "scripts": print_info(select, pkg.scripts);      break;

    case "depends":
      print_info(select, pkg.dependencies);
      console.log("");
      print_info("Dev Dependencies", pkg.devDependencies );
      break;

    case "paths":   print_info(select, pkg.dirs);          break;

    default:   console.log([noselection, "", selection_list.join(ln), ""].join(ln) );
    }
  } else {
    console.log([noselection, "", selection_list.join(ln), ""].join(ln));
  }
}


function main () {
  if (process.stdin.isTTY) {
    process.stdin.setEncoding(encoding);
    var buf = Buffer.from(process.argv[2] || "").toString(encoding);
    var _select = process.argv[2];
    (async()=>{
      const _pkgpath = await getPkg();
      if (!_pkgpath) {
        console.log("You are not in an a current npm working directory");
        process.exit(0);
      }
      await pkgInfo(_pkgpath, _select)
      console.log("Reading From:", _pkgpath);
    })();
  }
}

main();

