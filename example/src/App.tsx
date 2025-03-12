import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { multiply } from 'react-native-photo-edit';

export default function App() {
  const [result, setResult] = useState<number | undefined>();
  const [image, setImage] = useState<string | undefined>();

  const pickImage = async () => {
    const ret = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    console.log(ret);

    if (ret && ret.assets) {
      setImage(ret.assets[0]?.uri);
    }
  };

  useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Select image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
