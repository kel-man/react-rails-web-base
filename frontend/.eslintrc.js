module.exports = {
  extends: ['prettier', 'eslint:recommended', 'plugin:react/recommended'],
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    'prettier/prettier': 1,
    'no-console': 1,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  root: true,
  settings: {
    react: {
      version: '999.999.999',
    },
  },
}
