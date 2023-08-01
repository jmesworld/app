import { useMemo, useState } from 'react'
import { StyleSheet, TextInput, SafeAreaView } from 'react-native'
import {
  BackdropSmall,
  Navbar,
  View,
  Text,
  Background,
  Button,
} from '../../components'
import { Navigation } from '../../types'
import { numberSchema } from '../../validations/number'
import { ModalNavigate } from '../../navigation'
import { convertToUSD, formatUSDFromJMES } from '../../utils/balanceFormat'

type Props = {
  navigation: ModalNavigate<'ActiveRequest'>
}

export default function RequestScreen({ navigation }: Props) {
  const [data, setData] = useState('')

  const handleTextInputChange = async (value: string) => {
    const isNumber = numberSchema.safeParse(value).success

    if (isNumber || value === '') {
      setData(value)
    }
  }

  const isValidInput = useMemo(() => {
    return data.length > 0
  }, [data])

  return (
    <View style={styles.container}>
      <Background>
        <Navbar
          title={'Request Amount'}
          navigation={navigation}
          children={'WalletReceive'}
        />
        <BackdropSmall>
          <Text style={styles.title}>Amount of JMES</Text>
          <SafeAreaView style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              onChangeText={handleTextInputChange}
              keyboardType="numeric"
              value={data}
            />

            <Text style={styles.conversionText}>
              {data && isValidInput && formatUSDFromJMES(data, false) }
            </Text>
          </SafeAreaView>

          <View style={styles.buttonContainer}>
            <Button
              rounded="full"
              mode="contained"
              disabled={!isValidInput}
              onPress={async () => {
                navigation.navigate('ActiveRequest', {
                  amount: data,
                })
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,

                  fontWeight: '500',
                }}
              >
                Next
              </Text>
            </Button>
          </View>
        </BackdropSmall>
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
  sendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
    width: '90%',
    height: 48,
    backgroundColor: 'transparent',
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
    color: 'black',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 10,
  },
  input: {
    placeholderTextColor: 'rgba(112, 79, 247, 0.5)',
    fontSize: 18,
    textAlign: 'center',
    color: '#704FF7',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(112, 79, 247, 0.5)',
    borderRadius: 24,
    backgroundColor: 'rgba(112, 79, 247, 0.1)',
    width: '90%',
    height: 60,
  },
  conversionText: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 40,
    color: '#454E62',
    opacity: 0.6,
    fontSize: 16,
    fontWeight: '400',
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
