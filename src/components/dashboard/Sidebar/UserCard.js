/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Box } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Add a custom Link
export function UserCard() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container sx={style.container}>
      <Container sx={style.coverPhotoView}>
        <Image sx={style.coverPhoto} src={"/user/cover.png"} />
      </Container>
      <Container sx={style.userPhotoView}>
        <Image sx={style.userImage} src={"/user/profile.png"} />
      </Container>
      <Container sx={style.userNameView}>
        <Container>
          <Text sx={style.userName}>Candid Links</Text>
        </Container>
      </Container>
      <Container sx={style.aboutMeView}>
        <Container>
          <Text sx={style.aboutMe}>
            India's bio in link platform for Indian users
          </Text>
        </Container>
      </Container>
    </Container>
  );
}

const style = {
  container: {
    width: "100%",
    borderTopRadius: "20px",
  },
  coverPhotoView: {
    borderTopRadius: "20px",
    backgroundColor: "yellow",
    width: "450px",
    height: "250px",
    justifyContent: "flex-start",
  },
  userPhotoView: {
    mt: "-50px",
    width: "150px",
    height: "150px",
    backgroundColor: "transparent",
    borderRadius: "150px",
  },
  userNameView: {
    mt: "30px",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    px: "auto",
  },
  aboutMeView: {
    width: "80%",
    mt: "10px",
  },
  aboutMe: {
    textAlign: "center",
    color: "#868686",
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "400",
  },
  coverPhoto: {
    textAlign: "center",
    borderRadius: "20px",
  },
  userImage: {
    textAlign: "center",
    borderRadius: "150px",
  },
  userName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: "Poppins",
    color: "#323232",
  },
};
