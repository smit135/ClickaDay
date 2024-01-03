import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InformationScreen = ({navigation}) => {
  return (
    <View style={{width:'100%',height:'100%'}}>
      <View style={{width:'100%',height:'20%', alignItems:'center'}}>
        <Text style={{fontSize:35}}>Days</Text>

      </View>
      <Text style={{marginLeft:15}}>__________________________________________________________</Text>
      <View style={{width:'100%',height:'20%',alignItems:'center'}}>
        <Text style={{fontSize:35}}>Hottest Day</Text>
      </View>
      <Text style={{marginLeft:15}}>__________________________________________________________</Text>
      <View style={{width:'100%',height:'20%',alignItems:'center'}}>
        <Text style={{fontSize:35}}>Coldest Day</Text>
      </View>
      <Text style={{marginLeft:15}}>__________________________________________________________</Text>
    <Button title='temperature' onPress={()=>{navigation.navigate('temp')}}/>
    </View>
  )
}

export default InformationScreen

const styles = StyleSheet.create({})