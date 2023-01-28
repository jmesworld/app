const extraNodeModules = require('node-libs-browser');

module.exports = {
    resolver: {
        extraNodeModules,
        'tiny-secp256k1': require('tiny-secp256k1')
        // 'rn-secp256k1': require('rn-secp256k1')
    },
    transformer: {
        assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    }
};
