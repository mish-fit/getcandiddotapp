/** Uncomment the below codeblock if you want to add google analytics for more info please visit our docs analytics section */
/** 
import { useEffect } from 'react';
import Router from 'next/router';
import { initGA, logPageView } from 'analytics';
*/
import { ChakraProvider } from "@chakra-ui/react";
import "assets/css/react-slick.css";
import UserDataProvider from "lib/UserDataProvider";
import "rc-drawer/assets/index.css";
import "react-modal-video/css/modal-video.min.css";
import { useUserData } from "../src/lib/hooks";
import theme from "../src/theme/index";
import "./../styles/normalize.css";
import { Provider } from "react-redux";
import store from "../src/store/index";

// import TagManager from "react-gtm-module";

// const tagManagerArgs = {
//   gtmId: "GTM-NHTWJBD",
//   dataLayerName: "PageDataLayer",
// };

// if (typeof window === "undefined") {
//   TagManager.initialize(tagManagerArgs);
// }

export default function CustomApp({ Component, pageProps }) {
  const userData = useUserData();
  /** 
   useEffect(() => {
     initGA();
     logPageView();
     Router.events.on('routeChangeComplete', logPageView);
   }, []);
   */

  return (
    <Provider store={store}>
      <UserDataProvider> 
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserDataProvider>
    </Provider>
  );
}
