import { View, Text, Button, TouchableOpacity, ScrollView, TextInput, Image, Modal } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/actions/dashAction';
import { StyleSheet } from 'react-native';
// import {  } from 'react-native-gesture-handler';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import EntypoIcon from 'react-native-vector-icons/Entypo'; // Import the Entypo icon
import Login from '../../components/Credential/Login';
import LogoSlider from '../../components/OrderImage/LogoSlider';
import Aluminium from '../../components/OrderImage/Aluminium';
import CopperImage from '../../components/OrderImage/CopperImage';
import T1Screen1modal1 from './T1Screen1modal1';




const T1Screen1 = ({ navigation }) => {
  const imgurl = 'https://shreddersbay.com/API/uploads/';

  // const dispatch = useDispatch();

  // // Access data and error from Redux store
  // const data = useSelector((state: any) => state.dashboard.data);
  // const error = useSelector((state: any) => state.dashboard.error);

  // useEffect(() => {
  //   // Dispatch action to fetch data when the component mounts
  //   dispatch(fetchData());
  // }, [dispatch]);


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
  /////////////////////////////
  const [showModal, setshowModal] = useState(false);

  

  return (

    <View style={styles.container}>
<View>
      <Modal transparent={true} 
      visible={showModal}
      animationType='slide'
       style={{margin: 20, padding: 20}}>
        <View>
          <T1Screen1modal1  />
          <Button title="Close Modal" onPress={()=>setshowModal(false)} />
        </View>
      </Modal>
</View>



      <View style={styles.logo}>

        <View style=
          {{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 100,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.image1}
              source={require('../../assets/logo.png')}
            />

            <Text style={styles.heading}>ShreddersBay</Text>

          </View>

          <TouchableOpacity  >
            <View style={styles.heading1} >
              <Ionicons name="person-add"
                onPress={() => navigation.navigate('Login')}

                size={30} color={'#00457E'} />
            </View>
          </TouchableOpacity>

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
        <ScrollView>
          <View>
            <LogoSlider />
          </View>

          <View>
            < Aluminium />
          </View>

          <View>


            <View style={styles.container3}>

              <Text style={styles.order}>Order_Detail</Text>
            </View>

            <View style={styles.card1}>

                {data.map((item, index) => (
                  <TouchableOpacity onPress={()=>setshowModal(true)}>
                  <View key={index} style={styles.card}>

                    <View style={styles.imageContainer}>

                      <Image
                        source={{ uri: imgurl + item.filename }}
                        style={styles.image}
                      />
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.textContainer2} >Name: {item.name}</Text>
                      <Text style={styles.textContainer2}>Mobile: {item.mobile}</Text>
                      <Text style={styles.textContainer2}>Booking Date: {item.booking_date}</Text>
                      <Text style={styles.textContainer2}>Cancel Date: {item.canceled_date}</Text>
                      {/* <Text style={styles.textContainer2}>Booking id: {item.booking_id}</Text> */}

                    </View>
                    {/* //////////////////////////////////////////// //////////////////////////////////////////////////////////////////////// */}
                  </View>
                  </TouchableOpacity>

                ))}

            </View>
            <Text>{JSON.stringify(data)}</Text>


          </View>


          <View>
            <CopperImage />
          </View>

        </ScrollView>

      </View>

    </View>
    // <View>
    //   <Text>T1Screen1</Text>
    //   <TouchableOpacity  >
    //           <View style={styles.heading1} >
    //             <Ionicons name="person-add"
    //               onPress={() => navigation.navigate('Login')}

    //               size={30} color={'#00457E'} />
    //           </View>
    //         </TouchableOpacity>
    //   <Button title='Go to for sign up' onPress={() => navigation.navigate('T1Screen2')} />


    //   {data ? (
    //       data.length > 0 ? (

    //         <View >

    //           {data.map((item: any) => (<TouchableOpacity key={item.p_id} onPress={()=>navigation.navigate("T1Screen1modal1")}>
    //               <View style={styles.card}>
    //                 <Text>{item.p_id}</Text>
    //                 <Text>{item.p_name}</Text>
    //               </View>
    //             </TouchableOpacity>

    //             // Replace 'item.id' with the property you want to display

    //           ))}
    //         </View>
    //       ) : (
    //         <Text>Loading...</Text>
    //       )
    //     ) : (
    //       <Text>Loading...</Text>
    //     )}

    // </View>

  )

}
const styles = StyleSheet.create({



  heading1: {
    marginTop: 10,

  },

  accept: {

    fontSize: 20,
    color: '#fff',
    borderWidth: 1,
    borderRadius: 2,
    padding: 8,
    borderColor: 'transparent',

    backgroundColor: '#00e600',

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
    color: '#fff',
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#00457E',

  },

  card1: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',


  },
  image1: {

    width: 50,
    height: 50,
    marginRight: 20,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
    width: 180,
    height: 350,
    padding: 10,
    margin: 5,
    shadowColor: '#00457E',
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.8,
    elevation: 5,
    // Arrange child elements horizontally
  },
  imageContainer: {
    flex: 2, // Take up 1/2 of the horizontal space
    marginRight: 20,
    alignItems: 'center', // Add some space between the image and text
  },

  textContainer: {

  },

  textContainer2: {
    color: 'blue',
    fontSize: 15,
    padding: 2,

  },

  textContainer3: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
    gap: 25,

  },


  logo: {

    flexDirection: 'row',
    alignItems: 'center'
    // textAlign: 'center




  },

  container: {
    flex: 1,
    marginTop: 10,
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
    width: 100,
    marginRight: 10,


  },
  // card: {
  //   backgroundColor: '#fff',
  //   borderRadius: 8,
  //   padding: 16,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },


  // Add other styles as needed
});
export default T1Screen1


