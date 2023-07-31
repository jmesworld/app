import { Platform, StyleSheet } from 'react-native'
import { Modal } from '../../components'
import { Background, Navbar, View } from '../../components'
import { Navigation, Transaction } from '../../types'

import { RecentTransactions } from '../Wallet/components'
import { useState } from 'react'
import BackgroundWithNoScrollView from '../../components/Background/BackgroundWithNoScrollView'
type Props = {
  navigation: Navigation
  address: string
}

const isIOS = Platform.OS === 'ios'
const isWeb = Platform.OS === 'web'

export default function TransactionHistoryScreen({
  navigation,
}: Props) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.container}>
      <BackgroundWithNoScrollView>
        <Navbar
          title={'Transaction History'}
          navigation={navigation}
          children={'Root'}
        />
        <RecentTransactions
          itemPressed={(item) => {
            setSelectedTransaction(item)
            setModalVisible(true)
          }}
          navigation={navigation}
          title="Transactions"
          textLink="See all"
        />
      </BackgroundWithNoScrollView>
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
})
