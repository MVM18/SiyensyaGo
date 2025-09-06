module.exports = function (api) {\n  api.cache(true);\n  return {\n    presets: ['babel-preset-expo'],\n    plugins: ['react-native-worklets/plugin'],\n  };\n};\n
