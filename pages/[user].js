/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Divider } from "theme-ui";

import React, { useContext, useState, useEffect } from "react";

import { nonauthapi } from "lib/api";
import { Sidebar } from "components/user/Sidebar";
import { MainScreen } from "components/user/MainScreen";
import Lottie from "lottie-react";
import smm from "../public/lottie/smn.json";
import { UserNotFound } from "components/user/UserNotFound";

export default function User({ links, recos, user, socials }) {
  const [summary, setSummary] = React.useState({});

  if (!user.length) {
    return (
      <Flex sx={{ width: "100%", height: "100%", flex: 1 }}>
        <UserNotFound />
      </Flex>
    );
  }

  if (!recos.length && !links.length) {
    return (
      <div>
        <Flex as="container" sx={styles.container}>
          <Flex as="sidebar" sx={styles.sidebar}>
            <Sidebar socials={socials} user={user} summary={summary} />
          </Flex>
          <Flex as="mainscreen" sx={styles.mainscreen}>
            <Flex
              sx={{
                height: ["400px", "400px", "400px", "700px", "800px", "900px"],
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Lottie animationData={smm} />
            </Flex>
          </Flex>
        </Flex>
      </div>
    );
  }

  return (
    <div>
      <Flex as="container" sx={styles.container}>
        <Flex as="sidebar" sx={styles.sidebar}>
          <Sidebar socials={socials} user={user} summary={summary} />
        </Flex>
        <Flex as="mainscreen" sx={styles.mainscreen}>
          <MainScreen links={links} recos={recos} user={user} />
        </Flex>
      </Flex>
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    nonauthapi + "user/byusername" + "?u_name=" + context.params.user
  );
  const userDetails = await response.json();

  if (userDetails.length && userDetails[0].u_id) {
    const res1 = await fetch(
      nonauthapi + "links" + "?u_id=" + userDetails[0].u_id
    );
    const links = await res1.json();

    const res2 = await fetch(
      nonauthapi + "socials" + "?u_id=" + userDetails[0].u_id
    );
    const socials = await res2.json();

    const res3 = await fetch(
      nonauthapi + "recos" + "?u_id=" + userDetails[0].u_id
    );
    const recos = await res3.json();

    const res5 = await fetch(
      nonauthapi + "user" + "?u_id=" + userDetails[0].u_id
    );
    const user = await res5.json();
    // Pass data to the page via props
    return {
      props: {
        links,
        socials,
        recos,
        user,
      },
    };
  } else {
    const links = [];
    const socials = [];
    const recos = [];
    const user = [];
    return {
      props: { links, socials, recos, user },
    };
  }
}

const styles = {
  container: {
    mt: "16px",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: ["column", "column", "row", "row", "row", "row"],
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  mainscreen: {
    flex: [1, 1, 1, 2, 3, 3],
  },
  sidebar: {
    flex: 1,
    pl: "8px",
    pt: "16px",
    alignItems: "center",
    justifyContent: "center",
    position: "sticky",
    bottom: "8px",
    alignSelf: "flex-end",
  },
  headerBtn: {
    backgroundColor: "#f29183",
    fontSize: "16px",
    fontWeight: "normal",
    letterSpacing: "-0.16px",
    borderRadius: "6px",
    color: "#ffffff",
    borderWidth: "4px",
    borderColor: "black",
    padding: "4.0px 16px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["0", null, null, "16px", "0"],
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
    borderRadius: "8px",
    color: "#ffffff",
    padding: "8px 24px",
    display: ["none", null, null, null, "inline-block"],
    ml: ["0", null, null, "auto", "0"],
    mr: ["16px", "16px", "16px", "16px", "0"],
    transition: "all 500ms ease",
    "&:hover": {
      color: "#fff",
      backgroundColor: "secondary",
    },
  },

  header: {
    color: "text_white",
    fontWeight: "normal",
    py: "16px",
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
      py: "16px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    },
  },
  lottie: {
    width: ["0px", "0px", "0px", "200px", "300px", "300px"],
    height: ["0px", "0px", "0px", "200px", "300px", "300px"],
  },
  signoutContainer: {
    loginBtn: {
      ml: "auto",
      display: "inline-flex",
      alignItems: "center",
      fontSize: "16px",
      color: "#0F2137",
      fontWeight: 500,
      mr: "16px",
      img: {
        mr: "8px",
      },
      text: {
        color: "green",
      },
    },
  },
};
