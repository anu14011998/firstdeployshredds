import { Alert, StyleSheet, Text, View,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const T4Screen1 = ({ navigation }) => {
  const [userId, setUserId] = useState(null)
  const [profileData, setProfileData] = useState([])
  const baseImageUrl = 'https://shreddersbay.com/API/uploads/';
  const imgurl = profileData[0]?.imgurl; 

  const imageUrl = imgurl ? baseImageUrl + imgurl : undefined;

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('UserCred');
        // console.log("my stoerd data is :--",storedData);

        if (storedData != null) {
          const userDataObject = JSON.parse(storedData);
          // setUserDataLocalStorage(userDataObject);
          // console.log("my userobject is :--",userDataObject);

          // Check if the '0' key exists and 'id' field is present in the object
          if (userDataObject && userDataObject['0'] && userDataObject['0'].id) {
            const userId = userDataObject['0'].id;
            setUserId(userId)
            // console.log("userid is something from useeffect:-",userId);

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


    //   const intervalFunction = () => {
    //     // Perform actions or call functions here that you want to repeat
    //     getProfile(userId);
    //   };
    //   const intervalId = setInterval(intervalFunction, 5000); // Interval in milliseconds (e.g., 5000ms = 5 seconds)
    //   return () => clearInterval(intervalId);

    // }
    console.log("the user id is:--", userId);

    getProfile(userId);


    // Set an interval (e.g., every 5 seconds)

    // Clear the interval when the component unmounts to avoid memory leaks


  }, [userId]);

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
    // navigation.navigate('MyOrder');
    navigation.navigate('T3Screen2');

  };


  const AddAdress = () => {
    console.log("working fine");
    navigation.navigate('T2Screen2');
  };


  const getProfile = async (uid: any) => {
    console.log("profileid is from getprofile:", uid);
    if (uid != null) {
      try {
        const response = await fetch(
          `https://shreddersbay.com/API/user_api.php?action=select_id&user_id=${userId}`, {
          method: 'GET',
          // Remove 'Content-Type' header for GET requests
        }
        );

        if (response.ok) {
          const userProfileData = await response.json();
          console.log('Profile fetched successfully:', userProfileData);
          // Handle userData as needed (e.g., set state or update UI)
          setProfileData(userProfileData)
        } else {
          console.error('Failed to get profile:', response.status);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

  };




  return (
    <View >

<View
>
{/* <View style={{}}>
<View>
  <Text>
     profile:- {profileData[0]?.imgurl}
  </Text>
     {imgurl && (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 100, height: 100 }} // Adjust dimensions as needed
        />
      )}

</View>

<View>
  <Text>
  Name :- {profileData[0]?.name}
  </Text>
</View>
<View>
  <Text>
  {profileData[0]?.email}
  </Text>
</View>
</View> */}




{/* <View>
  <Text>
  {JSON.stringify(profileData)},{profileData[0]?.name}
  </Text>
</View> */}


</View>


      {(userId !== null) ? (



        
        <View style={{ padding: 5,
        backgroundColor: '#fff',
        borderRadius: 30,
        marginTop: 10,
         }}>

<View style=
{{
  padding: 20 ,
  backgroundColor: '#3399ff',
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  marginTop: 10,
  }}>


<View>
  <Text style=
  {{
    color:'white',
    fontSize: 20,
    }}>
   {profileData[0]?.name}
  </Text>
</View>
</View>
          
<View style={{marginTop: 20}}>

          <TouchableWithoutFeedback onPress={orderDetail} style={{ marginVertical: 7 }}>
            <View style={styles.button} >

              <View style={styles.icon} >

                <View>
                  <MaterialCommunityIcons name="bucket-outline" style=
                  {{ 
                    fontSize: 20,
                    padding: 6,
                    marginRight: 10,
                    backgroundColor: 'blue',
                    borderRadius: 50,
                    color: 'white'
                    
                    }} />
                </View>


                <View >

                  <Text style={styles.text1}>
                    My Order
                  </Text>

                </View>

              </View>

              <View style={styles.icon1}>
                <Feather name="chevron-right" 
                 style=
                   {{
                   fontSize: 25,
                   color: 'gray' 
                   }}
                    />
              </View>

            </View>
          </TouchableWithoutFeedback>       

          <TouchableWithoutFeedback style={{ marginVertical: 7 }} onPress={AddAdress}>
            <View style={styles.button}>

              <View style={styles.icon} >

                <View>
                  <Ionicons name="location-outline" style={{fontSize: 20,
                    padding: 6,
                    marginRight: 10,
                    backgroundColor: '#1aff1a',
                    borderRadius: 50,
                    color: 'black' }} />
                </View>

                <View >

                  <Text style={styles.text1}>
                    Add Address
                  </Text>

                </View>

              </View>

              <View style={styles.icon1}>
                <Feather name="chevron-right" 
                style=
                {{ 
                  fontSize: 25,
                  color: 'gray' 
                  }}
                   />
              </View>

            </View>
          </TouchableWithoutFeedback>


          <TouchableWithoutFeedback style={{ marginVertical: 7 }}>
            <View style={styles.button}>

              <View style={styles.icon} >

                <View>
                  <Ionicons name="notifications-outline" style={{fontSize: 20,
                    padding: 6,
                    marginRight: 10,
                    backgroundColor: '#ffff00',
                    borderRadius: 50,
                    color: 'black' }} />
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
                <Feather name="chevron-right"
                 style=
                 {{
                   fontSize: 25,
                   color: 'gray' 
                  }}
                />
              </View>

            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={handleLOgOUt} style={{ marginVertical: 7 }}>
            <View style={styles.button}>

              <View style={styles.icon} >

                <View>
                  <MaterialCommunityIcons name="logout" style={{
                    fontSize: 20,
                    padding: 6,
                    marginRight: 10,
                    backgroundColor: '#993333',
                    borderRadius: 50,
                    color: 'white' }} />
                </View>

                <View >

                  {/* onPress={handleLOgOUt} */}
                  <Text style={styles.text1}>
                    Logout
                  </Text>

                </View >

              </View>

              <View style={styles.icon1}>
                <Feather name="chevron-right"
                 style=
                 {{
                   fontSize: 25,
                   color: 'gray' }} />
              </View>

            </View>
          </TouchableWithoutFeedback>

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
    fontSize: 20,
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




