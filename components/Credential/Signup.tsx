// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
// import { NavigationProp } from '@react-navigation/native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// type SignProps = {
//   navigation: NavigationProp<any>;
// };

// const Signup = ({ navigation }: SignProps) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [nameError, setNameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [phoneError, setPhoneError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState('');
//   const handleNameChange = (input: string) => {
//     setName(input);
//     if (isValidName(input)) {
//       setNameError('')
//     }
//   }

//   const handleEmailChange = (input: string) => {
//     setEmail(input);
//     if (isValidEmail(input)) {
//       setEmailError('');
//     }
//   };

//   const handlePhoneChange = (input: string) => {
//     const numbersOnly = input.replace(/[^0-9]/g, '');
//     setPhone(numbersOnly);
//     if (isValidPhoneNumber(numbersOnly)) {
//       setPhoneError('');
//     }
//   };

//   const handlePasswordChange = (input: string) => {
//     setPassword(input);
//     if (isValidPassword(input)) {
//       setPasswordError('');
//     }
//   };

//   const handleConfirmPasswordChange = (input: string) => {
//     setConfirmPassword(input);
//     if (input === password) {
//       setConfirmPasswordError('');
//     }
//   };

//   const isValidName = (name: string) => {
//     const regex = /^[A-Za-z]+$/;
//     return regex.test(name);
//   };
//   // Remove the extra '}' here

//   const isValidEmail = (email: string) => {
//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   const isValidPhoneNumber = (phone: string) => {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(phone);
//   };

//   const isValidPassword = (password: string) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleSubmit = () => {
//     if (!name.trim()) {
//       setNameError('Name is required');
//     }

//     if (!isValidEmail(email)) {
//       setEmailError('Invalid email address');
//     }

//     if (!isValidPhoneNumber(phone)) {
//       setPhoneError('Invalid phone number');
//     }

//     if (!isValidPassword(password)) {
//       setPasswordError('Invalid password');
//     }

//     if (password !== confirmPassword) {
//       setConfirmPasswordError('Passwords do not match');
//     }

//     if (
//       name.trim() &&
//       isValidEmail(email) &&
//       isValidPhoneNumber(phone) &&
//       isValidPassword(password) &&
//       password === confirmPassword
//     ) {
//       console.log('Registration data submitted:', {
//         name,
//         email,
//         phone,
//         password,
//         confirmPassword
//       });

//       const userObject = {
//         name,
//         email,
//         mobile: phone,
//         password,
//         repassword: confirmPassword,
//       };
//       console.log("user object is ",userObject);
      
//       saveData(userObject);
//     } else {
//       console.log('Registration data is not submitted.');
//     }
//   };

//   const saveData = async (userObject: { name: any; email: any; mobile: any; password: any; repassword: any; }) => {
//     const url = 'https://shreddersbay.com/API/user_api.php?action=signup';
  
//     const formData = new FormData();
    
//     formData.append('name', userObject.name);
//     formData.append('email', userObject.email);
//     formData.append('mobile', userObject.mobile);
//     formData.append('password', userObject.password);
//     formData.append('repassword', userObject.repassword);
//     console.log("again user object is :-",userObject);
    
  
//     try {
//       let result = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });
  
//       if (result.status === 200) {
//         const response = await result.json();
//         Alert.alert(
//           'SignUp successfully please check your mail id : '+ email,
//           response.msg, // Display the response message in the alert
//           [
//             {
//               text: 'OK',
//               onPress: () => {
//                 navigation.navigate('Login'); // Navigate to 'Login' screen
//               },
//             },
//           ],
//           { cancelable: false }
//         );
//         console.log('Response:', response);
//       } else {
//         console.error('Request failed with status:', result.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  




//   return (

//     <SafeAreaView style={styles.container}>
//       <View style={styles.container1}>

//         <View style={styles.signuplogo}>
//           <Image
//             style={styles.tinyLogo}
//             source={require('../../assets/sign-up.webp')}
//           />
//         </View>


//         <View style={{ padding: 8, marginTop: 2 }}>


//           <View style={styles.container2}>
//             <FontAwesome name="user-o" size={30} color="#666" style={styles.icon} />
//             <TextInput placeholder='Name' style={styles.textinput} onChangeText={handleNameChange} />
//             <Text style={styles.error}>{nameError}</Text>
//           </View>

//           <View style={styles.container2}>
//             <MaterialCommunityIcons name="email-outline" size={30} color="#666" style={styles.icon} />
//             <TextInput placeholder='Email' value={email} onChangeText={handleEmailChange} keyboardType='email-address' style={styles.textinput} />

//             <Text style={styles.error}>{emailError}</Text>
//           </View>

//           <View style={styles.container3}>
//             <Ionicons name="lock-closed-outline" size={30} color="#666" style={styles.icon} />
//             <TextInput placeholder='Password'
//               value={password}
//               onChangeText={handlePasswordChange}
//               secureTextEntry={true}
//               textContentType='password'
//               style={styles.textinput}



//             />
//             <Text style={styles.error}>{passwordError}</Text>


//             <TouchableOpacity onPress={() => { }}>
//               <Text style={{ fontSize: 17, marginTop: 14, color: '#002699' }} >Forgot?</Text>
//             </TouchableOpacity>


//           </View>

//           <View style={styles.container3}>
//             <Ionicons name="lock-closed-outline" size={30} color="#666" style={styles.icon} />
//             <TextInput placeholder='ConfirmPassword'
//               value={confirmPassword}
//               onChangeText={handleConfirmPasswordChange}
//               secureTextEntry={true}
//               textContentType='password'
//               style={styles.textinput}


//             />
//                           <Text style={styles.error}>{confirmPasswordError}</Text>




//           </View>

//           <View style={styles.container2}>
//             <MaterialCommunityIcons name="phone-outline" size={30} color="#666" style={styles.icon} />
//             <TextInput placeholder='PhoneNo' value={phone}
//               onChangeText={handlePhoneChange} keyboardType='numeric' style={styles.textinput} />
//                             <Text style={styles.error}>{phoneError}</Text>

//           </View>

//         </View>



//         <View>
//           <TouchableOpacity onPress={handleSubmit} style={styles.login}>
//             <Text style={styles.loginText}>SignUp</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style=
//           {
//             {
//               textAlign: 'center',
//               color: '#666',
//               marginTop: 20,
//               marginBottom: 20,
//             }}
//         >
//           Or, login with ...
//         </Text>



//         <View style=
//           {{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             marginBottom: 20,

//           }}
//         >

//           <TouchableOpacity onPress={() => { }}
//             style={styles.container4}
//           >
//             <Ionicons name="logo-google"
//               size={26}
//               color="red"

//               style={styles.icon1}
//             />

//           </TouchableOpacity>



//           <TouchableOpacity onPress={() => { }}
//             style={styles.container5}
//           >
//             <Ionicons name="phone-portrait"
//               size={26}
//               color="blue"
//               style={styles.icon2}
//             />

//           </TouchableOpacity>
//         </View>


//         <View style=
//           {{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             marginBottom: 30
//           }}
//         >
//           <Text style={{ marginTop: 3, marginRight: 5 }}>New to the app?</Text>
//           <TouchableOpacity  >
//             <Text style=
//               {{
//                 color: '#002699',
//                 fontWeight: '700',
//                 fontSize: 18,
//               }}

//               onPress={() => navigation.navigate('Login')}
//             >
//               Login
//             </Text>
//           </TouchableOpacity>
//         </View>


//       </View>


//     </SafeAreaView>
//   )


// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,

//   },

//   signuplogo: {

//     justifyContent: 'center'

//   },

//   tinyLogo: {
//     width: 300,
//     height: 70,


//   },

//   text: {
   
//     fontSize: 30,
//     fontWeight: '500',
//     color: "#333",
//     marginTop: 1,


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
//     marginTop: 2,
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
//     textAlign: 'center',
//     fontWeight: '600',
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

//   icon1: {

//   },

//   icon2: {

//   },
//   error: {
//     color: 'red',
//     fontSize: 18,

//   }

// })

// export default Signup

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, doc, setDoc } from 'firebase/firestore';
import { firebaseDB } from '../../Config/Firebaseconfig';
import uuid from 'react-native-uuid';


type SignProps = {
  navigation: NavigationProp<any>;
};

const Signup = ({ navigation }: SignProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const handleNameChange = (input: string) => {
    setName(input);
    if (isValidName(input)) {
      setNameError('')
    }
  }

  const handleEmailChange = (input: string) => {
    setEmail(input);
    if (isValidEmail(input)) {
      setEmailError('');
    }
  };

  const handlePhoneChange = (input: string) => {
    const numbersOnly = input.replace(/[^0-9]/g, '');
    setPhone(numbersOnly);
    if (isValidPhoneNumber(numbersOnly)) {
      setPhoneError('');
    }
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    if (isValidPassword(input)) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (input: string) => {
    setConfirmPassword(input);
    if (input === password) {
      setConfirmPasswordError('');
    }
  };

  const isValidName = (name: string) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(name);
  };
  // Remove the extra '}' here

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError('Name is required');
    }

    if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
    }

    if (!isValidPhoneNumber(phone)) {
      setPhoneError('Invalid phone number');
    }

    if (!isValidPassword(password)) {
      setPasswordError('Invalid password');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    }

    if (
      name.trim() &&
      isValidEmail(email) &&
      isValidPhoneNumber(phone) &&
      isValidPassword(password) &&
      password === confirmPassword
    ) {
      console.log('Registration data submitted:', {
        name,
        email,
        phone,
        password,
        confirmPassword
      });

      const userObject = {
        name,
        email,
        mobile: phone,
        password,
        repassword: confirmPassword,
      };
      console.log("user object is ",userObject);
      
      saveData(userObject);
    } else {
      console.log('Registration data is not submitted.');
    }
  };

  const saveData = async (userObject: { name: any; email: any; mobile: any; password: any; repassword: any; }) => {
    const url = 'https://shreddersbay.com/API/user_api.php?action=signup';
  
    const formData = new FormData();
    
    formData.append('name', userObject.name);
    formData.append('email', userObject.email);
    formData.append('mobile', userObject.mobile);
    formData.append('password', userObject.password);
    formData.append('repassword', userObject.repassword);
    console.log("again user object is :-",userObject);
    
  
    try {
      let result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (result.status === 200) {
        const response = await result.json();
        Alert.alert(
          'Sign Up Successful',
          `Sign up was successful. Please check and verify on  your email ID: ${email}.\n${response.msg}`,
                  [
            {
              text: 'OK',
              onPress: () => {
                signupWithFirebase();
                navigation.navigate('Login'); // Navigate to 'Login' screen
              },
            },
          ],
          { cancelable: false }
        );
        console.log('Response:', response);
      } else {
        console.error('Request failed with status:', result.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const signupWithFirebase =async ()=>{
    const usersCollection = collection(firebaseDB, 'users');
    const userIdf = uuid.v4();
    const userDocumentRef = doc(usersCollection,`${userIdf}`);



    if(email !== " "){
      const userObjectf = {
        name,
        email,
        mobile: phone,
        password,
        idf:userIdf,
      };

// await setDoc(doc(usersCollection), userObjectf);
      setDoc(userDocumentRef, userObjectf)
  .then(() => {
    console.log('Document successfully written!');
  })
  .catch((error) => {
    console.error('Error writing document: ', error);
  });
}


  }



  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>

        <View style={styles.signuplogo}>
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/sign-up.webp')}
          />
        </View>


        <View style={{ padding: 8, marginTop: 2 }}>


          <View style={styles.container2}>
            <FontAwesome name="user-o" size={30} color="#666" style={styles.icon} />
            <TextInput placeholder='Name' style={styles.textinput} onChangeText={handleNameChange} />
            <Text style={styles.error}>{nameError}</Text>
          </View>

          <View style={styles.container2}>
            <MaterialCommunityIcons name="email-outline" size={30} color="#666" style={styles.icon} />
            <TextInput placeholder='Email' value={email} onChangeText={handleEmailChange} keyboardType='email-address' style={styles.textinput} />

            <Text style={styles.error}>{emailError}</Text>
          </View>

          <View style={styles.container3}>
            <Ionicons name="lock-closed-outline" size={30} color="#666" style={styles.icon} />
            <TextInput placeholder='Password'
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              textContentType='password'
              style={styles.textinput}



            />
            <Text style={styles.error}>{passwordError}</Text>


            <TouchableOpacity onPress={() => { }}>
              <Text style={{ fontSize: 17, marginTop: 14, color: '#002699' }} >Forgot?</Text>
            </TouchableOpacity>


          </View>

          <View style={styles.container3}>
            <Ionicons name="lock-closed-outline" size={30} color="#666" style={styles.icon} />
            <TextInput placeholder='ConfirmPassword'
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={true}
              textContentType='password'
              style={styles.textinput}


            />
                          <Text style={styles.error}>{confirmPasswordError}</Text>




          </View>

          <View style={styles.container2}>
            <MaterialCommunityIcons name="phone-outline" size={30} color="#666" style={styles.icon} />
            <TextInput placeholder='PhoneNo' value={phone}
              onChangeText={handlePhoneChange} keyboardType='numeric' style={styles.textinput} />
                            <Text style={styles.error}>{phoneError}</Text>

          </View>

        </View>



        <View>
          <TouchableOpacity onPress={handleSubmit} style={styles.login}>
            <Text style={styles.loginText}>SignUp</Text>
          </TouchableOpacity>
        </View>

        <Text style=
          {
            {
              textAlign: 'center',
              color: '#666',
              marginTop: 20,
              marginBottom: 20,
            }}
        >
          Or, login with ...
        </Text>



        <View style=
          {{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,

          }}
        >

          <TouchableOpacity onPress={() => { }}
            style={styles.container4}
          >
            <Ionicons name="logo-google"
              size={26}
              color="red"

              style={styles.icon1}
            />

          </TouchableOpacity>



          <TouchableOpacity onPress={() => { }}
            style={styles.container5}
          >
            <Ionicons name="phone-portrait"
              size={26}
              color="blue"
              style={styles.icon2}
            />

          </TouchableOpacity>
        </View>


        <View style=
          {{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30
          }}
        >
          <Text style={{ marginTop: 3, marginRight: 5 }}>New to the app?</Text>
          <TouchableOpacity  >
            <Text style=
              {{
                color: '#002699',
                fontWeight: '700',
                fontSize: 18,
              }}

              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>


      </View>


    </SafeAreaView>
  )


}

const styles = StyleSheet.create({

  container: {
    flex: 1,

  },

  signuplogo: {

    justifyContent: 'center'

  },

  tinyLogo: {
    width: 300,
    height: 70,


  },

  text: {
    fontFamily: 'sans-sarif',
    fontSize: 30,
    fontWeight: '500',
    color: "#333",
    marginTop: 1,


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
    marginTop: 2,
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

  icon1: {

  },

  icon2: {

  },
  error: {
    color: 'red',
    fontSize: 18,

  }

})

export default Signup






