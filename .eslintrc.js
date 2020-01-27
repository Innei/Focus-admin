module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/prettier',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],

  plugins: ['prettier'],

  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/prettier',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended'
  ]
}
