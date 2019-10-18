import terser from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
// import babel from "rollup-plugin-babel";

const executable = require("rollup-plugin-executable");
const filesize = require("rollup-plugin-filesize");
const cleanup = require("rollup-plugin-cleanup");
const json = require("rollup-plugin-json");

const NODE_ENV = process.env.NODE_ENV;

const package_globals = ["node"];

const package_external = package_globals;

const package_config = {
  format : "cjs",
  strict: false,
  compact: false,
  preferConst: true,
  uglify: NODE_ENV === "production" ? true : false,
};

const module_list = [{
  name: "pkginfo",
  banner: "#!/usr/bin/env node",
  path: "./",
  dest: "./dist/",
  input: "index.js",
  output: NODE_ENV === "production" ? "pkginfo.js" : "pkginfo.dev.js",
  assets: false,
}];

// CONFIG
// -------
var cleanup_options = {
  comments: "some",
  maxEmptyLines: 1,
  sourcemap: false,
  compactComments: true,
  extensions: [".js"],
  lineEndings: "unix",
};

const json_options = {
  include: "./package.json",
  exclude: [ "node_modules/**"],
  preferConst: true,
  indent: "  ",
  compact: true,
  namedExports: true
};

const resolve_options = {
  mainFields: ["main"],
  extensions: [".js"],
  preferBuiltins: true,
  browser: false,
  customResolveOptions: {
    moduleDirectory: "lib",
  },
};

const commonjs_options = {
  include: "lib/*",
  exclude: ["node_modules/*"],
  extensions: [ ".js" ],
  sourceMap: false,
  preferBuiltins: false,
};

const terser_options = {
  // parse: {
  //  bare_returns: false,
  //  ecma: 8,
  //  shebang: true,
  // },
  compress: {
    arrows: true,
    arguments: true,
    booleans: true,
    ecma: 8,
    keep_fargs: true,
    keep_classnames: true,
    keep_fnames: true,
  },
  // mangle: {
  //   module: true,
  //   keep_classnames: false,
  //   keep_fnames: false,
  //   // toplevel: false,
  //   reserved: ["import", "export", "extends", "StyleSheet","Component", "class"],
  // },
  mangle: false,
  output: {
    indent_level: 2,
    braces: true,
    max_line_len: 200,
    semicolons: false,
    comments: false,
    beautify: true,
    // shebang: true,
  },
  // include: [],
  exclude: ["*.dev.js"],
  ecma: 8,
  // toplevel: true,
  module: false,
};

// PLUGINS
// -------

var plugins = [
  replace({"process.env.NODE_ENV": JSON.stringify(NODE_ENV)}),
  // babel({
  //   exclude:"node_modules/**",
  //   runtimeHelpers: false,
  // }),
  resolve(resolve_options),
  commonjs(commonjs_options),
  filesize(),
  json(json_options),
  cleanup(cleanup_options),
  executable(),
];

if (NODE_ENV === "PRODUCTION" && package_config.uglify) {
  plugins.push(terser.terser(terser_options));
}

var modules = [];
var config;
for (var mod of module_list) {
  config = {};
  config.input = mod.path + mod.input;
  config.output = {
    name: mod.name,
    file: mod.dest + mod.output,
    sourcemap: mod.sourcemap ? true : false,
    watch: mod.watch ? true : false,
    globals: mod.globals ? package_globals.concat(mod.globals) : package_globals,
    banner: mod.banner,
    strict: package_config.strict ? true : false,
    compact:  package_config.compact ? true : false,
    format: package_config.format ? package_config.format : "cjs",
    preferConst: package_config.preferConst ? true : false,
  };
  config.external = mod.external ? package_external.concat(mod.external) : package_external,
  config.plugins = plugins;
  if (mod.watch) {
    config.watch = mod.path;
  }
  modules.push(config);
}

export { modules as default };
