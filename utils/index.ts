/* eslint-disable no-case-declarations */
import 'react-native-get-random-values'
import { ethers } from "ethers";
import { Buffer } from "buffer";
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import ethereumjs from 'ethereumjs-wallet';
import Web3 from 'web3';
import Moralis from 'moralis';
import {Animated} from "react-native";
// import tinysecp from 'rn-secp256k1'
// import tinysecp from 'tiny-secp256k1'
// import nacl from "tweetnacl";

// console.log(tinysecp)
// @ts-ignore
export const DERIVATION_PATH = {
    bip44Change: "bip44Change",
};

const JSON_RPC_PATH = 'http://3.72.109.56:8545';
// const REST_PATH = '52.59.220.121'
// "mountain toilet almost birth forest ghost hand drum success enhance garment slice pipe option eager palace adult bridge speak gasp leopard jealous insane drama"

const generateMnemonic = async () => {

    const randomBytes = crypto.getRandomValues(new Uint8Array(32));
    console.log(randomBytes);
    const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
    console.log(mnemonic);
    return mnemonic;
};

const mnemonicToSeed = async (mnemonic: string) => {
    // @ts-ignore
    const seed = await bip39.mnemonicToSeedSync(mnemonic);
    return seed.toString('hex');
    // return Buffer.from(seed).toString("hex");
};

const accountFromSeed = async (
    seed: string,
    walletIndex: number,
    derivationPath: string,
    accountIndex: 0
) => {
    // console.log(`Derive from seed`, seed);
    // const derivedSeed = deriveSeed(
    //     seed,
        // walletIndex,
        // 0,
        // 0
        // accountIndex
        // 0
        // derivationPath,
    // );
    const web3 = new Web3(
        new Web3.providers.HttpProvider(JSON_RPC_PATH, { timeout: 10000 })
    );
    // console.log({derivedSeed});
    // @ts-ignore
    const rootKey = await bip32.fromSeed(Buffer.from(seed, 'hex'));
    const derivedKey = rootKey.derivePath('m/0');

    console.log('DERIVED KEY', derivedKey.toWIF());

    const account = web3.eth.accounts.privateKeyToAccount(derivedKey.privateKey.toString('hex'));
    console.log('Derived address:', {address: account.address})
    const {address, privateKey, encrypt, sign, signTransaction} = account;
    // @ts-ignore
    return {accountIndex, walletIndex: 0, address, privateKey, account};
    // @ts-ignore
    // web3.eth.getAccounts(console.log);

    // const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

    // const acc = new solanaWeb3.Keypair(keyPair);
    const acc = {
        stuff: true
    }
    return acc;
};

const accountFromPrivateKey = (
    privateKey: string,
    walletIndex: 0,
    derivationPath: '',
    accountIndex: 0
) => {
    console.log(`Derive from privateKey`, privateKey);

    const web3 = new Web3(
        new Web3.providers.HttpProvider(JSON_RPC_PATH, { timeout: 10000 })
    );
    // @ts-ignore
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    // console.log({account});
    console.log('Derived address:', {address: account.address})
    const {address, encrypt, sign, signTransaction} = account;
    // @ts-ignore
    return {accountIndex, walletIndex: 0, address, privateKey, account};
    // @ts-ignore
    // web3.eth.getAccounts(console.log);

    // const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

    // const acc = new solanaWeb3.Keypair(keyPair);
    const acc = {
        stuff: true
    }
    return acc;
};

const maskedAddress = (address: string) => {
    if (!address) return;
    return `${address.slice(0, 8)}...${address.slice(address.length - 8)}`;
};

const deriveSeed = (
    seed: string,
    walletIndex: number,
    // derivationPath: string,
    accountIndex: number
): Buffer | undefined => {
    const path44Change = `m/44'/501'/${walletIndex}'/${accountIndex}'/0`;
    // const web3 = new Web3(Web3.givenProvider);
    const web3 = new Web3(
        new Web3.providers.HttpProvider(JSON_RPC_PATH, { timeout: 10000 })
    );
    // @ts-ignore
    const {address, privateKey, encrypt, sign, signTransaction} = web3.eth.accounts.create(seed);
    // console.log({acc});
    // @ts-ignore
    console.log('Derived seed', address, privateKey)
    // @ts-ignore
    return {accountIndex, walletIndex, address, privateKey, seed};
    // return path44Change;
    // return ed25519.derivePath(path44Change, Buffer.from(seed, "hex")).key;
};
const fetchAddressBalance = async (address: string)=>{
    console.log({address});

    const web3 = new Web3(
        // new Web3.providers.HttpProvider('https://speedy-nodes-nyc.moralis.io/d1cbd1b31c803c968a2e54cc/polygon/mainnet')
        // new Web3.providers.HttpProvider('https://speedy-nodes-nyc.moralis.io/d1cbd1b31c803c968a2e54cc/polygon/mumbai')
        new Web3.providers.HttpProvider(JSON_RPC_PATH, { timeout: 10000 })
    );
    // const newAddr = '0x3adf830f167edec8f9f60d88da0cc235abf35edb';
    // console.log({newAddr});
    const balance = await web3.eth.getBalance(address);
    console.log({balance})
    return balance;
}
const signMessage = (message: string, privateKey: string,)=>{
    const web3 = new Web3(
        new Web3.providers.HttpProvider(JSON_RPC_PATH, { timeout: 10000 })
    );
    const signatureData = web3.eth.accounts.sign(message, privateKey);
    // THis is used to validate the address that signed the message.
    // @ts-ignore
    console.log(web3.eth.accounts.recover(signatureData));
    console.log(web3.eth.accounts.recover(message, signatureData.signature));
    return signatureData
}
const sendTransaction = async (transactionParams ={}, account)=>{
    // @ts-ignore
    const {address, amount} = transactionParams
    const web3 = new Web3(
        new Web3.providers.HttpProvider(JSON_RPC_PATH)
    );
    if(!address) throw new Error('Missing address');
    if(!amount) throw new Error('Missing amount');

    const value = Web3.utils.toWei(amount.toString(), 'ether').toString()

    // const balance = await fetchAddressBalance(this.account.address)
    // if(balance<amount){
    //     throw new Error(`Unsufficiant amount ${balance}<${amount}`)
    // }
    console.log(`Sending ${value} to ${address} from ${account.address}`)
    // console.log(web3.eth.accounts.defaultAccount);
    // console.log({balance, value, address})

    try {
        console.log(account);
        const tx = await account.signTransaction({
            to: address,
            from: account.address,
            // nonce: datas.nonce,
            value: value,
            gasPrice: parseInt("11806708705"),
            gasLimit: 21000,
        });
        console.log(tx);
        console.log(tx.rawTransaction);
        const res = await web3.eth.sendSignedTransaction(tx.rawTransaction);
        return res;
    } catch (e){
        console.error(e);
        throw e;
    }
}
const sign = (message: string, privateKey: string,)=>{
    const web3 = new Web3(
        new Web3.providers.HttpProvider(JSON_RPC_PATH)
    );
    const signatureData = web3.eth.accounts.sign(message, privateKey);
    // THis is used to validate the address that signed the message.
    // @ts-ignore
    console.log(web3.eth.accounts.recover(signatureData));
    console.log(web3.eth.accounts.recover(message, signatureData.signature));
    return signatureData
}
export {
    fetchAddressBalance,
    accountFromPrivateKey,
    generateMnemonic,
    mnemonicToSeed,
    accountFromSeed,
    maskedAddress,
    deriveSeed,
    signMessage,
    sendTransaction
};
