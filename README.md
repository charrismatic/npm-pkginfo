
# npm-pkginfo-cli


> Command line utility to view info about your current package

Version: 1.0.0

Topics: [npm](https://github.com/topics/npm),  [package.json](https://github.com/topics/package.json),  [cli](https://github.com/topics/cli),  [npm-utilities](https://github.com/topics/npm-utilities),  


## About

[https://github.com/charrismatic/npm-pkginfo-cli#readme](https://github.com/charrismatic/npm-pkginfo-cli#readme)

The `pkginfo` comand reads you `package.json` and execution environment to print out 
useful info during hte development process. 


__Available Commands:__

  - *config* -- Reads out any keys, value pairs under the package.json `config` key.
  - *depends* -- Prints out a formatted list of project dependencies with their verision
  - *env* -- Prints the current enviornment variables. This command can be useful when added to `npm scripts`,  you can chain the `info env ` command to easier debugging.
  - *paths*  -- shows package directories field. Can also be used to outline important directory paths forand advanced user help utility
  - *scripts* -- prints the the npm scripts in a nicely formatted list. Useful if you need to go back to open the package.json file to reference imporatnt scripts.


__ Planned Commands:__


  - *list-peers* --  List unmet peer-dependencies in the current project.
  - *install-peers* -- Helper script toinstall all unmet peer-dependencies. 
  - *pkg-status* -- Checks for any packages for `invalid`, `extraneous`, `error`, `missing-peer`, and `unmet dependency`


### Author

Matt Harris <charrismatic@protonmail.com> (https://charrismatic.github.io/)

---

### Project Repo

-  type: "git"
-  url: "git+ssh://git@github.com/charrismatic/npm-pkginfo-cli.git"

## Dependencies



### Config Options



## Usage

-  start: "node ."
-  test: "standard"

## Development



### Contributors



### Issues

-  url: "https://github.com/charrismatic/npm-pkginfo-cli/issues"

---

### Licesnse

ISC[ISC](https://opensource.org/licenses/undefined)
