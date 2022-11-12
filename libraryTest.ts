import "react-native-get-random-values";
import { Client, Mnemonic } from "jmes";
import {
  generateMnemonic,
  generateAccount,
  LOCAL_SERVER_PATH,
  mnemonicToSeed,
} from "./utils";

// file used for testing the JMES library

(async () => {
  const marketplaceAPI = client.providers.marketplaceAPI;
  const identityAPI = client.providers.identityAPI;

  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  const mnemonic = Mnemonic.generateMnemonic(randomBytes);

  const createWallet = async (mnemonic: string) => {
    const wallet = client.createWallet(new Mnemonic(mnemonic));
    return wallet;
  };
  const fetchAccount = async () => {
    const getAccount = wallet.getAccount();
  };
  const createIdentity = async (identityName: string, account: any) => {
    // @ts-ignore
    const createIdentityReq = await identityAPI.createIdentity({
      identityName: "Hunter",
      account: wallet.getAccount(),
    });
    const identity = createIdentityReq.data;
    await fetch(`${LOCAL_SERVER_PATH}/identity`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identity: identity,
      }),
    });
    return identity;
  };

  const getIdentity = async (identity: any) => {
    const getIdentityReq = await identityAPI.getIdentity(identity.identityName);
    const account = getIdentityReq.data;
    const response = await fetch(`${LOCAL_SERVER_PATH}/identity/${account}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response;
  };

  const fetchToken = async (account: any) => {
    const getIdentityTokenReq = await identityAPI.getToken(account);
    const token = await getIdentityTokenReq.data.token;

    return token;
  };

  await createIdentity(identityName, account)
    .then((identity) => {
      getIdentity(identity);
    })
    .then((account) => {
      fetchToken(account);
    });
})();
