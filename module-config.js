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
  compact: NODE_ENV === "production" ? true : false,
  preferConst: true,
  uglify: NODE_ENV === "production" ? true : false,
};

const module_list = [{
  name: "pkginfo",
  banner: "#!/usr/bin/env node",
  path: "./",
  dest: "./bin/",
  input: "index.js",
  output: NODE_ENV === "production" ? "pkginfo" : "pkginfo.dev.js",
  assets: false,
}];


var cleanup_options = {
  comments: NODE_ENV === "production" ? "none" :  "some",
  maxEmptyLines: NODE_ENV === "production" ? 1 :  2,
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
  compress: {
    arrows: true,
    arguments: true,
    booleans: true,
    ecma: 8,
    keep_fargs: true,
    keep_classnames: true,
    keep_fnames: true,
  },
  mangle: {
      properties: {}
  },
  output: {
    indent_level: 2,
    braces: true,
    max_line_len: 160,
    semicolons: true,
    comments: false,
    beautify: true,
    shebang: true,
  },
  exclude: ["*.dev.js"],
  ecma: 8,
  toplevel: true,
  module: false,
};


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

if (NODE_ENV === "production" && package_config.uglify) {
  plugins.push(terser.terser({compress: false, mangle: true}));
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
