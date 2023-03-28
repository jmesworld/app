import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, Pressable } from 'react-native'

import { Text, View } from '../../components/Themed/Themed'
import {
  useStoreActions,
  useStoreState,
} from '../../hooks/storeHooks'
import { useEffect, useState } from 'react'
import { getCoinBal } from '../../utils'
import Background4 from '../../components/Background/Background4'

import { Navigation } from '../../types'

type Props = {
  navigation: Navigation
}

export default function WalletReceiveConfirmScreen({
  navigation,
}: Props) {
  const mnemonic = useStoreState((state) => state.wallet.mnemonic)
  const address = useStoreState((state) => state.accounts[0].address)

  const username = useStoreState((state) => state.user.username)
  const balanceState = useStoreState(
    (state) => state.accounts[0].balance
  )
  const updateAccount = useStoreActions(
    (actions) => actions.updateAccount
  )

  const [balance, setBalance] = useState(balanceState)
  const [balanceEur, setBalanceEur] = useState(balanceState)

  const updateStoreState = function () {
    console.log('UpdateStoreState')
    updateAccount({ index: 0, balance: balance })
  }

  const handleRequestBalance = async () => {
    // await requestBalance();
    // console.log('RequestedVBalance',balance)
    // if(balance){
    //     try{
    //         await updateStoreState(balance);
    //     }catch (e){
    //         console.log(`Cant updateStoreState`)
    //     }
    // }
  }
  // const getBalance = async () => {
  //     const fetchedBalance = await getCoinBal(account.address);
  //     setBalance(fetchedBalance);

  //     const convertedBalance = (
  //       parseInt(fetchedBalance) * 0.1412840103
  //     ).toString();
  //     setBalanceEur(parseFloat(convertedBalance).toFixed(2));

  //     return fetchedBalance
  //   }
  //   useEffect(() => {
  //     try {
  //         const fetchedBalance = await getBalance();
  //         try{
  //             updateAccount({index: 0, balance: fetchedBalance})
  //         }catch (e){
  //             console.log('Impossible to update account');
  //         }
  //     }catch(e){
  //         console.error(e)
  //     }

  //   }, [updateStoreState]);
  useEffect(async () => {
    try {
      async function requestBalance() {
        const fetchedBalance = await getCoinBal(address)
        console.log({ fetchedBalance })
        setBalance(Web3.utils.fromWei(fetchedBalance, 'ether'))
        const convertedBalance = (
          parseInt(fetchedBalance) * 0.1412840103
        ).toString()

        console.log({ convertedBalance })
        setBalanceEur(
          parseFloat(
            Web3.utils.fromWei(convertedBalance, 'ether')
          ).toFixed(2)
        )
        console.log('Fetched.')

        console.log('UPDATED BALANCE WITH', fetchedBalance)

        return fetchedBalance
      }
      const fetchedBalance = await requestBalance()
      console.log('BalanceFromEffet', fetchedBalance)
      try {
        updateAccount({ index: 0, balance: fetchedBalance })
      } catch (e) {
        console.log('Impossible to update account')
      }
    } catch (e) {
      console.error(e)
    }
  }, [updateStoreState])

  return (
    <View style={styles.container}>
      <Background4>
        <Text style={styles.title}>Receive JMES</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.title}>Received 10.00 </Text>

        <Pressable
          onPress={() => handleRequestBalance()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Ok</Text>
        </Pressable>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </Background4>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#000000',
  },
  iconImageView: {
    flexDirection: 'row',
  },
  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    color: '#000000',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Comfortaa_300Light',
  },
  secondTitle: {
    fontSize: 36,
    fontFamily: 'Comfortaa_300Light',
    paddingTop: 40,
  },
  balanceJMES: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  balanceEUR: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  buttonImage: {
    padding: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    margin: 10,
  },
  section: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  noAssetText: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
