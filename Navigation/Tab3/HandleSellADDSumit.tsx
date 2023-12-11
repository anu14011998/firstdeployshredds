// import { View, Text, Button, Alert, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'


// const HandleSellADDSumit = ({ user_id, capturedImage, weight, raw_price, productName, p_id ,resetbtn,navigation}) => {

//   useEffect(() => {
//     console.log("userId is:-", user_id);
//     console.log("Image is:-", capturedImage);
//     console.log("Weight:-", weight);
//     console.log("raw_price is:-", raw_price);
//     console.log("product name is :-", productName);
//     console.log("P_id is :-", p_id);


//   }, [user_id, capturedImage, weight, raw_price, productName])
//   const [price, setprice] = useState(0)

// const handleReset =()=>{
//   resetbtn();
// }



//   const handleSubmit = async () => {
//     if (user_id && capturedImage && weight && raw_price  && p_id) {
//       // const formData = new FormData();
//       // formData.append('user_id', user_id);
//       // formData.append('weight', weight);
//       // formData.append('price', (weight * raw_price).toString());
//       // formData.append('productName', productName);
//       // formData.append('prod_id', p_id);
//       try {
//         const formData = new FormData();
//         const blob = await new Promise((resolve, reject) => {
//           const xhr = new XMLHttpRequest();
//           xhr.onload = function () {
//             resolve(xhr.response);
//           };
//           xhr.onerror = function (e) {
//             reject(new TypeError('Network request failed'));
//           };
//           xhr.responseType = 'blob';
//           xhr.open('GET', capturedImage, true);
//           xhr.send(null);
//         });

//         const filename = capturedImage.split('/').pop();
//         const image = {
//           uri: capturedImage,
//           name: filename,
//           type: 'image/jpg', // Adjust the type according to your image
//         };

//         formData.append('file', image as any);
//         // formData.append('user_id', '2448');
//         // formData.append('weight', '23');
//         // formData.append('price', '23');
//         // formData.append('prod_id', '108'); // Assuming prod_id is defined somewhere
//         formData.append('user_id', user_id);
//         formData.append('weight', weight);
//         formData.append('price', (weight * raw_price).toString());
//         // formData.append('productName', productName);
//         formData.append('prod_id', p_id);

//         console.log(formData);
        


//         const uploadResponse = await fetch('https://shreddersbay.com/API/cart_api.php?action=insert', {
//           method: 'POST',
//           body: formData,
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             // Add any necessary headers here
//           },
//         });
//         console.log(formData);
        

//         if (uploadResponse.ok) {
//           console.log('Image uploaded successfully!');
//           navigation.navigate('Scrap Cart',{screen: 'HandleSellADDSumit'})
//           // handleReset();
          
//         } else {
//           console.error('Failed to upload image');
//         }
//       } catch (error) {
//         console.error('Error uploading image: ', error);
//       }

//     } else {
//       Alert.alert('Please choose all necessary fields like: choose product, weight, choose or capture Image');
//     }
//   };



  
//   return (
//     <View  style={{marginTop: 20 , flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

//       <View>
//       <TouchableOpacity>
//         <Text 
//          style=
//          {{borderColor: 'lightgray',
//           borderWidth: 2,
//           padding: 8,
//           borderRadius: 5,
//           fontSize: 17,
//           color: '#fff',
//           backgroundColor: '#1f2e2e',
//           fontWeight: 'bold',
//           }}
//             onPress={handleSubmit} >
//           Add Scrap
//         </Text>
//       </TouchableOpacity>
//       </View>

//       <View>
//       <TouchableOpacity>
//         <Text 
//          style=
//          {{borderColor: 'lightgray',
//           borderWidth: 2,
//           padding: 8,
//           borderRadius: 5,
//           fontSize: 17,
//           textAlign: 'center',
//           color: '#fff',
//           backgroundColor: '#1f2e2e',
//           fontWeight: 'bold',
//           }}
//             onPress={handleReset} >
//          Reset Scrap
//         </Text>
//       </TouchableOpacity>
//       </View>
    
     
//     </View>
//   )
// }

// export default HandleSellADDSumit


import { View, Text, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setSellData } from '../../redux/actions/sellAction'
import { setSellFormData } from '../../redux/actions/sellADDbtnAction'
const HandleSellADDSumit = ({ user_id, capturedImage, weight, raw_price, productName, p_id ,navigation}) => {

  const rmetalData = useSelector((state: any) => state.metalData);
  const rsubMetalData = useSelector((state: any) => state.subMetalData);
  const rweight = useSelector((state: any) => state.weight);
  const rimage = useSelector((state: any) => state.image);

  const dispatch = useDispatch();

  // // Function to update metalData
  // const updateMetalData = (newMetalData: string) => {
  //   dispatch(setSellData(newMetalData, rsubMetalData, rweight, rimage));
  // };

  // // Function to update subMetalData
  // const updateSubMetalData = (newSubMetalData: string) => {
  //   dispatch(setSellData(rmetalData, newSubMetalData, rweight, rimage));
  // };

  // Function to update weight
  const updateWeight = (newWeight: number) => {
    dispatch(setSellData(rmetalData, rsubMetalData, newWeight, rimage));
  };

  // Function to update image
  const updateImage = (newImage: string) => {
    dispatch(setSellData(rmetalData, rsubMetalData, rweight, newImage));
  };

  // const sellFormData = useSelector((state: any) => state.sellFormData.formData);

  const updateSellFormData = (formData: FormData) => {
    // Dispatch action to update sell form data
    dispatch(setSellFormData(formData));
  };



  useEffect(() => {
    console.log("userId is:-", user_id);
    console.log("Image is:-", capturedImage); 
    updateImage(capturedImage)
    console.log("Weight:-", weight);
    updateWeight(weight)
    console.log("raw_price is:-", raw_price);
    console.log("product name is :-", productName);
    console.log("P_id is :-", p_id);


  }, [user_id, capturedImage, weight, raw_price, productName])
  const [price, setprice] = useState(0)



  const handleSubmit = async () => {
    if (user_id && capturedImage && weight && raw_price && p_id) {
      
      try {
        const formData = new FormData();
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', capturedImage, true);
          xhr.send(null);
        });

        const filename = capturedImage.split('/').pop();
        const image = {
          uri: capturedImage,
          name: filename,
          type: 'image/jpg', // Adjust the type according to your image
        };

        formData.append('file', image as any);
      
        formData.append('user_id', user_id);
        formData.append('weight', weight);
        formData.append('price', ((weight * raw_price)).toString());
        
        formData.append('prod_id', p_id);

        // console.log(formData);
        updateSellFormData(formData)

        
        const uploadResponse = await fetch('https://shreddersbay.com/API/cart_api.php?action=insert', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            // Add any necessary headers here
          },
        });
        console.log("formData",formData);
        

        if (uploadResponse.ok) {
          // console.log('Image uploaded successfully!');
          console.log(uploadResponse.status);

          navigation.navigate('Scrap Cart', { screen: 'HandleSellADDSumit' });

        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image: ', error);
      }

    } else {
      Alert.alert('Please choose all necessary fields like: choose product, weight, choose or capture Image');
    }
  };
  return (
    <View  style={{marginTop: 20 , flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

    <View>
    <TouchableOpacity>
      <Text 
       style=
       {{borderColor: 'lightgray',
        borderWidth: 2,
        padding: 8,
        borderRadius: 5,
        fontSize: 17,
        color: '#fff',
        backgroundColor: '#1f2e2e',
        fontWeight: 'bold',
        }}
          onPress={handleSubmit} >
        Add Scrap
      </Text>
    </TouchableOpacity>
    </View>

    {/* <View>
    <TouchableOpacity>
      <Text 
       style=
       {{borderColor: 'lightgray',
        borderWidth: 2,
        padding: 8,
        borderRadius: 5,
        fontSize: 17,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#1f2e2e',
        fontWeight: 'bold',
        }}
          onPress={handleReset} >
       Reset Scrap
      </Text>
    </TouchableOpacity>
    </View> */}
  
   
  </View>
  )
}

export default HandleSellADDSumit




