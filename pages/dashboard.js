/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Divider } from "theme-ui";
import { Button } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../src/lib/UserDataProvider";
import { auth, firebaseConfig1, firestore } from "lib/firebase";
import Header from "components/dashboard/header";
import { Sidebar } from "components/dashboard/Sidebar";
import { MainScreen } from "components/dashboard/MainScreen";
import { MenuPopup } from "components/dashboard/MenuPopup";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import * as jose from "jose";
import { createSecretKey } from "crypto";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { nonauthapi } from "lib/api";

export default function Dashboard(props) {
  const ctx = useContext(UserContext);
  const [menuClick, setMenuClick] = React.useState(false);

  React.useEffect(() => {
    console.log("firestore", firestore);
    console.log("env", firebaseConfig1);

    auth.onAuthStateChanged((user) => {
      console.log(JSON.stringify(user.toJSON().stsTokenManager.accessToken));
      console.log("api", nonauthapi);
      localStorage.setItem("jwt", user.toJSON().stsTokenManager.accessToken);
    });
  }, []);

  const menuActivate = (item) => {
    setMenuClick(item);
    // if (item) {
    //   document.addEventListener("click", () => setMenuClick(false));
    // } else {
    //   document.removeEventListener("click", () => setMenuClick(false));
    // }
  };

  const onClose = () => {};

  return (
    <div>
      <Header menu={(item) => menuActivate(item)} menuActive={menuClick} />
      {menuClick ? <MenuPopup /> : null}
      <Flex as="container" sx={styles.container}>
        <Flex as="sidebar" sx={styles.sidebar}>
          <Sidebar />
        </Flex>
        <Flex as="mainscreen" sx={styles.mainscreen}>
          <MainScreen />
        </Flex>
      </Flex>
    </div>
  );
}

const styles = {
  container: {
    mt: "90px",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: ["column", "column", "row", "row", "row", "row"],
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  mainscreen: {
    flex: [1, 1, 2, 2, 2, 2],
  },
  sidebar: {
    flex: 1,
    pl: "10px",
    pt: "20px",
    alignItems: "center",
    justifyContent: "center",
    position: "sticky",
    bottom: "10px",
    alignSelf: "flex-end",
  },
  headerBtn: {
    backgroundColor: "#f29183",
    fontSize: "15px",
    fontWeight: "normal",
    letterSpacing: "-0.16px",
    borderRadius: "5px",
    color: "#ffffff",
    borderWidth: "4px",
    borderColor: "black",
    padding: "4.0px 16px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["0", null, null, "20px", "0"],
    transition: "all 500ms ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "secondary",
    },
  },
  blogBtn: {
    backgroundColor: "#d95f76",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "-0.16px",
    borderRadius: "5px",
    color: "#ffffff",
    padding: "6.5px 24px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["20px", "20px", "20px", "20px", "0"],
    transition: "all 500ms ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "secondary",
    },
  },

  header: {
    color: "text_white",
    fontWeight: "normal",
    py: "20px",
    width: "100%",
    backgroundColor: "#fff",
    transition: "all 0.4s ease",
    borderBottom: "1px solid #E9EDF5",
    position: "fixed",
    top: 0,
    left: 0,

    "&.sticky": {
      backgroundColor: "background",
      color: "text",
      py: "15px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    },
  },
  logoContainer: {},
  signoutContainer: {
    loginBtn: {
      ml: "auto",
      display: "inline-flex",
      alignItems: "center",
      fontSize: "15px",
      color: "#0F2137",
      fontWeight: 500,
      mr: "20px",
      img: {
        mr: "9px",
      },
      text: {
        color: "green",
      },
    },
  },
};
