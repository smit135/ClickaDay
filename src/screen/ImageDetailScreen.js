import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

const ImageDetailScreen = ({route, navigation}) => {
  const imageUri = route.params?.data;
//   console.log(route);
const [thought, setThought] = useState("");

  const [img, setImg] = useState(imageUri);

  const takePhoto = async () => {
    console.log(launchCamera);

    launchCamera({title: 'Take Photo', mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.error) {
        setImg(response.assets[0].uri);
      }
    });
  };

  const storeCurrentImage = async() =>{

    const images = await AsyncStorage.getItem('images');
    console.log(images, "imagesssssssssss")
    if(images){
        let allImages = JSON.parse(images);
        console.log(thought, "Asfafaeae")
        allImages.push({imageUri:img, thought:thought});
        await AsyncStorage.setItem('images', JSON.stringify(allImages))
    }else{
        let arr = [{imageUri:imageUri, thought:thought}];
        await AsyncStorage.setItem('images', JSON.stringify(arr));
    }
  }

  useEffect(()=>{
    
    // const unsubscribeFocus = navigation.addListener('focus', () => {
        const unsubscribeBeforeRemove = navigation.addListener('beforeRemove', (e) => {
          console.log('Navigated back from ScreenA');
          if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
            storeCurrentImage()
          }
        });
  
        return unsubscribeBeforeRemove;
    //   });
  
    //   return unsubscribeFocus;
  }, [navigation])

  return (
    <View>
      <View style={{position: 'relative'}}>
        <View>
          <Image
            source={{uri: img}}
            style={{width: '100%', height: 200, objectFit: 'cover'}}
          />
        </View>
        <TouchableOpacity
          onPress={() => takePhoto()}
          style={{
            position: 'absolute',
            left: '45%',
            top: 180,
            backgroundColor: '#fff',
            width: 50,
            height: 50,
            borderRadius: 50,
            paddingTop: 10,
          }}>
          <View
            style={{textAlign: 'center', width: '100%', alignItems: 'center'}}>
            <Image
              source={require('../assets/camera-fill.png')}
              style={{height: 30, width: 30}}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 50}}>
        <TextInput
          placeholder="Type your thought..."
          value={thought}
          onChangeText={(text) => {
            console.log('Input Text:', text);
            setThought(text);
            console.log('th Text:', thought);

          }}
          style={{padding: 20, height: 70, fontSize: 20}}
        />
      </View>
    </View>
  );
};

export default ImageDetailScreen;
