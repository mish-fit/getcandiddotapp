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
        console.log('existing state: ', state);  
        console.log('updated state:',
            {
                ...state,
                userData:{
                    ...state.userData,
                    name: action.payload            
                }    
            })

        // console.log('reached name');
        return {
            ...state,
            userData:{
                ...state.userData,
                name: action.payload            
            }    
        }
    } else if(action.type === 'USERNAME'){
        return {
            ...state,
            userData:{
                ...state.userData,
                username: action.payload            
            }    
        }
    } else if(action.type === 'MAIL'){
        console.log('existing state: ', state);  
        console.log('updated state:',{
            ...state,
            userData:{
                ...state.userData,
                mail: action.payload            
            }    
        } );      

        return {
            ...state,
            userData:{
                ...state.userData,
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
                ...state.userData,
                photoURL: action.payload            
            }    
        }
    } else if(action.type === 'SET_AFFILIATE_CODES'){
        return {
            ...state,
            userData:{
                ...state.userData,
                affiliateCodes: action.payload           
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
        setPhotoURL,
        setAffiliateCodes
        }

  return <UserContext.Provider value={userDataContext}>
      {props.children}
  </UserContext.Provider>
};

export default UserDataProvider;
