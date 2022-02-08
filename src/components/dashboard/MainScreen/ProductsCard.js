/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Add a custom Link
export function ProductsCard() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Flex sx={style.container}>
      <Flex sx={style.imageContainer}>
        <Text>product Image</Text>
      </Flex>
      <Flex sx={style.detailsContainer}>
        <Text>Product Name</Text>
        <Text>Category Name</Text>
        <Button>Buy Now</Button>
      </Flex>
    </Flex>
  );
}

const style = {
  container: {
    flexDirection: "row",
  },
  imageContainer: {},
  detailsContainer: {
    flexDirection: "column",
  },
};
