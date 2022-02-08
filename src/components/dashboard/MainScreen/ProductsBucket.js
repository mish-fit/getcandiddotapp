/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductsCard } from "./ProductsCard";

// Add a custom Link
export function ProductsBucket() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container sx={style.container}>
      <Text sx={style.heading}>Bucket 1</Text>
      <Flex sx={style.grid}>
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
      </Flex>
    </Container>
  );
}

const style = {
  container: {
    my: "10px",
    width: "100%",
    backgroundColor: "white",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  heading: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: "25px",
    py: "10px",
  },
};
