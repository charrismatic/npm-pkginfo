const listwrap = "\n   ";
const coldiv = "\t";

const help = () => {
  console.log([
    ["\n npm-pkginfo-cli", "npm package info utility"].join(" - "),
    ["\n [USAGE]", "pkginfo [options] <selection>" ].join(listwrap),
    ["\n [OPTIONS]",
    ].join(listwrap),
    ["\n [Commands]",
      ["  --sort-stars", "Sort by stars (default)"].join(coldiv),
      ["  --sort-downloads", "Sort by downloads"].join(coldiv),
    ].join(listwrap),
    ["\n [GENRAL OPTIONS]",
      ["  --help       ", "Show this help menu"].join(coldiv),
      ["  --verbose    ", "Show more information"].join(coldiv),
      ["  --nocolor    ", "Disable color printing on output"].join(coldiv),
      ["  --version    ", "Output package version number"].join(coldiv),
    ].join(listwrap),
    [""],
  ].join("\n"));
};

export { help };
