
// In App.js in a new project

import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import CameraScreen from './src/screen/CameraScreen';
import ImageDetailScreen from './src/screen/ImageDetailScreen';

import InformationScreen from './src/screen/InformationScreen';
import Temp from './src/screen/Temp';

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'ClickaDay' }}
         />
        <Stack.Screen 
        name="Camera" 
        component={CameraScreen} 
        options={{ title: 'Camera' }}
         />
         <Stack.Screen 
        name="image-detail" 
        component={ImageDetailScreen} 
        options={{ title: 'ClickaDay' }}
         />
         <Stack.Screen 
        name="information" 
        component={InformationScreen} 
        options={{ title: 'ClickaDay' }}
         />
         <Stack.Screen 
        name="temp" 
        component={Temp} 
        options={{ title: 'ClickaDay' }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;