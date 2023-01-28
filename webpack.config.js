const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        //dangerouslyAddModulePathsToTranspile: ["node_modules/jmes/src"],
        dangerouslyAddModulePathsToTranspile: [
          'node_modules/jmes/build',
        ],
      },
    },
    argv
  )
  // devServer = {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   },
  //   proxy: {
  //     '/': {
  //       target: 'http://51.38.52.37:1317',
  //       changeOrigin: true,
  //     },
  //   },
  // }
  return config
}
