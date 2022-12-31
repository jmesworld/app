import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed/Themed';
import Background4 from "../../components/Background4/Background4";

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <Background4>
          <Text style={styles.title}>Gallery</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text>Scan</Text>
      </Background4>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
