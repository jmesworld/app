import { LOCAL_SERVER_PATH } from "./index";
import { Client, Mnemonic } from "jmes";
import "react-native-get-random-values";

const client = new Client(); 
const mnemonic = Mnemonic.generateMnemonic(crypto.getRandomValues(new Uint8Array(32)));
const wallet = client.createWallet(new Mnemonic(mnemonic));
const account = wallet.getAccount();

const marketplaceAPI = client.providers.marketplaceAPI;
const identityAPI = client.providers.identityAPI;

const createIdentity = async (identityName: string) => {
// @ts-ignore
  const createIdentityReq = await identityAPI.createIdentity({
    identityName: identityName,
    account: account,
  });
  const identity = createIdentityReq.data;
  console.log(identity)

  return identity;
};

const fetchIdentity = async (identity: any) => {
  const getIdentityReq = await identityAPI.getIdentity(identity.identityName);
  const fetchedIdentity = getIdentityReq.data;

  console.log(fetchIdentity)

  return fetchedIdentity;
};

const fetchToken = async (account: any) => {
  const getIdentityTokenReq = await identityAPI.getToken(account);
  const token = await getIdentityTokenReq.data.token;
  console.log(token)
 
  return token;
};

const getFeed = async (token: any) => {
  const feed = await marketplaceAPI.getFeed({ token });
  console.log(feed);

  return feed;
};

const postItemVote = async (identifier: string, direction: number, token: any) => {
  const vote = await marketplaceAPI.postItemVote(
    { identifier: "82f182ddbef3d7b80bafc06ee9e4a664", direction: 1 }, 
    { token }
  );

  console.log(vote);

  return vote;
};

export {
  wallet,
  postItemVote,
  getFeed,
  fetchToken,
  fetchIdentity,
  createIdentity,
};
