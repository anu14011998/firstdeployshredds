// import { View, Text, Button,Image, TouchableOpacity, StyleSheet } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/types';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Dropdown from '../../components/Dropdown';



// const T2Screen1 = ({ navigation }) => {
//   const userDataLOGIN_CURRENT_REDUX = useSelector((state: RootState) => state.login.userData);

//   const [userDataLOCAL_STORAGE, setUserData] = useState(null);

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



//   return (
//     <View style={{margin: 40}}>
      

//       <Dropdown/>
     

// {userDataLOGIN_CURRENT_REDUX || userDataLOCAL_STORAGE ?(<View>
//       <Text>{JSON.stringify(userDataLOGIN_CURRENT_REDUX)}</Text>
//           <Text style={{ fontSize: 25, }}>T2Screen1</Text>
//           <Text>{JSON.stringify(userDataLOCAL_STORAGE)}</Text>
//       </View>):( <View style={{ alignItems: 'center' }}>
       
//       <View>


// <View>
//      <Image
//           style={styles.image1}
//           source={require('../../assets/cart1.png')}
//      />
// </View>

// <View>
//      <Text style=
//           {{
//                textAlign: 'center',
//                fontSize: 25,
//                fontWeight: 'bold',
//                color: '#3D5B59',
//           }}
//      >
//           Your Cart Is Empty
//      </Text>

//      <Text  style={styles.scrap}>Add Your Favourite Scrap to Proceed</Text>

//      <View>

//           <TouchableOpacity  style={styles.btn} >
//                <View>
//                     <Text   style={styles.btntxt}>Please Add Scrap Item</Text>
//                </View>
//           </TouchableOpacity>
         
//      </View>
// </View>

// </View>
            
//         </View>)}
//     </View>
//   )
// }



// export default T2Screen1


// const styles=StyleSheet.create({

//   image1:{
  
//     margin: 10,

//   },

//   btn:{
//     marginHorizontal: 30,
//     marginVertical: 10,
//     paddingVertical: 10,  
//     backgroundColor:"#3D5B59",
    
//    },

//    scrap:{
//     textAlign: 'center',
//     fontSize: 15,
//     marginTop: 10,
//     marginBottom: 20,
//     color: 'gray'
//    },

//    btntxt:{
//         color: 'white',
//         textAlign: 'center',
//         fontSize: 20,
//    }


   
// })


// import React, { useEffect, useState } from 'react';
// import { View, Text ,StyleSheet, Button, TouchableOpacity} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ScrollView } from 'react-native-gesture-handler';

// const T2Screen1 = () => {
//   const [userDataLOCAL_STORAGE, setLocalUserData] = useState<{ [key: string]: any } | null>(null);
//   const [userId, setUserId] = useState('');
//   const url = 'https://shreddersbay.com/API/cart_api.php?action=select_id&user_id=';
//   const [data, setData] = useState<any>(''); // Change the type according to your expected data

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const storedData = await AsyncStorage.getItem('UserCred');
//       if (storedData !== null) {
//         const parsedData = JSON.parse(storedData);
//         setLocalUserData(parsedData);
//         extractId(parsedData);
//       } else {
//         console.log('No data found in AsyncStorage');
//       }
//     } catch (error) {
//       console.error('Error retrieving data:', error);
//     }
//   };

//   const extractId = (data: { [key: string]: any } | null) => {
//     if (data && data['0']) {
//       const id = data['0'].id;
//       setUserId(id);
//       fetchApiData(id);
//     } else {
//       console.log('ID not found in the parsed data');
//     }
//   };

//   const fetchApiData = async (userId: string) => {
//     try {
//       const response = await fetch(`${url}${userId}`);
//       if (response.ok) {
//         const result = await response.json();
//         setData(result);
//         console.log('Fetched Data:', result);
//       } else {
//         console.error('Failed to fetch data from API');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <View>
//       <Text>T2Screen1</Text>


//       {/* {data ? (
//         <Text>{JSON.stringify(data)}</Text> // Displaying fetched data as stringified JSON
//       ) : (
//         <Text>No data fetched yet</Text>
//       )} */}
//       <ScrollView>
//       {data?(
//         data.map((item)=><View style={styles.card}>
//             <View>
//             <Text>{item.p_name}</Text>
//             <Text>{item.total_weight}</Text>
//             <Text>{item.total_price}</Text>
//             </View>
//             <View>  
//                 <Button title='delete'/>
//             </View>


//         </View>

//         )
//       )


//       :

//       (null)}



//       </ScrollView>
//       <View style={styles.bottomButton}>
//         <Button title='Bottom Button' onPress={() => console.log('Bottom button pressed')} />
//       </View>




//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   card: {
//     flex:2,
//     flexDirection:'row',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 4, // For Android
//     shadowColor: '#000', // For iOS
//     shadowOpacity: 0.2, // For iOS
//     shadowRadius: 4, // For iOS
//     shadowOffset: { width: 0, height: 2 }, // For iOS
//   },
//   cardText: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   bottomButton: {
//     marginBottom: 20,
//     alignSelf: 'center', // Aligns the button at the center horizontally
//   },
// });

// export default T2Screen1;



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Platform, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
const imgrul = "https://shreddersbay.com/API/uploads"


const T2Screen1 = ({ navigation }) => {
  const [userDataLOCAL_STORAGE, setLocalUserData] = useState<{ [key: string]: any } | null>(null);
  const [userId, setUserId] = useState('');
  const url = 'https://shreddersbay.com/API/cart_api.php?action=select_id&user_id=';
  const [data, setData] = useState<any>(''); // Change the type according to your expected data

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('UserCred');
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setLocalUserData(parsedData);
        extractId(parsedData);
      } else {
        console.log('No data found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const extractId = (data: { [key: string]: any } | null) => {
    if (data && data['0']) {
      const id = data['0'].id;
      setUserId(id);
      fetchApiData(id);
    } else {
      console.log('ID not found in the parsed data');
    }
  };

  const fetchApiData = async (userId: string) => {
    try {
      const response = await fetch(`${url}${userId}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log('Fetched Data:', result);
      } else {
        console.error('Failed to fetch data from API');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const deleteItem = async (userId: string, itemId: string) => {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            // Place your delete logic here
            console.log('Yes Pressed');
            try {
              const deleteUrl = `https://shreddersbay.com/API/cart_api.php?action=delete&user_id=${userId}&cart_id=${itemId}`;
              const response = await fetch(deleteUrl, {
                method: 'DELETE',
                // Add necessary headers or body if required by your API
              });
        
              if (response.ok) {
                // Assuming successful deletion, you can update the UI or perform any action needed
                console.log(`Item ${itemId} deleted successfully`);
                // Refresh data after deletion if needed
                fetchApiData(userId);
              } else {
                console.error('Failed to delete item');
              }
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
    
  };
  const getTotalWeight = () => {
    if (!data || data.length === 0) {
      return 0; // If there is no data or it's an empty array, return 0
    }

    const total = data.reduce((accumulator, item) => {
      return accumulator + parseFloat(item.total_price);
    }, 0);

    return total;
  };


  return (
    <View style={styles.container}>

      {/* <Button title='goto address screen'onPress={()=>{navigation.navigate("T2Screen2")}}/> */}

      <ScrollView style={styles.scrollView}>
        {data ? (
          data.map((item: any) => (
            <View key={item.id} style={styles.card}>


              <View style={styles.imageContainer}>
                <Image source={{ uri: `${imgrul}/${item.filename}` }} style={styles.cartimage} />
              </View>

              <View style={styles.textContainer}>
                {/* <Text>{item.cart_id}</Text> */}
                <Text style=
                  {{
                    color: '#ff3300',
                    fontSize: 14,
                    fontWeight: '500',

                  }}
                >
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: 'black',
                    textShadowColor: 'lightgray',
                    textShadowOffset: { width: 3, height: 2 },
                    textShadowRadius: 5,
                    marginBottom: 10, // Add spacing between text and other elements if needed
                  }}
                  >Product_Name: </Text> {item.p_name}
                </Text>
                <Text
                  style=
                  {{
                    color: '#ff3300',
                    fontSize: 14,
                    fontWeight: '500',
                  }} >
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: 'black',
                    textShadowColor: 'lightgray',
                    textShadowOffset: { width: 3, height: 2 },
                    textShadowRadius: 5,
                    marginBottom: 10, // Add spacing between text and other elements if needed
                  }}
                  >Product_weight: </Text> {item.total_weight}kg
                </Text>
                <Text
                  style=
                  {{
                    color: '#ff3300',
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: 'black',
                    textShadowColor: 'lightgray',
                    textShadowOffset: { width: 3, height: 2 },
                    textShadowRadius: 5,
                    marginBottom: 10, // Add spacing between text and other elements if needed
                  }}
                  >Product_price: </Text> {item.total_price}
                </Text>

              </View>


              <View style={styles.deleteIconContainer}>

                <MaterialIcons name='delete-forever'
                  style=
                  {{
                    fontSize: 40,
                  }}
                  onPress={() => deleteItem(userId, item.cart_id)} />
                {/* <Button title='delete'
                  // Call deleteItem with userId and item's p_id

                /> */}
              </View>
            </View>
          ))
        ) : (
          <Text>No data fetched yet</Text>
        )}
      </ScrollView>

      <View style={styles.bottomButton}>
        <View
          style=
          {{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderBottomColor: 'lightgray',
            borderTopColor: 'lightgray',
          }}
        >
          <Text style=
            {{
              color: '#ff66cc',
              fontSize: 16,
              fontWeight: '500',

            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: '500',
                color: 'black',
                textShadowColor: 'lightgray',
                textShadowOffset: { width: 3, height: 2 },
                textShadowRadius: 5,
                marginBottom: 10, // Add spacing between text and other elements if needed
              }}
            >aproximate price of the cart is :- </Text>{getTotalWeight()}
          </Text>

        </View>

        <View  >
          <UpcomingDate navigation={navigation } Data={data} />
        </View>


      </View>


    </View>
  );
};

const styles = StyleSheet.create({

  imageContainer: {
    flex: 0.7, // Equal width for image container
    marginRight: 10, // Adjust margin as needed
  },
  textContainer: {
    flex: 2, // Equal width for text container
  },
  deleteIconContainer: {
    flex: 0.5, // Equal width for delete icon container
    alignItems: 'center',
  },


  delete: {

    color: '#fff',

  },

  cartimage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor: 'black',

  },
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 0.8,
    borderColor: 'gray',

  },



  bottomButton: {
    backgroundColor: 'white', // Adjust as needed
    paddingVertical: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 0,
    borderRadius: 5,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});






const UpcomingDate = ({ navigation,Data}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Calculate today's date
  const today = new Date();

  const onDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowPicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const formatDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    return formattedDate;
  };

  const handleContinue = () => {
    const formattedDate = formatDate(selectedDate); ///formattedDate is current date 
    // console.log(`API call for date: ${formattedDate}`);
    // console.log(`userId is ${user_id}`);
    const currentDateTime = new Date().getTime(); // Current date and time in milliseconds
    const selectedDateTime = new Date(selectedDate).getTime(); // Selected date and time in milliseconds
    if (selectedDateTime >= currentDateTime) {
      // console.log(`API call for date: ${formattedDate}`);
      // console.log(`userId is ${user_id}`);
      // Perform action since the selected date and time is valid (after or equal to current date and time)
      navigation.navigate('T2Screen2AddAddress' ,currentDateTime,selectedDateTime,Data)

    } else {
      Alert.alert('Please choose a date and time after the current date and time.');
      // Handle the case when the selected date and time is earlier than the current date and time
      // This could be showing an error message or prompting the user to select a valid date/time
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style=
        {{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          marginBottom: 10,
          borderBottomColor: 'lightgray',
          borderTopColor: 'lightgray',
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: '500',
            color: 'black',
            textShadowColor: 'lightgray',
            textShadowOffset: { width: 3, height: 2 },
            textShadowRadius: 5,
            marginBottom: 10,

            // Add spacing between text and other elements if needed
          }}
        >
          Selected Date:- {formatDate(selectedDate)}
          <View>
            <FontAwesome name="calendar"
              style=
              {{
                fontSize: 20,
                color: '#ff66cc',
                marginLeft: 10,
                marginRight: 20,
                marginTop: 5,

              }}
              onPress={() => setShowPicker(true)}
            />
          </View>
        </Text>


      </View>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          minimumDate={today} // Set minimum date to today's date
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity
        onPress={()=>{handleContinue()}}
        style=
        {{
          marginBottom: 10,
          borderWidth: 0.8,
          padding: 8,
          borderRadius: 8,
          borderColor: 'gray',
          backgroundColor: '#801a00',
          width: '100%'


        }}
      >
        <Text
          style=
          {{
            fontSize: 20,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>

    </View>
  );
};


export default T2Screen1;
