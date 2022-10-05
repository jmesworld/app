import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, Pressable, Image, TextInput, SafeAreaView, Button} from 'react-native';
import {Text, View} from '../../components/Themed/Themed';
import {useState, useEffect} from "react";
import { launchImageLibrary } from 'react-native-image-picker';
import Background4 from "../../components/Background4/Background4";

import {Navigation} from "../../types";
import { LOCAL_SERVER_PATH } from '../../utils';


type Props = {
    navigation: Navigation;
};

export default function CreateAssetScreen({navigation}: Props) {
    const [title, onChangeTitle] = useState('');
    const [photo, setPhoto] = useState(undefined);

    const createFormData = (photo, body = {}) => {
        const data = new FormData();
      
        data.append('photo', {
          name: photo.fileName,
          type: photo.type,
          uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
      
        Object.keys(body).forEach((key) => {
          data.append(key, body[key]);
        });
      
        return data;
      };

    const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = async () => {
    fetch(`${LOCAL_SERVER_PATH}/api/upload`, {
      method: 'POST',
      body: createFormData(photo, { userId: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };  
    const performNFTMint = async function () {
        console.log(`Mint NFT`, { title });
    }

    return (
        <View style={styles.container}>
            <Background4>
                <Text style={styles.title}>Create asset</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Text style={styles.secondTitle}>Title</Text>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeTitle}
                        value={title}
                        placeholder="Enter a title"
                    />
                </SafeAreaView>
                <Text style={styles.secondTitle}>Image</Text>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {photo && (
                      <>
                        <Image
                          source={{ uri: photo.uri }}
                          style={{ width: 300, height: 300 }}
                        />
                        <Pressable style={styles.button} onPress={async () => {await handleUploadPhoto()}}>
                            <Text style={styles.buttonText}>Upload</Text>
                        </Pressable>
                      </>
                    )}
                  <Button title="Choose Photo" onPress={handleChoosePhoto} />
                </View>
                {/** <View style={{flex: 0.8, marginTop: 20}}>
                    <Image style={{width: '80vw', height: 30, flex:1}} resizeMode="cover"
                           source={require('../../assets/images/nft-superA-SnowShite.png')}
                        />
                </View>*/}
                <Pressable
                    onPress={async () => {
                        await performNFTMint();
                        console.log('Create NFT request',title);
                        return navigation.navigate( "CreateAssetConfirm");
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Create</Text>
                </Pressable>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
            </Background4>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
        color: '#000000',
    },
    iconImageView: {
        flexDirection: 'row'
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
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
    },
    title: {
        fontSize: 36,
        fontFamily: 'Comfortaa_300Light',
    },
    input: {
        backgroundColor: "white",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    secondTitle: {
        fontSize: 36,
        fontFamily: 'Comfortaa_300Light',
        paddingTop: 40
    },
    balanceJMES: {
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    balanceEUR: {
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    buttonImage: {
        padding: 10
    },
    iconImage: {
        width: 30, height: 30, margin: 10
    },
    section: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "flex-start",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    noAssetText: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },


    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
