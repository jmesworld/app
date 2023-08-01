import { memo } from 'react'
import {
  View,
  Text,
  BackdropSmall,
  TransactionList,
} from '../../../components'
import {
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { Navigation, Transaction } from '../../../types'

interface Props {
  children?: React.ReactNode
  navigation: Navigation
  title?: string
  textLink?: string
  itemPressed?: (item: Transaction) => void
  showFilter?: boolean
  viewStyle?: StyleProp<ViewStyle>
}

const RecentTransactions = ({
  itemPressed,
  children,
  navigation,
  title,
  textLink,
  showFilter = true,
  viewStyle,
}: Props) => {
  return (
    <BackdropSmall style={viewStyle}>
      <View style={[styles.heading]}>
        <Text style={styles.headingTitle}>{title}</Text>
        {!showFilter && (
          <Pressable>
            <Text
              onPress={() => {
                navigation.navigate('TransactionHistory')
              }}
              style={styles.headingSeeAll}
            >
              {textLink}
            </Text>
          </Pressable>
        )}
      </View>

      <TransactionList
        showFilter={showFilter}
        itemPressed={itemPressed}
      />
    </BackdropSmall>
  )
}
const styles = StyleSheet.create({
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: 'transparent',
  },
  headingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#263047',
  },
  headingSeeAll: {
    fontSize: 14,
    fontWeight: '400',
    color: '#263047',
    opacity: 0.4,
  },

  bottomNav: {
    backgroundColor: 'transparent',
  },
})

export default memo(RecentTransactions)
