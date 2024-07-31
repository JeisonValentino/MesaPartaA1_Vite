import {SET_CURRENT_USER, UPDATE_TIME_REMAINING} from "../types";

const initialState={loggedIn :false, user:{},timeRemaining:null};

export default function (state =initialState, action){
const{ type , payload }= action;

switch(type){
case SET_CURRENT_USER :
        return{
                ...state,
                loggedIn:payload.loggedIn,
                user:payload.user,

        }
        case UPDATE_TIME_REMAINING:
                return {
                  ...state,
                  timeRemaining: action.payload,
                };
        default:
        return state;
}

}