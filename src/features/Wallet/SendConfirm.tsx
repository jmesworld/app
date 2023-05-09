import { Platform, StyleSheet, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { mnemonic, sendTransaction } from '../../utils'
import { getDataSecurely } from '../../store/storage'
import {
  useStoreState,
  useStoreActions,
} from '../../hooks/storeHooks'
import {
  Background,
  BackdropSmall,
  Navbar,
  View,
  Text,
  Modal,
  StyledButton as CloseButton,
} from '../../components'
import { isIOS, isWeb } from '../../utils/platformDetect'
import { Navigation } from '../../types'
import { Route } from '@react-navigation/native'
import SendTxStatusModal from '../../components/Modal/SendTxStatusModal'
type Props = {
  navigation: Navigation
  route: Route<any>
}

export default function SendConfirmScreen({
  navigation,
  route,
}: Props) {
  const [recipientUsername, setRecipientUsername] = useState('')
  const [recipientAmount, setRecipientAmount] = useState(0)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [mnemonic, setMnemonic] = useState<any>()
  const [modalVisible, setModalVisible] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState(null)
  const username = useStoreState(
    (state) => state.accounts[0].username
  )
  const address = useStoreState((state) => state.accounts[0]?.address)

  async function getMnemonic() {
    const mnemonicFromSecureStorage = await getDataSecurely(
      'mnemonic'
    )
    setMnemonic(mnemonicFromSecureStorage)
    return mnemonicFromSecureStorage
  }

  useEffect(() => {
    console.log('params', route.params)
    console.log('match', route.match)
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
        recipientAddress,
        recipientAmount,
        mnemonic
      )
      if (response.txhash) {
        setTransactionStatus('Success')
      } else {
        setTransactionStatus('Failed')
      }
    } catch (error) {
      console.error('Error sending transaction:', error)
      setTransactionStatus('Failed')
    }
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    if (transactionStatus === 'Success') {
      return navigation.navigate('Root')
    } else if (transactionStatus === 'Failed') {
      return navigation.navigate('WalletSend')
    } else {
      return navigation.navigate('Root')
    }
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
          <View style={styles.userContainer}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.address}>{address}</Text>
          </View>
          <View style={styles.separator} />
          <Text style={styles.title}>Recipient account</Text>
          <View style={styles.userContainer}>
            <Text style={styles.username}>{recipientUsername}</Text>
            <Text style={styles.address}>{recipientAddress}</Text>
          </View>
          <View
            style={{ marginTop: 30, backgroundColor: 'transparent' }}
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
            <Pressable
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
            </Pressable>
            <Pressable
              style={styles.sendButton}
              onPress={async () => {
                await handleSend()
              }}
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
            </Pressable>
          </View>
        </BackdropSmall>
        <Modal
          isVisible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <SendTxStatusModal
            closeModal={handleCloseModal}
            transactionStatus={transactionStatus}
          />

          <View style={styles.buttonContainer}>
            <CloseButton onPress={handleCloseModal} enabled={true}>
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
    fontWeight: '400',
    color: '#454E62',
  },
  userContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',

    alignSelf: 'center',
    width: '90%',
    marginLeft: 80,
    marginTop: 10,
    marginBottom: 30,
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
    marginBottom: 20,
    width: '90%',
    height: 48,
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 90,
    border: '1px solid #5136C2',
    fontSize: 16,
    height: 48,
    width: '48%',
  },
  sendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#704FF7',
    borderRadius: 90,
    fontSize: 16,
    height: 48,
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
