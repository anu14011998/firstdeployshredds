import { InitialState } from "@react-navigation/native";
import { setLoginData } from "../actions/loginAction";
import { SET_LOGIN_DATA } from "../cosntants";

const initialState:any[] =[];

const loginReducer =(state:InitialState,action:any)=>{

    switch(action.type){
        case SET_LOGIN_DATA:
            return{
                ...state,
                ...action.payload,
            }
        default:
            return{
                ...state,
            }

    }

}
export default loginReducer;
