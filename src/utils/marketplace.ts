export const getFeed = async (token: any, client: any) => {
  const feed = await client.providers.marketplaceAPI.getFeed({
    token,
  })
  console.log(feed)

  return feed
}

export const postItemVote = async (
  identifier: string,
  direction: number,
  token: any,
  client: any
) => {
  const vote = await client.providers.marketplaceAPI.postItemVote(
    { identifier: '82f182ddbef3d7b80bafc06ee9e4a664', direction: 1 },
    { token }
  )
  console.log(vote)

  return vote
}

export const mnemonicToSeed = async (
  mnemonic: string,
  bip39: any
) => {
  const seed = await bip39.mnemonicToSeedSync(mnemonic)

  return seed.toString('hex')
}
