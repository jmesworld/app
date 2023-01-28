import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import {
  Platform,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
} from 'react-native'
import { Text, View } from '../../components/Themed/Themed'
import { useState, useEffect } from 'react'
import Background4 from '../../components/Background4/Background4'
import { Navigation } from '../../types'

type Props = {
  navigation: Navigation
}

export default function CreateAssetScreen({ navigation }: Props) {
  const [title, onChangeTitle] = useState('')
  const [shares, onChangeShares] = useState('')
  const [price, onChangePrice] = useState('')
  const [image, setImage] = useState(null)

  const handleUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log('Result', result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
    return result
  }

  const performNFTMint = async function () {
    console.log(`------------------`)
    console.log(`Minting NFT${title}`)
    console.log(`------------------`)
    console.log(`Shares: ${shares}`)
    console.log(`Price: ${price}`)
    console.log(`------------------`)

    try {
      const response = await FileSystem.uploadAsync(
        `http://192.168.0.2:3001/multipart-upload`,
        image,
        {
          headers: {
            'Content-Type': 'image/png',
            //"Custom-Header": "WASD",
          },
          httpMethod: 'PATCH',
          sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'photo',
          mimeType: 'type',
          parameters: {
            title: title,
            shares: shares,
            price: price,
          },
        }
      )
      console.log(
        'UPLOAD RESPONSE',
        JSON.stringify(response, null, 4)
      )
      console.log(image, 'image')
    } catch (error) {
      console.log('There was an error. See:', error)
    }
    console.log('Created NFT request', title)
    // @ts-ignore
    return navigation.navigate({
      name: 'CreateAssetConfirm',
      params: {
        image,
        title,
        price,
        shares,
      },
    })
  }

  return (
    <Background4>
      <View style={styles.contentContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 381, height: 254 }}
          />
        ) : (
          <View
            style={{
              width: 381,
              height: 254,
              backgroundColor: 'transparent',
            }}
          />
        )}
        <View style={styles.uploadButtonContainer}>
          <Pressable
            style={styles.uploadButton}
            onPress={handleUpload}
          >
            <Text style={styles.buttonText}>Upload</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontSize: 15,
              textTransform: 'uppercase',
              color: 'white',
              paddingLeft: 11,
            }}
          >
            Title
          </Text>
          <View style={styles.titleInputContainer}>
            <TextInput
              style={styles.titleInput}
              onChangeText={onChangeTitle}
              value={title}
              placeholder="Enter a title"
            />
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text
            style={{
              fontSize: 15,
              textTransform: 'uppercase',
              color: 'white',
              paddingLeft: 11,
            }}
          >
            Price
          </Text>
          <View style={styles.priceInputContainer}>
            <TextInput
              style={styles.priceInput}
              onChangeText={onChangePrice}
              value={price}
              placeholder="Enter a price"
            />
          </View>
        </View>

        <View style={styles.sharesContainer}>
          <Text
            style={{
              fontSize: 15,
              textTransform: 'uppercase',
              color: 'white',
              paddingLeft: 11,
            }}
          >
            Shares
          </Text>

          <View style={styles.sharesInputContainer}>
            <TextInput
              style={styles.sharesInput}
              onChangeText={onChangeShares}
              value={shares}
              placeholder="Enter # of shares"
            />
          </View>
        </View>

        <View style={styles.genreContainer}>
          {' '}
          <Text
            style={{
              fontSize: 15,
              textTransform: 'uppercase',
              color: 'white',
              paddingLeft: 11,
            }}
          >
            Genre
          </Text>
          <View style={styles.genreInputContainer}>
            <TextInput
              style={styles.genreInput}
              onChangeText={onChangeShares}
              value={''}
              placeholder="Genre"
            />
          </View>{' '}
        </View>

        <View style={styles.aboutContainer}>
          {' '}
          <Text
            style={{
              fontSize: 15,
              textTransform: 'uppercase',
              color: 'white',
              paddingLeft: 11,
            }}
          >
            About
          </Text>{' '}
          <View style={styles.aboutInputContainer}>
            <TextInput
              style={styles.aboutInput}
              onChangeText={onChangeShares}
              value={''}
              placeholder="Money can't buy happiness but it's more comfortable to cry in Mercedes than a bicycle. #deklart #art #mercedes #nft #motivation #success"
            />
          </View>{' '}
        </View>
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.mintButtonContainer}>
        <Pressable
          onPress={async () => {
            await performNFTMint()
            return navigation.navigate('CreateAssetConfirm')
          }}
          style={styles.mintButton}
        >
          <Text style={styles.buttonText}>Mint</Text>
        </Pressable>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Background4>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },

  uploadButtonContainer: {
    flexDirection: 'row',
    width: 84,
    height: 31,
    paddingBottom: 9,
    paddingTop: 13,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  mintButtonContainer: {
    flexDirection: 'row',
    width: 345,

    paddingBottom: 9,
    paddingTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  buttonText: {
    fontSize: 16,
    margin: 'auto',
    borderColor: 'black',
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },

  mintButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    color: '#000000',
    paddingTop: 15,
    paddingBottom: 15,
    margin: 'auto',
    fontSize: 16,
    width: '100%',
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },

  uploadButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    color: '#000000',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    width: '100%',
    height: 31,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },

  separator: {
    height: 3,
    width: '100%',
  },

  inputContainer: {
    flexDirection: 'column',
    margin: 'auto',
    alignItems: 'flex-start',
    backgroundColor: '#2B2B2B',
    width: 381,
    height: 345,
  },

  //TITLE

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 23,
  },
  titleInputContainer: {
    backgroundColor: 'transparent',
    paddingRight: 15,
    width: 270,
    height: 34,
  },
  titleInput: {
    backgroundColor: '#5B5B5B',
    borderRadius: 6,
    height: '100%',
  },

  //PRICE
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: '100%',

    paddingBottom: 23,
  },
  priceInputContainer: {
    backgroundColor: 'transparent',
    paddingRight: 15,

    width: 161,
    height: 34,
  },
  priceInput: {
    backgroundColor: '#5B5B5B',
    borderRadius: 6,
    height: '100%',
  },

  //SHARES
  sharesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: '100%',
  },
  sharesInputContainer: {
    backgroundColor: 'transparent',
    paddingRight: 15,
    paddingBottom: 23,
    width: 161,
  },
  sharesInput: {
    backgroundColor: '#5B5B5B',
    borderRadius: 6,
    width: '100%',
    height: 34,
  },

  //GENRE
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: '100%',
  },
  genreInputContainer: {
    backgroundColor: 'transparent',
    paddingRight: 15,
    paddingBottom: 23,
    width: 205,
  },
  genreInput: {
    backgroundColor: '#5B5B5B',
    borderRadius: 6,
    width: '100%',
    height: 34,
  },

  //ABOUT
  aboutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: 10,
  },
  aboutInputContainer: {
    backgroundColor: 'transparent',
    paddingRight: 15,
    width: 275,
    maxHeight: 103,
    minHeight: 90,
  },
  aboutInput: {
    backgroundColor: '#5B5B5B',
    borderRadius: 6,
    width: '100%',
    height: '100%',
  },
})
