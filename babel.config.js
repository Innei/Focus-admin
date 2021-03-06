module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'lib',
        style: 'css',
      },
    ],
  ],
  env: {
    production: {
      presets: ['minify'],
    },
  },
}
