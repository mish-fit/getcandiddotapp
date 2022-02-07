/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text } from "theme-ui";
import { Button } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../src/lib/UserDataProvider";
import { firebaseConfig1, firestore } from "lib/firebase";
import Header from "components/dashboard/header";
import { Sidebar } from "components/dashboard/Sidebar";
import { MainScreen } from "components/dashboard/MainScreen";

export default function Onboard(props) {
  const ctx = useContext(UserContext);

  React.useEffect(() => {
    console.log("firestore", firestore);
    console.log("env", firebaseConfig1);
  }, []);

  return (
    <div>
      <Header />
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
    alignItems: "center",
  },
  mainscreen: {
    flex: [1, 1, 2, 3, 3, 3],
    backgroundColor: "red",
  },
  sidebar: {
    flex: 1,
    text: {
      color: "red",
    },
    pt: "10px",
    pl: "10px",
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
