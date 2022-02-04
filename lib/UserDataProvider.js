import React, { useReducer } from 'react';
import { createContext } from 'react';
import { useUserData } from './hooks';
const userData = {
    name:'',
    username:'',
    mail:'',
    phone: '+91',
    photo:null,
    photoURL: '',
    affiliateCodes:[],
}

const userDataReducer = (state, action)=>{
    if(action.type === 'NAME'){
        // console.log('reached name');
        // console.log({
        //     ...state,
        //     userData:{
        //         ...userData,
        //         name: action.payload            
        //     }    
        // });
        return {
            ...state,
            userData:{
                ...userData,
                name: action.payload            
            }    
        }
    } else if(action.type === 'USERNAME'){
        // console.log(state);
        // console.log(action.payload);
        // console.log('reached action');
        return {
            ...state,
            userData:{
                ...userData,
                username: action.payload            
            }    
        }
    } else if(action.type === 'MAIL'){
        // console.log(state);
        // console.log(action.payload);
        // console.log('reached mail');
        // console.log({
        //     ...state,
        //     userData:{
        //         ...userData,
        //         mail: action.payload            
        //     }    
        // });
        return {
            ...state,
            userData:{
                ...userData,
                mail: action.payload            
            }    
        }

    } else if(action.type === 'PHONE'){
        return {
            ...state,
            userData:{
                ...state.userData,
                phone: action.payload            
            }    
        }
    } else if(action.type === 'PHOTO_URL'){
        return {
            ...state,
            userData:{
                ...userData,
                photoURL: action.payload            
            }    
        }
    } else if(action.type === 'SET_AFFILIATE_CODES'){
        return {
            ...state,
            userData:{
                ...userData,
                affiliateCodes: affiliateCodes.append(action.payload)           
            }    
        }
    }

    return state;
}
const initialState = {
    userSignInInfo :{
        username:'',
        user:''
    }, 
    userData,
    setName:()=>{},
    setUsername:()=>{},
    setMail:()=>{},
    setPhone:()=>{},
    setPhotoURL:()=>{},
    setPhoto:()=>{},
    setAffiliateCodes:()=>{}
} 
export const UserContext = createContext(initialState);

// export const UserContext = createContext({initialState, dispatch: ()=>{}});

const UserDataProvider = (props) => {

    const userSignInInfo = useUserData();
    const [dataState, dataDispatcher]= useReducer(userDataReducer, initialState);
    
    const setName = (name)=>{
        dataDispatcher({type:'NAME', payload:name})
    }
    const setUsername = (username)=>{
        // console.log('reached setUserName');
        dataDispatcher({type:'USERNAME', payload:username})
    }
    const setMail = (mail)=>{
        dataDispatcher({type:'MAIL', payload:mail})
    }
    const setPhone = (phone)=>{
        dataDispatcher({type:'PHONE', payload:phone})
    }
    const setPhotoURL = (photoURL)=>{
        dataDispatcher({type:'PHOTO_URL', payload:photoURL})
    }
    const setPhoto = (photo)=>{
        dataDispatcher({type:'NAME', payload:photo})
    }
    const setAffiliateCodes = (affiliateCode)=>{
        dataDispatcher({type:'SET_AFFILIATE_CODES', payload:affiliateCode})
    }

    const userDataContext = {
        userSignInInfo: userSignInInfo,
        userData : dataState.userData,
        setName,
        setUsername,
        setMail,
        setPhone,
        setPhoto,
        setPhotoURL
        }

  return <UserContext.Provider value={userDataContext}>
      {props.children}
  </UserContext.Provider>
};

export default UserDataProvider;
