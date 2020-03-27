# npm-pkginfo-cli

> Command line utility to view info about your current package

![GitHub package.json version](https://img.shields.io/github/package-json/v/charrismatic/npm-pkginfo-cli?style=for-the-badge)  

Topics: [npm](https://github.com/topics/npm),  [package.json](https://github.com/topics/package.json),  [cli](https://github.com/topics/cli),  [npm-utilities](https://github.com/topics/npm-utilities)

## About

<https://github.com/charrismatic/npm-pkginfo-cli#readme>

The `pkginfo` comand reads you `package.json` and execution environment to print out 
useful info during hte development process. 

**Available Commands:**

-   _config_ -- Reads out any keys, value pairs under the package.json `config` key.
-   _depends_ -- Prints out a formatted list of project dependencies with their verision
-   _env_ -- Prints the current enviornment variables. This command can be useful when added to `npm scripts`,  you can chain the `info env ` command to easier debugging.
-   _paths_  -- shows package directories field. Can also be used to outline important directory paths forand advanced user help utility
-   _scripts_ -- prints the the npm scripts in a nicely formatted list. Useful if you need to go back to open the package.json file to reference imporatnt scripts.

**Planned Commands:**

-   _list-peers_ --  List unmet peer-dependencies in the current project.
-   _install-peers_ -- Helper script toinstall all unmet peer-dependencies. 
-   _pkg-status_ -- Checks for any packages for `invalid`, `extraneous`, `error`, `missing-peer`, and `unmet dependency`

### Author

Matt Harris [charrismatic@protonmail.com](mailto:charrismatic@protonmail.com) (<https://charrismatic.github.io/>)

### Issues

-   url: "<https://github.com/charrismatic/npm-pkginfo-cli/issues>"
