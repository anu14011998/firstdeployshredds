import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

const T4Screen1 = ({navigation}) => {
  const [userId,setUserId]=useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('UserCred');

        if (storedData !== null) {
          const userDataObject = JSON.parse(storedData);
          // setUserDataLocalStorage(userDataObject);

          // Check if the '0' key exists and 'id' field is present in the object
          if (userDataObject && userDataObject['0'] && userDataObject['0'].id) {
            const userId = userDataObject['0'].id;
            setUserId(userId)
            // Now, userId contains the value of the 'id' field from userDataLOCAL_STORAGE
            // console.log('in mathod User ID:', userId);
          } else {
            console.log('No user data or ID found.');
          }
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }

    };

    fetchData();
  }, []);

  const handleLOgOUt= async (  )=>{
    try {
      // await AsyncStorage.getItem('UserCred');
      Alert.alert(
        "Logged out Successfully",
        "You have successfully logged OUt.",
        [
          {
            text: "OK",
            onPress: async () => {
              // Reset the navigation stack to 'Screen1' removing all screens
              await AsyncStorage.removeItem('UserCred');
              // dispatch(setUserData(null));


              navigation.navigate('Tab1', { screen: 'T1Screen1' });
              // navigation.popToTop();

            },
          },
        ],
        { cancelable: false }
      );    } catch (error) {
      console.log(error);
      
    }
   
  }
  return (
    <View >
      {(userId !== null)?(  <View>
      <View style={styles.button}>
        <TouchableOpacity onPress={handleLOgOUt}>
          <Text  style={styles.text1}>
            Logout
          </Text>
          </TouchableOpacity>
      </View >
      <View style={styles.button}>
        <TouchableOpacity>
          <Text style={styles.text1}>
            Notifications
          </Text>
         
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <Text  style={styles.text1}>
            Logout from all devices 
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <Text  style={styles.text1}>
            Delete account
          </Text>
        </TouchableOpacity>
      </View>
      </View>):(
      <View style={{alignItems:'center',marginTop:50,}}>
        <Text style={{fontSize:24,}}>
          User not exits please Signup or Login
        </Text>
        <View style={styles.btnview} >
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
            <Text style={styles.text1}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnview}>
          <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}}>
            <Text style={styles.text1}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>)}
    
      
      
    </View>
  )
}

export default T4Screen1

const styles = StyleSheet.create({
  button:{
    height:'14%',
    width:'95%',
    borderRadius:10,
    borderColor:'gray',
    margin:10,
    borderWidth:2,
    backgroundColor:'#ddd',
    padding:4,
    alignSelf:'center',
    
    
  },
  text1:{
    fontSize:25,
  },
  text2:{
    fontSize:14,
  },
  btnview:{
    height:'24%',
    width:'95%',
    borderRadius:10,
    borderWidth:2,
    borderColor:'gray',
    marginTop:20,
    alignContent:'center',
    paddingLeft:15,
    paddingTop:5,
    backgroundColor:'#ddd'
  },
  view:{

  }
})

