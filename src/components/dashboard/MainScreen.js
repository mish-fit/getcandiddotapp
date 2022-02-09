/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ShowProducts } from "./MainScreen/ShowProducts";
import { ShowLinks } from "./MainScreen/ShowLinks";
import { AddButtons } from "./MainScreen/AddButtons";

// Add a custom Link
export function MainScreen() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container sx={{ backgroundColor: "white", px: "0px" }}>
      <AddButtons />
      <ShowProducts />
      <ShowLinks />
    </Container>
  );
}

const style = {};
