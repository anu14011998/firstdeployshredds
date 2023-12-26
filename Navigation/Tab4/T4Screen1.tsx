// import { View, Text, Button, Alert } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useSelector,useDispatch } from 'react-redux';
// import { RootState } from '../../redux/types';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { setUserData } from '../../redux/actions/loginAction';

// const T4Screen1 = ({navigation}) => {
//   const userDataLOGIN_CURRENT_REDUX = useSelector((state: RootState) => state.login.userData);

//   const [userDataLOCAL_STORAGE, setUserData] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const storedData = await AsyncStorage.getItem('UserCred');
//         if (storedData !== null) {
//           // Data found, parse it
//           const parsedData = JSON.parse(storedData);
//           setUserData(parsedData);
//         } else {
//           console.log('No data found');
//         }
//       } catch (error) {
//         console.error('Error retrieving data:', error);
//       }
//     };

//     fetchData(); // Call the fetchData function when the component mounts
//   }, []); // The empty dependency array ensures the effect runs only once


//   const handleLOgOUt= async (  )=>{
//     try {
//       await AsyncStorage.getItem('UserCred');
//       Alert.alert(
//         "Logged out Successfully",
//         "You have successfully logged OUt.",
//         [
//           {
//             text: "OK",
//             onPress: async () => {
//               // Reset the navigation stack to 'Screen1' removing all screens
//               await AsyncStorage.removeItem('UserCred');
//               dispatch(setUserData(null));


//               navigation.navigate('Tab1', { screen: 'T4Screen1' });
//               // navigation.popToTop();

//             },
//           },
//         ],
//         { cancelable: false }
//       );    } catch (error) {
//       console.log(error);
      
//     }
//   }

//   return (
//     <View>
      
     

// {userDataLOGIN_CURRENT_REDUX && userDataLOCAL_STORAGE ?(<View>
//       <Text>{JSON.stringify(userDataLOGIN_CURRENT_REDUX)}</Text>
//           <Text style={{ fontSize: 25, }}>T2Screen1</Text>
//           <Text>{JSON.stringify(userDataLOCAL_STORAGE)}</Text>

//           <Button title='Log Out' onPress={handleLOgOUt}/>
//       </View>):( <View style={{ alignItems: 'center' }}>
//           <Text style={{ fontSize: 30, }}>User not exits please Signup or Login......</Text>
//           <View style={{ alignItems: 'center', padding: 10, }}>
//             <Button title='signup' onPress={() => { navigation.navigate("Signup") }} />
//           </View>
//           <View style={{ alignItems: 'center', padding: 10, }}>
//             <Button title='Login' onPress={() => { navigation.navigate("Login") }} />
//           </View>
//         </View>)}




         





//     </View>
//   )
// }

// export default T4Screen1

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const T4Screen1 = () => {
  return (
    <View>
      <Text>T4Screen1</Text>
      <View>
        <TouchableOpacity>
          <Text>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>
            Notifications
          </Text>
          <Text>
            Recommendations & Special communications
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>
            Logout from all devices 
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>
            Delete account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default T4Screen1

const styles = StyleSheet.create({
  button:{
    
  }
  
})

