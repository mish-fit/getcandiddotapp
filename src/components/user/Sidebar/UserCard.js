/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Box } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

// Add a custom Link
export function UserCard({ data }) {
  // React.useEffect(() => {
  //   console.log("user data", data);
  // }, [data]);

  return (
    <Container sx={style.container}>
      <Container sx={style.coverPhotoView}>
        <Image
          sx={style.coverPhoto}
          alt={"cover img"}
          src={
            data[0].u_cover_image && data[0].u_cover_image != ""
              ? data[0].u_cover_image
              : "/user/cover.png"
          }
        />
      </Container>
      <Flex sx={style.userPhotoView}>
        <Image
          sx={style.userImage}
          alt={"profile img"}
          src={
            data[0].u_profile_image && data[0].u_profile_image != ""
              ? data[0].u_profile_image
              : "/user/profile.png"
          }
        />
      </Flex>
      <Container sx={style.userNameView}>
        <Container>
          <Text sx={style.userName}>{data[0].u_name}</Text>
        </Container>
      </Container>
      <Container sx={style.aboutMeView}>
        <Container>
          <Text sx={style.aboutMe}>{data[0].u_about}</Text>
        </Container>
      </Container>
    </Container>
  );
}

const style = {
  container: {
    width: "full",
    mt: ["48px", "48px", "0px", "0px", "0px", "0px"],
    // mr:["-10%","-10%","0%","0%","0%","0%"],
    borderTopRadius: "16px",
  },
  coverPhotoView: {
    borderTopRadius: "16px",
    backgroundColor: "white",
    mt: "4px",
    width: "full",
    // width: ["0px","0px","0px","448px","448px","448px"],
    // width: ["0px","448px","448px","448px","448px","448px"],
    // height: ["48rem", "248rem","248px","160px","248px","248px"],
    justifyContent: "flex-start",
  },
  userPhotoView: {
    justifyContent: "center",
    mt: ["0px", "-48px", "-48px", "-48px", "0px", "0px"],
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderRadius: "10px",
  },
  userNameView: {
    mt: "24px",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    px: "auto",
  },
  aboutMeView: {
    width: "80%",
    mt: "8px",
  },
  aboutMe: {
    textAlign: "center",
    color: "#868686",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: "400",
  },
  coverPhoto: {
    display: ["none", "inline", "inline", "inline", "inline", "inline"],
    // mt: ["-150px" ,"0px","0px","0px","0px","0px"],
    textAlign: "center",
    borderRadius: "16px",
  },
  userImage: {
    width: "148px",
    height: "148px",
    backgroundColor: "yellow",
    textAlign: "center",
    borderRadius: "200px",
  },
  userName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: "Poppins",
    color: "#323232",
  },

  nav: {
    display: ["", "none", "none", "none", "none"],
    justifyContent: "center",
    navLink: {
      // textDecoration:"underline",
      fontFamily: "Poppins",
      fontSize: "16px",
      color: "#323232",
      fontWeight: "bold",
      cursor: "pointer",
      lineHeight: "1.2",
      mt: "-64px",
      "&:hover, &.active": {
        color: "primary",
      },
    },
  },
};
