import { View, Text, StyleSheet } from 'react-native'
import { useAppTheme } from '../theme'
import { Avatar } from 'react-native-paper'

type Props = {
  name: string
  address: string
  color?: string
}
export const UserAvatar = ({ name, address, color }: Props) => {
  const { colors } = useAppTheme()
  return (
    <View style={styles.userItemContainer}>
      <Avatar.Text
        style={{
          backgroundColor: color || colors.primary,
        }}
        size={40}
        label={name?.[0]?.toUpperCase()}
      />
      <View style={styles.userContainer}>
        <Text style={styles.username}>{name}</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="middle"
          style={styles.address}
        >
           {address}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
 
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
  username: {
    fontSize: 18,
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
})
