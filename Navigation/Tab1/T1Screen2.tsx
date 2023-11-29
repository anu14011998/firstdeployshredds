import { View, Text, Button } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
// import Sign_in from '../../Components/Sign_in'
import Sign_up from '../../Components/Sign_up'

const T1Screen2 = () => {
  return (
    <View>
      <ScrollView>
        <Sign_up/>
      </ScrollView>
    </View>
  )
}

export default T1Screen2