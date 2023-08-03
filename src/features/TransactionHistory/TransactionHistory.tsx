import { StyleSheet } from 'react-native'
import { Navbar, View } from '../../components'
import { Transaction } from '../../types'
import { RecentTransactions } from '../Wallet/components'
import { useState } from 'react'
import BackgroundWithNoScrollView from '../../components/Background/BackgroundWithNoScrollView'
import { RootNavigateProps } from '../../navigation'
type Props = {
  navigation: RootNavigateProps<'TransactionHistory'>
  address: string
}

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
