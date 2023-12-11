// sellReducer.ts
import { SET_SELL_DATA } from "../cosntants";
interface SellState {
  metalData: string;
  subMetalData: string;
  weight: number;
  image: string;
}

const initialState: SellState = {
  metalData: '',
  subMetalData: '',
  weight: 0,
  image: '',
};

const sellReducer = (state = initialState, action: any): SellState => {
  switch (action.type) {
    case SET_SELL_DATA:
      return {
        ...state,
        metalData: action.payload.metalData,
        subMetalData: action.payload.subMetalData,
        weight: action.payload.weight,
        image: action.payload.image,
      };
    default:
      return state;
  }
};

export default sellReducer;
