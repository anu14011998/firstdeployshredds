// import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, Alert } from 'react-native';
// import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { TouchableOpacity } from 'react-native';
// import { NavigationProp } from '@react-navigation/native';
// // import Screen3 from '../navigation/Screen3';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
// // import { setUserId } from '../Context/userSlice';
// import { useNavigation } from '@react-navigation/native'
// import { CommonActions } from '@react-navigation/native';



// type LoginProps = {
//   navigation: NavigationProp<any>;
// };
// const Login = ({ navigation }: LoginProps) => {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   // const[userId,setUserId] = useState('')
//   const dispatch = useDispatch();

 
//   const isValidEmail = (email: any) => {
//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//     const hasNumber = /\d/.test(email);
//     return emailRegex.test(email) && hasNumber;
//   };

//   const handleEmailChange = (input: any) => {
//     setEmail(input);
//     if (isValidEmail(input)) {
//       setEmailError('');
//     }
//   };
//   const isValidPassword = (password: string) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handlePasswordChange = (input: string) => {
//     setPassword(input);
//     if (isValidPassword(input)) {
//       setPasswordError('');
//     }
//   };

//   const handleLogin = async () => {
//     if (!isValidEmail(email)) {
//       setEmailError('Invalid email address');
//     }

//     if (!isValidPassword(password)) {
//       setPasswordError('Invalid password');
//     }

//     if (isValidEmail(email) && isValidPassword(password)) {
//       console.log('Login data submitted:', {
//         email,
//         password,
//       });

//       // Your login logic goes here...
//       try {
//         const formData = new FormData();
//         formData.append('email', email);
//         formData.append('password', password);

//         const response = await fetch('https://shreddersbay.com/API/user_api.php?action=signin', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           const responseData = await response.json();
//           console.log('Login Successful:', responseData);
//           ///////          setUserCred(responseData);
//           const userId = responseData["0"].id;
//           // const data = await response.json()


//           // dispatch(setUserId(id))
//           console.log("my id is:--", userId);

//           try {
//             await AsyncStorage.setItem("userId", userId)
//           //   dispatch(setUserId(userId))
//             // navigation.navigate('Tab1')

//             ///////////////////////////////////////////////////////////

//             console.log("data set successfully");
//             Alert.alert(
//               "Login Successfully",
//               "You have successfully logged in.",
//               [
//                 {
//                   text: "OK",
//                   onPress: () => {
//                     // Reset the navigation stack to 'Screen1' removing all screens
//                     navigation.dispatch(
//                       CommonActions.reset({
//                         index: 0,
//                         routes: [{ name: 'Screen1' }], // Replace 'Screen1' with your root screen name
//                       })
//                     );
//                   },
//                 },
//               ],
//               { cancelable: false }
//             );
//           } catch (error) {
//             console.log("data is not set ")
//           }

//           // Handle successful login here (e.g., navigate to another screen)
//           // navigation.navigate('Home');
//         } else {
//           console.error('Login failed:', response.status);
//           // Handle failed login (show error message, etc.)
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         // Handle other errors (network, server unreachable, etc.)
//       }
//     } else {
//       console.log('Login data is not valid.');
//     }
//   };


//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container1}>
//         <View style={styles.signuplogo}>
//           <Image style={styles.tinyLogo}
//             source={require('../../assets/istockphoto2.png')} />
//         </View>

//         <View style={{ padding: 10 }}>
//           <View style={styles.container2}>
//             <MaterialCommunityIcons name="email-outline" size={30} color="#666" style={styles.icon} />
//             <TextInput
//               placeholder='Email'
//               keyboardType='email-address'
//               value={email}
//               onChangeText={handleEmailChange}
//               style={styles.textinput}
//             />

//           </View>
//           <Text style={{ color: 'red' }}>{emailError}</Text>
//           <View style={styles.container3}>
//             <Ionicons name="lock-closed-outline" size={30} color="#666" style={styles.icon} />
//             <TextInput
//               placeholder='Password'
//               secureTextEntry={true}
//               value={password}
//               onChangeText={handlePasswordChange}
//               textContentType='password'
//               style={styles.textinput}
//             />


//             <TouchableOpacity onPress={() => { }}>
//               <Text style={{ fontSize: 17, marginTop: 14, color: '#002699' }} >Forgot?</Text>
//             </TouchableOpacity>

//           </View>
//           <Text style={{ color: 'red', }}>{passwordError}</Text>
//         </View>

//         <View>
//           <TouchableOpacity onPress={handleLogin} style={styles.login}>
//             <Text style={styles.loginText}>Login</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={{ textAlign: 'center', color: '#666', marginTop: 20, marginBottom: 20 }}>
//           Or, login with ...
//         </Text>

//         <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
//           <TouchableOpacity onPress={() => { }} style={styles.container4}>
//             <Ionicons name="logo-google" size={26} color="red" style={styles.icon1} />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => { }} style={styles.container5}>
//             <Ionicons name="phone-portrait" size={26} color="blue" style={styles.icon2} />
//           </TouchableOpacity>
//         </View>

//         <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
//           <Text style={{ marginTop: 3, marginRight: 5 }}>New to the app?</Text>
//           <TouchableOpacity >
//             <Text style={{ color: '#002699', fontWeight: '700', fontSize: 18 }}
//               onPress={() => navigation.navigate('Signup')}
//             >Signup</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   tinyLogo: {
//     width: 300,
//     height: 120,
//   },
//   signuplogo: {
//     justifyContent: 'center',
//   },
//   container1: {
//     margin: 20,
//     padding: 20,
//   },
//   container2: {
//     flexDirection: 'row',
//     borderBlockEndColor: '#ccc',
//     borderBottomWidth: 1,
//     marginTop: 15,
//   },
//   container3: {
//     flexDirection: 'row',
//     borderBlockEndColor: '#ccc',
//     borderBottomWidth: 1,
//     marginBottom: 4,
//     marginTop: 20,
//   },
//   textinput: {
//     fontSize: 20,
//     flex: 1,
//     paddingVertical: 0,
//     marginTop: 6,
//   },
//   icon: {
//     marginTop: 15,
//     paddingBottom: 4,
//     marginRight: 10,
//   },
//   login: {
//     backgroundColor: '#002699',
//     padding: 13,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   loginText: {
//     color: '#fff',
//     fontSize: 17,
//     alignItems: 'center',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   container4: {
//     borderColor: 'red',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     marginRight: 10,
//   },
//   container5: {
//     borderColor: 'blue',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     marginRight: 10,
//   },
//   icon1: {},
//   icon2: {},
// });

// export default Login;


import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useRoute } from '@react-navigation/native';
// import Screen3 from '../navigation/Screen3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
// import { setUserId } from '../Context/userSlice';
import { useNavigation } from '@react-navigation/native'
import { CommonActions } from '@react-navigation/native';
import { setLoginData } from '../../redux/actions/loginAction';


// const Login = ({ navigation }: LoginProps) => {

type LoginProps = {
  navigation: NavigationProp<any>;
};
const Login = ({ navigation }: LoginProps) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // const[userId,setUserId] = useState('')
  const dispatch = useDispatch();



  //////////////////////////////










  //////////////////////////
 
  const isValidEmail = (email: any) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const hasNumber = /\d/.test(email);
    return emailRegex.test(email) && hasNumber;
  };

  const handleEmailChange = (input: any) => {
    setEmail(input);
    if (isValidEmail(input)) {
      setEmailError('');
    }
  };
  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    if (isValidPassword(input)) {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
    }

    if (!isValidPassword(password)) {
      setPasswordError('Invalid password');
    }

    if (isValidEmail(email) && isValidPassword(password)) {
      console.log('Login data submitted:', {
        email,
        password,
      });

      // Your login logic goes here...
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response = await fetch('https://shreddersbay.com/API/user_api.php?action=signin', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Login Successful:', responseData);
          ///////          setUserCred(responseData);
          const userId = responseData["0"].id;
          // const data = await response.json()
          console.log("my id is:--", userId);

          dispatch(setLoginData(responseData));


          try {
           
            try {
              await AsyncStorage.setItem("UserCred", JSON.stringify(responseData));
              console.log('Data stored successfully');
            } catch (error) {
              console.error('Error storing data:', error);
            }
            ///////////////////////////////////////////////////////////

            console.log("data set successfully");
            Alert.alert(
              "Login Successfully",
              "You have successfully logged in.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    // Reset the navigation stack to 'Screen1' removing all screens
                    // navigation.navigate("T1Screen1")
                    navigation.navigate('Tab1', { screen: 'T1Screen1' });



                  },
                  // onPress: () => {
                  //   // Reset the navigation stack to 'Screen1' removing all screens
                  //   const resetAction = CommonActions.reset({
                  //     index: 0,
                  //     routes: [{ name: 'T1Screen1' }],
                  //   });
                  //   navigation.dispatch(resetAction);
                  // },
                },
              ],
              { cancelable: false }
            );
          } catch (error) {
            console.log("data is not set ")
          }

          // Handle successful login here (e.g., navigate to another screen)
          // navigation.navigate('Home');
        } else {
          console.error('Login failed:', response.status);
          // Handle failed login (show error message, etc.)
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Handle other errors (network, server unreachable, etc.)
      }
    } else {
      console.log('Login data is not valid.');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.signuplogo}>
          <Image style={styles.tinyLogo}
            source={require('../../assets/istockphoto2.png')} />
        </View>

        <View style={{ padding: 10 }}>
          <View style={styles.container2}>
            <MaterialCommunityIcons name="email-outline" size={30} color="#666" style={styles.icon} />
            <TextInput
              placeholder='Email'
              keyboardType='email-address'
              value={email}
              onChangeText={handleEmailChange}
              style={styles.textinput}
            />

          </View>
          <Text style={{ color: 'red' }}>{emailError}</Text>
          <View style={styles.container3}>
            <Ionicons name="lock-closed-outline" size={30} color="#666" style={styles.icon} />
            <TextInput
              placeholder='Password'
              secureTextEntry={true}
              value={password}
              onChangeText={handlePasswordChange}
              textContentType='password'
              style={styles.textinput}
            />


            <TouchableOpacity onPress={() => { }}>
              <Text style={{ fontSize: 17, marginTop: 14, color: '#002699' }} >Forgot?</Text>
            </TouchableOpacity>

          </View>
          <Text style={{ color: 'red', }}>{passwordError}</Text>
        </View>

        <View>
          <TouchableOpacity onPress={handleLogin} style={styles.login}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: 'center', color: '#666', marginTop: 20, marginBottom: 20 }}>
          Or, login with ...
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => { }} style={styles.container4}>
            <Ionicons name="logo-google" size={26} color="red" style={styles.icon1} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={styles.container5}>
            <Ionicons name="phone-portrait" size={26} color="blue" style={styles.icon2} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
          <Text style={{ marginTop: 3, marginRight: 5 }}>New to the app?</Text>
          <TouchableOpacity >
            <Text style={{ color: '#002699', fontWeight: '700', fontSize: 18 }}
              onPress={() => navigation.navigate('Signup')}
            >Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 300,
    height: 120,
  },
  signuplogo: {
    justifyContent: 'center',
  },
  container1: {
    margin: 20,
    padding: 20,
  },
  container2: {
    flexDirection: 'row',
    borderBlockEndColor: '#ccc',
    borderBottomWidth: 1,
    marginTop: 15,
  },
  container3: {
    flexDirection: 'row',
    borderBlockEndColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 4,
    marginTop: 20,
  },
  textinput: {
    fontSize: 20,
    flex: 1,
    paddingVertical: 0,
    marginTop: 6,
  },
  icon: {
    marginTop: 15,
    paddingBottom: 4,
    marginRight: 10,
  },
  login: {
    backgroundColor: '#002699',
    padding: 13,
    borderRadius: 10,
    marginTop: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
  },
  container4: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
  },
  container5: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
  },
  icon1: {},
  icon2: {},
});

export default Login;