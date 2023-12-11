import { SET_SELL_FORM_DATA } from "../cosntants";
export const setSellFormData = (formData: FormData) => ({
    type: SET_SELL_FORM_DATA,
    payload: formData,
  });



  ////////////////////////////////use
//   import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setSellFormData } from './sellADDbtnAction'; // Adjust the path accordingly

// const YourComponent: React.FC = () => {
//   const dispatch = useDispatch();
  // const sellFormData = useSelector((state: any) => state.sellFormData.formData);

  // const updateSellFormData = (formData: FormData) => {
  //   // Dispatch action to update sell form data
  //   dispatch(setSellFormData(formData));
  // };

//   // Your component logic
//   return (
//     // Your component JSX
/* <view>
<p>Sell Form Data: {JSON.stringify(sellFormData)}</p>

</view> */
//   );
// };

// export default YourComponent;
