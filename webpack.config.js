const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        //dangerouslyAddModulePathsToTranspile: ["node_modules/jmes/src"],
        dangerouslyAddModulePathsToTranspile: ["node_modules/jmes/build"],
      },
    },
    argv
  );
  return config;
};
