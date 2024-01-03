import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import axios from 'axios';
const apiKey = 'bcb69b0ec529d0ba7053d974ddc5afff';
const lat='21.19594'
const lon='72.83023'
const Temp = () => {
  const [temperature, setTemperature] = useState(null);

  const fetchWeatherTemperature = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
      
      const city = ''; // Replace with the city for which you want the weather

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );

      const { main } = response.data;
      let currentTemperature = main.temp;
      currentTemperature=currentTemperature/10;
      console.log(currentTemperature);

      setTemperature(currentTemperature);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  return (
    <View>
      <Button title="Fetch Weather" onPress={fetchWeatherTemperature} />
      {temperature !== null && (
        <Text style={{ marginTop:20,fontSize:20}}>Current Temperature of Surat: {temperature} °C</Text>
      )}
    </View>
  );
};

export default Temp;