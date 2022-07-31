// import {mnemonicToSeed} from "./utils";
import * as bip39 from "bip39";

const mnemonic = 'fit eye anger immune fun rather vacuum badge ritual collect bid enlist biology pond caution million loan unfold round rather never enemy royal until'
// const seed = mnemonicToSeed(mnemonic);
// console.log(seed);
console.log(bip39.mnemonicToSeedSync(mnemonic).toString('hex'))
console.log(mnemonic)

