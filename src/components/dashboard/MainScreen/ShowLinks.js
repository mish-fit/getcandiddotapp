/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Image, Text, Grid } from "theme-ui";
import firebase from "firebase";
import { auth, googleAuthProvider } from "../../../lib/firebase";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Add a custom Link
export function ShowLinks() {
  const router = useRouter();

  const addLinks = () => {
    console.log("add links");
  };

  return (
    <Container sx={{ width: "80%" }}>
      <Text>Social Handles</Text>
      <Grid gap={5} columns={[2, 2, 3, 3, 4, 4]} sx={style.grid}>
        <Button>Hi</Button>
        <Button>Hi</Button>
        <Button>Hi</Button>
        <Button>Hi</Button>
        <Button>Hi</Button>
        <Button>Hi</Button>
        <Button>Hi</Button>
        <Button>Hi</Button>
        <Button>Hi</Button>
        <Button>Hi</Button>
      </Grid>
    </Container>
  );
}

const style = {
  grid: {
    width: "100%",
  },
};
