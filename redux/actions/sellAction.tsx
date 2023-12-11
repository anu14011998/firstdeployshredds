import { SET_SELL_DATA } from "../cosntants";
export const setSellData = (
    metalData: string,
    subMetalData: string,
    weight: number,
    image: string
  ) => ({
    type: SET_SELL_DATA,
    payload: {
      metalData,
      subMetalData,
      weight,
      image,
    },
  });



  //////////////////how to use com updated form element///////////////
//   import React from 'react';
// import { useSelector } from 'react-redux';

// const YourComponent: React.FC = () => {
  // const metalData = useSelector((state: any) => state.metalData);
  // const subMetalData = useSelector((state: any) => state.subMetalData);
  // const weight = useSelector((state: any) => state.weight);
  // const image = useSelector((state: any) => state.image);

//   // Your component logic
//   return (
//     // Your component JSX
//   );
// };

// export default YourComponent;
//////////////////////// how to update elemetnts ////////////////////////////////
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { setSellData } from './sellAction'; // Update the path accordingly

// const YourComponent: React.FC = () => {
  // const dispatch = useDispatch();

  // // Function to update metalData
  // const updateMetalData = (newMetalData: string) => {
  //   dispatch(setSellData(newMetalData, subMetalData, weight, image));
  // };

  // // Function to update subMetalData
  // const updateSubMetalData = (newSubMetalData: string) => {
  //   dispatch(setSellData(metalData, newSubMetalData, weight, image));
  // };

  // // Function to update weight
  // const updateWeight = (newWeight: number) => {
  //   dispatch(setSellData(metalData, subMetalData, newWeight, image));
  // };

  // // Function to update image
  // const updateImage = (newImage: string) => {
  //   dispatch(setSellData(metalData, subMetalData, weight, newImage));
  // };

//   // Your component logic
//   return (
//     // Your component JSX
//   );
// };

// export default YourComponent;
