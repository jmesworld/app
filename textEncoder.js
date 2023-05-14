// some polyfills
// not currently used, but may be useful in the future
Object.assign(globalThis, {
    self: globalThis,
    crypto: {
      getRandomValues: require("polyfill-crypto.getrandomvalues"),
    },
    TextDecoder: require("text-encoding").TextDecoder,
    TextEncoder: require("text-encoding").TextEncoder,
  });
  
  import { wordlist } from "@scure/bip39/wordlists/english";
  
  function main() {
    const { generateMnemonic, mnemonicToSeedSync } =
      require("@scure/bip39") as typeof import("@scure/bip39");
  
    for (let i = 0; i < 5; i++) {
      const a = generateMnemonic(wordlist);
      mnemonicToSeedSync(a);
    }
  }
  
  main();