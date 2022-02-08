/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ShowProducts } from "./MainScreen/ShowProducts";
import { ShowLinks } from "./MainScreen/ShowLinks";

// Add a custom Link
export function MainScreen() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container sx={{ backgroundColor: "white" }}>
      <ShowProducts />
      <ShowLinks />
    </Container>
  );
}

const style = {};
