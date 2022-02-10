/** Uncomment the below codeblock if you want to add google analytics for more info please visit our docs analytics section */
/** 
import { useEffect } from 'react';
import Router from 'next/router';
import { initGA, logPageView } from 'analytics';
*/

import "rc-drawer/assets/index.css";
import "assets/css/react-slick.css";
import "react-modal-video/css/modal-video.min.css";
import "typeface-bree-serif";
import "typeface-dm-sans";
import "@fontsource/poppins";
import { ChakraProvider } from "@chakra-ui/react";
import UserDataProvider from "lib/UserDataProvider";
import { useUserData } from '../src/lib/hooks';

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
    <UserDataProvider >
      <ChakraProvider >
        <Component {...pageProps} />
      </ChakraProvider>
    </UserDataProvider>
  );
}
