module.exports = {
  // ...require('some config'),
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.{less,sass,scss,css}',
      options: {
        singleQuote: false,
      },
    },
  ],
};
