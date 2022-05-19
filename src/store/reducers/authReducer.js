import React from 'react'
import { useUserData } from "../../lib/hooks";
import nookies from "nookies";
import { auth } from "../../lib/firebase";
import { setName, setUsername, setMail, setPhone, setAbout, setProfileImage, setAffiliateCodes } from '../actions/authActions';
import { handleActions } from 'redux-actions';

const initialState = {
  userData: {
    name: "",
    username: "",
    mail: "",
    phone: "+91",
    about: "",
    profile_image: "",
    affiliateCodes: [],
  },
  userSignInInfo: {
    username: "",
    user: "",
  }
};

console.log('initialState', initialState);
const authReducer = handleActions(
  {
    [setName]: (state, action)=>({
      ...state,
      userData: {
        ...state.userData,
        name: action.payload,
      }
    }),
    [setUsername]: (state, action)=>({
      ...state,
      userData: {
        ...state.userData,
        username: action.payload,
      }
    }),
    [setMail]: (state, action)=>(
      {
      ...state,
      userData: {
        ...state.userData,
        mail: action.payload,
      }
    }),
    [setPhone]: (state, action)=>({
      ...state,
      userData: {
        ...state.userData,
        phone: action.payload,
      }
    }),
    [setAbout]: (state, action)=>({
      ...state,
      userData: {
        ...state.userData,
        about: action.payload,
      }
    }),
    [setProfileImage]: (state, action)=>({
      ...state,
      userData: {
        ...state.userData,
        profile_image: action.payload,
      }
    }),
    [setAffiliateCodes]: (state, action)=>({
      ...state,
      userData: {
        ...state.userData,
        affiliateCodes: action.payload,
      }
    }),
  },
  initialState,
);

export default authReducer;