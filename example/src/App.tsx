import { Button, Image, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import PhotoEditor from 'react-native-photo-edit';

export default function App() {
  const [image, setImage] = useState<string | undefined>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    console.log(result);

    if (!result.didCancel && result.assets) {
      setImage(result.assets[0]?.uri);
    }
  };

  const editImage = async () => {
    let result = await PhotoEditor.open({
      path: image || '',
      stickers: [
        'https://cdn-icons-png.flaticon.com/512/5272/5272912.png',
        'https://cdn-icons-png.flaticon.com/512/5272/5272913.png',
        'https://cdn-icons-png.flaticon.com/512/5272/5272916.png',
      ],
    });

    console.log(result);

    if (result) {
      setImage(result.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && <Button title="Edit image" onPress={editImage} />}
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
