import { View, Text, Button, TouchableOpacity, ScrollView, TextInput, Image, Modal, TouchableWithoutFeedback, RefreshControl, Pressable, Alert, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react'
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/actions/dashAction';
import { StyleSheet } from 'react-native';
// import {  } from 'react-native-gesture-handler';
import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import EntypoIcon from 'react-native-vector-icons/Entypo'; // Import the Entypo icon
import Login from '../../components/Credential/Login';
import LogoSlider from '../../components/OrderImage/LogoSlider';
import Aluminium from '../../components/OrderImage/Aluminium';
import CopperImage from '../../components/OrderImage/CopperImage';
import T1Screen1modal1 from './T1Screen1modal1';
import ImageSlider from '../../components/OrderImage/ImageSlider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import * as Updates from 'expo-updates';

import { addDoc, collection, getDocs, getFirestore, onSnapshot, orderBy, query, where } from 'firebase/firestore';


const T1Screen1 = ({ navigation }) => {
  const imgurl = 'https://shreddersbay.com/API/uploads/';
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detaildata, setdetaildata] = useState<any | number>(null)



  const dispatch = useDispatch();

  // Access data and error from Redux store
  const data = useSelector((state: any) => state.dashboard.data);
  const error = useSelector((state: any) => state.dashboard.error);
  const [userfilterdata, setuserfilterdata] = useState([])

  useEffect(() => {
    // Define a function to fetch data
    const fetchDataAndCheck = () => {
      dispatch(fetchData());
    };

    // Call the function initially
    fetchDataAndCheck();


    // If data is empty, set up an interval to keep fetching data
    if (data.length === 0) {
      const intervalId = setInterval(fetchDataAndCheck, 1000); // Adjust the interval as needed

      // Clean up the interval when the component unmounts or when data is not empty
      return () => clearInterval(intervalId);
    } else {
      const filteredArray = data.filter((item) => item.user_id != user_id);
      setuserfilterdata(filteredArray)

    }
  }, [data, dispatch,]); // Add data as a dependency to re-run useEffect when data changes
  // /////////////////////////////
  // const [showModal, setshowModal] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchData());
    setTimeout(() => {
      setRefreshing(false);

    }, 2000);
  }


  //////////////////////////////////
  const [booking_id, setbookingId] = useState<number | null>(null);
  const [imagename, setImagename] = useState('')
  const handleDetailPress = async (bookingId: number, filename: string) => {
    setImagename(filename);
    console.log(filename);
    setbookingId(bookingId);
    setModalVisible(true);
    console.log('booking_id', bookingId)
    try {
      // const requestBody = {
      //   booking_id: bookingId, // Assuming this is the key name expected by your API
      //   // Other fields if required by the API
      // }; 
      const formdata = new FormData()
      formdata.append('booking_id', bookingId.toString());

      const response = await fetch('https://shreddersbay.com/API/orders_api.php?action=select_id', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add other headers if needed
        },
        body: formdata,
      });

      if (response.ok) {
        const details = await response.json();
        // Handle the received data, navigate to another screen, etc.
        // For example:
        setdetaildata(details)
        console.log('Detail Data:', details);
      } else {
        // Handle error
        console.error('Error fetching details:', response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    }


  };

  const handleBuyPress =()=>{
    if(user_id !== null){
      navigation.navigate('myorder');
    handleBuyPressOnMOdal(booking_id)
    }else{
      showCustomAlert()
    }
    
    }
    const showCustomAlert = () => {
      Alert.alert(
        'Confirmation',
        'You have to Login Or Signup',
        [
          {
            text: 'No',
            onPress: () => {
              // Do something when "No" is pressed
             
              
            },
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              // Do something when "Yes" is pressed
             navigation.navigate('Login')
              
            },
          },
        ],
        { cancelable: false }
      );
    };

  const [acceptData, setacceptData] = useState([]);
  const handleBuyPressOnMOdal = async (bookingId: any) => {
    console.log("we will see later ....");

    try {

      const formdata = new FormData()
      formdata.append('booking_id', bookingId);
      formdata.append('user_id', user_id);

      const response = await fetch('https://shreddersbay.com/API/orders_api.php?action=accept', {
        method: 'POST',
        headers: {
          'Content-type': 'multipart/form-data',
        },
        body: formdata,
      });

      if (response.ok) {
        const aceptData = await response.json();
        setacceptData(aceptData)
        // Process or set the acceptData if needed
        console.log('Accept API request successful');
      }

      else {
        console.error('Accept API request failed:', response.statusText);
      }

    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  const [user_id, setUserIds] = useState(null) // User ID
  const [userDataLOCAL_STORAGE, setUserDataLocalStorage] = useState(null);
  const [isAppUpdateModalVisible,setIsAppUpdateModalVisible] =useState(false);
  const closeUpdateAppModal =()=>{
    setIsAppUpdateModalVisible(!isAppUpdateModalVisible)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('UserCred');

        if (storedData !== null) {
          const userDataObject = JSON.parse(storedData);
          setUserDataLocalStorage(userDataObject);

          // Check if the '0' key exists and 'id' field is present in the object
          if (userDataObject && userDataObject['0'] && userDataObject['0'].id) {
            const userId = userDataObject['0'].id;
            setUserIds(userId)
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
    // console.log(data);
    // console.log("my filtered data is :-",userfilterdata);
    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();
  
        if (update.isAvailable) {
          // await Updates.fetchUpdateAsync();
          // await Updates.reloadAsync();
          setIsAppUpdateModalVisible(isAppUpdateModalVisible)
        }
      } catch (error) {
        // You can also add an alert() to see the error message in case of an error when fetching updates.
        // alert(`Error fetching latest Expo update: ${error}`);
        console.log(`Error fetching latest Expo update: ${error}`);
        
      }
    }
    onFetchUpdateAsync()


  }, []);
  ///////////////////////////////
  const [fromChatUserIdFbse, setFromChatUserIdFbse] = useState('')
  const [toChatUserEmailFbse,setToChatUserEmailFbse]=useState('')
  const [toChatUserNameFbse,setToChatUserNameFbse]=useState('')
  const [toChatUserIdFbse,setToChatUserIdFbse]=useState('')
  const [toChatUserMobileFbse,setToChatUserMobileFbse]=useState('')
  const [isModalVisible2,setIsModalVisible2]=useState(false)
  const togglemodal2 =()=>{
    setIsModalVisible2(!isModalVisible2)
  }



  useEffect(() => {

    getUsers1();
  }, [fromChatUserIdFbse, detaildata]);

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    if(user_id !== null){
      try {
        const email = await AsyncStorage.getItem("femail");
        const fuserid = await AsyncStorage.getItem("fid");
  
        console.log("Current user's email:", email);
        // console.log("firebase form chat user Id:fuser-",fuserid);
  
  
        if (email) {
          setFromChatUserIdFbse(fuserid)
          const firebaseDB = getFirestore();
          const userCollection = collection(firebaseDB, 'users');
          const usersQuery = query(userCollection, where('email', '!=', email));
  
          // console.log("Users query:", usersQuery); // Check the users query
  
          const querySnapshot = await getDocs(usersQuery);
          const userData = querySnapshot.docs.map(documentSnapshot => ({
            id: documentSnapshot.id,
            fullName: documentSnapshot.get("name"),
            mobile: documentSnapshot.get("mobile"),
            email: documentSnapshot.get("email"),
            ...documentSnapshot.data()
          }));
  
          console.log("Fetched users data:", userData); // Check the fetched users data
          // console.log("firebase form chat user Id:fromchatuseridfbse-",fromChatUserIdFbse);
  
  
          console.log("this is detail data:--", detaildata);
  
          const detaildataEmail = detaildata[0]?.email;
  
          // Finding the object in userData with a matching email
          const matchingUser = userData.find(user => user.email === detaildataEmail);
  
          if (matchingUser) {
            // Perform your action here with the matching user object
            console.log("Found matching user:", matchingUser);
            setToChatUserEmailFbse(matchingUser.email)
            setToChatUserNameFbse(matchingUser.fullName)
            setToChatUserIdFbse(matchingUser.id)
            setToChatUserMobileFbse(matchingUser.mobile)
            setIsModalVisible2(true)
  
            // Example: Access properties of the matching user object
            // e.g., matchingUser.id, matchingUser.name, matchingUser.whatever
            // Your action here...
          } else {
            console.log("No matching user found");
          }
  
  
  
          setUsers(userData);
        }
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    }else{
      showCustomAlert()
    }
   
  };
  const getUsers1 = async () => {
    try {
      const email = await AsyncStorage.getItem("femail");
      const fuserid = await AsyncStorage.getItem("fid");

      console.log("Current user's email:", email);
      // console.log("firebase form chat user Id:fuser-",fuserid);


      if (email) {
        setFromChatUserIdFbse(fuserid)
        const firebaseDB = getFirestore();
        const userCollection = collection(firebaseDB, 'users');
        const usersQuery = query(userCollection, where('email', '!=', email));

        // console.log("Users query:", usersQuery); // Check the users query

        const querySnapshot = await getDocs(usersQuery);
        const userData = querySnapshot.docs.map(documentSnapshot => ({
          id: documentSnapshot.id,
          fullName: documentSnapshot.get("name"),
          mobile: documentSnapshot.get("mobile"),
          email: documentSnapshot.get("email"),
          ...documentSnapshot.data()
        }));

        console.log("Fetched users data:", userData); // Check the fetched users data
        // console.log("firebase form chat user Id:fromchatuseridfbse-",fromChatUserIdFbse);


        console.log("this is detail data:--", detaildata);

        const detaildataEmail = detaildata[0]?.email;

        // Finding the object in userData with a matching email
        const matchingUser = userData.find(user => user.email === detaildataEmail);

        if (matchingUser) {
          // Perform your action here with the matching user object
          console.log("Found matching user:", matchingUser);
          setToChatUserEmailFbse(matchingUser.email)
          setToChatUserNameFbse(matchingUser.fullName)
          setToChatUserIdFbse(matchingUser.id)
          setToChatUserMobileFbse(matchingUser.mobile)
          // setIsModalVisible2(true)

          // Example: Access properties of the matching user object
          // e.g., matchingUser.id, matchingUser.name, matchingUser.whatever
          // Your action here...
        } else {
          console.log("No matching user found");
        }



        setUsers(userData);
      }
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };


  return (



    <View style={styles.container}>

      <View>


        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}

          onRequestClose={() => {

            setModalVisible(!modalVisible);
          }}>


          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

            <View style={styles.centeredView}>

              <View >
                <TouchableOpacity
                  style={[styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >


                  <Text style={styles.textStyle}>
                    < FontAwesome name="close" />
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalView}>



                {/* <Text>
                  {JSON.stringify(detaildata)}</Text> */}
                {detaildata && detaildata.map((item, index) => (
                  <View key={index}>

                    <View style={styles.imageContainer1}>



                      <Image
                        source={{ uri: imgurl + item.filename }}

                        style={styles.image2}
                      />
                    </View>






                    <View style={styles.textContainer7}>
                      <Text style=
                        {{
                          alignSelf: 'center',
                          fontWeight: '700',
                          fontSize: 20,
                          color: '#cccc00',
                          borderBottomWidth: 0.7,
                          marginBottom: 5,
                        }}
                      >PRODUCT DETAIL</Text>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Booking_ID: {item.booking_id}</Text>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Product_Name: {item.p_name}</Text>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Approx Price: {item.price}</Text>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Booking_Date: {item.booking_date}</Text>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Schedule Date: {item.schedule_date}</Text>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Weight: {item.weight}</Text>
                    </View>



                    <View style={styles.textContainer7}

                    >
                      <Text style=
                        {{
                          alignSelf: 'center',
                          fontWeight: '700',
                          fontSize: 20,
                          color: '#cccc00',
                          borderBottomWidth: 0.7,
                          marginBottom: 5,
                        }}
                      >CUSTOMER DETAIL</Text>

                      <View>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Name: {item.name}</Text>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Mobile: {item.mobile}</Text>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Area: {item.area}</Text>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Address: {item.address}</Text>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Landmark: {item.landmark}</Text>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Pincode: {item.pin_code}</Text>
                      </View>



                      <View style=
                      {{
                        flexDirection: 'row',
                        flex: 1,
                        marginTop: 20,
                        justifyContent: 'center'}}>
                        <View style=
                        {{paddingRight: 10}}>

                          <TouchableOpacity onPress={handleBuyPress}>
                            <Text style={styles.detail}
                            >
                              Buy
                            </Text>

                          </TouchableOpacity>

                        </View>
                        <View >
                          <TouchableOpacity onPress={() => { getUsers() }}>
                            <Text style={styles.detail}
                            >
                              Chat
                            </Text>

                          </TouchableOpacity>

                        </View>
                      </View>

                      {/* <View style={styles.textContainer3}> */}
                      {/* <View >

                        <TouchableOpacity onPress={() => { handleBuyPress(item.booking_id) }}>
                          <Text style={styles.detail}
                          >
                            Buy
                          </Text>

                        </TouchableOpacity>

                      </View> */}
                      {/* <View >
                        <TouchableOpacity onPress={() => { getUsers() }}>
                          <Text style={styles.detail}
                          >
                            Chat
                          </Text>

                        </TouchableOpacity>

                      </View> */}

                    </View>
                    {/* Display other details here */}
                  </View>



                ))}

              </View>
            </View>
          </TouchableWithoutFeedback>
          <View>
      <MainChats
        isModalVisible={isModalVisible2}
        toggleModal={togglemodal2}
        formchatUserIdFbse={fromChatUserIdFbse}
        tochatUserIdFbse={toChatUserIdFbse}
        tochatUserNameFbse={toChatUserNameFbse}
        toChatUserMobileFbse={toChatUserMobileFbse}
        
      />
      </View>
        </Modal>
        <AskForAppUpdate />
      </View>
     


      <View style={styles.logo}>

{/* <View  style=
          {{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            gap: 20,
          }}
          >
<View>
          <Image
              style={styles.image1}
              source={require('../../assets/SHREDS.png')}
            />
      </View>
</View> */}
    

        <View style=
          {{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            
           
          }}
        >

        
          <View style={{ flexDirection: 'row', }}>
           <Text style={styles.heading}>ShreddersBay</Text>
          </View>

        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }} >
          <Ionicons name="location-outline" style={{ fontSize: 25,   fontWeight: 'bold',
          color: '#00457E',}} />
       </View>


        </View>




      </View>


      <View style={styles.container1}>
      
          <TextInput
            placeholder="search"
            clearButtonMode='always'
            autoCapitalize='none'
            autoCorrect={true}
            style={styles.searchbox}
          />
        
     

<View style={{flexDirection: 'row', gap: 6}}>
            <TouchableOpacity  >
              <View style={styles.heading1} >
                <Ionicons name="person-add"
                  onPress={() => navigation.navigate('Login')}
                  size={30} color={'#00457E'} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity  >
              <View style={styles.heading1} >
                <FontAwesome name="shopping-cart"
                  onPress={() => navigation.navigate('T2Screen1')}
                  size={30} color={'#00457E'} />
              </View>
            </TouchableOpacity>
</View>
      </View>

      <View style={{ flex: 1 }} >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0000ff']}
              tintColor="#0000ff"
            />
          }>



          <View>
            <ImageSlider />
          </View>
         
       



          <View>


            <View style={styles.container3}>

              <Text style={styles.order}>Fresh Recommendations</Text>
            </View>


            <View style={styles.container5}>


              <View style={styles.card1}>


                {user_id === null
                  ? data.map((item, index) => (
                    <View key={index} style={styles.card}>
                      <TouchableOpacity onPress={() => handleDetailPress(item.booking_id, item.filename)}>
                        <View style={styles.imageContainer}>
                          <Image
                            source={{ uri: imgurl + item.filename }}
                            style={styles.image}
                          />
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.textContainer2}>{item.p_name}</Text>
                          <Text style={styles.textContainer5}>
                            <FontAwesome name="rupee" style={{ fontSize: 20 }} /> {item.price}
                          </Text>
                          <Text style={styles.textContainer6}>
                            <EvilIcons name="location" style={{ fontSize: 22 }} /> {item.address}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                  : userfilterdata.map((item, index) => (
                    <View key={index} style={styles.card}>
                      <TouchableOpacity onPress={() => handleDetailPress(item.booking_id, item.filename)}>
                        <View style={styles.imageContainer}>
                          <Image
                            source={{ uri: imgurl + item.filename }}
                            style={styles.image}
                          />
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.textContainer2}>{item.p_name}</Text>
                          <Text style={styles.textContainer5}>
                            <FontAwesome name="rupee" style={{ fontSize: 20 }} /> {item.price}
                          </Text>
                          <Text style={styles.textContainer6}>
                            <EvilIcons name="location" style={{ fontSize: 22 }} /> {item.address}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}

              </View>




            </View>

            {/* <Text>{JSON.stringify(data)}</Text> */}


          </View>

          <View>
            <LogoSlider />
          </View>

          <View>
            < Aluminium />
          </View>

          <View>
            <CopperImage />
          </View>

        </ScrollView>
      </View>

    </View>


  )

}
const styles = StyleSheet.create({

  image2: {
    width: 100,
    height: 100,
  },
  imageContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  textContainer7: {
    borderWidth: 1,
    padding: 20,
    margin: 4,
    borderRadius: 4,
    borderColor: '#ddd',

  },

  centeredView: {
    flex: 1,
    marginTop: 10,
  },

  modalView: {
    // #666666
    margin: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 50,
  },


  buttonClose: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#cccc00',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',

  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },


  // 


  heading1: {
    marginTop: 10, 
    marginLeft: 7,

  },

  accept: {

    fontSize: 20,
    color: 'black',
    borderWidth: 1,
    borderRadius: 50,
    padding: 8,
    borderColor: 'transparent',
    backgroundColor: '#ddd',

  },

  delete: {

    fontSize: 20,
    color: '#fff',
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    backgroundColor: "red",

  },

  detail: {

    fontSize: 20,
    color: 'black',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 90,
    paddingHorizontal: 35,
    paddingVertical: 10,
    backgroundColor: '#cccc00',

  },



  image1: {

    width: 50,
    height: 50,
    marginRight: 8,
  },

  card1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 10,
  },


  card: {
    width: '48%', // Adjust width as per your requirement
    marginBottom: 10,
    padding: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'gray',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },

  textContainer: {
    padding: 10,
  },

  textContainer3: {

    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',

  },

  textContainer2: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginBottom: 5,
  },

  textContainer4: {
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
    marginRight: 5,
  },
  textContainer5: {
    fontSize: 19,
    color: 'black',
    marginBottom: 2,

  },

  textContainer6: {
    fontSize: 15,
    marginTop: 10,
    color: 'gray',
    marginBottom: 2,

  },


  imageContainer: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },


  logo: {

    flexDirection: 'row',
    // alignItems: 'center'
    // textAlign: 'center

  },

  container: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
   

  },

  container1: {
    marginBottom: 8,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: '#CCC',
    flexDirection: 'row',

  },

  container2: {

    padding: 10,
    margin: 10,
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ccc',



  },

  scrollView: {
    flex: 1,
    backgroundColor: 'white'
    // #e6e6e6
  },

  contentContainer: {
    alignItems: 'center',
  },

  text1: {
    color: 'black',
  },

  container3: {
    padding: 10,
  },

  container4: {

  },
  container5: {

  },

  scrollContent: {
    padding: 11,
  },

  order: {

    fontSize: 25,
    color: '#00457E',
    // fontFamily: 'sans-sarif',
    marginBottom: 20,
    marginTop: 20


  },

  tinyLogo: {
    width: 160,
    height: 160,
    marginRight: 8,
    padding: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 20,


  },

  tinyLogo1: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },

  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00457E',
    alignItems: 'center',
    marginTop: 8,

  },

  searchbox: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    borderBottomWidth: 1,
    width: "80%",
    height: "60%",


  },
  image: {
    height: 100,
    width: 140,
    marginTop: 5,



  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'column',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'lightcoral',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,

    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
    backgroundColor: 'white',
  },

  header: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightgray",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  updateModalView1: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  transparentTop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  blackBottom: {
    height: '35%',
    backgroundColor: 'white',
  },
 

  // Add other styles as needed
});
export default T1Screen1




const MainChats: React.FC<{
  isModalVisible: boolean;
  toggleModal: () => void;
  formchatUserIdFbse: string;
  tochatUserIdFbse: string;
  tochatUserNameFbse: string;
  toChatUserMobileFbse:string;
  
  
}> = ({ isModalVisible, toggleModal, formchatUserIdFbse, tochatUserIdFbse,tochatUserNameFbse ,toChatUserMobileFbse}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const firebaseDB = getFirestore(); // Get the Firestore instance

  useEffect(() => {
    const subscriber = onSnapshot(
      query(
        collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'),
        orderBy('createdAt', 'desc')
      ),
      (querySnapshot) => {
        const allmessages: IMessage[] = [];
        querySnapshot.forEach((doc) => {
          const messageData = doc.data();
          allmessages.push({
            _id: doc.id,
            text: messageData.text,
            createdAt: new Date(messageData.createdAt),
            user: {
              _id: messageData.sendBy,
            },
          });
        });
        setMessages(allmessages);
      }
    );
    return () => subscriber();
  }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

  const onSend = useCallback(async (messages = []) => {
    const newMessage = messages[0];
    const messageToSend: IMessage = {
      ...newMessage,
      sendBy: formchatUserIdFbse,
      sendTo: tochatUserIdFbse,
      createdAt: Date.now(),
    };

    // Update the state by merging the new message with the existing messages array
    setMessages((previousMessages) => [...previousMessages, messageToSend]);

    // Add message to the sender's chat collection
    try {
      await addDoc(collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'), messageToSend);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // Add message to the receiver's chat collection
    try {
      await addDoc(collection(firebaseDB, 'chats', `${tochatUserIdFbse}_${formchatUserIdFbse}`, 'messages'), messageToSend);
    } catch (error) {
      console.error('Error sending message to the receiver:', error);
    }
  }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

  const closeModal = () => {
    toggleModal();
  };
  const openDialer = () => {
    Linking.openURL(`tel:${toChatUserMobileFbse}`);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>

          <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={closeModal}>
            <Ionicons name="arrow-back" style={{ fontSize: 30 }} />
           
          </TouchableOpacity>  
          <Text style={{fontSize: 22,marginLeft: 10}}>{tochatUserNameFbse}</Text>        
          </View>


        

          <View style={{}}>
          <TouchableOpacity style={{}} onPress={openDialer}>
            <Ionicons name="call" style={{ fontSize: 25 ,marginRight: 10}} />
          </TouchableOpacity>
          </View>
       
          
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: formchatUserIdFbse,
          }}
        />
      </View>
    </Modal>
  );
};

const AskForAppUpdate: React.FC = () => {
  return (
   
   <Modal transparent={true}>
  <View style={styles.updateModalView1}>
    <View style={styles.transparentTop}></View>
    <View style={styles.blackBottom }>
      <Text> new version is </Text>

      <Image  source={require('../../assets/UpdateImage.jpeg')} height={30} width={110} />
      <View> 

        {/* <View>
            <TouchableOpacity>
              <Text>
                Uninstall
              </Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity>
              <Text>
                Uninstall
              </Text>
            </TouchableOpacity>
        </View> */}

        <Button title='Update'/>
        <Button title='not now'/>
      </View>
    </View>
  </View>
</Modal>
  );
};




