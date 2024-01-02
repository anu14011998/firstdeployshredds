import { View, Text, Button, TouchableOpacity, ScrollView, TextInput, Image, Modal, TouchableWithoutFeedback, RefreshControl, Pressable, Alert } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
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




const T1Screen1 = ({ navigation }) => {
  const imgurl = 'https://shreddersbay.com/API/uploads/';
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const dispatch = useDispatch();

  // Access data and error from Redux store
  const data = useSelector((state: any) => state.dashboard.data);
  const error = useSelector((state: any) => state.dashboard.error);

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
    }
  }, [data, dispatch]); // Add data as a dependency to re-run useEffect when data changes
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
  const [detaildata, setdetaildata] = useState<any | number>(null)
  const [imagename,setImagename]=useState('')
  const handleDetailPress = async (bookingId: number,filename:string) => {
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

  const [acceptData, setacceptData] = useState([]);
  const handleBuyPress = async (bookingId: any) => {
    console.log("we will see later ....");
    
    // try {

    //   const formdata = new FormData()
    //   formdata.append('booking_id', bookingId);
    //   formdata.append('user_id', user_id);

    //   const response = await fetch('https://shreddersbay.com/API/orders_api.php?action=accept', {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'multipart/form-data',
    //     },
    //     body: formdata,
    //   });

    //   if (response.ok) {
    //     const aceptData = await response.json();
    //     setacceptData(aceptData)
    //     // Process or set the acceptData if needed
    //     console.log('Accept API request successful');
    //   }

    //   else {
    //     console.error('Accept API request failed:', response.statusText);
    //   }

    // }
    // catch (error) {
    //   console.error('Error:', error);
    // }
  };

  const [user_id, setUserIds] = useState(null) // User ID
  const [userDataLOCAL_STORAGE, setUserDataLocalStorage] = useState(null);

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
  }, []);
  ///////////////////////////////

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
                        source={{ uri: imgurl+item.filename }}

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
                      <Text style={{ color: 'black', fontWeight: '600',fontSize: 16 }}>Booking_ID: {item.booking_id}</Text>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 16}}>Product_Name: {item.p_name}</Text>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Approx Price: {item.price}</Text>
                      <Text style={{ color: 'black',fontWeight: '600', fontSize: 16 }}>Booking_Date: {item.booking_date}</Text>
                      <Text style={{ color: 'black',fontWeight: '600', fontSize: 16 }}>Schedule Date: {item.schedule_date}</Text>
                      <Text style={{ color: 'black',fontWeight: '600', fontSize: 16 }}>Weight: {item.weight}</Text>
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
                        <Text style={{ color: 'black', fontWeight: '600',fontSize: 16  }}>Name: {item.name}</Text>
                        <Text style={{ color: 'black', fontWeight: '600',fontSize: 16  }}>Mobile: {item.mobile}</Text>
                        <Text style={{ color: 'black', fontWeight: '600',fontSize: 16  }}>Area: {item.area}</Text>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Address: {item.address}</Text>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>Landmark: {item.landmark}</Text>
                        <Text style={{ color: 'black', fontWeight: '600',fontSize: 16 }}>Pincode: {item.pin_code}</Text>
                      </View>




                      {/* <View style={styles.textContainer3}> */}
                      <View >

                        <TouchableOpacity onPress={() => { handleBuyPress(item.booking_id) }}>
                          <Text style={styles.detail}
                          >
                            Buy
                          </Text>

                        </TouchableOpacity>

                      </View>
                      <View >
                        <TouchableOpacity onPress={() => {navigation.navigate('Tab5',{screen:'ALL'}) }}>
                          <Text style={styles.detail}
                          >
                            Chat
                          </Text>

                        </TouchableOpacity>

                      </View>
                    </View>
                    {/* Display other details here */}
                  </View>



                ))}

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>


      <View style={styles.logo}>

        <View style=
          {{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.image1}
              source={require('../../assets/SHREDS.png')}
            />

            <Text style={styles.heading}>ShreddersBay</Text>

          </View>

          <View style={{ flexDirection: 'row', gap: 20, marginLeft: 20 }}>
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




      </View>


      <View style={styles.container1}>
        <TextInput
          placeholder="search"
          clearButtonMode='always'
          autoCapitalize='none'
          autoCorrect={true}
          style={styles.searchbox}
        />
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
            <LogoSlider />
          </View>

         

          <View>


            <View style={styles.container3}>

              <Text style={styles.order}>Fresh Recommendations</Text>
            </View>


            <View style={styles.container5}>


              <View style={styles.card1}>

                {data.map((item, index) => (


                  <View key={index} style={styles.card}

                  >

                    <TouchableOpacity onPress={() => handleDetailPress(item.booking_id,item.filename)}>

                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: imgurl + item.filename }}
                          style={styles.image}
                        />
                      </View>

                      <View style={styles.textContainer}>
                        <Text style={styles.textContainer2}><Text style={styles.textContainer2} >{item.p_name}</Text></Text>
                        <Text style={styles.textContainer5}>< FontAwesome name="rupee" style={{ fontSize: 20 }} /> <Text style={styles.textContainer5}>{item.price}</Text> </Text>

                        <Text style={styles.textContainer6}><EvilIcons name="location" style={{ fontSize: 22, }} /> <Text style={styles.textContainer6}>{item.address}</Text> </Text>
                      </View>


                    </TouchableOpacity>
                  </View>


                ))}

              </View>




            </View>

            {/* <Text>{JSON.stringify(data)}</Text> */}


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

image2:{
width: 100,
height: 100,
},
  imageContainer1:{
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    borderBottomWidth: 1,


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


  // Add other styles as needed
});
export default T1Screen1


