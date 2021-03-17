module.exports = function override(config, env) {
  // add CodeSee babel plugin
  if (env === 'development') {
    const babelLoaderConfig = config.module.rules[2].oneOf[1];
    babelLoaderConfig.options.plugins.push(["@codesee/instrument", {hosted: true} ]);
  }

  return config;
}
