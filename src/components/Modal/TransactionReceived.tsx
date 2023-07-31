import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useIdentity } from '../../hooks/useIdentity'
import { useAppTheme } from '../../theme'
import CheckIcon from '../../assets/check-circle.svg'
import Button from '../Button/Button'

type Props = {
  address: string
  amount: string
  onDone: () => void
}

export const TransactionReceived = ({
  amount,
  address,
  onDone,
}: Props) => {
  const identity = useIdentity(address, false, true)
  const { colors } = useAppTheme()

  const name = identity?.data?.identity?.name || address

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}> 
      <CheckIcon width={62} height={62} />
      <Text style={styles.title}> Transaction Completed</Text>
      <View>
        <Text
          numberOfLines={3}
          style={[
            styles.statusTextConfirmed,
            {
              color: colors.darkGray,
            },
          ]}
        >
          You received {amount} JMES from {name} See details is history
        </Text>
      </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={onDone}>
          <Text
            style={{
              fontSize: 16,
              color: colors.white,
            }}
          >
            Done
          </Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContainer: {
    marginTop: 40,
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 10,
  },

  statusTextConfirmed: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '90%',
    height: 48,
    marginBottom: 40,
  },
})
