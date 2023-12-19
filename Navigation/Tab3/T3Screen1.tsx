// import { View, Text, Button, StyleSheet } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { RootState } from '../../redux/types';
// import { SelectList } from 'react-native-dropdown-select-list';


// const T3Screen1 = ({ navigation }) => {
//   const userDataLOGIN_CURRENT_REDUX = useSelector((state: RootState) => state.login.userData);
//   const [selected, setSelected] = useState('');
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

//   const responseData = [
//     { id: 1, name: 'anu' },
//     { id: 2, name: 'palak' },
//     { id: 3, name: 'priya' },
//     { id: 4, name: 'anu' },
//   ];




//   return (

//     <View>
//       {userDataLOGIN_CURRENT_REDUX || userDataLOCAL_STORAGE ? (

//         <View>
//           {/* <View>
//             <Text>{JSON.stringify(userDataLOGIN_CURRENT_REDUX)}</Text>
//             <Text style={{ fontSize: 25, }}>T2Screen1</Text>
//             <Text>{JSON.stringify(userDataLOCAL_STORAGE)}</Text>
//           </View> */}



//           <View style={styles.dropdown}>
//             {responseData && (
//               <SelectList
//                 setSelected={(val: string) => setSelected(val)}
//                 data={responseData.map((item) => ({ value: item.name, label: item.name }))}
//                 save="value"
//               />
//             )}
//           </View>


//           <View style={styles.dropdown}>
//           {responseData && (
//             <SelectList
//               setSelected={(val: string) => setSelected(val)}
//               data={responseData.map((item) => ({ value: item.name, label: item.name }))}
//               save="value"
//             />
//            )}
//           </View>



//         </View>




//         //////////////////////////////////////// when user is logged out /////////////////////////////
//       ) : (<View style={{ alignItems: 'center' }}>
//         <Text style={{ fontSize: 30, }}>User not exits please Signup or Login......</Text>
//         <View style={{ alignItems: 'center', padding: 10, }}>
//           <Button title='signup' onPress={() => { navigation.navigate("Signup") }} />
//         </View>
//         <View style={{ alignItems: 'center', padding: 10, }}>
//           <Button title='Login' onPress={() => { navigation.navigate("Login") }} />
//         </View>





//       </View>)}










//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   dropdown:{
//     margin:15,

//   }
// })

// export default T3Screen1
// // import { StyleSheet, Text, View, Image } from 'react-native';
// // import React, { useEffect, useState } from 'react';

// // interface Product {
// //   file: string; // Define file as string since it holds the image URL
// //   // image: any;
// //   p_id: number;
// //   p_name: string;
// //   // Add other properties based on your JSON structure
// // }

// // const T3Screen1 = ({ Navigation }) => {
// //   const [products, setProducts] = useState<Product[]>([]); // Initialize with an empty array

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select');
// //         if (response.ok) {
// //           const data = await response.json();
// //           setProducts(data); // Update the state with fetched data
// //           console.warn(products);

// //         } else {
// //           throw new Error('Failed to fetch data');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };

// //     fetchData(); // Call the fetchData function when the component mounts
// //   }, []); // The empty dependency array ensures the effect runs only once
// //   const imgurl = "https://shreddersbay.com/API/uploads/"

// //   return (

// //     <View>
// //       <View>
// //         {products.map((product) => (
// //           <View key={product.p_id} >


// //             <View style={styles.container6}>

// //               <View style={styles.leftSection}>
// //                 <Image
// //                   source={{ uri: `${imgurl}/${product.file}` }}
// //                   style={styles.icon} // Define the image size using style
// //                 />
// //               </View>


// //               <View style={styles.rightSection}>
// //                 <Text style={styles.text3}>{product.p_name}</Text>
// //               </View>


// //             </View>


// //             {/* Display other product details as needed */}
// //           </View>
// //         ))}
// //       </View>

// //     </View>
// //   )
// // };

// // export default T3Screen1;

// // const styles = StyleSheet.create({
// //   text3: {
// //     // textAlign: 'center',
// //     fontSize: 15,
// //     fontWeight: 'bold',
// //     color: 'black',
// //     marginTop: 6,

// //   },
// //   icon: {
// //     width: 120,
// //     height: 140,
// //     borderRadius: 10,
// //   },

// //   container6: {

// //     padding: 5,
// //     borderWidth: 0.7,
// //     backgroundColor: '#D6CC99',
// //     borderRadius: 10,
// //     flexDirection: 'row'
// //   },

// //   leftSection: {
// //     flex: 1,
// //     paddingRight: 5,
// //     // You can adjust the styling of the left section here
// //   },
// //   rightSection: {
// //     flex: 2,
// //     paddingLeft: 5,
// //     // You can adjust the styling of the right section here
// //   },
// // });





import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useEffect, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../redux/types';
// import { SelectList } from 'react-native-dropdown-select-list';
import OpenCamAndGalT3S1 from './OpenCamAndGalT3S1';
import HandleSellADDSumit from './HandleSellADDSumit';
import { Picker } from '@react-native-picker/picker';

// const RadioButton = ({settochild}) => {
//   const [weightradio, setweightradio] = useState(false);
//   const [datafrompatent,setdatafrompaent] =useState('Weight')
//   const hadleradioOnpress = () => {
//     setweightradio(true)
//     settochild(datafrompatent)
//   }

//   return (
//     // <View style={styles.radioButtonContainer}>
//     //   {options.map((option, index) => (
//     //     <TouchableOpacity
//     //       key={index}
//     //       style={styles.radioButton}
//     //       onPress={() => onSelect(option)}
//     //     >
//     //       <View style={styles.radioButtonCircle}>
//     //         {selectedOption === option && <View style={styles.innerCircle} />}
//     //       </View>
//     //       <Text style={styles.radioButtonText}>{option}</Text>
//     //     </TouchableOpacity>
//     //   ))}
//     // </View>

//     <View style={styles.radio_main}>

//       <TouchableOpacity onPress={hadleradioOnpress}>
//         <View style={styles.radioWrapper}>

//           <View style={styles.radio}>

//             {weightradio ? <View style={styles.radioBg}></View>
//               : null}
//           </View>
//           <Text style={styles.radio_text}>{datafrompatent}</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };


const T3Screen1 = ({ navigation }) => {

  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedSubMetal, setSelectedSubMetal] = useState('');
  const userDataLOGIN_CURRENT_REDUX = useSelector((state: RootState) => state.login.userData);
  const [userDataLOCAL_STORAGE, setUserDataLocalStorage] = useState(null);

  /////////////////data for passing probs //////////
  const [capturedImage, setCapturedImage] = useState<string | null>(null);///image
  const [textInputValue, setTextInputValue] = useState('');  ///weight
  const [price, setprice] = useState(" ")///raw price 
  const [productname, setProductname] = useState('')
  const [p_id, set_p_id] = useState('')
  const [MetalData, setMetalData] = useState([]);
  const [SubMetalData, setSubMetalData] = useState([]);
  const [polling, setPolling] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [selected, setSelected] = useState('');
  ///////////////////////////////////////////////
  const [metalType,setmetaltype]=useState<string>('Metal Type');
  const [submetalType,setSubmetaltype]=useState<string>('Sub Metal Type');

  const [reloadFlag, setReloadFlag] = useState(false);

  // Function to trigger reload in the parent component
  const reloadParent = () => {
    setReloadFlag(!reloadFlag);
  };


  //////////////////////////////
  const [user_id, setUserIds] = useState(null) // User ID

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

  const handleImageCapture = (imageUri: string) => {
    setCapturedImage(imageUri);
  };

  const handleSelect = (value) => {

    setTextInputValue(''); // Clear the text input when a new option is selected

  };

  const handleNumericInputChange = (value) => {
    // Allow only numeric values in the text input
    const numericValue = value.replace(/[^0-9]/g, '');
    setTextInputValue(numericValue);
  };


  const handleSelectMetal = async (selectedValue) => {
    setSelectedMetal(selectedValue);

    const selectedItem = MetalData.find((item) => item.p_id === selectedValue);





    if (selectedItem) {


      setSelectedId(selectedItem.p_id); // Set the selected id in state
      setprice(selectedItem.price);
      try {

        const formData = new FormData();
        formData.append('p_id', selectedItem.p_id);
        set_p_id(selectedItem.p_id);

        const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select_id', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Data sent successfully');
          const responseData = await response.json();
          setSubMetalData(responseData);
          setSelectedSubMetal(''); // Reset selected sub-metal when changing metal
        } else {
          console.error('Post API Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Post API Error:', error);
      }
    }
  }


  // const handleselectItem1 = async (selectedName: string) => {
  //   const selectedItem = MetalData.find((item) => item.p_name === selectedName);
  //   setProductname(selectedName);

  //   if (selectedItem) {
  //     setSelectedId(selectedItem.p_id); // Set the selected id in state
  //     setprice(selectedItem.price);

  //     try {
  //       const formData = new FormData();
  //       formData.append('p_id', selectedItem.p_id);
  //       set_p_id(selectedItem.p_id);

  //       const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select_id', {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       if (response.ok) {
  //         console.log('Data sent successfully');
  //         const responseData = await response.json();
  //         setSubMetalData(responseData);

  //         // Handle success if needed
  //       } else {
  //         console.error('Post API Error:', response.status, response.statusText);
  //         // Handle error if needed
  //       }
  //     } catch (error) {
  //       console.error('Post API Error:', error);
  //       // Handle error if needed
  //     }
  //   }
  // }

  const pollApi = async () => {
    try {
      const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select');

      if (response.ok) {
        const responseData = await response.json();
        setMetalData(responseData);



        setPolling(false); // Stop polling when a response is received
      } else {
        console.error('API Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const startPolling = async () => {
    while (polling) {
      await pollApi();
      // You can add a delay here if needed
    }
  };

  useEffect(() => {
    // Start polling when the component mounts
    startPolling();
  }, [MetalData]);

  const [refreshing, setRefreshing]=useState(false);
  useEffect(()=>{
    onRefresh();
  },[refreshing])

  

  const onRefresh=()=>{
    if(!MetalData===null){
    setRefreshing(true);}
    setTimeout(()=>{
      setRefreshing(false);
      
      
    },2000);
  }



  return (
    <View style={{ margin: 2, padding: 20, backgroundColor: '#d1e0e0' }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.image1}
          source={require('../../assets/cartbg2.png')}
        />
      </View>
      {userDataLOGIN_CURRENT_REDUX || userDataLOCAL_STORAGE ? (
        <ScrollView >

          {/* // refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
            tintColor="#0000ff"
          />
        } */}

          <View style=
          {{
             backgroundColor: 'white',
            padding: 25,
            height: 800,
            borderRadius: 5,
             }}
             >

            <View >

              <View style=
                {{

                  justifyContent: 'center',
                  borderWidth: 1,
                  padding: 0,
                  borderColor: 'lightgray',
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <Picker
                  selectedValue={selectedMetal}
                  style={{ height: 50, width: 300 }}
                  itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
                  onValueChange={(itemValue) => handleSelectMetal(itemValue)}
                >
                  <Picker.Item label={`${metalType}`} value="" />
                  {MetalData.map((item) => (
                    <Picker.Item label={item.p_name} value={item.p_id} key={item.p_id} />
                  ))}
                </Picker>
              </View>


              <View
                style=
                {{

                  justifyContent: 'center',
                  borderWidth: 1,
                  padding: 0,
                  borderColor: 'lightgray',
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >

                <Picker
                  selectedValue={selectedSubMetal}
                  style={{ height: 50, width: 300 }}
                  itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
                  onValueChange={(itemValue) => setSelectedSubMetal(itemValue)}
                >
                  <Picker.Item label={`${submetalType}`} value="" />
                  {
                    SubMetalData.map((item, index) => (
                      <Picker.Item label={item.p_type_name} value={item.p_type_name} key={index} />
                    ))
                  }
                </Picker>
              </View>
            </View>


            <View style={styles.radioButtonContainer} >




              {/* Rest of your components */}
              {/* <RadioButton settochild={settochild}/> */}
              <View>
                {/* Text input for the number for weight and qty */}
                <TextInput
                  // placeholder={`Enter ${weight} in kg`}
                  placeholder='Enter Weight in kg'
                  value={textInputValue}
                  onChangeText={handleNumericInputChange}
                  style={styles.textInput}
                  keyboardType="numeric"
                />
              </View>
              {productname || price ? <Text> price of {productname}:-{price} kg</Text> : null}
            </View>

            <OpenCamAndGalT3S1 onImageCapture={handleImageCapture} />

            <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between' }}>


              <HandleSellADDSumit user_id={user_id} capturedImage={capturedImage} weight={textInputValue} raw_price={price} productName={productname} p_id={p_id}  navigation={navigation} />

              {/* resetbtn={reloadParent} */}
              {/* <Button title='reset' onPress={resetForm}/> */}
            </View>

          </View>
        </ScrollView>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}>User does not exist. Please Signup or Login...</Text>
          <View style={{ alignItems: 'center', padding: 10 }}>
            <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
          </View>
          <View style={{ alignItems: 'center', padding: 10 }}>
            <Button title="Login" onPress={() => navigation.navigate("Login")} />
          </View>
        </View>
      )}


    </View>
  );
};

const styles = StyleSheet.create({

 

  image1: {
    width: 100,
    height: 100,
    marginBottom: 10,

  },

  radioButtonContainer: {
    justifyContent: 'space-around',
    marginVertical: 10,
    alignItems: 'center',


  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',


  },
  radioButtonCircle: {
    height: 25,
    width: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#666666',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerCircle: {
    height: 14,
    width: 14,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  radioButtonText: {
    fontSize: 20,
    marginLeft: 10,

  },
  selectedOptionText: {
    marginTop: 20,
    fontSize: 20,

  },
  textInput: {
    borderRadius: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 40,
    width: 310,
    paddingLeft: 20,
  },

  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio_main: {

    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  radio_text: {
    fontSize: 20,
  },
  radio: {
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 2,

    borderColor: 'black',
    margin: 5,

  },
  radioBg: {
    backgroundColor: 'black',
    width: 20,
    height: 20,
    borderRadius: 20,
    margin: 3,


  }
});

export default T3Screen1;
