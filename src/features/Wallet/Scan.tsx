import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Button } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import BackgroundWithNoScrollView from '../../components/Background/BackgroundWithNoScrollView'
import { RootNavigateProps } from '../../navigation'

type Props = {
  navigation: RootNavigateProps<'Scan'>
}

export default function ScanScreen({ navigation }: Props) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } =
        await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }
    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = async ({ data }) => {
    try {
      const payload = JSON.parse(data)

      if (data) {
        setScanned(true)
        navigation.navigate({
          name: 'SendToAddress',
          params: {
            ...payload,
          },
        })
        return
      }
     } catch (err) {
      console.error('error', err)
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <BackgroundWithNoScrollView>
      <Image
          source={require('../../../assets/images/jmes-text.png')}
          style={styles.image}
        />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={'Tap to Scan Again'}
          onPress={() => setScanned(false)}
        />
      )}
      </BackgroundWithNoScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 7,
    width: 80,
    height: 23,
  },
  text: {
    marginTop: 15,
    backgroundColor: 'white',
  },
  textError: {
    color: 'red',
  },
})
