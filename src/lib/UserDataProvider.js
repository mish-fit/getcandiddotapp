import nookies from "nookies";
import React, { createContext, useReducer } from "react";
import { auth } from "./firebase";
import { useUserData } from "./hooks";
const userData = {
  name: "",
  username: "",
  mail: "",
  phone: "+91",
  about: '',
  profile_image: "",
  affiliateCodes: [],
};

const userDataReducer = (state, action) => {
  if (action.type === "NAME") {
    // console.log("existing state: ", state);
    // console.log("updated state:", {
    //   ...state,
    //   userData: {
    //     ...state.userData,
    //     name: action.payload,
    //   },
    // });

    // console.log('reached name');
    return {
      ...state,
      userData: {
        ...state.userData,
        name: action.payload,
      },
    };
  } else if (action.type === "USERNAME") {
    return {
      ...state,
      userData: {
        ...state.userData,
        username: action.payload,
      },
    };
  } else if (action.type === "MAIL") {
    // console.log("existing state: ", state);
    // console.log("updated state:", {
    //   ...state,
    //   userData: {
    //     ...state.userData,
    //     mail: action.payload,
    //   },
    // });

    return {
      ...state,
      userData: {
        ...state.userData,
        mail: action.payload,
      },
    };
  } else if (action.type === "PHONE") {
    return {
      ...state,
      userData: {
        ...state.userData,
        phone: action.payload,
      },
    };
  } else if (action.type === "ABOUT") {
    return {
      ...state,
      userData: {
        ...state.userData,
        about: action.payload,
      },
    };
  } else if (action.type === "PROFILE_IMAGE") {
    return {
      ...state,
      userData: {
        ...state.userData,
        profile_image: action.payload,
      },
    };
  } else if (action.type === "SET_AFFILIATE_CODES") {
    return {
      ...state,
      userData: {
        ...state.userData,
        affiliateCodes: action.payload,
      },
    };
  }

  return state;
};
const initialState = {
  userSignInInfo: {
    username: "",
    user: "",
  },
  userData,
  setName: () => {},
  setUsername: () => {},
  setMail: () => {},
  setPhone: () => {},
  setAbout: () => {},
  setProfileImage: () => {},
  setAffiliateCodes: () => {},
};
export const UserContext = createContext(initialState);

// export const UserContext = createContext({initialState, dispatch: ()=>{}});

const UserDataProvider = (props) => {
  const userSignInInfo = useUserData();
  const [dataState, dataDispatcher] = useReducer(userDataReducer, initialState);

  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        //  console.log("provider token", token);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  React.useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  const setName = (name) => {
    dataDispatcher({ type: "NAME", payload: name });
  };
  const setUsername = (username) => {
    // console.log('reached setUserName');
    dataDispatcher({ type: "USERNAME", payload: username });
  };
  const setMail = (mail) => {
    dataDispatcher({ type: "MAIL", payload: mail });
  };
  const setPhone = (phone) => {
    dataDispatcher({ type: "PHONE", payload: phone });
  };
  const setAbout = (about) => {
    dataDispatcher({ type: "ABOUT", payload: about });
  };
  const setProfileImage = (profile_image) => {
    dataDispatcher({ type: "PROFILE_IMAGE", payload: profile_image });
  };
  const setAffiliateCodes = (affiliateCode) => {
    dataDispatcher({ type: "SET_AFFILIATE_CODES", payload: affiliateCode });
  };

  const userDataContext = {
    userSignInInfo: userSignInInfo,
    userData: dataState.userData,
    setName,
    setUsername,
    setMail,
    setPhone,
    setAbout,
    setProfileImage,
    setAffiliateCodes,
  };
  
  return (
    <UserContext.Provider value={[userDataContext, user]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserDataProvider;
