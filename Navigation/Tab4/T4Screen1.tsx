import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Feather, FontAwesome5 } from '@expo/vector-icons'

const T4Screen1 = ({ navigation }) => {
  const [userId, setUserId] = useState(null)
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

  const handleLOgOUt = async () => {
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
      );
    }
    catch (error) {
      console.log(error);

    }
  }

  const orderDetail = () => {
    console.log("working fine");
    navigation.navigate(  'MyOrder');
  };


  return (
    <View >
      {(userId !== null) ? (
        <View>
          <TouchableWithoutFeedback onPress={orderDetail}>
            <View style={styles.button} >


              <View style={styles.icon} >

                <View>
                  <FontAwesome5 name="box" />
                </View>


                <View >
                 
                    <Text style={styles.text1}>
                      My Order
                    </Text>
                  
                </View>

              </View>

              <View style={styles.icon1}>
                <Feather name="chevron-right" />
              </View>

            </View>
            </TouchableWithoutFeedback>


          <View style={styles.button}>

            <View style={styles.icon} >

              <View>
                <FontAwesome5 name="box" />
              </View>

              <View >
                <TouchableOpacity onPress={handleLOgOUt}>
                  <Text style={styles.text1}>
                    Privacy and Logout
                  </Text>
                </TouchableOpacity>
              </View >

            </View>

            <View style={styles.icon1}>
              <Feather name="chevron-right" />
            </View>

          </View>

          <View style={styles.button}>

            <View style={styles.icon} >

              <View>
                <FontAwesome5 name="box" />
              </View>

              <View >
                <TouchableOpacity>
                  <Text style={styles.text1}>
                    Notifications
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

            <View style={styles.icon1}>
              <Feather name="chevron-right" />
            </View>

          </View>




        </View>) : (
        <View style={{ alignItems: 'center', marginTop: 50, }}>
          <Text style={{ fontSize: 24, }}>
            User not exits please Signup or Login
          </Text>
          <View style={styles.btnview} >
            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
              <Text style={styles.text1}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnview}>
            <TouchableOpacity onPress={() => { navigation.navigate('Signup') }}>
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
  icon1: {


  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between', // To evenly space the two elements
    alignItems: 'center', // Align items vertically
    paddingHorizontal: 20, // Add padding as needed
    // Other styles
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    // Other styles for icon container
  },


  text1: {
    fontSize: 25,
  },
  text2: {
    fontSize: 14,
  },
  btnview: {
    height: '24%',
    width: '95%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    marginTop: 20,
    alignContent: 'center',
    paddingLeft: 15,
    paddingTop: 5,
    backgroundColor: '#ddd'
  },
  view: {

  }
})

