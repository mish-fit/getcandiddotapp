/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductsCard } from "./ProductsCard";
import { ProductsBucket } from "./ProductsBucket";

// Add a custom Link
export function ShowProducts() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container sx={{ width: "95%" }}>
      <ProductsBucket />
      <ProductsBucket />
    </Container>
  );
}

const style = {
  grid: {
    width: "100%",
  },
};
