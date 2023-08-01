import { StyleSheet } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import storage from '../../store/storage'
import { useStoreState } from '../../hooks/storeHooks'
import {
  Background,
  BackdropSmall,
  Navbar,
  View,
  Text,
  Modal,
  StyledButton as CloseButton,
  Button,
} from '../../components'
 import { Navigation } from '../../types'
import { Route } from '@react-navigation/native'
import SendTxStatusModal from '../../components/Modal/SendTxStatusModal'
import { useAppTheme } from '../../theme'
import { Avatar, Divider } from 'react-native-paper'
import { useIdentityContext } from '../../contexts/IdentityService'
type Props = {
  navigation: Navigation
  route: Route<any>
}

type TransactionStatus = 'Pending' | 'Success' | 'Failed' | null
export default function SendConfirmScreen({
  navigation,
  route,
}: Props) {
  const { colors } = useAppTheme()
  const { sendTransaction } = useIdentityContext()
  const [recipientUsername, setRecipientUsername] = useState('')
  const [recipientAmount, setRecipientAmount] = useState(0)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [mnemonic, setMnemonic] = useState<any>()
  const [modalVisible, setModalVisible] = useState(false)
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatus>(null)
  const username = useStoreState(
    (state) => state.accounts[0].username
  )
  const address = useStoreState((state) => state.accounts[0]?.address)

  async function getMnemonic() {
    const mnemonicFromSecureStorage = await storage.getSecureItem(
      'mnemonic'
    )
    setMnemonic(mnemonicFromSecureStorage)
    return mnemonicFromSecureStorage
  }

  useEffect(() => {
    getMnemonic()
    if (route.params) {
      if (route.params.recipientAddress)
        setRecipientAddress(route.params.recipientAddress)
      if (route.params.username)
        setRecipientUsername(route.params.username)
      if (route.params.amount)
        setRecipientAmount(parseFloat(route.params.amount) * 1e6)
    }
  }, [route.params])

  const handleSend = async () => {
    setModalVisible(true)
    setTransactionStatus('Pending')
    try {
      const response = await sendTransaction(
        mnemonic,
        recipientAddress,
        recipientAmount
      )

      if (response.transactionHash) {
        setTransactionStatus('Success')
        return
      }
      setTransactionStatus('Failed')
    } catch (error) {
      console.error('Error sending transaction:', error)
      setTransactionStatus('Failed')
    }
  }
  // TODO: trnsaction status issue
  const handleCloseModal = () => {
    if (transactionStatus === 'Pending') {
      return
    }
    setModalVisible(false)
    if (transactionStatus === 'Success') {
      navigation.navigate('Root')
      return
    }
    if (transactionStatus === 'Failed') {
      navigation.navigate('WalletSend')
      return
    }
    return navigation.navigate('WalletSend')
  }

  return (
    <View style={styles.container}>
      <Background>
        <Navbar
          title={'Send Confirm'}
          navigation={navigation}
          children={'WalletSend'}
        />
        <BackdropSmall>
          <Text style={styles.title}>Sender account</Text>
          <View style={styles.userItemContainer}>
            <Avatar.Text
              style={{
                backgroundColor: colors.primary,
              }}
              size={40}
              label={username?.[0]?.toUpperCase()}
            />
            <View style={styles.userContainer}>
              <Text style={styles.username}>{username}</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="middle"
                style={styles.address}
              >
                {address}
              </Text>
            </View>
          </View>
          <Divider
            style={{
              width: '90%',
            }}
          />
          <View style={styles.separator} />
          <Text style={styles.title}>Receiver account</Text>
          <View style={styles.userItemContainer}>
            <Avatar.Text
              size={40}
              style={{
                backgroundColor: colors.green,
              }}
              label={recipientUsername?.[0]?.toUpperCase()}
            />
            <View style={styles.userContainer}>
              <Text style={styles.username}>{recipientUsername}</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="middle"
                style={styles.address}
              >
                {recipientAddress}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 30,
              width: '95%',
              padding: 14,
              borderRadius: 24,
              backgroundColor: colors.bgInput,
            }}
          >
            <View style={styles.detailsItemContainer}>
              <Text style={styles.detailsTitle}>Amount</Text>
              <Text style={styles.detailsTitle}>
                {recipientAmount / 1e6} JMES
              </Text>
            </View>
            <View style={styles.detailsItemContainer}>
              <Text style={styles.detailsTitle}>Network Fee</Text>
              <Text style={styles.detailsTitle}>0.6948 JMES</Text>
            </View>
            <Divider />
            <View style={styles.separator} />
            <View style={styles.detailsTotalContainer}>
              <Text style={styles.detailsTotal}>Total Amount</Text>
              <Text style={styles.detailsTotal}>
                {recipientAmount / 1e6 + 0.6948} JMES
              </Text>
            </View>
            <View style={styles.conversion}>
              <Text
                style={{
                  color: '#263047',
                  fontSize: 13,
                  fontWeight: '400',
                }}
              >
                ≈ $324.145
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              rounded="full"
              mode="outlined"
              style={styles.cancelButton}
              onPress={async () => {
                navigation.navigate('Root')
              }}
            >
              <Text
                style={{
                  color: '#23262F',
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 16,
                }}
              >
                Cancel
              </Text>
            </Button>
            <Button
              mode="contained"
              rounded="full"
              style={styles.sendButton}
              onPress={handleSend}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 16,
                }}
              >
                Send
              </Text>
            </Button>
          </View>
        </BackdropSmall>
        <Modal
          isVisible={modalVisible}
          // TODO: fix the on Request close issue
          onRequestClose={() => {}}
        >
          <SendTxStatusModal transactionStatus={transactionStatus} />

          <View style={styles.buttonContainer}>
            <CloseButton
              onPress={() => {
                navigation.navigate('WalletSend')
              }}
              enabled={
                transactionStatus === 'Failed' ||
                transactionStatus === 'Success'
              }
            >
              Close
            </CloseButton>
          </View>
        </Modal>
      </Background>
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

  username: {
    fontSize: 16,
    fontWeight: '500',
    color: '#454E62',
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
    width: 100,
    fontWeight: '400',
    color: '#454E62',
  },

  userItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  userContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',

    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  detailsItemContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',

    marginBottom: 15,
  },
  detailsTitle: {
    fontSize: 16,
    color: '#454E62',
    fontWeight: '400',
  },
  detailsTotalContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
  },
  detailsTotal: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F0056',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',

    marginTop: 'auto',
    marginBottom: 40,
    width: '90%',
    height: 48,
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: 16,

    width: '48%',
  },
  sendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    width: '48%',
  },
  title: {
    color: '#263047',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 10,
    paddingLeft: 17,
  },
  conversion: {
    backgroundColor: 'transparent',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  secondTitle: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 10,
    paddingLeft: 17,
  },

  separator: {
    height: 1,
    alignSelf: 'center',
    width: '90%',
    color: '#263047',
    opacity: 0.1,
  },
})
