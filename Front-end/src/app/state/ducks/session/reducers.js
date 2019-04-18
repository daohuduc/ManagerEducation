import { combineReducers } from "redux";
import * as types from "./types";
import * as utils from './utils';
import { createReducer } from "../../utils";

let user = sessionStorage.getItem('user');

const initialState = user ? { loggedIn:true, user } : {};

const authReducer = createReducer( initialState )( {
    [ types.LOGIN_COMPLETED ]: ( state, action ) => {
        if (action.payload) {
            utils.saveJwtTokenOnTheStograte(action.payload.id_token);
        }
        state = {loggedIn: true, user: action.payload.id_token};
        return state;
    },
    [ types.LOGOUT ]: ( state, action ) => {
        return null;
    }
} );

export default combineReducers( {
    isAuthenticated: authReducer
} );