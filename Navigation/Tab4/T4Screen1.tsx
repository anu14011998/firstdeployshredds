import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
// import {  } from 'react-native-gesture-handler'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Swiper from "react-native-swiper";
// const { width } = Dimensions.get('window');

const T4Screen1 = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const baseImageUrl = "https://shreddersbay.com/API/uploads/";
  const imgurl = profileData[0]?.imgurl;

  const imageUrl = imgurl ? baseImageUrl + imgurl : undefined;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("UserCred");
        // console.log("my stoerd data is :--",storedData);

        if (storedData != null) {
          const userDataObject = JSON.parse(storedData);
          // setUserDataLocalStorage(userDataObject);
          // console.log("my userobject is :--",userDataObject);

          // Check if the '0' key exists and 'id' field is present in the object
          if (userDataObject && userDataObject["0"] && userDataObject["0"].id) {
            const userId = userDataObject["0"].id;
            setUserId(userId);
            // console.log("userid is something from useeffect:-",userId);

            // Now, userId contains the value of the 'id' field from userDataLOCAL_STORAGE
            // console.log('in mathod User ID:', userId);
          } else {
            console.log("No user data or ID found.");
          }
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
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
        "Logout Confirmation",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.removeItem("UserCred");
              await AsyncStorage.removeItem("UserIdapp");
              await AsyncStorage.removeItem("femail");
              await AsyncStorage.removeItem("fid");
              await AsyncStorage.removeItem("fmobile");
              await AsyncStorage.removeItem("fname");

              // dispatch(setUserData(null));

              navigation.navigate("Tab1", { screen: "T1Screen1" });
              // navigation.popToTop();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // const images = [
  //   require('../../assets/login-vector.jpg'),
  //   require('../../assets/scrap.jpeg'),
  //   require('../../assets/scrap1.png'),
  //   require('../../assets/scrap2.jpeg'),
  //   require('../../assets/signup.jpg'),

  // ];

  const orderDetail = () => {
    console.log("working fine");
    // navigation.navigate('MyOrder');
    navigation.navigate("My Order");
  };

  const AddAdress = () => {
    console.log("working fine");
    navigation.navigate("T2Screen2");
  };

  const getProfile = async (uid: any) => {
    console.log("profileid is from getprofile:", uid);
    if (uid != null) {
      try {
        const response = await fetch(
          `https://shreddersbay.com/API/user_api.php?action=select_id&user_id=${userId}`,
          {
            method: "GET",
            // Remove 'Content-Type' header for GET requests
          }
        );

        if (response.ok) {
          const userProfileData = await response.json();
          console.log("Profile fetched successfully:", userProfileData);
          // Handle userData as needed (e.g., set state or update UI)
          setProfileData(userProfileData);
        } else {
          console.error("Failed to get profile:", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////////
  const fadeIn = new Animated.Value(0);

  const fadeInAnimation = () => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fadeInAnimation();
  }, []);

  return (
    <View>
      <View></View>

      {userId !== null ? (
        <View
          style={{
            padding: 5,
            backgroundColor: "#fff",
            borderRadius: 30,
            marginTop: 10,
          }}
        >
          <View
            style={{
              padding: 20,
              backgroundColor: "#3399ff",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              marginTop: 10,
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                {profileData[0]?.name}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <TouchableWithoutFeedback
              onPress={orderDetail}
              style={{ marginVertical: 7 }}
            >
              <View style={styles.button}>
                <View style={styles.icon}>
                  <View>
                    <MaterialCommunityIcons
                      name="bucket-outline"
                      style={{
                        fontSize: 20,
                        padding: 6,
                        marginRight: 10,
                        backgroundColor: "blue",
                        borderRadius: 50,
                        color: "white",
                      }}
                    />
                  </View>

                  <View>
                    <Text style={styles.text1}>My Order</Text>
                  </View>
                </View>

                <View style={styles.icon1}>
                  <Feather
                    name="chevron-right"
                    style={{
                      fontSize: 25,
                      color: "gray",
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              style={{ marginVertical: 7 }}
              onPress={AddAdress}
            >
              <View style={styles.button}>
                <View style={styles.icon}>
                  <View>
                    <Ionicons
                      name="location-outline"
                      style={{
                        fontSize: 20,
                        padding: 6,
                        marginRight: 10,
                        backgroundColor: "#1aff1a",
                        borderRadius: 50,
                        color: "black",
                      }}
                    />
                  </View>

                  <View>
                    <Text style={styles.text1}>Add Address</Text>
                  </View>
                </View>

                <View style={styles.icon1}>
                  <Feather
                    name="chevron-right"
                    style={{
                      fontSize: 25,
                      color: "gray",
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback style={{ marginVertical: 7 }}>
              <View style={styles.button}>
                <View style={styles.icon}>
                  <View>
                    <Ionicons
                      name="notifications-outline"
                      style={{
                        fontSize: 20,
                        padding: 6,
                        marginRight: 10,
                        backgroundColor: "#ffff00",
                        borderRadius: 50,
                        color: "black",
                      }}
                    />
                  </View>

                  <View>
                    <TouchableOpacity>
                      <Text style={styles.text1}>Notifications</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.icon1}>
                  <Feather
                    name="chevron-right"
                    style={{
                      fontSize: 25,
                      color: "gray",
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={handleLOgOUt}
              style={{ marginVertical: 7 }}
            >
              <View style={styles.button}>
                <View style={styles.icon}>
                  <View>
                    <MaterialCommunityIcons
                      name="logout"
                      style={{
                        fontSize: 20,
                        padding: 6,
                        marginRight: 10,
                        backgroundColor: "#993333",
                        borderRadius: 50,
                        color: "white",
                      }}
                    />
                  </View>

                  <View>
                    {/* onPress={handleLOgOUt} */}
                    <Text style={styles.text1}>Logout</Text>
                  </View>
                </View>

                <View style={styles.icon1}>
                  <Feather
                    name="chevron-right"
                    style={{
                      fontSize: 25,
                      color: "gray",
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      ) : (
        <View style={styles.containerlogin}>
          <View style={styles.sliderContainer}>
            {/* <Swiper
    style={styles.wrapper}
    autoplay={true}
    autoplayTimeout={4}
    showsPagination={false} // Hides the pagination dots
  > */}
            {/* {images.map((image, index) => (
      <View style={styles.slide} key={index}>
        <Image style={styles.image} source={image} />
      </View>
    ))} */}
            {/* </Swiper> */}

            <View style={{ marginTop: 30 }}>
              <Animated.View style={[styles.btnview, { opacity: fadeIn }]}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.text1}>Login</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={[
                  styles.btnview,
                  { opacity: fadeIn, backgroundColor: "#336699" },
                ]}
              >
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                  <Text style={[styles.text1, { color: "white" }]}>Signup</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          {/* <View style={[styles.btnview,{backgroundColor:'#3498db'}]} >
           <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
             <Text style={styles.text1}>
               Login
            </Text>
           </TouchableOpacity>
          </View> */}
        </View>

        //    <View style={{ alignItems: 'center', marginTop: 50,}}>
        //    <Text style={{ fontSize: 34,fontWeight:'400' }}>
        //      User not exits please Signup or Login
        //    </Text>
        //    <View style={[styles.btnview,{backgroundColor:'#3498db'}]} >
        //      <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
        //        <Text style={styles.text1}>
        //          Login
        //        </Text>
        //      </TouchableOpacity>
        //    </View>
        //    <View style={[styles.btnview,{backgroundColor:'#2ecc71'}]}>
        //      <TouchableOpacity onPress={() => { navigation.navigate('Signup') }}>
        //        <Text style={styles.text1}>
        //          Signup
        //        </Text>
        //      </TouchableOpacity>
        //    </View>
        //  </View>
      )}
    </View>
  );
};

export default T4Screen1;

const styles = StyleSheet.create({
  containerlogin: {
    flex: 1,
    alignItems: "center",
  },
  sliderContainer: {
    width: "90%", // Set the width of the container view
    height: 550,
    marginTop: 40,
    // Set the height of the container view
  },
  wrapper: {},
  slide: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: "100%", // Set the image width to fill the container
    height: "100%", // Set the image height to fill the container
    resizeMode: "cover",
    borderRadius: 20,
  },

  icon1: {},
  button: {
    flexDirection: "row",
    justifyContent: "space-between", // To evenly space the two elements
    alignItems: "center", // Align items vertically
    paddingHorizontal: 20,
    paddingVertical: 8,// Add padding as needed
    // Other styles
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    // Other styles for icon container
  },

  text1: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
  },
  text2: {
    fontSize: 14,
  },

  btnview: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#a6a6a6",
    justifyContent: "center",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 15,
    marginHorizontal: 5,
  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  signupButton: {
    backgroundColor: "#2ecc71",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
