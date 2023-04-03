import { memo } from 'react'
import {
  View,
  BackdropSmall,
  BottomNav,
  TransactionList,
} from '../../../components'
import { StyleSheet } from 'react-native'
import { Navigation } from '../../../types'

interface Props {
  children?: React.ReactNode
  navigation: Navigation
}

const AllTransactions = ({ navigation }: Props) => {
  return (
    <BackdropSmall>
      <TransactionList />
      <View style={styles.bottomNav}>
        <BottomNav navigation={navigation} />
      </View>
    </BackdropSmall>
  )
}

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: 'transparent',
  },
})

export default memo(AllTransactions)
