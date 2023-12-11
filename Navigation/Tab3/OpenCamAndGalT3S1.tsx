// import React, { useState, useEffect } from 'react';
// import { View, Button, Image, StyleSheet, Text } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// import { FontAwesome } from '@expo/vector-icons';
// import { TouchableOpacity } from 'react-native';

// const OpenCamAndGalT3S1 = ({ onImageCapture }) => {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const getPermissions = async () => {
//     const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
//     const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     setHasPermission(
//       cameraStatus.status === 'granted' && galleryStatus.status === 'granted'
//     );
//   };

//   // useEffect(() => {
//   //   getPermissions();
//   // }, []);

//   const saveImageToAssets = async (uri) => {
//     const now = new Date()
//     try {
//       const assetUri = `${FileSystem.documentDirectory}assets/${now}.jpg`;
//       await FileSystem.copyAsync({ from: uri, to: assetUri });
//       return assetUri;
//     } catch (error) {
//       console.error('Error saving image:', error);
//       return null;
//     }
//   };

// const takePicture = async () => {

//   if (hasPermission) {
//     const photo = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!photo.canceled) {
//       if (photo.assets && photo.assets.length > 0) {
//         const selectedAsset = photo.assets[0];
//         const savedImageUri = await saveImageToAssets(selectedAsset.uri);
//         setCapturedImage(savedImageUri);
//         onImageCapture(savedImageUri);
//         setSelectedImage(null);
//       }
//     }
//   }
// };


//   const pickImage = async () => {
//     if (hasPermission) {
//       const photo = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!photo.canceled) {
//         if (photo.assets && photo.assets.length > 0) {
//           const selectedAsset = photo.assets[0];
//           const savedImageUri = await saveImageToAssets(selectedAsset.uri);
//           setSelectedImage(savedImageUri);
//           onImageCapture(savedImageUri);
//           setCapturedImage(null);
//         }
//       }
//     }
//   };

//   return (
//     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//       <View style={styles.imageContainer}>
//         {capturedImage && <Image source={{ uri: capturedImage }} style={styles.image} />}
//         {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
//       </View>
//       <View style={styles.buttonsContainer}>



//         <View >
//         {/* <TouchableOpacity  onPress={pickImage} disabled={!hasPermission} > */}
//         <TouchableOpacity  onPress={pickImage}  >

//          <Text style=
//          {{
//           fontSize: 18,
//           color: 'black',
         
//           borderWidth: 2,
//           borderColor: '#1f2e2e',
//           padding: 5,
//           borderRadius: 7,
//           marginRight: 10,}}> Open Gallery</Text>
//          </TouchableOpacity>
//         </View>

//         <FontAwesome name="camera" style={{fontSize: 30}}onPress={takePicture} />
      
  

//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '50%',
//     marginTop: 40,
    
//   },
//   imageContainer: {
//     alignItems: 'center',
//   },
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     marginBottom: 1,
//   },
// });

// export default OpenCamAndGalT3S1;


import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const OpenCamAndGalT3S1 = ({ onImageCapture }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getPermissions = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    setHasPermission(
      cameraStatus.status === 'granted' && galleryStatus.status === 'granted'
    );
  };

  useEffect(() => {
    getPermissions();
  }, []);


  const saveImageToAssets = async (uri) => {
    const now = new Date()
    try {
      const assetUri = `${FileSystem.documentDirectory}assets/${now}.jpg`;
      await FileSystem.copyAsync({ from: uri, to: assetUri });
      return assetUri;
    } catch (error) {
      console.error('Error saving image:', error);
      return null;
    }
  };

  const takePicture = async () => {

    if (hasPermission) {
      const photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!photo.canceled) {
        if (photo.assets && photo.assets.length > 0) {
          const selectedAsset = photo.assets[0];
          const savedImageUri = await saveImageToAssets(selectedAsset.uri);
          setCapturedImage(savedImageUri);
          onImageCapture(savedImageUri);
          setSelectedImage(null);
        }
      }
    }
  };

  const pickImage = async () => {
    if (hasPermission) {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!photo.canceled) {
        if (photo.assets && photo.assets.length > 0) {
          const selectedAsset = photo.assets[0];
          const savedImageUri = await saveImageToAssets(selectedAsset.uri);
          setSelectedImage(savedImageUri);
          onImageCapture(savedImageUri);
          setCapturedImage(null);
        }
      }
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.imageContainer}>
        {capturedImage && <Image source={{ uri: capturedImage }} style={styles.image} />}
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      </View>
      <View style={styles.buttonsContainer}>



<View >
{/* <TouchableOpacity  onPress={pickImage} disabled={!hasPermission} > */}
<TouchableOpacity  onPress={pickImage}  >

 <Text style=
 {{
  fontSize: 18,
  color: 'black',
 
  borderWidth: 2,
  borderColor: '#1f2e2e',
  padding: 5,
  borderRadius: 7,
  marginRight: 10,}}> Open Gallery</Text>
 </TouchableOpacity>
</View>

<FontAwesome name="camera" style={{fontSize: 30}}onPress={takePicture} />



</View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
        marginTop: 30,
        
      },
      imageContainer: {
        alignItems: 'center',
      },
      image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 1,
      },
});

export default OpenCamAndGalT3S1;
