module.exports = {
    "env": {
        "node": true,
        "browser": false,
        "es6": true,
        "shelljs": true,
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "plugins": [
      'import',
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
      "indent": ["warn", 2],
      "linebreak-style": [ "error",  "unix" ],
      "quotes": [
         "error", "double" ],

      "semi": [ 0 ],
      // Stylistic Issues
      'key-spacing': 0,
      'keyword-spacing': 0,
      // 'jsx-quotes': [ 1, 'prefer-double' ],
      'comma-spacing': 0,
      'no-multi-spaces': 0,
      'brace-style': 0,
      'camelcase': 0,
      'consistent-this': 1,
      'eol-last': 0,
      'func-names': 0,
      'func-style': 0,
      'new-cap': 0,
      'new-parens': 0,
      'no-nested-ternary': 0,
      'no-array-constructor': 1,
      'no-empty-character-class': 1,
      'no-lonely-if': 0,
      'no-new-object': 1,
      'no-spaced-func': 0,
      'no-ternary': 0,
      'no-trailing-spaces': 0,
      'no-underscore-dangle': 0,
      'no-mixed-spaces-and-tabs': 0,
      // Import Plugin
      'import/no-unresolved': 2,
      'import/default': 2,
      'import/export': 2,
      'import/named': 2,
      'import/namespace': 2,
      'import/no-duplicates': 1,
      'import/no-named-as-default-member': 1,
      'import/no-named-as-default': 1,
    }
};
