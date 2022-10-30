/* eslint-disable no-case-declarations */
import "react-native-get-random-values";
import { Client, Mnemonic } from "jmes";
import { Buffer } from "buffer";
import * as bip39 from "bip39";
import * as bip32 from "bip32";
import Web3 from "web3";

// @ts-ignore
export const DERIVATION_PATH = {
  bip44Change: "bip44Change",
};

export const SCHEMA_PREFIX = "jmes:";

const JSON_RPC_PATH = "http://3.72.109.56:8545";
const LOCAL_SERVER_PATH = "http://localhost:3001";
//const LOCAL_SERVER_PATH = "http://192.168.0.8:3000"; //lan
//const REST_PATH = '52.59.220.121'

const client = new Client();

const generateMnemonic = async () => {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  const mnemonic = Mnemonic.generateMnemonic(randomBytes);
  return mnemonic;
};
const generateAccount = async (mnemonic: string) => {
  const wallet = client.createWallet(new Mnemonic(mnemonic));
  const account = wallet.getAccount();
  return account;
};

const mnemonicToSeed = async (mnemonic: string) => {
  // @ts-ignore
  const seed = await bip39.mnemonicToSeedSync(mnemonic);
  return seed.toString("hex");
  // return Buffer.from(seed).toString("hex");
};

const accountFromAddress = async (address: string) => {
  const response = await fetch(`${LOCAL_SERVER_PATH}/users?address=${address}`);

  const account = await response.json();
  console.log(account);
  return account;
};

const notateWeiValue = async (amount: number) => {
  const fmt /*: BigIntToLocaleStringOptions */ = {
    notation: "scientific",
    maximumFractionDigits: 20, // The default is 3, but 20 is the maximum supported by JS according to MDN.
  };
  //const weiValue = Web3.utils.toBN(Web3.utils.toWei(amount.toString(), "ether")).toString(16)
  const wei = amount * 10e17;
  const weiToBigInt = BigInt(wei).toLocaleString("en-us", fmt);

  return weiToBigInt;
};
const fetchBalance = async (address: string) => {
  const path = `${LOCAL_SERVER_PATH}/users?address=${address}`;
  const rawResponse = await fetch(path, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const parsedResponse = await rawResponse.json();
  const balance = parsedResponse[0].balance.toString();
  //const convertedBalance = (parseInt(balance) * 0.1412840103).toString();
  //setBalanceEur(parseFloat(convertedBalance).toFixed(2));
  return balance;
};

const maskedAddress = (address: string) => {
  if (!address) return;
  return `${address.slice(0, 8)}...${address.slice(address.length - 8)}`;
};

/****** Web 3 functions ******/
// consider moving web3 functions to its own util file

/** files in use **/
// LogUser.tsx using accountFromSeed, deriveSeed,signMessage
// WalletSend.tsx using accountFromPrivateKey,sendTransaction
// WalletReceiveConfirm.tsx using fetchAddressBalance

const accountFromSeed = async (
  seed: string,
  walletIndex: number,
  derivationPath: string,
  accountIndex: 0
) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(JSON_RPC_PATH, { timeout: 10000 })
  );
  const rootKey = await bip32.fromSeed(Buffer.from(seed, "hex"));
  const derivedKey = rootKey.derivePath("m/0");
  console.log("DERIVED KEY", derivedKey.toWIF());

  const account = web3.eth.accounts.privateKeyToAccount(
    derivedKey.privateKey.toString("hex")
  );
  console.log("Derived address:", { address: account.address });
  const { address, privateKey, encrypt, sign, signTransaction } = account;
  // @ts-ignore
  return { accountIndex, walletIndex: 0, address, privateKey, account };
  // @ts-ignore

  const acc = {
    stuff: true,
  };
  return acc;
};
const accountFromPrivateKey = (
  privateKey: string,
  walletIndex: 0,
  derivationPath: "",
  accountIndex: 0
) => {
  //console.log(`Derive from privateKey`, privateKey);
  const web3 = new Web3(
    new Web3.providers.HttpProvider(JSON_RPC_PATH, { timeout: 10000 })
  );
  // @ts-ignore
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  // console.log({account});
  //console.log('Derived address:', {address: account.address})
  const { address, encrypt, sign, signTransaction } = account;
  // @ts-ignore
  return { accountIndex, walletIndex: 0, address, privateKey, account };
  // @ts-ignore
  // web3.eth.getAccounts(console.log);

  // const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

  // const acc = new solanaWeb3.Keypair(keyPair);
  const acc = {
    stuff: true,
  };
  return acc;
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
  const { address, privateKey, encrypt, sign, signTransaction } =
    web3.eth.accounts.create(seed);
  // console.log({acc});
  // @ts-ignore
  console.log("Derived seed", address, privateKey);
  // @ts-ignore
  return { accountIndex, walletIndex, address, privateKey, seed };
  // return path44Change;
  // return ed25519.derivePath(path44Change, Buffer.from(seed, "hex")).key;
};
const fetchAddressBalance = async (address: string) => {
  console.log({ address });

  const web3 = new Web3(
    // new Web3.providers.HttpProvider('https://speedy-nodes-nyc.moralis.io/d1cbd1b31c803c968a2e54cc/polygon/mainnet')
    // new Web3.providers.HttpProvider('https://speedy-nodes-nyc.moralis.io/d1cbd1b31c803c968a2e54cc/polygon/mumbai')
    new Web3.providers.HttpProvider(JSON_RPC_PATH, { timeout: 10000 })
  );
  // const newAddr = '0x3adf830f167edec8f9f60d88da0cc235abf35edb';
  // console.log({newAddr});
  const balance = await web3.eth.getBalance(address);
  console.log({ balance });
  return balance;
};
const signMessage = (message: string, privateKey: string) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(JSON_RPC_PATH, { timeout: 10000 })
  );
  const signatureData = web3.eth.accounts.sign(message, privateKey);
  // THis is used to validate the address that signed the message.
  // @ts-ignore
  console.log(web3.eth.accounts.recover(signatureData));
  console.log(web3.eth.accounts.recover(message, signatureData.signature));
  return signatureData;
};
const sendTransaction = async (transactionParams = {}, account) => {
  // @ts-ignore
  const { address, amount } = transactionParams;
  const web3 = new Web3(new Web3.providers.HttpProvider(JSON_RPC_PATH));
  if (!address) throw new Error("Missing address");
  if (!amount) throw new Error("Missing amount");

  //const value = Web3.utils.toWei(amount.toString(), 'ether').toString()

  // const balance = await fetchAddressBalance(this.account.address)
  // if(balance<amount){
  //     throw new Error(`Unsufficiant amount ${balance}<${amount}`)
  // }
  //console.log(`Sending ${value} to ${address} from ${account.address}`)
  // console.log(web3.eth.accounts.defaultAccount);
  // console.log({balance, value, address})

  try {
    console.log("Account", account);
    /*const tx = await account.signTransaction({
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
        return res;*/
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const sign = (message: string, privateKey: string) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(JSON_RPC_PATH));
  const signatureData = web3.eth.accounts.sign(message, privateKey);
  // THis is used to validate the address that signed the message.
  // @ts-ignore
  console.log(web3.eth.accounts.recover(signatureData));
  console.log(web3.eth.accounts.recover(message, signatureData.signature));
  return signatureData;
};

export {
  LOCAL_SERVER_PATH,
  fetchBalance,
  notateWeiValue,
  accountFromAddress,
  fetchAddressBalance,
  accountFromPrivateKey,
  generateMnemonic,
  mnemonicToSeed,
  accountFromSeed,
  maskedAddress,
  deriveSeed,
  signMessage,
  sendTransaction,
};
