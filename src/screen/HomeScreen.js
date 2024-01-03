import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Fragment, useCallback, useEffect, useLayoutEffect, useState} from 'react';

import ImagePicker, {launchCamera} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation, route}) => {
  const [photo, setPhoto] = useState([]);
  const [thought, setThought] = useState([]);
  const [temp, setTemp] = useState([]);

  const [images, setImages] = useState([]);
  // const userData = [
  //   {
  //     id: 1,
  //     name: 'Shyam',
  //     email: 'shyamjaiswal@gmail.com',
  //     imageUrl: require('../assets/coffee.jpg'),
  //   },
  //   {
  //     id: 2,
  //     name: 'Bob',
  //     email: 'bob32@gmail.com',
  //     imageUrl: require('../assets/coffee.jpg'),
  //   },
  //   {
  //     id: 3,
  //     name: 'Jai',
  //     email: 'jai87@gmail.com',
  //     imageUrl: require('../assets/coffee.jpg'),
  //   },
  //   {
  //     id: 4,
  //     name: 'Jai',
  //     email: 'jai87@gmail.com',
  //     imageUrl: require('../assets/coffee.jpg'),
  //   },
  //   {
  //     id: 5,
  //     name: 'Jai',
  //     email: 'jai87@gmail.com',
  //     imageUrl: require('../assets/coffee.jpg'),
  //   },
  //   {
  //     id: 6,
  //     name: 'Jai',
  //     email: 'jai87@gmail.com',
  //     imageUrl: require('../assets/coffee.jpg'),
  //   },
  // ];

  const getImages = async() =>{
    // await AsyncStorage.clear()
    const allImages = await AsyncStorage.getItem('images');
    // console.log(allImages, images);
    const res = JSON.parse(allImages)
    setImages(res)
  }

  useFocusEffect(
    useCallback(() => {
      console.log('Screen was focused');
      getImages()      
    }, [])
  );'' 
  


  // useLayoutEffect(()=>{
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log("first")
  //     getImages()
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  const ListItem = ({item}) => {
    return (
      <ImageBackground source={{uri:item.imageUri}} style={styles.imageBackground}>
        <View style={styles.textContainer}>
          <Text style={styles.bottomLeftText}>{item.thought}</Text>
          <Text style={styles.bottomRightText}>{item.thought}</Text>
        </View>
      </ImageBackground>
    );
  };

  //const renderItem = ({ item }) => <Text>{item.name}</Text>

  return (
    <View style={{position:"relative", height:"100%"}}>
      <View style={{height:"90%" }}>
       {images && <FlatList
          data={images}

          renderItem={({item}) => <ListItem item={item} />}
          keyExtractor={item => item.imageUri}
          style={styles.Flatstyle}
        />}
      </View>
      <BottomBar navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

const BottomBar = ({navigation}) => {

  const [imageUri, setImageUri] = useState(null);

  const takePhoto = async() => {
    console.log(launchCamera)

    // const res = await launchCamera({mediaType:'photo'})
    // console.log(res)
    launchCamera(
      { title: 'Take Photo', mediaType: 'photo' },
      (response) => {
        if (!response.didCancel && !response.error) {
          setImageUri(response.uri);
          navigation.navigate("image-detail", {data:response.assets[0].uri});
        }
      }
    );
  };
  return (
    <View style={styles.bottomBar}>
      <View style={styles.menu}>
        <TouchableOpacity>
          <View
            style={{textAlign: 'center', width: '100%', alignItems: 'center'}}>
            <Image
              source={require('../assets/home-fill.png')}
              style={{height: 30, width: 30}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
      onPress={()=>takePhoto()}
        style={{
          position: 'absolute',
          left: '45%',
          bottom: '70%',
          backgroundColor: '#fff',
          width: 50,
          height: 50,
          borderRadius: 50,
          paddingTop:10,
          elevation:5
        }}>
        <View
          style={{textAlign: 'center', width: '100%', alignItems: 'center'}}>
          <Image
            source={require('../assets/add-fill.png')}
            style={{height: 30, width: 30}}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.menu}>
        <TouchableOpacity onPress={()=>{navigation.navigate('information')}}>
          <View
            style={{textAlign: 'center', width: '100%', alignItems: 'center'}}>
            <Image
              source={require('../assets/information-line.png')}
              style={{height: 30, width: 30}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    marginTop: 10,
    width: '100%',
    height: '100%',
    //position:'relative'
    //flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  Flatstyle: {
    width: '100%',
    height: '90%',

    backgroundColor: 'grey',
    // borderWidth: 1,
    // borderRadius: 8,
    // borderColor: '#ddd',
    //padding: 16,
    // marginBottom: 16,
    // backgroundColor: '#fff',
  },
  flatview: {
    backgroundColor: 'blue',
    width: '100%',
    height: 150,
    //marginVertical:5
    borderColor: 'black',
    borderWidth: 1,
  },
  container: {
    justifyContent: 'flex-end',
  },
  imageBackground: {
    height: 200,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    //
    borderColor: 'black',
    borderWidth: 1,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
  },
  bottomLeftText: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'black',
  },
  bottomRightText: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'black',
  },
  bottomBar: {
    position:"absolute",
    backgroundColor:"#fff",
    height:100,
    bottom:0,
    flex: 1,
    flexDirection: 'row', // or 'column' depending on your layout
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    // backgroundColor:"red",
  },

  menu: {
    // backgroundColor:"green",
    width: '50%',
    display: 'flex',

    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});
