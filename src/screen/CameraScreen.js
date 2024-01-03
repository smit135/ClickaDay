import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


const CameraScreen = () => {
    return (
    <View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  capture: {
    fontSize: 16,
    color: 'white',
  },
});

export default CameraScreen;
