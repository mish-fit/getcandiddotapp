/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Add a custom Link
export function LinksCard() {
  return (
    <Button sx={style.button}>
      <Flex sx={style.container}>
        <Text sx={style.link}>this this this</Text>
      </Flex>
    </Button>
  );
}

const style = {
  container: {
    flexDirection: "row",
    p: "10px",
    py: "20px",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 4px 4px 1px rgba(0, 0, 0, 0.5)",
    mx: "20px",
    width: "450px",
    height: "100px",
    my: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "transparent",
    cursor: "pointer",
    borderWidth: "0px",
  },
  link: {
    fontFamily: "Poppins",
    fontWeight: "medium",
    fontSize: "18px",
    color: "#D7354A",
  },
};
